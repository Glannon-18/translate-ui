<template>
    <div class="homeHeader">
        <div class="name">
            译畅速译系统
        </div>
        <div style="display: flex;justify-content: center;align-items: center">
            <el-menu :default-active="activeIndex" mode="horizontal" background-color="#409eff"
                     text-color="#fff" router>
                <el-menu-item index='/content/home'>首页</el-menu-item>
                <el-menu-item index='/content/fast_translate'>快速翻译</el-menu-item>
                <el-menu-item index='/content/text_translate'>文本翻译</el-menu-item>
<!--                <el-menu-item index='/content/folder_translate'>文件夹翻译</el-menu-item>-->
                <el-menu-item index='/content/system_management'>系统管理</el-menu-item>
            </el-menu>
            <div class="face" style="display: inherit;align-items: inherit">
                <a href="#">
                    <el-avatar shape="circle" size="large"
                               src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"></el-avatar>
                </a>
                <div style="margin-left: 10px"><a href="#" style="color: white;">{{$store.state.currentUser.name}}</a></div>
                <div style="margin-left: 10px"><a href="#" @click="logout"><i class="el-icon-switch-button"
                                                                              style="font-size: 18px"></i> </a></div>
            </div>
        </div>

    </div>
</template>

<script>

    import {mapMutations} from 'vuex'

    export default {
        name: "Head",

        data() {
            return {
                activeIndex: "/content/home"
            }
        },
        methods: {
            logout() {
                this.getRequest("/logout").then(() => {
                        this.clearLogout()
                        this.$router.replace("/")
                })
            },
            ...mapMutations(["clearLogout"])

        }

    }
</script>

<style scoped>
    .homeHeader {

        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .name {
        font-size: 30px;
        color: #ffffff;
    }
</style>
