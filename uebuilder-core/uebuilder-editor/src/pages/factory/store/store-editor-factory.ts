/*
 * @Description: 仓库基础 store 配置
 * @Author: F-Stone
 * @LastEditTime: 2025-09-14 23:35:43
 */
import { defineStore } from "@stone/uemo-editor-utils/lib/pinia";

export const useUeBuilderEditorFactoryStore = defineStore("uebuilderEditorFactory", {
    state: () => ({
        editorFactoryConfig: {} as UE_BUILDER_EDITOR_FACTORY.Config,
    }),
    actions: {
        setEditorFactoryConfig(editorFactoryConfig: UE_BUILDER_EDITOR_FACTORY.Config) {
            this.editorFactoryConfig = editorFactoryConfig;
        },
    },
});
