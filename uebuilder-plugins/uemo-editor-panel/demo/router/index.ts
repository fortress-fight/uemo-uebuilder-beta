/*
 * @Description: 路由入口文件
 * @Author: F-Stone
 * @LastEditTime: 2025-05-09 02:00:03
 */
import { createMemoryHistory, createRouter } from "vue-router";

import CurrentView from "./Current.vue";
import TiptapEditorPanelView from "./TiptapEditorPanel.vue";

export default createRouter({
    history: createMemoryHistory(),
    routes: [
        { path: "/", component: CurrentView },
        { path: "/tiptap-editor-panel", component: TiptapEditorPanelView },
    ],
});
