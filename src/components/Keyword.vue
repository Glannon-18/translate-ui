<template>

    <div>
        <div class="libInfo">
            <div>词库名称：{{$route.params.libName}}</div>
            <div>创建人：{{$route.params.libCreator}}</div>
            <div>创建时间：{{$route.params.libCreateTime}}</div>
        </div>
        <div style="margin-top: 40px">

            <el-tag size="medium"
                    :key="tag.id"
                    v-for="tag in dynamicTags"
                    closable
                    :disable-transitions="false"
                    @close="handleClose(tag)">
                {{tag.word}}
            </el-tag>
            <el-input
                    class="input-new-tag"
                    v-if="inputVisible"
                    v-model="inputValue"
                    ref="saveTagInput"
                    size="small"
                    @keyup.enter.native="handleInputConfirm"
                    @keyup.esc.native="esc"
                    @blur="handleInputConfirm"
            >
            </el-input>
            <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Keyword",
        created() {
            this.queryAll()
        },
        data() {
            return {
                libId: this.$route.params.libId,
                dynamicTags: [],
                inputVisible: false,
                inputValue: ''
            };
        },
        methods: {
            esc() {
                this.inputVisible = false;
                this.inputValue = '';
            },

            handleClose(tag) {
                this.deleteRequest(`/keyword/${tag.id}`).then(() => {
                    this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
                })
            },

            showInput() {
                console.log(this.libId)
                this.inputVisible = true;
                this.$nextTick(() => {
                    console.log(this.$refs.saveTagInput)
                    this.$refs.saveTagInput.focus();
                });
            },

            handleInputConfirm() {
                let inputValue = this.inputValue;
                if (!inputValue.trim() == '') {
                    this.postKeyValueRequest("/keyword/", {
                        lib: this.libId,
                        content: inputValue
                    }).then(resp => {
                        this.dynamicTags.push({id: resp.data.obj.id, word: resp.data.obj.word});

                    })
                }
                this.inputVisible = false;
                this.inputValue = '';


            },
            queryAll() {
                this.getRequest("/keyword/", {
                    lid: this.$route.params.libId
                }).then(resp => {
                    this.dynamicTags = resp.data.obj
                })
            }
        }
    }
</script>

<style scoped>
    .libInfo {
        display: flex;
        justify-content: space-between;
    }

    .input-new-tag {
        width: 90px;
        margin-left: 10px;
        vertical-align: bottom;
    }

    .el-tag + .el-tag {
        margin: 8px 8px;
    }

    .button-new-tag {
        margin-left: 10px;
        height: 32px;
        line-height: 30px;
        padding-top: 0;
        padding-bottom: 0;
    }

</style>