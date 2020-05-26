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
                <TaskList :taskData.sync="task_data" ></TaskList>
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
                task_data: [
                    //     {
                    //     date: "2010-02-05",
                    //     info: [{
                    //         id: 1,
                    //         name: "asddad5"
                    //     }, {
                    //         id: 2,
                    //         name: "dsada5"
                    //     }, {
                    //         id: 3,
                    //         name: "asdasdasdddad5"
                    //     }]
                    // }

                ],
                currentTask: {
                    name: "当前展示的任务名称",
                    original: "你好，世界！",
                    translation: "Hello，word！",
                }
            }
        }, methods: {
            getFast() {
                this.getRequest("/fast_task/listByDate", {name: ""}).then(resp => {
                    this.task_data = resp.data.obj
                })
            },

            getText() {

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