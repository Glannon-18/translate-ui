<template>
    <div>

        <div style="display: flex;justify-content: space-between ;align-items: center">
            <div><span>用户管理</span></div>
            <div style="display: flex">
                <el-button type="primary" icon="el-icon-plus" @click="dialogFormVisible=true">新建用户</el-button>
                <el-input placeholder="请输入用户账号或者用户名" style="margin: 0 10px" v-model="searchword">
                    <i slot="prefix" class="el-input__icon el-icon-search"></i>
                </el-input>
                <el-button type="primary">搜索</el-button>
            </div>
        </div>
        <div style="margin-top: 10px">
            <el-table
                    :data="tableData"
            >
                <el-table-column
                        prop="account"
                        label="用户名"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="username"
                        label="姓名"
                >
                </el-table-column>
                <el-table-column
                        prop="phone"
                        label="电话"
                >
                </el-table-column>
                <el-table-column
                        prop="time"
                        label="创建时间"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="roles"
                        label="角色"
                        width="120">
                </el-table-column>
                <el-table-column
                        fixed="right"
                        label="操作"
                        width="100">
                    <template slot-scope="scope">
                        <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
                        <el-button @click="handleClick(scope.row)" type="text" size="small">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <el-pagination style="margin-top: 10px"
                           layout="prev, pager, next"
                           :total="50">
            </el-pagination>
        </div>

        <el-dialog title="添加用户" :visible.sync="dialogFormVisible" width="30%" @open="allRoles">
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
                    <el-checkbox-group v-model="roleIds" @change="sss">
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
    export default {
        name: "user",
        data() {
            return {
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
                    account: [{required: true, message: '请输入登录账号名', trigger: 'blur'}],
                    username: [{required: true, message: '请输入用户名', trigger: 'blur'}],
                    phone: [{required: true, message: '请输入手机号', trigger: 'blur'}
                    ,
                        {validator:function(rule,value,callback){
                                if(/^1[34578]\d{9}$/.test(value) == false){
                                    callback(new Error("请输入正确的手机号"));
                                }else{
                                    callback();
                                }
                            }, trigger: 'blur'}

                    ]
                },
                dialogFormVisible: false,
                formLabelWidth: '120px',
                tableData: []
            }
        }, methods: {

            sss() {
                console.log(this.roleIds)
            },
            handleClick(row) {
                console.log(row);
            },
            sub() {
                this.$refs.userForm.validate(valid => {
                    if (valid) {
                        this.postRequest("/user/", {
                            account: this.form.account,
                            username: this.form.username,
                            phone: this.form.phone,
                            roles: this.roleIds
                        }).then(resp => {
                            if (resp.data.status == 200) {
                                this.$message.success("添加用户成功！")
                                this.dialogFormVisible = false
                            }
                        })
                    }
                })

            },
            allRoles() {
                this.getRequest("/role/").then(resp => {
                    this.roles = resp.data.obj
                })
            }
        }

    }
</script>

<style scoped>

</style>