/*
 * @Description: 仓库基础 store 配置
 * @Author: F-Stone
 * @LastEditTime: 2025-09-15 00:13:50
 */
import { defineStore } from "@stone/uemo-editor-utils/lib/pinia";

type UeBuilderEditorFactoryStore = {
    editorFactoryData: { title?: string; data: string };
    editorFactoryConfig: UE_BUILDER_EDITOR_FACTORY.Config;
};

export const useUeBuilderEditorFactoryStore = defineStore("uebuilderEditorFactory", {
    state: (): UeBuilderEditorFactoryStore => ({
        editorFactoryData: { title: "", data: "" },
        editorFactoryConfig: {} as UE_BUILDER_EDITOR_FACTORY.Config,
    }),
    actions: {
        setEditorFactoryConfig(editorFactoryConfig: UE_BUILDER_EDITOR_FACTORY.Config) {
            this.editorFactoryConfig = editorFactoryConfig;
        },

        setEditorFactoryData(editorFactoryData: { title?: string; data: string }) {
            this.editorFactoryData = editorFactoryData;
        },
    },
});
