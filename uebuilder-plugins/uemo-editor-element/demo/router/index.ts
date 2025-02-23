/*
 * @Description: 路由入口文件
 * @Author: F-Stone
 * @LastEditTime: 2025-02-23 21:47:25
 */
import { createMemoryHistory, createRouter } from "vue-router";

import CurrentView from "./Current.vue";
import EditorUnitView from "./EditorUnit.vue";

export default createRouter({
    history: createMemoryHistory(),
    routes: [
        { path: "/", component: CurrentView },
        { path: "/editor-unit", component: EditorUnitView },
        { path: "/editor-panel", component: EditorUnitView },
        { path: "/editor-resource/panel", component: EditorUnitView },
        { path: "/editor-lib-panel", component: EditorUnitView },
    ],
});
