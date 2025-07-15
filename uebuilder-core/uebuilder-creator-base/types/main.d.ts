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
    }
    namespace UE_BUILDER_CREATOR {
        type InitParams = {
            // 初始化时是否全屏
            initFullSize: boolean;
            // 应用主路径
            appPath: string;
        };
    }
}

export {};
