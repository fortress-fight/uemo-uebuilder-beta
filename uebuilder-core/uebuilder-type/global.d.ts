/// <reference types="@stone/uemo-editor-element" />

declare global {
    namespace UE_BUILDER {
        /**
         * 应用名称
         * @description 应用名称，包括 UEMO_ADMIN、JSMO、MO005、CUSTOM、UEMO_TOOLS、APP_TEST
         */
        type Name = "UEMO_ADMIN" | "JSMO" | "MO005" | "CUSTOM" | "UEMO_TOOLS" | "APP_TEST";

        /**
         * 应用类型
         * @description 应用类型，包括布局和页面
         *  - layout: 布局
         *  - page: 页面
         */
        type Type = "layout" | "page";

        /**
         * 工作台状态
         * @description 工作台状态，包括初始、编辑、预览、模板库、替换、极速构建
         *  - entry: 进入工作台前的“即将编辑”页面展示
         *  - browsing: 工作台开启后的预览/库展示状态（原 initial）实现库：storehouse
         *  - editing：编辑模式 -- 编辑页面 实现库：editor
         *  - preview：预览模式 -- 预览页面
         *  - composer 极速构建模式 -- 极速构建页面
         */
        type State = "entry" | "browsing" | "editing" | "preview" | "composer";

        /**
         * 上传配置
         */
        type UploadConfig = UE_EL_UTIL.UploadConfig;

        /**
         * 资源配置
         */
        type ResourceConfig = {
            // 默认图片
            defaultImage: string;
            // 默认 svg 尺寸：580 * 580
            defaultSvg: string;
            // 默认视频
            defaultVideo: string;
            // 默认 spline
            defaultSpline: string;
        };
    }
}

export {};
