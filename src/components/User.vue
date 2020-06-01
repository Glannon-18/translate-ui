<template>
    <div>
        <div style="display: flex;justify-content: space-between ;align-items: center">
            <div><span>用户管理</span></div>
            <div style="display: flex">
                <el-button type="primary" icon="el-icon-plus" @click="show_empty">新建用户</el-button>
                <el-input placeholder="请输入用户账号或者用户名" style="margin: 0 10px" v-model="searchword">
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
                        prop="account"
                        label="用户名"
                >
                </el-table-column>
                <el-table-column
                        prop="username"
                        label="姓名"
                >
                </el-table-column>
                <el-table-column
                        prop="telephone"
                        label="电话"
                >
                </el-table-column>
                <el-table-column
                        prop="create_time"
                        label="创建时间"
                >
                </el-table-column>
                <el-table-column :formatter="formatRoleNames"
                                 prop="roleList"
                                 label="角色"
                                 width="120">
                </el-table-column>
                <el-table-column
                        fixed="right"
                        label="操作"
                        width="140">
                    <template slot-scope="scope">
                        <el-button @click="show_user(scope.row)" type="text" size="small">编辑</el-button>
                        <el-button @click="delete_user(scope.row)" type="text" size="small">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <el-pagination style="margin-top: 10px"
                           layout="prev, pager, next"
                           :page-size="pageSize"
                           :total="total"
                           :current-page.sync="currentPage"
                           @current-change="page">
            </el-pagination>
        </div>

        <el-dialog title="添加用户" :visible.sync="dialogFormVisible" width="30%" @open="allRoles" @close="resetForm">
            <el-form :model="form" ref="userForm" :rules="rules">
                <el-form-item label="登录账号" :label-width="formLabelWidth" prop="account">
                    <el-input v-model="form.account" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="用户名" :label-width="formLabelWidth" prop="username">
                    <el-input v-model="form.username" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="手机号码" :label-width="formLabelWidth" prop="phone">
                    <el-input v-model="form.phone" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-checkbox-group v-model="roleIds">
                        <el-checkbox v-for="r in roles" :label="r.id" :key="r.id">{{r.nameZh}}</el-checkbox>
                    </el-checkbox-group>
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
    import axios from "axios"

    export default {
        created() {
            this.query("", "1")
        },
        name: "user",
        data() {
            return {
                dialogUserId: '',
                roles: [],
                roleIds: [],
                searchword: '',
                currentPage: 0,
                pageSize: 0,
                total: 0,
                form: {
                    account: "",
                    username: "",
                    phone: ""
                },
                rules: {
                    account: [{required: true, message: '请输入登录账号名', trigger: 'blur'}
                        ,
                        {
                            validator: (rule, value, callback) => {
                                this.getRequest("/user/check", {
                                    account: value,
                                    userid: this.dialogUserId
                                }).then(resp => {
                                    if (resp.data.obj == 0) {
                                        callback()
                                    } else {
                                        callback(new Error("该账户名已经存在"))
                                    }
                                })
                            }, trigger: 'blur'
                        }

                    ],
                    username: [{required: true, message: '请输入用户名', trigger: 'blur'}],
                    phone: [{required: true, message: '请输入手机号', trigger: 'blur'}
                        ,
                        {
                            validator: (rule, value, callback) => {
                                if (/^1[34578]\d{9}$/.test(value) == false) {
                                    callback(new Error("请输入正确的手机号"));
                                } else {
                                    callback();
                                }
                            }, trigger: 'blur'
                        }

                    ]
                },
                dialogFormVisible: false,
                formLabelWidth: '120px',
                tableData: []
            }
        }, methods: {
            delete_user(row) {
                let id = row.id
                this.deleteRequest(`/user/${id}`).then(() => {
                    this.query("", "1")
                })
            },
            formatRoleNames(row, column, cellValue) {
                let roleName = ""
                cellValue.forEach(i => {
                    roleName += i.nameZh + " "
                })
                return roleName
            },

            show_empty() {
                this.dialogUserId = ''
                this.dialogFormVisible = true
            },
            show_user(row) {
                let uid = row.id
                this.dialogUserId = uid + ''
                axios.all([this.getRequest("/user/" + uid), this.getRequest("/user_role/", {
                    uid: uid
                })]).then(axios.spread((userinfo, rolesid) => {
                    let u = userinfo.data.obj
                    this.form.account = u.account
                    this.form.username = u.username
                    this.form.phone = u.telephone
                    this.roleIds = rolesid.data.obj
                    this.dialogFormVisible = true
                }))


            },
            sub() {
                if (this.dialogUserId == '') {
                    this.$refs.userForm.validate(valid => {
                        if (valid) {
                            this.postRequest("/user/", {
                                account: this.form.account,
                                username: this.form.username,
                                phone: this.form.phone,
                                roles: this.roleIds
                            }).then(() => {
                                this.dialogFormVisible = false
                                this.query("", "1")
                            })
                        }
                    })
                } else {
                    this.$refs.userForm.validate(valid => {
                        if (valid) {
                            this.putRequest("/user/" + this.dialogUserId, {
                                account: this.form.account,
                                username: this.form.username,
                                phone: this.form.phone,
                                roles: this.roleIds
                            }).then(() => {
                                this.dialogFormVisible = false
                                this.query("", "1")
                            })
                        }
                    })
                }
            },
            allRoles() {
                this.getRequest("/role/").then(resp => {
                    this.roles = resp.data.obj
                })
            },
            query(name, currentPage) {
                this.getRequest("/user/", {
                    name: name,
                    currentPage: currentPage
                }).then(resp => {
                    this.tableData = resp.data.data
                    this.currentPage = parseInt(currentPage)
                    this.pageSize = resp.data.pageSize
                    this.total = resp.data.total
                })
            },
            page(val) {
                this.query(this.searchword, val)
            },
            search() {
                this.query(this.searchword, "1")
            },
            resetForm() {
                this.$refs.userForm.clearValidate()
                this.form.account = ''
                this.form.username = ''
                this.form.phone = ''
                this.roleIds = []
            }
        }

    }
</script>

<style scoped>

</style>