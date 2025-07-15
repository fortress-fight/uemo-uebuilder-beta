/*
 * @Description: 路由入口文件
 * @Author: F-Stone
 * @LastEditTime: 2025-07-10 17:27:26
 */
import { createMemoryHistory, createRouter } from "vue-router";

import CurrentView from "./Current.vue";
import UnitView from "./Unit.vue";
import EditorView from "./Editor.vue";
import EditorMobileView from "./EditorMobile.vue";

export default createRouter({
    history: createMemoryHistory(),
    routes: [
        { path: "/", component: CurrentView },
        { path: "/unit", component: UnitView },
        { path: "/editor", component: EditorView },
        { path: "/editor-mobile", component: EditorMobileView },
    ],
});
