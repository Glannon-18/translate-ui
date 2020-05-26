<template>
    <div>
        <div style="margin-top: 10px">
            <el-input placeholder="请输入文档名称" v-model="searchWord" @input="query">
                <i slot="prefix" class="el-input__icon el-icon-search"></i>
            </el-input>
        </div>
        <div style="margin-top: 10px">
            <el-menu>
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
        data() {
            return {
                searchWord: ""
            }
        },
        props: ["taskData"],
        methods: {
            query() {
                this.getRequest("/fast_task/listByDate", {name: this.searchWord})
                    .then(resp => {
                        let data = resp.data.obj
                        this.modifyDate(data)
                    })
            },
            modifyDate(data) {
                this.$emit("update:taskData", data)
            }
        }
    }
</script>

<style scoped>

</style>