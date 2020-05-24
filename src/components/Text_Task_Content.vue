<template>

    <div>
        <div>
            <span>{{name}}</span>
        </div>
        <div style="margin-top: 10px">
            <el-button type="primary" icon="el-icon-download">下载</el-button>
            <el-button type="primary" icon="el-icon-delete">删除</el-button>
            <el-button type="primary" icon="el-icon-plus" @click="showAdd">新建任务</el-button>
        </div>
        <div style="margin-top: 10px">
            <el-table
                    ref="multipleTable"
                    :data="tableData"
                    tooltip-effect="dark"
                    style="width: 100%"
                    @selection-change="handleSelectionChange"
            >
                <el-table-column
                        type="selection"
                        width="55">
                </el-table-column>
                <el-table-column
                        prop="docName"
                        label="文档名称"
                >

                </el-table-column>
                <el-table-column
                        prop="status"
                        label="状态"
                >
                </el-table-column>
                <el-table-column
                        prop="original_language"
                        label="原文语种"
                >
                </el-table-column>
                <el-table-column
                        prop="hit"
                        label="命中关键词"
                >
                </el-table-column>
            </el-table>

            <el-pagination style="margin-top: 15px"
                           layout="prev, pager, next"
                           :total="100">
            </el-pagination>

        </div>


        <el-dialog title="新建文本任务" :visible.sync="dialogFormVisible">
            <el-form :model="form">
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
                            action=""
                            :limit="3"
                            :on-change="fileChange"
                            :file-list="form.fileList" multiple
                            :auto-upload="false">
                        <el-button size="small" type="primary">点击上传</el-button>
                        <div slot="tip">只能上传txt格式文件</div>
                    </el-upload>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "Text_Task_Content"
        ,
        data() {
            return {
                name: "这是一个文本翻译任务",
                tableData: [

                    {
                        id: 1,
                        docName: "dasda",
                        status: "处理成功"
                        ,
                        original_language: "英文"
                        ,
                        hit: "未命中"
                    }, {
                        id: 1,
                        docName: "dasda",
                        status: "处理成功"
                        ,
                        original_language: "英文"
                        ,
                        hit: "未命中"
                    }, {
                        id: 2,
                        docName: "dasda",
                        status: "处理成功"
                        ,
                        original_language: "英文"
                        ,
                        hit: "未命中"
                    }, {
                        id: 3,
                        docName: "dasda",
                        status: "处理成功"
                        ,
                        original_language: "英文"
                        ,
                        hit: "未命中"
                    }, {
                        id: 4,
                        docName: "dasda",
                        status: "处理成功"
                        ,
                        original_language: "英文"
                        ,
                        hit: "未命中"
                    }, {
                        id: 5,
                        docName: "dasda",
                        status: "处理成功"
                        ,
                        original_language: "英文"
                        ,
                        hit: "未命中"
                    }
                ],
                multipleSelection: [],
                dialogFormVisible: false,

                form: {
                    name: "",
                    language: "",

                },
                // 在 element ui 的 GitHub issue 中搜索了一下，发现 upload 组件确实不支持自动更新 fileList，
                // 如果需要获取fileList，在回调函数里面获取。。。
                fileList: [],
                formLabelWidth: '120px'
            }
        }
        ,
        methods: {
            handleSelectionChange(val) {
                this.multipleSelection = val;
                console.log(this.multipleSelection)
            },
            showAdd() {
                this.dialogFormVisible = true
            },

            fileChange(file, fileList) {
                console.log('change')
                console.log(file)
                this.form.file = file.raw
                console.log(this.form.file)
                console.log(fileList)
            }
        }
    }
</script>

<style scoped>

</style>