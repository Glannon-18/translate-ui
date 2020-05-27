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
                    <el-button type="primary" v-if="showButton" style="width: 100%" @click="dialogFormVisible=true">
                        新建文本任务
                    </el-button>
                </TaskList>
            </el-aside>
            <el-main>
                <router-view></router-view>
            </el-main>

        </el-container>

        <el-dialog title="新建文本任务" :visible.sync="dialogFormVisible" width="30%">
            <el-form :model="form" ref="form">
                <el-form-item label="任务名称名称" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="选择语种" :label-width="formLabelWidth">
                    <el-select v-model="form.language" placeholder="请选择原文语种">
                        <el-option label="中文" value="zh"></el-option>
                        <el-option label="越南文" value="vi"></el-option>
                        <el-option label="泰文" value="th"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="文件上传" :label-width="formLabelWidth">
                    <el-upload
                            accept=".txt"
                            action="/annexe_task/upload"
                            name="multipartFile"
                            :limit="5"
                            :on-success="uploadSuccess"
                            :on-remove="remove"
                            multiple
                            :auto-upload="true">
                        <el-button size="small" type="primary">点击上传</el-button>
                        <div slot="tip">只能上传txt格式文件</div>
                    </el-upload>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="sub()">确 定</el-button>
            </div>
        </el-dialog>
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
                ,
                showButton: false,
                dialogFormVisible: false,
                form: {
                    name: "",
                    language: "",
                },
                formLabelWidth: '120px',
                rPath: []
            }
        }, methods: {

            sub() {

            },
            getFast() {
                this.dataType = 'fast'
                this.getRequest("/fast_task/listByDate", {name: ""}).then(resp => {
                    this.task_data = resp.data.obj
                    this.showButton = false
                })
            },

            getText() {
                this.dataType = 'text'
                this.getRequest("/annexe_task/listByDate", {name: ""}).then(resp => {
                    this.task_data = resp.data.obj
                    this.showButton = true
                })

            },

            remove(file, fileList) {
                let returnPaths = []
                fileList.forEach(f => {
                    returnPaths.push(f.response.obj)
                })
                this.rPath = returnPaths
                console.log(this.rPath)


            },
            uploadSuccess(response, file, fileList) {
                let returnPaths = []
                fileList.forEach(f => {
                    returnPaths.push(f.response.obj)
                })
                this.rPath = returnPaths
                console.log(this.rPath)
            },
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