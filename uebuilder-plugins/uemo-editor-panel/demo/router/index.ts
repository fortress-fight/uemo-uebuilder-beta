/*
 * @Description: 路由入口文件
 * @Author: F-Stone
 * @LastEditTime: 2025-05-07 17:22:16
 */
import { createMemoryHistory, createRouter } from "vue-router";

import CurrentView from "./Current.vue";

export default createRouter({
    history: createMemoryHistory(),
    routes: [{ path: "/", component: CurrentView }],
});
