/*
 * @Description: 路由入口文件
 * @Author: F-Stone
 * @LastEditTime: 2025-04-04 04:00:32
 */
import { createMemoryHistory, createRouter } from "vue-router";

import CurrentView from "./Current.vue";
import UnitView from "./Unit.vue";
import EditorView from "./Editor.vue";

export default createRouter({
    history: createMemoryHistory(),
    routes: [
        { path: "/", component: CurrentView },
        { path: "/unit", component: UnitView },
        { path: "/editor", component: EditorView },
    ],
});
