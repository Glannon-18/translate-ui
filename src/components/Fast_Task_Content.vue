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
<!--        <el-button type="primary" @click="sub">导出译文</el-button>-->
    </div>

</template>

<script>
    export default {

        data() {
            return {
                name: "",
                original: "",
                translation: ""
            }
        },

        props: {
            "taskId": {
                type: Number
            },

        },
        name: "Fast_Task_Content",
        methods: {
            sub() {
                console.log(this.taskId)

            }
            ,
            queryById(id) {
                this.getRequest(`/fast_task/${id}`).then(resp => {
                    let {name, original_text, translate_text} = resp.data.obj
                    this.name = name
                    this.original = original_text
                    this.translation = translate_text
                })
            }
        },
        created() {
            let id = this.$route.params.id
            this.queryById(id)
        },

        beforeRouteUpdate(to, from, next) {
            let id = to.params.id
            this.queryById(id)
            next()
        }
    }
</script>

<style scoped>

</style>
