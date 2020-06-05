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
            <div class="third_head">
                <div>文档处理数量统计</div>
                <div>
                    <el-select v-model="second_time">
                        <el-option label="24小时" value="24h">

                        </el-option>
                        <el-option label="30天" value="30d">

                        </el-option>
                    </el-select>
                </div>
            </div>

            <div id="annexe" style="height: 100%">

            </div>
        </div>
        <div class="content third">
            <div class="third_head">
                <div>用户使用情况统计</div>
                <div>
                    <el-select v-model="third_time" @change="obtain_third(third_time)">
                        <el-option label="24小时" value="24h">

                        </el-option>
                        <el-option label="30天" value="30d">

                        </el-option>
                    </el-select>
                </div>
            </div>

            <div class="third_data">

                <el-table v-loading="third_loading"
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
            this.obtain_third(this.third_time)
        },

        mounted() {
            this.drawLine()
        },
        name: "Home",
        data() {
            return {
                Au24h: "",
                Au30d: "",
                Ap24h: "",
                Ap30d: "",
                first_loading: true,


                second_time: "24h",


                third_time: "24h",
                tableData: [],
                third_loading: true,

                opinionData: ["3", "2", "4", "4", "5"]
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
            },
            obtain_third(type) {
                this.third_loading = true
                this.getRequest("/annexe_task/getAllInfo", {
                    type: type
                }).then(resp => {
                    let data = resp.data.obj
                    this.tableData = data
                    this.third_loading = false
                })

            }

            ,
            drawLine() {
                // 基于准备好的dom，初始化echarts实例
                let myChart = this.$echarts.init(document.getElementById('annexe'))
                // 绘制图表
                let option={
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                            label: {
                                backgroundColor: '#6a7985'
                            }
                        },
                    },
                    legend: {
                        data: ['word','pdf',"eml","txt"]
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '11%',
                        containLabel: true
                    },
                    xAxis: [
                        {
                            type: 'category',
                            boundaryGap: false,
                            data: ["1","2","3","4","5"]
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value'
                        }
                    ],
                    series: [
                        {
                            name: 'word',
                            type: 'line',
                            smooth: true,
                            itemStyle: {
                                normal: { // 颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
                                    color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                            offset: 0, color: '#81befd' // 0% 处的颜色
                                        }, {
                                            offset: 0.4, color: '#e4f2ff' // 100% 处的颜色
                                        }, {
                                            offset: 1, color: '#ffffff' // 100% 处的颜色
                                        }]
                                    ), // 背景渐变色
                                    lineStyle: { // 系列级个性化折线样式
                                        width: 3,
                                        type: 'solid',
                                        color: '#409eff' // 折线的颜色
                                    }
                                }
                            }, // 线条样式
                            symbolSize: 2,  // 折线点的大小
                            areaStyle: {normal: {}},
                            data:  ["5","2","3","4","5"]
                        },
                        {
                            name: 'pdf',
                            type: 'line',
                            smooth: true,
                            itemStyle: {
                                normal: { // 颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
                                    color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                            offset: 0, color: '#db97ff' // 0% 处的颜色
                                        }, {
                                            offset: 0.4, color: '#f5e4ff' // 100% 处的颜色
                                        }, {
                                            offset: 1, color: '#ffffff' // 100% 处的颜色
                                        }]
                                    ), // 背景渐变色
                                    lineStyle: { // 系列级个性化折线样式
                                        width: 3,
                                        type: 'solid',
                                        color: '#c94cff' // 折线的颜色
                                    }
                                }
                            }, // 线条样式
                            symbolSize: 2,  // 折线点的大小
                            areaStyle: {normal: {}},
                            data:  ["0","0","1","1","0"]
                        },
                        {
                            name: 'eml',
                            type: 'line',
                            smooth: true,
                            itemStyle: {
                                normal: { // 颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
                                    color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                            offset: 0, color: '#ff9797' // 0% 处的颜色
                                        }, {
                                            offset: 0.4, color: '#ffe4e4' // 100% 处的颜色
                                        }, {
                                            offset: 1, color: '#ffffff' // 100% 处的颜色
                                        }]
                                    ), // 背景渐变色
                                    lineStyle: { // 系列级个性化折线样式
                                        width: 3,
                                        type: 'solid',
                                        color: '#fc2d2d' // 折线的颜色
                                    }
                                }
                            }, // 线条样式
                            symbolSize: 2,  // 折线点的大小
                            areaStyle: {normal: {}},
                            data:  ["0","1","1","2","5"]
                        },
                        {
                            name: 'txt',
                            type: 'line',
                            smooth: true,
                            itemStyle: {
                                normal: { // 颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
                                    color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                            offset: 0, color: '#97ffb4' // 0% 处的颜色
                                        }, {
                                            offset: 0.4, color: '#e4fff0' // 100% 处的颜色
                                        }, {
                                            offset: 1, color: '#ffffff' // 100% 处的颜色
                                        }]
                                    ), // 背景渐变色
                                    lineStyle: { // 系列级个性化折线样式
                                        width: 3,
                                        type: 'solid',
                                        color: '#2dfc91' // 折线的颜色
                                    }
                                }
                            }, // 线条样式
                            symbolSize: 2,  // 折线点的大小
                            areaStyle: {normal: {}},
                            data:  ["0","0","0","1","3"]
                        }
                    ]

                }
                myChart.setOption(option)
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