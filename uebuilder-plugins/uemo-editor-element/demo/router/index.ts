/*
 * @Description: 路由入口文件
 * @Author: F-Stone
 * @LastEditTime: 2024-11-27 14:20:25
 */
import { createMemoryHistory, createRouter } from "vue-router";

import CurrentView from "./Current.vue";

export default createRouter({
    history: createMemoryHistory(),
    routes: [
        { path: "/", component: CurrentView },
        { path: "/editor-unit", component: CurrentView },
        { path: "/editor-panel", component: CurrentView },
    ],
});
