import Vue from "vue"
import VueRouter from "vue-router";

Vue.use(VueRouter)

export default new VueRouter({
    model: "history",
    routes: [

        {
            path: "/",
            redirect: "/login"
        },
        {
            path: "/login",
            component: () => import("../Login")
        }, {
            path: "/home",
            component: () => import("../Home")
        }
    ]
})