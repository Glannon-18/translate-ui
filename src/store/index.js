import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)


export default new Vuex.Store({
    state: {
        currentUser: {},
        language: [
            {
                value: 'vi',
                label: '越南语'
            },
            {
                value: 'zh',
                label: '中文'
            },
            {
                value: 'th',
                label: '泰语'
            },
            {
                value: 'en',
                label: '英语'
            },
            {
                value: 'ma',
                label: '马来语'
            },
            {
                value: 'in',
                label: '印尼语'
            },
            {
                value: 'la',
                label: '老挝语'
            },
            {
                value: 'ca',
                label: '柬埔寨语'
            }
        ]
    },
    getters: {},
    mutations: {
        recordLogin(state, user) {
            state.currentUser = user
        },

        clearLogout(state) {
            state.currentUser = {}
        }
    },
    actions: {}

})
