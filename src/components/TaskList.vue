<template>
    <el-menu>
        <el-submenu v-for="o in taskData" :key="o.date" :index="o.date">
            <template slot="title">{{o.date}}</template>
            <el-menu-item v-for="i in o.info" :key="i.id">{{i.name}}</el-menu-item>
        </el-submenu>
    </el-menu>
</template>

<script>
    export default {
        name: "TaskList",
        props: ["taskData"]

    }
</script>

<style scoped>

</style>