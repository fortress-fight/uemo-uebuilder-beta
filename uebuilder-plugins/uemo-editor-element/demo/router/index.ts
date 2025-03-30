/*
 * @Description: 路由入口文件
 * @Author: F-Stone
 * @LastEditTime: 2025-03-21 00:15:38
 */
import { createMemoryHistory, createRouter } from "vue-router";

import CurrentView from "./Current.vue";
import EditorUnitView from "./EditorUnit.vue";
import AttrEditorUnitView from "./AttrEditorUnit.vue";
import EditorPanelView from "./EditorPanel.vue";
import EditorFormUnitView from "./EditorFormUnit.vue";
import ResourcePanelView from "./ResourcePanel.vue";
import AttrEditorPanelView from "./AttrEditorPanel.vue";

export default createRouter({
    history: createMemoryHistory(),
    routes: [
        { path: "/", component: CurrentView },
        { path: "/editor-unit", component: EditorUnitView },
        { path: "/editor-attr", component: AttrEditorUnitView },
        { path: "/editor-panel", component: EditorPanelView },
        { path: "/editor-form", component: EditorFormUnitView },
        { path: "/editor-resource-panel", component: ResourcePanelView },
        { path: "/editor-attr-editor-panel", component: AttrEditorPanelView },
    ],
});
