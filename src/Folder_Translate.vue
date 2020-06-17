<template>
    <div style="width:100%;display: flex;justify-content: center;margin-top: 30px">
        <el-form :model="form" ref="form" :rules="rules">
            <el-form-item label="源文件夹地址" :label-width="formLabelWidth" prop="source_folder">
                <el-input v-model="form.source_folder" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="目标文件夹地址" :label-width="formLabelWidth" prop="target_folder">
                <el-input v-model="form.target_folder" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="源语言" :label-width="formLabelWidth" prop="source_language">
                <el-select v-model="form.source_language" placeholder="请选择源语言">
                    <el-option label="越南文中文" value="zh"></el-option>
                    <el-option label="" value="vi"></el-option>
                    <el-option label="泰文" value="th"></el-option>
                    <el-option label="英文" value="en"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="目标语言" :label-width="formLabelWidth" prop="target_language">
                <el-select v-model="form.target_language" placeholder="请选择目标语言">
                    <el-option label="中文" value="zh"></el-option>
                    <el-option label="越南文" value="vi"></el-option>
                    <el-option label="泰文" value="th"></el-option>
                    <el-option label="英文" value="en"></el-option>
                </el-select>
            </el-form-item>
            <el-button type="primary" @click="translate">翻译</el-button>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: "Folder_Translate",
        data() {
            return {
                form: {
                    source_folder: "",
                    target_folder: "",
                    source_language: "",
                    target_language: ""
                }
                ,
                rules: {
                    source_folder: [{required: true, message: '请输入输入文件夹', trigger: 'blur'}],
                    target_folder: [{required: true, message: '请输入输出文件夹', trigger: 'blur'}],
                    source_language: [{required: true, message: '请选择源语言', trigger: 'blur'}],
                    target_language: [{required: true, message: '请选择目标语言', trigger: 'blur'}],

                }
                , formLabelWidth: '150px',

            }
        },
        methods: {
            translate() {
                this.$refs.form.validate(valid => {
                    if (valid) {
                        console.log(1111)

                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>
