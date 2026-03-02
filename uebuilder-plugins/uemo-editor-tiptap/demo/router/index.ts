/*
 * @Description: 路由入口文件
 * @Author: F-Stone
 * @LastEditTime: 2026-03-02 12:30:59
 */
import { createMemoryHistory, createRouter } from "vue-router";

import CurrentView from "./Current.vue";
import UnitView from "./Unit.vue";
import EditorView from "./Editor.vue";
import EditorMobileView from "./EditorMobile.vue";

export default createRouter({
    history: createMemoryHistory(),
    routes: [
        { path: "/", component: EditorView },
        { path: "/unit", component: UnitView },
        { path: "/editor", component: CurrentView },
        { path: "/editor-mobile", component: EditorMobileView },
    ],
});
