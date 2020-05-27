<template>
    <div>
        <div style="margin-top: 10px">
            <el-input placeholder="请输入文档名称" v-model="searchWord" @input="query">
                <i slot="prefix" class="el-input__icon el-icon-search"></i>
            </el-input>
        </div>
        <div style="margin-top: 10px">
            <el-menu router>
                <el-submenu v-for="(value,key) in taskData" :key="key" :index="key">
                    <template slot="title">{{key}}</template>
                    <el-menu-item v-for="i in value" :key="i.id" :index="'/content/text_translate/fast/'+i.id">
                        {{i.name}}
                    </el-menu-item>
                </el-submenu>
            </el-menu>
        </div>
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "TaskList",
        data() {
            return {
                searchWord: "",
            }
        },
        props: ["taskData", "data_type"],
        computed: {
            getType() {
                return this.data_type
            }
        },
        methods: {
            query() {
                this.type = this.data_type
                if (this.getType == 'fast') {
                    console.log(this.type)
                    this.getRequest("/fast_task/listByDate", {name: this.searchWord})
                        .then(resp => {
                            let data = resp.data.obj
                            this.modifyDate(data)
                        })
                }
                // else if (this.type == 'text') {
                //
                // }

            },
            modifyDate(data) {
                this.$emit("update:taskData", data)
            },
            // showDetail() {
            //
            //     this.$router.push("/content/text_translate/fast")
            // }
        }
    }
</script>

<style scoped>

</style>