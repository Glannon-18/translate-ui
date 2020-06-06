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
                <div>文档数量统计</div>
                <div>
                    <el-select v-model="second_time" @change="second_change">
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
            <div class="third_head">
                <div>语种调用情况统计</div>
                <div>
                    <el-select v-model="fourth_time" @change="obtain_fourth_all(fourth_time)">
                        <el-option label="24小时" value="24h">
                        </el-option>
                        <el-option label="30天" value="30d">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="fourth_data">
                <div id="pie" style="width: 437px ;height:210px;margin-top: 10px;margin-right: 15px">

                </div>
                <div style="width: 40%;margin-top: 10px">
                    <el-table
                            :data="fourth_tableData"
                            height="210"
                            border
                            tooltip-effect="dark"
                            style="width: 100%"
                    >
                        <el-table-column
                                prop="type"
                                label="类型"
                        >

                        </el-table-column>
                        <el-table-column
                                prop="count"
                                label="数量"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="rate"
                                label="占比"
                        >

                        </el-table-column>
                    </el-table>
                </div>

            </div>
        </div>
    </div>


</template>

<script>
    export default {
        created() {
            this.obtain_first()
            this.obtain_third(this.third_time)
            this.obtain_fourth(this.fourth_time)
        },
        mounted() {
            this.getRequest("/annexe/annexeCountByPeriod", {
                type: this.second_time
            }).then(resp => {
                let data = resp.data.obj
                let x_string = data.x_string
                let txt = data.txt
                let word = data.word
                let eml = data.eml
                let pdf = data.pdf
                this.drawLine(x_string, txt, pdf, word, eml)
            })
            this.getRequest("/annexe_task/getLanguageShare", {
                type: this.fourth_time
            }).then(resp => {
                let data = resp.data.obj
                this.drawpie(data)
            })
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
                fourth_time: "24h",
                tableData: [],
                third_loading: true,
                fourth_tableData: [],
                pie_date: []
            }
        },
        methods: {
            second_change() {
                this.getRequest("/annexe/annexeCountByPeriod", {
                    type: this.second_time
                }).then(resp => {
                    let data = resp.data.obj
                    let x_string = data.x_string
                    let txt = data.txt
                    let word = data.word
                    let eml = data.eml
                    let pdf = data.pdf
                    this.drawLine(x_string, txt, pdf, word, eml)
                })
            },

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

            },

            obtain_fourth(type) {
                this.getRequest("/annexe/getAnnexeCountByType", {
                    type: type
                }).then(resp => {
                    let data = resp.data.obj
                    this.fourth_tableData = data.r
                })
            },

            obtain_fourth_all(type) {
                this.obtain_fourth(type)
                this.getRequest("/annexe_task/getLanguageShare", {
                    type: this.fourth_time
                }).then(resp => {
                    let data = resp.data.obj
                    this.drawpie(data)
                })

            }
            ,
            drawLine(x_string, txt, pdf, word, eml) {
                // 基于准备好的dom，初始化echarts实例
                let myChart = this.$echarts.init(document.getElementById('annexe'))
                // 绘制图表
                let option = {
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
                        data: ['word', 'pdf', "eml", "txt"]
                    },
                    grid: {
                        left: '1%',
                        right: '2%',
                        bottom: '10%',
                        containLabel: true
                    },
                    xAxis: [
                        {
                            type: 'category',
                            boundaryGap: false,
                            // data: ["1", "2", "3", "4", "5"]
                            data: x_string
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
                            // data: ["5", "2", "3", "4", "5"]
                            data: word
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
                            // data: ["0", "0", "1", "1", "0"]
                            data: pdf
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
                            // data: ["0", "1", "1", "2", "5"]
                            data: eml
                        },
                        {
                            name: 'txt',
                            type: 'line',
                            smooth: true,
                            itemStyle: {
                                normal: { // 颜色渐变函数 前四个参数g分别表示四个位置依次为左、下、右、上
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
                            // data: ["0", "0", "0", "1", "3"]
                            data: txt
                        }
                    ]

                }
                myChart.setOption(option)
            },
            drawpie(data) {
                let myChart = this.$echarts.init(document.getElementById('pie'));
                let option = {
                    tooltip: {//提示框，可以在全局也可以在
                        trigger: 'item',  //提示框的样式
                        formatter: "{a} <br/>{b}: {c} ({d}%)",
                        color: '#000', //提示框的背景色
                        textStyle: { //提示的字体样式
                            color: "white",
                        }
                    },
                    series: [
                        {
                            name: '原文语种',
                            type: 'pie', //环形图的type和饼图相同
                            radius: ['50%', '70%'],//饼图的半径，第一个为内半径，第二个为外半径
                            avoidLabelOverlap: false,
                            color: ['#76d8f6', '#f56969', '#a18cff'],
                            label: {
                                normal: {  //正常的样式
                                    show: true,
                                    position: 'left'
                                },
                                emphasis: { //选中时候的样式
                                    show: true,
                                    textStyle: {
                                        fontSize: '20',
                                        fontWeight: 'bold'
                                    }
                                }
                            },  //提示文字
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            data: data
                            //     [
                            //     {value: 335, name: '直接访问'},
                            //     {value: 310, name: '邮件营销'},
                            //     {value: 234, name: '联盟广告'},
                            //
                            // ]
                        }
                    ]
                };
                myChart.setOption(option);
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
        height: 300px;
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

    .fourth_data {
        display: flex;
    }


</style>