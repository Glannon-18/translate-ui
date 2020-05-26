<template>
    <div>
        <div style="margin-top: 10px">
            <el-input placeholder="请输入文档名称">
                <i slot="prefix" class="el-input__icon el-icon-search"></i>
            </el-input>
        </div>
        <div style="margin-top: 10px">
            <el-menu unique-opened>
                <el-submenu v-for="(value,key) in taskData" :key="key" :index="key">
                    <template slot="title">{{key}}</template>
                    <el-menu-item v-for="i in value" :key="i.id">{{i.name}}</el-menu-item>
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