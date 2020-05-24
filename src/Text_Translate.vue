<template>
    <div style="margin: 10px 20px;width: 100%">
        <el-container>
            <el-aside>
                <div style="display: flex;align-items: center;justify-content: space-between">
                    <div style="font-size: 18px"><i class="el-icon-timer"></i> 历史任务</div>
                    <div>
                        <el-button-group>
                            <el-button type="primary">快速翻译</el-button>
                            <el-button type="primary">文本翻译</el-button>
                        </el-button-group>
                    </div>
                </div>
                <div style="margin-top: 10px">
                    <el-input placeholder="请输入文档名称">
                        <i slot="prefix" class="el-input__icon el-icon-search"></i>
                    </el-input>
                </div>

                <div style="margin-top: 10px">
                    <TaskList :taskData="task_data"></TaskList>
                </div>
            </el-aside>
            <el-main>
                <div style="font-size: 18px"><span>{{currentTask.name}}</span></div>
                <div>
                    
                </div>
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

                task_data: [{
                    date: "2010-02-05",
                    info: [{
                        id: 1,
                        name: "asddad5"
                    }, {
                        id: 2,
                        name: "dsada5"
                    }, {
                        id: 3,
                        name: "asdasdasdddad5"
                    }]
                }, {
                    date: "2010-02-06",
                    info: [{
                        id: 4,
                        name: "asddad6"
                    }, {
                        id: 5,
                        name: "dsada6"
                    }, {
                        id: 6,
                        name: "asdasdasdddad6"
                    }]
                }, {
                    date: "2010-02-07",
                    info: [{
                        id: 7,
                        name: "asddad7"
                    }, {
                        id: 8,
                        name: "dsada7"
                    }, {
                        id: 9,
                        name: "asdasdasdddad7"
                    }]
                }

                ],
                currentTask: {
                    name: "当前展示的任务名称",
                    original: "你好，世界！",
                    translation: "Hellow，word！",
                }
            }
        },
        components: {
            TaskList
        }
    }
</script>

<style scoped>

</style>