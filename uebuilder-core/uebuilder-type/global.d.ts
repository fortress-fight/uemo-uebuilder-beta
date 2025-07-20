/// <reference types="@stone/uemo-editor-element" />

declare global {
    namespace UE_BUILDER {
        /**
         * 工作台状态
         * @description 工作台状态，包括初始、编辑、预览、模板库、替换、极速构建
         *  - initial：初始模式 -- 展示工作台
         *  - editing：编辑模式 -- 编辑页面
         *  - preview：预览模式 -- 预览页面
         *  - building： 极速构建模式 -- 极速构建页面
         */
        type State = "initial" | "editing" | "preview" | "building";

        /**
         * 上传配置
         */
        type UploadConfig = UE_EL_UTIL.UploadConfig;
    }
}

export {};
