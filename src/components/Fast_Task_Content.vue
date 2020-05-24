<template>
    <div>
        <div style="font-size: 18px"><span>{{name}}</span></div>
        <div style="display: flex;justify-content: space-between;margin-top: 10px;margin-bottom: 10px">
            <el-input style="width: 49%"
                      type="textarea" :rows="23"
                      v-model="original"
                      resize="none"
            >
            </el-input>
            <el-input style="width: 49%"
                      type="textarea" :rows="23"
                      v-model="translation"
                      resize="none"
            >
            </el-input>
        </div>
        <el-button type="primary" @click="sub">导出译文</el-button>
    </div>

</template>

<script>
    export default {
        data() {
            return {
                name: "任务名称",
                original: "22222",
                translation: "5555555"
            }
        },

        props: {
            "taskId":{
                type:Number
            },

        },
        name: "Fast_Task_Content",
        methods: {
            sub() {
                console.log(this.taskId)

            }
        }


    }
</script>

<style scoped>

</style>