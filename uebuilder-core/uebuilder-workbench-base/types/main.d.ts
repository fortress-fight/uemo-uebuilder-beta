/// <reference types="@stone/uebuilder-type/global.d.ts" />

declare global {
    namespace UE_BUILDER_WORKBENCH {
        type Config = {
            version: string;
        };

        type InitParams = {
            // 初始化时是否全屏
            initFullSize: boolean;
            // 应用主路径
            appPath: string;
        };
    }
}

export {};
