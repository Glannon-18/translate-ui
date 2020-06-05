<template>

    <div class="root">
        <div class="content first" v-loading="first_loading">
            <div class="first_head">
                <div>24小时</div>
                <div>30天</div>
            </div>
            <div class="data">
                <div>文档接入量</div>
                <div>{{Au24h}}</div>
                <div>{{Au30d}}</div>
            </div>
            <div class="data">
                <div>文档处理量</div>
                <div>{{Ap24h}}</div>
                <div>{{Ap30d}}</div>
            </div>
        </div>
        <div class="content">
            222
        </div>
        <div class="content third">
            <div class="third_head">
                <div>用户使用情况统计</div>
                <div>
                    <el-select v-model="third_time">
                        <el-option label="24小时" value="24h">

                        </el-option>
                        <el-option label="30天" value="30d">

                        </el-option>
                    </el-select>
                </div>
            </div>

            <div class="third_data">

                <el-table
                        ref="multipleTable"
                        :data="tableData"
                        height="210"
                        tooltip-effect="dark"
                        style="width: 100%"
                    >
                    <el-table-column
                            prop="username"
                            label="用户名"
                    >

                    </el-table-column>
                    <el-table-column
                            prop="task_count"
                            label="任务总数"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="annexe_count"
                            label="翻译文档数"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="most_use_language"
                            label="常用语种"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="last_use_language"
                            label="最近使用语种"
                    >
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <div class="content">
            5566
        </div>
    </div>


</template>

<script>
    export default {
        created() {
            this.obtain_first()
        },
        name: "Home",
        data() {
            return {
                Au24h: "",
                Au30d: "",
                Ap24h: "",
                Ap30d: "",
                first_loading: true,


                third_time: "24h",
                tableData: [
                    {
                        username:"dsd",
                        task_count:100,
                        annexe_count:500,
                        most_use_language:"越南语",
                        last_use_language:"中文"

                    },
                    {
                        username:"dsd",
                        task_count:100,
                        annexe_count:500,
                        most_use_language:"越南语",
                        last_use_language:"中文"

                    }, {
                        username:"dsd",
                        task_count:100,
                        annexe_count:500,
                        most_use_language:"越南语",
                        last_use_language:"中文"

                    }, {
                        username:"dsd",
                        task_count:100,
                        annexe_count:500,
                        most_use_language:"越南语",
                        last_use_language:"中文"

                    }, {
                        username:"dsd",
                        task_count:100,
                        annexe_count:500,
                        most_use_language:"越南语",
                        last_use_language:"中文"

                    }, {
                        username:"dsd",
                        task_count:100,
                        annexe_count:500,
                        most_use_language:"越南语",
                        last_use_language:"中文"

                    }
                ]
            }
        },
        methods: {
            obtain_first() {
                this.getRequest("/annexe/annexeStatus").then(
                    resp => {
                        let data = resp.data.obj
                        this.Au24h = data.Au24h
                        this.Au30d = data.Au30d
                        this.Ap24h = data.Ap24h
                        this.Ap30d = data.Ap30d
                        this.first_loading = false
                    }
                )
            }
        }

    }
</script>

<style scoped>
    .root {
        width: 100%;
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
    }

    .content {
        height: 250px;
        box-shadow: 2px 2px 10px #9090905c;
        border-radius: 5px;
        padding: 7px;
        width: 47%;
        margin-top: 10px;
    }

    .first {
        display: flex;
        flex-direction: column;
    }

    .first_head {
        flex-grow: 1;
        display: flex;
        justify-content: space-evenly;
    }

    .data {
        display: flex;
        flex-grow: 1;
    }

    .data div {
        width: 210px;
    }

    .third_head {
        display: flex;
        justify-content: space-between;
    }

    .third_data {

    }


</style>