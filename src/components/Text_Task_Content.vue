<template>

    <div>
        <div>
            <span>{{name}}</span>
        </div>
        <div style="margin-top: 10px">
            <el-button type="primary" icon="el-icon-download">下载</el-button>
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
                        prop="status"
                        label="状态"
                >
                </el-table-column>
                <el-table-column
                        prop="original_language"
                        label="原文语种"
                >
                </el-table-column>
            </el-table>
            <el-pagination style="margin-top: 15px" :page-size="pageSize"
                           layout="prev, pager, next"
                           :total="total" @current-change="page">
            </el-pagination>
        </div>


    </div>
</template>

<script>
    export default {

        created() {
            let id = this.$route.params.id
            this.query(id)
        },

        name: "Text_Task_Content"
        ,
        data() {
            return {
                name: "",
                tableData: [],
                total: 0,
                pageSize: 0,
                multipleSelection: [],
            }
        }
        ,
        methods: {
            deletAnnexe() {
                let ids = []
                this.multipleSelection.forEach(m => {
                    ids.push(m.id)
                })
                if (ids.length == 0) {
                    this.$message.warning("请先选择附件！")
                    return
                }
                console.log(ids)
                this.deleteRequest("/annexe/", {
                    ids: ids + ''
                }).then(resp => {
                    if (resp.data.status == 200) {
                        let id = this.$route.params.id
                        this.query(id)
                    }
                })
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
                // console.log(this.multipleSelection)
            },
            query(id) {
                this.getRequest("/annexe_task/" + id).then(resp => {
                    this.name = resp.data.obj.name
                    let atid = resp.data.obj.id

                    return this.getRequest("/annexe/page", {
                        currentPage: "1",
                        atid: atid + ""
                    })
                }).then(resp => {
                    this.total = resp.data.total
                    this.pageSize = resp.data.pageSize
                    // console.log(this.total,this.pageSize)
                    resp.data.data.forEach(t => {
                        t.original_language = this.$store.state.language[t.original_language]
                        t.status = this.$store.state.annexe_status[t.status]
                    })
                    this.tableData = resp.data.data
                })
            },
            page(val) {
                let atid = this.$route.params.id
                this.getRequest("/annexe/page", {
                    currentPage: val,
                    atid: atid + ""
                }).then(resp => {
                    resp.data.data.forEach(t => {
                        t.original_language = this.$store.state.language[t.original_language]
                        t.status = this.$store.state.annexe_status[t.status]
                    })
                    this.tableData = resp.data.data
                })
            }
        }
        ,
        beforeRouteUpdate(to, from, next) {
            let id = to.params.id
            this.query(id)
            next()
        }
    }
</script>

<style scoped>

</style>