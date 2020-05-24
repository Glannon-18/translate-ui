<template>
    <div>
        <div style="margin-top: 10px">
            <el-input placeholder="请输入文档名称">
                <i slot="prefix" class="el-input__icon el-icon-search"></i>
            </el-input>
        </div>
        <div style="margin-top: 10px">
            <el-menu>
                <el-submenu v-for="o in taskData" :key="o.date" :index="o.date">
                    <template slot="title">{{o.date}}</template>
                    <el-menu-item v-for="i in o.info" :key="i.id">{{i.name}}</el-menu-item>
                </el-submenu>
            </el-menu>
        </div>
    </div>
</template>

<script>
    export default {
        name: "TaskList",
        props: ["taskData"]
    }
</script>

<style scoped>

</style>