<template>
    <div>

        <div style="display: flex;justify-content: space-between ;align-items: center">
            <div><span>关键词词库</span></div>
            <div style="display: flex">
                <el-button type="primary" icon="el-icon-plus" @click="dialogFormVisible=true">新建词库</el-button>
                <el-input placeholder="请输入词库名称" style="margin: 0 10px" v-model="searchword">
                    <i slot="prefix" class="el-input__icon el-icon-search"></i>
                </el-input>
                <el-button type="primary" @click="search">搜索</el-button>
            </div>
        </div>
        <div style="margin-top: 10px">


            <el-table
                    :data="tableData"
            >
                <el-table-column
                        prop="name"
                        label="词库名称"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="username"
                        label="创建人"
                >
                </el-table-column>
                <el-table-column
                        :formatter="dateFormat"
                        prop="create_time"
                        label="创建时间"
                >
                </el-table-column>
                <el-table-column
                        fixed="right"
                        label="操作"
                        width="100">
                    <template slot-scope="scope">
                        <el-button @click="handleClick(scope.row)" type="text" size="small">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <el-pagination style="margin-top: 10px"
                           layout="prev, pager, next"
                           :page-size="pageSize"
                           :total="total"
                           @current-change="page"
            >
            </el-pagination>
        </div>

        <el-dialog title="添加词库" :visible.sync="dialogFormVisible" width="30%">
            <el-form :model="form" ref="libForm" :rules="rules">
                <el-form-item label="词库名称" :label-width="formLabelWidth" prop="name">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="sub">确 定</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
    export default {
        created() {
            this.query('', 1)
        },
        name: "Lib",
        data() {
            return {
                searchword: '',
                currentPage: 0,
                pageSize: 0,
                total: 0,
                form: {
                    name: ""
                },
                rules: {
                    name: [{required: true, message: '请输入词库', trigger: 'blur'}],
                },
                dialogFormVisible: false,
                formLabelWidth: '120px',
                tableData: [
                    //     {
                    //     name: "dsadasd",
                    //     user: "ddee",
                    //     time: "2017-02-06",
                    //     key: "dadasd dsadas"
                    //
                    // }
                ]
            }
        }, methods: {
            handleClick(row) {
                // console.log(row);
                let id=row.id
                this.deleteRequest("/library/",{
                    id:id
                }).then(()=>{
                    this.query("",1)
                })
            },

            search() {
                this.query(this.searchword, 1)
            },
            sub() {
                this.$refs.libForm.validate(v => {
                    if (v) {
                        this.postRequest("/library/", {
                            name: this.form.name
                        }).then(resp => {
                            if (resp.data.status == 200) {
                                this.$message.success("添加词库成功！")
                                this.$refs.libForm.resetFields()
                                this.dialogFormVisible = false
                                this.query('', 1)
                            }
                        })
                    }
                })
            },
            query(name, currentPage) {
                this.getRequest("/library/", {
                    name: name,
                    currentPage: currentPage
                }).then(resp => {
                    this.tableData = resp.data.data
                    this.total = resp.data.total
                    this.pageSize = resp.data.pageSize
                    this.currentPage = currentPage
                })


            },
            page(val) {
                this.query(this.searchword, val)
            },

            dateFormat(row) {
                // row 表示一行数据, createTime 表示要格式化的字段名称
                let t = new Date(row.create_time)
                if (!t) {
                    return ''
                }
                let year = t.getFullYear()
                let month = this.dateIfAddZero(t.getMonth() + 1)
                let day = this.dateIfAddZero(t.getDate())
                let hours = this.dateIfAddZero(t.getHours())
                let minutes = this.dateIfAddZero(t.getMinutes())
                let seconds = this.dateIfAddZero(t.getSeconds())
                return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds
            },
            dateIfAddZero: function (time) {
                return time < 10 ? '0' + time : time
            }
        }
    }
</script>

<style scoped>

</style>