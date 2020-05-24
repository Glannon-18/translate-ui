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
            path: "/content",
            component: () => import("../Content"),
            children: [
                {
                    path: "home",
                    component: () => import("../Home")

                },
                {
                    path: "fast_translate",
                    component: () => import("../Fast_Translate")
                },
                {
                    path: "text_translate",
                    component: () => import("../Text_Translate"),
                    children: [{
                        path: "fast",
                        component: () => import("../components/Fast_Task_Content")

                    }, {
                        path: "text",
                        component: () => import("../components/Text_Task_Content")

                    }
                    ]
                }
                , {
                    path: "system_sanagement",
                    component: () => import("../System_Management"),
                    children: [
                        {
                            path: "lib",
                            component: () => import("../components/Lib")
                        }, {
                            path: "user",
                            component: () => import("../components/User")
                        }
                    ]
                }
            ]
        }
    ]
})