<template>
    <div style="width: 100%;margin: 10px 20px">
        <el-container>
            <el-aside>
                <el-menu router>
                    <el-menu-item index="/content/system_sanagement/lib">
                        <span slot="title">词库管理</span>
                    </el-menu-item>
                    <el-menu-item index="/content/system_sanagement/user">
                        <span slot="title">用户管理</span>
                    </el-menu-item>
                </el-menu>
            </el-aside>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </div>
</template>

<script>


    export default {
        name: "System_Management",
        data() {
            return {
                searchValue: ""

            }
        }
    }
</script>

<style scoped>

</style>