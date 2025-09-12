/*
 * @Description: 路由配置
 * @Author: F-Stone
 * @LastEditTime: 2025-07-31 13:03:32
 */

import { createRouter, createWebHashHistory } from "vue-router";
import UebuilderToolsStorehouse from "@/router/home-views/Main.vue";

export default createRouter({
    history: createWebHashHistory(),

    routes: [
        {
            path: "/",
            component: UebuilderToolsStorehouse,
            children: [
                { path: "", name: "home", component: () => import("@/router/home-views/EntryView.vue") },
                { path: "my-pages", name: "myPage", component: () => import("@/router/home-views/UserPageView.vue") },
                {
                    path: "my-collect",
                    name: "myCollect",
                    component: () => import("@/router/home-views/UserCollectView.vue"),
                },
            ],
        },
    ],
});

// { path: "my-pages", name: "myPage", component: StorehouseMyPages },
