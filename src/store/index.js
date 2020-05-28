import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)


export default new Vuex.Store({
    state: {
        // 把头像和用户名提取到vuex管理
        currentUser: {},
        language: {
            "zh": "中文",
            "en": "英文",
            "vi": "越南文",
            "th": "泰文",
        }
    },
    getters: {},
    mutations: {

        recordLogin(state, user) {
            // console.log("recordLogin调用")
            state.currentUser = user
            console.log(this.state.currentUser)
        },

        clearLogout(state) {
            state.currentUser = {}
        }

    },
    actions: {}

})
