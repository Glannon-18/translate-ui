<template>

    <div>
        <div>
            <h4>{{name}}</h4>
            <h5>语言方向 {{original_language_zh}}-{{translate_language_zh}}</h5>
        </div>
        <div style="margin-top: 10px">
            <el-button type="primary" icon="el-icon-download" @click="exportZip">下载</el-button>
            <el-button type="primary" icon="el-icon-delete" @click="deletAnnexe">删除</el-button>
        </div>
        <div style="margin-top: 10px">
            <el-table
                    ref="multipleTable"
                    :data="tableData"
                    tooltip-effect="dark"
                    style="width: 100%"
                    @selection-change="handleSelectionChange"
            >
                <el-table-column
                        type="selection"
                        width="55">
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="文档名称"
                >

                </el-table-column>
                <el-table-column
                        prop="status_zh"
                        label="状态"
                >
                </el-table-column>


                <el-table-column
                        fixed="right"
                        label="操作"
                        width="200">
                    <template slot-scope="scope">
                        <el-button @click="show_document(scope.row)" type="text" size="small">查看</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination style="margin-top: 15px" :page-size="pageSize"
                           layout="prev, pager, next" :current-page.sync="currentPage"
                           :total="total" @current-change="page">
            </el-pagination>
        </div>


    </div>
</template>

<script>
    import axios from "axios";

    export default {

        created() {
            let id = this.$route.params.id
            axios.all([this.getRequest(`/annexe_task/${id}`), this.getRequest("/annexe/page", {
                currentPage: "1",
                atid: id + ""
            })]).then(
                axios.spread((first, second) => {
                    this.name = first.data.obj.name
                    this.original_language_zh=first.data.obj.original_language_zh
                    this.translate_language_zh=first.data.obj.translate_language_zh
                    this.currentPage = 1
                    this.total = second.data.total
                    this.pageSize = second.data.pageSize
                    this.tableData = second.data.data
                })
            )
        },

        name: "Text_Task_Content"
        ,
        data() {
            return {
                name: "",
                original_language_zh: "",
                translate_language_zh: "",
                tableData: [],
                total: 0,
                pageSize: 0,
                currentPage: 0,
                multipleSelection: [],
            }
        }
        ,
        methods: {
            show_document(row) {
                let id = row.id
                this.$router.push("/content/text_translate/annexe/" + id)

            },
            exportZip() {
                let ids = []
                this.multipleSelection.forEach(m => {
                    ids.push(m.id)
                })
                if (ids.length == 0) {
                    this.$message.warning("请先选择附件！")
                    return
                }
                axios({
                    method: 'post',
                    url: '/annexe/export',
                    data: {
                        ids: ids + '',
                    },
                    responseType: 'blob'
                }).then(resp => {
                    this.download(resp.data)
                })

            },
            deletAnnexe() {
                let ids = []
                this.multipleSelection.forEach(m => {
                    ids.push(m.id)
                })
                if (ids.length == 0) {
                    this.$message.warning("请先选择附件！")
                    return
                }
                this.deleteRequest("/annexe/", {
                    ids: ids + '',
                    responseType: "blob"
                }).then(() => {
                    this.page("1")
                })
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
                // console.log(this.multipleSelection)
            },
            page(val) {
                let atid = this.$route.params.id
                this.getRequest("/annexe/page", {
                    currentPage: val,
                    atid: atid + ""
                }).then(resp => {
                    this.currentPage = parseInt(val)
                    this.total = resp.data.total
                    this.pageSize = resp.data.pageSize
                    // console.log(this.total,this.pageSize)
                    this.tableData = resp.data.data
                })
            },
            download(data) {
                if (!data) {
                    return
                }
                let url = window.URL.createObjectURL(new Blob([data]))
                let link = document.createElement('a')
                link.style.display = 'none'
                link.href = url
                link.setAttribute('download', 'a.zip')
                document.body.appendChild(link)
                link.click()
            }

        }
        ,
        beforeRouteUpdate(to, from, next) {
            let id = to.params.id
            axios.all([this.getRequest(`/annexe_task/${id}`), this.getRequest("/annexe/page", {
                currentPage: "1",
                atid: id + ""
            })]).then(
                axios.spread((first, second) => {
                    this.name = first.data.obj.name
                    this.currentPage = 1
                    this.total = second.data.total
                    this.pageSize = second.data.pageSize
                    this.tableData = second.data.data
                })
            )
            next()
        }
    }
</script>

<style scoped>

</style>
