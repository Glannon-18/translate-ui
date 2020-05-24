<template>
    <div>

        <div style="display: flex;justify-content: space-between ;align-items: center">
            <div><span>关键词词库</span></div>
            <div style="display: flex">
                <el-button type="primary" icon="el-icon-plus">新建词库</el-button>
                <el-input placeholder="请输入词库名称" style="margin: 0 10px">
                    <i slot="prefix" class="el-input__icon el-icon-search"></i>
                </el-input>
                <el-button type="primary">搜索</el-button>
            </div>
        </div>
        <div style="margin-top: 10px">


            <el-table
                    :data="tableData"
            >
                <el-table-column
                        prop="name"
                        label="词库名称"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="user"
                        label="创建人"
                >
                </el-table-column>
                <el-table-column
                        prop="time"
                        label="创建时间"
                >
                </el-table-column>
                <el-table-column
                        prop="key"
                        label="关键词"
                        width="120">
                </el-table-column>
                <el-table-column
                        fixed="right"
                        label="操作"
                        width="100">
                    <template slot-scope="scope">
                        <el-button @click="handleClick(scope.row)" type="text" size="small">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <el-pagination style="margin-top: 10px"
                    layout="prev, pager, next"
                    :total="50">
            </el-pagination>
        </div>

    </div>
</template>

<script>
    export default {
        name: "Lib",
        data(){
            return{
                tableData: [{
                    name: "dsadasd",
                    user: "ddee",
                    time: "2017-02-06"
                    ,
                    key: "dadasd dsadas"

                }, {
                    name: "dsadasd",
                    user: "ddee",
                    time: "2017-02-06"
                    ,
                    key: "dadasd dsadas"

                }, {
                    name: "dsadasd",
                    user: "ddee",
                    time: "2017-02-06"
                    ,
                    key: "dadasd dsadas"

                }, {
                    name: "dsadasd",
                    user: "ddee",
                    time: "2017-02-06"
                    ,
                    key: "dadasd dsadas"

                }

                ]
            }
        }, methods: {
            handleClick(row) {
                console.log(row);
            }
        }
    }
</script>

<style scoped>

</style>