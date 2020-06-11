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
    </div>
</template>

<script>
    export default {
        name: "Annexe_Content",
        created() {
            this.getAnnexe()
        },
        data() {
            return {
                name: "11111",
                original: "",
                translation: ""
            }
        }
        ,
        methods: {
            getAnnexe() {
                let id = this.$route.params.id
                this.getRequest("/annexe/" + id).then(resp => {
                    let data = resp.data.obj
                    this.name = data.name;
                    this.original = data.original_text
                    this.translation = data.translate_text
                })
            }
        }
    }
</script>

<style scoped>

</style>