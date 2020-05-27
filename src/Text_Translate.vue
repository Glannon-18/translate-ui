<template>
    <div style="margin: 10px 20px;width: 100%">
        <el-container>
            <el-aside>
                <div style="display: flex;align-items: center;justify-content: space-between">
                    <div style="font-size: 18px"><i class="el-icon-timer"></i> 历史任务</div>
                    <div>
                        <el-button-group>
                            <el-button type="primary" @click="getFast">快速翻译</el-button>
                            <el-button type="primary" @click="getText">文本翻译</el-button>
                        </el-button-group>
                    </div>
                </div>
                <TaskList :taskData.sync="task_data" :data_type="dataType">
                    <el-button type="primary" v-if="dataType=='text'" style="width: 100%">新建文本任务</el-button>
                </TaskList>
            </el-aside>
            <el-main>
                <router-view></router-view>
            </el-main>

        </el-container>
    </div>
</template>

<script>
    import TaskList from "@/components/TaskList";


    export default {
        name: "Text_Translate",
        data() {
            return {
                task_data: [],
                dataType: ''
            }
        }, methods: {
            getFast() {
                this.dataType = 'fast'
                this.getRequest("/fast_task/listByDate", {name: ""}).then(resp => {
                    this.task_data = resp.data.obj
                })
            },

            getText() {
                this.dataType = 'text'

            }
            // <el-button type="primary" @click="go('/content/text_translate/fast')">快速翻译</el-button>
            // <el-button type="primary" @click="go('/content/text_translate/text')">文本翻译</el-button>

        },
        components: {
            TaskList
        }

    }
</script>

<style scoped>

</style>