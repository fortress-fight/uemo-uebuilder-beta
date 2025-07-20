/// <reference types="@stone/uemo-editor-element" />

declare global {
    namespace UE_BUILDER {
        /**
         * initial：初始模式
         * editing：编辑模式
         * preview：预览模式
         * template：模板库模式
         * replace： 替换编辑页面模式
         * building： 极速构建模式
         */
        type State = "editing" | "initial" | "preview" | "template" | "replace" | "building";

        /**
         * 上传配置
         */
        type UploadConfig = UE_EL_UTIL.UploadConfig;
    }
}

export {};
