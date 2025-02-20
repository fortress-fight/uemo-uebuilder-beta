/*
 * @Description: 路由入口文件
 * @Author: F-Stone
 * @LastEditTime: 2025-02-20 16:01:00
 */
import { createMemoryHistory, createRouter } from "vue-router";

import CurrentView from "./Current.vue";
import EditorUnitView from "./EditorUnit.vue";

export default createRouter({
    history: createMemoryHistory(),
    routes: [
        { path: "/", component: CurrentView },
        { path: "/editor-unit", component: EditorUnitView },
        { path: "/editor-panel", component: CurrentView },
    ],
});
