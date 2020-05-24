<template>
    <div>

        <div style="display: flex;justify-content: space-between ;align-items: center">
            <div><span>用户管理</span></div>
            <div style="display: flex">
                <el-button type="primary" icon="el-icon-plus">新建用户</el-button>
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
                        prop="account"
                        label="用户名"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="username"
                        label="姓名"
                >
                </el-table-column>
                <el-table-column
                        prop="phone"
                        label="电话"
                >
                </el-table-column>
                <el-table-column
                        prop="time"
                        label="创建时间"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="roles"
                        label="角色"
                        width="120">
                </el-table-column>
                <el-table-column
                        fixed="right"
                        label="操作"
                        width="100">
                    <template slot-scope="scope">
                        <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
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
        name: "user",
        data(){
            return{
                tableData:[{
                    id:1,
                    account:"dadasd",
                    username:"dasdas",
                    phone:"785477878"
                    ,
                    time:"2017-09-08"
                    ,
                    roles:"fsdf fsfs"
                    ,

                }

                ,{
                        id:2,
                        account:"dadasd",
                        username:"dasdas",
                        phone:"785477878"
                        ,
                        time:"2017-09-08"
                        ,
                        roles:"fsdf fsfs"
                        ,

                    },{
                        id:3,
                        account:"dadasd",
                        username:"dasdas",
                        phone:"785477878"
                        ,
                        time:"2017-09-08"
                        ,
                        roles:"fsdf fsfs"
                        ,

                    },{
                        id:4,
                        account:"dadasd",
                        username:"dasdas",
                        phone:"785477878"
                        ,
                        time:"2017-09-08"
                        ,
                        roles:"fsdf fsfs"
                        ,

                    },{
                        id:5,
                        account:"dadasd",
                        username:"dasdas",
                        phone:"785477878"
                        ,
                        time:"2017-09-08"
                        ,
                        roles:"fsdf fsfs"
                        ,

                    },{
                        id:6,
                        account:"dadasd",
                        username:"dasdas",
                        phone:"785477878"
                        ,
                        time:"2017-09-08"
                        ,
                        roles:"fsdf fsfs"
                        ,

                    }]
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