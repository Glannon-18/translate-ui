<template>
    <div class="homeHeader">
        <div class="name">
            巴别塔讯飞速译系统
        </div>
        <div style="display: flex;justify-content: center;align-items: center">
            <el-menu :default-active="activeIndex" mode="horizontal" background-color="#409eff"
                     text-color="#fff">
                <el-menu-item index="1">首页</el-menu-item>
                <el-menu-item index="2">快速翻译</el-menu-item>
                <el-menu-item index="3">文本翻译</el-menu-item>
                <el-menu-item index="4">系统管理</el-menu-item>
            </el-menu>
            <div class="face" style="display: inherit;align-items: inherit">
                <a href="#">
                    <!--                            todo 把头像和用户名提取到vuex管理-->
                    <el-avatar shape="circle" size="large"
                               src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"></el-avatar>
                </a>
                <div style="margin-left: 10px"><a href="#" style="color: white;">admin</a></div>
                <div style="margin-left: 10px"><a href="#"><i class="el-icon-switch-button"
                                                              style="font-size: 30px"></i> </a></div>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: "Head",
        data() {
            return {
                activeIndex: "1"
            }
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