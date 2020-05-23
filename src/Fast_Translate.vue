<template>
    <div class="ft">
        <el-row>
            <el-col :span="12" style="display: flex;justify-content: space-between">
                <el-select v-model="language" placeholder="请选择原文语言" @change="logChange">
                    <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
                <el-button type="primary">翻译</el-button>
            </el-col>

        </el-row>
        <el-row style="margin-top: 10px" :gutter="20">
            <el-col :span="12">

                <el-input
                        type="textarea" :rows="13"
                        placeholder="输入或者粘贴文本进行翻译，最多支持3000字符"
                        v-model="original"
                        maxlength="3000"
                        show-word-limit
                        resize="none"
                >
                </el-input>
            </el-col>
            <el-col :span="12">
                <el-input :rows="13"
                          type="textarea"
                          v-model="translation"
                          maxlength="3000"
                          show-word-limit
                          resize="none"
                >
                </el-input>
            </el-col>
        </el-row>

        <el-row style="margin-top: 10px">

            <el-col :span="4">历史记录</el-col>
            <el-col :span="20" style="display: flex;justify-content: flex-end">
                <el-button type="primary" icon="el-icon-arrow-down" @click="show_more">隐藏</el-button>
                <el-button type="primary" icon="el-icon-more" >查看更多</el-button>
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
                            prop="original"
                            label="原文"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="translation"
                            label="译文"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="original_language"
                            label="原文语种"
                            width="120">
                    </el-table-column>
                </el-table>
            </el-col>

        </el-row>
        </transition>
    </div>
</template>

<script>
    export default {
        name: "Fast_Translate",
        data() {
            return {
                options: [{
                    value: 'zh',
                    label: '英文'
                }, {
                    value: 'vi',
                    label: '越南文'
                }, {
                    value: 'th',
                    label: '泰语'
                }],
                language: '',
                original: '',
                translation: '',
                history_show: false,
                history: [
                    {
                        name: "任务1",
                        original: "大萨达所大多",
                        translation: "sdsadasdasdsa",
                        original_language: "英文"
                    }, {
                        name: "任务2",
                        original: "大萨达所大多",
                        translation: "sdsadasdasdsa",
                        original_language: "英文"
                    }, {
                        name: "任务3",
                        original: "大萨达所大多",
                        translation: "sdsadasdasdsa",
                        original_language: "英文"
                    }, {
                        name: "任务4",
                        original: "大萨达所大多",
                        translation: "sdsadasdasdsa",
                        original_language: "英文"
                    }, {
                        name: "任务5",
                        original: "大萨达所大多",
                        translation: "sdsadasdasdsa",
                        original_language: "英文"
                    }
                ]
            }
        }
        ,
        methods: {
            logChange() {
                console.log(this.language)

            },
            show_more() {
                this.history_show = !this.history_show
                // console.log(event.target)

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