<template>
    <div>
        <div class="container" :style="style">
            <div class="login">
                <div class="head">
                    <span>讯飞巴别塔速译系统</span>
                </div>
                <div class="form">
                    <el-form :model="form" ref="loginForm" :rules="rules">
                        <el-form-item prop="username">
                            <el-input prefix-icon="el-icon-user" size="medium" placeholder="请输入用户名"
                                      v-model="form.username"></el-input>
                        </el-form-item>
                        <el-form-item prop="password">
                            <el-input type="password" prefix-icon="el-icon-lock" size="medium" placeholder="请输入密码"
                                      v-model="form.password" @keyup.enter.native="login"
                                      show-password></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" size="medium" style="width: 100%" @click="login">登陆</el-button>
                        </el-form-item>
                    </el-form>
                </div>

            </div>

        </div>
    </div>
</template>

<script>

    import {mapMutations} from 'vuex'

    const backImg = require("./assets/img/login.jpg")

    export default {
        name: "Login",
        data() {
            return {
                loading: false,
                form: {
                    username: "",
                    password: ""
                },
                rules: {
                    username: [{required: true, message: '请输入用户名', trigger: 'blur'}],
                    password: [{required: true, message: '请输入密码', trigger: 'blur'}],
                }
            }
        },
        methods: {
            login() {
                this.$refs.loginForm.validate(valid => {
                    if (valid) {
                        this.loading = true
                        this.postRequest("/doLogin", {
                            username: this.form.username,
                            password: this.form.password
                        }).then(response => {
                            if (response) {
                                if (response.data.status == 500) {
                                    this.$message.error(response.data.msg)
                                } else {
                                    this.recordLogin(response.data.obj)
                                    this.$router.replace("/content")
                                }
                            }
                        })
                    } else {
                        console.log("未通过验证！")
                        return;
                    }
                })
            },

            ...mapMutations(['recordLogin'])

        },
        computed: {
            style: () => ({
                background: `url(${backImg}) no-repeat center`,
                backgroundSize: `cover`
            })
        }
    }
</script>

<style scoped>
    .container {
        height: 100vh;
        display: flex;
        justify-content: center;
    }

    .login {
        width: 328px;
        padding: 80px 0;
        display: flex;
        flex-direction: column;
    }

    .head {
        margin: 50px 0;
        text-align: center;
        line-height: 44px;
        font-size: 33px;
        color: #ffffff;
        font-family: 'Myriad Pro', 'Helvetica Neue', Arial, Helvetica, sans-serif;
        font-weight: 600;
    }

</style>