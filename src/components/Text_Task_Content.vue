<template>

    <div>
        <div>
            <span>{{name}}</span>
        </div>
        <div style="margin-top: 10px">
            <el-button type="primary" icon="el-icon-download">下载</el-button>
            <el-button type="primary" icon="el-icon-delete">删除</el-button>
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


                // 在 element ui 的 GitHub issue 中搜索了一下，发现 upload 组件确实不支持自动更新 fileList，
                // 如果需要获取fileList，在回调函数里面获取。。。
                fileList: [],

            }
        }
        ,
        methods: {
            handleSelectionChange(val) {
                this.multipleSelection = val;
                console.log(this.multipleSelection)
            },

        }
    }
</script>

<style scoped>

</style>