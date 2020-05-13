<template>
    <div>
        <div class="container" :style="style">
            <div class="login">
                <div class="head">
                    <span>讯飞巴别塔速译系统</span>
                </div>
                <div class="form">
                    <el-form :model="form">
                        <el-form-item>
                            <el-input prefix-icon="el-icon-user" size="medium" placeholder="请输入用户名" v-model="form.username"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-input type="password" prefix-icon="el-icon-lock" size="medium" placeholder="请输入密码" v-model="form.password"
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
    const backImg = require("./assets/img/boris-baldinger-VEkIsvDviSs-unsplash.jpg")

    export default {
        name: "Login",
        data() {
            return {
                form: {
                    username: "",
                    password: ""
                }
            }
        },
        methods: {
            change() {
                console.log(111)
            }
            ,
            login(){
                this.$router.push("/home")
            }
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