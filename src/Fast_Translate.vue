<template>
    <div class="ft">
        <el-row>
            <el-col :span="12" style="display: flex;justify-content: space-between">
                <div>
                    <el-select v-model="language_ori" placeholder="请选择原文" style="margin-right: 10px">
                        <el-option
                                v-for="item in language"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>

                    <el-select v-model="language_tra" placeholder="请选择译文" style="margin-right: 10px">
                        <el-option
                                v-for="item in language"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <el-button type="primary" @click="translate" :loading="translate_loading">翻译</el-button>
            </el-col>
            <el-col :span="12" style="display: flex;justify-content: flex-end">
                <el-button type="primary" icon="el-icon-document-copy" @click="copy(translation)">复制</el-button>
                <el-button type="primary" icon="el-icon-upload2" @click="export_txt">导出</el-button>
            </el-col>

        </el-row>
        <el-row style="margin-top: 10px" :gutter="20">
            <el-col :span="12">

                <el-input
                        type="textarea" :rows="13"
                        style="text-align:right"
                        placeholder="输入或者粘贴文本进行翻译"
                        v-model="original"
                        maxlength="10000"
                        show-word-limit
                        resize="none"
                >
                </el-input>
            </el-col>
            <el-col :span="12">
                <el-input :rows="13"
                          type="textarea"
                          v-model="translation"
                          maxlength="1500"
                          show-word-limit
                          resize="none" readonly
                >
                </el-input>
            </el-col>
        </el-row>

        <el-row style="margin-top: 10px">

            <el-col :span="4">历史记录</el-col>
            <el-col :span="20" style="display: flex;justify-content: flex-end">
                <el-button type="primary" icon="el-icon-arrow-down" @click="show_more">隐藏</el-button>
                <!--                <el-button type="primary" icon="el-icon-more">查看更多</el-button>-->
            </el-col>
        </el-row>
        <transition name="el-zoom-in-top">
            <el-row style="margin-top: 10px" v-show="history_show">
                <el-col :span="24">
                    <el-table
                            :data="history"
                    >
                        <el-table-column
                                prop="name"
                                label="任务名称"
                                width="120">
                        </el-table-column>
                        <el-table-column
                                prop="original_text"
                                label="原文"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="translate_text"
                                label="译文"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="original_language_zh"
                                label="原文语种"
                                width="120">
                        </el-table-column>
                        <el-table-column
                                prop="translate_language_zh"
                                label="译文语种"
                                width="120">
                        </el-table-column>

                    </el-table>
                </el-col>

            </el-row>
        </transition>
    </div>
</template>

<script>

    import axios from "axios"
    import { mapState } from "vuex";

    export default {
        name: "Fast_Translate",
        created() {
            this.getRequest("/fast_task/",).then(resp => {
                this.history = resp.data.obj
            })
        },
        data() {
            return {
                language_ori: '',
                language_tra: '',
                original: '',
                translation: '',
                history_show: false,
                history: [],
                translate_loading: false,
            }
        },
        computed:{
            ...mapState(['language'])

        }
        ,
        methods: {
            export_txt() {
                if (this.translation.trim().length == 0) {
                    this.$message.warning("没有文本可以下载!")
                    return
                }
                axios({
                    method: 'post',
                    url: '/fast_task/export',
                    data: {
                        translate: this.translation.trim(),
                    },
                    responseType: 'blob'
                }).then(response => {
                    this.download(response.data)
                }).catch((error) => {
                    console.log(error)
                })
            },
            show_more() {
                this.history_show = !this.history_show
            }
            ,
            translate() {
                if (this.language_ori.trim() == '' || this.original.trim() == '') {
                    this.$message.warning("请选择语言并且输入原文")
                    return
                }
                this.translate_loading = true
                this.postKeyValueRequest("/fast_task/translate", {
                    text: this.original,
                    tgtLang: this.language_tra,
                    srcLang: this.language_ori,
                }).then(data => {
                    this.translation = data.data.obj.tr
                    return this.postRequest('/fast_task/', {
                        original_text: this.original,
                        translate_text: this.translation,
                        original_language: this.language_ori,
                        translate_language: this.language_tra,
                    })
                }).then(() => {
                    this.translate_loading = false
                    return this.getRequest("/fast_task/", {})
                }).then(resp => {
                    this.history = resp.data.obj
                }).catch(() => {
                    this.translate_loading = false
                })

            },
            // 下载文件
            download(data) {
                if (!data) {
                    return
                }
                let url = window.URL.createObjectURL(new Blob([data]))
                let link = document.createElement('a')
                link.style.display = 'none'
                link.href = url
                link.setAttribute('download', 'translation.txt')
                document.body.appendChild(link)
                link.click()
            },
            copy(data) {
                let url = data
                let oInput = document.createElement('input')
                oInput.value = url
                document.body.appendChild(oInput)
                oInput.select() // 选择对象
                document.execCommand("Copy") // 执行浏览器复制命令
                this.$message({
                    message: '复制成功',
                    type: 'success'
                })
                oInput.remove()
            }

        }
    }
</script>

<style scoped>
    .ft {
        width: 100%;
        padding: 10px 20px;
    }
</style>
