import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)


export default new Vuex.Store({
    state: {
        // 把头像和用户名提取到vuex管理
        currentUser: {},
    },
    getters: {},
    mutations: {
        recordLogin(state, user) {
            // console.log("recordLogin调用")
            state.currentUser = user
        },

        clearLogout(state) {
            state.currentUser = {}
        }
    },
    actions: {}

})
