/*
 * @Description: 仓库基础 store 配置
 * @Author: F-Stone
 * @LastEditTime: 2025-09-17 14:24:06
 */
import { defineStore } from "@stone/uemo-editor-utils/lib/pinia";

type UeBuilderEditorFactoryStore = {
    editorFactoryDevice: UE_BUILDER.DeviceType;
    editorFactoryData: { title?: string; data: string };
    editorFactoryConfig: UE_BUILDER_EDITOR_FACTORY.Config;
};

export const useUeBuilderEditorFactoryStore = defineStore("uebuilderEditorFactory", {
    state: (): UeBuilderEditorFactoryStore => ({
        editorFactoryDevice: "desktop",
        editorFactoryData: { title: "", data: "" },
        editorFactoryConfig: {} as UE_BUILDER_EDITOR_FACTORY.Config,
    }),
    actions: {
        setEditorFactoryDevice(editorFactoryDevice: UE_BUILDER.DeviceType) {
            this.editorFactoryDevice = editorFactoryDevice;
        },

        setEditorFactoryConfig(editorFactoryConfig: UE_BUILDER_EDITOR_FACTORY.Config) {
            this.editorFactoryConfig = editorFactoryConfig;
        },

        setEditorFactoryData(editorFactoryData: { title?: string; data: string }) {
            this.editorFactoryData = editorFactoryData;
        },
    },
});
