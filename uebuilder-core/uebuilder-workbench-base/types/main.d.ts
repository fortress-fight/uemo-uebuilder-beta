/// <reference types="@stone/uebuilder-type" />
/// <reference types="@stone/uemo-editor-type" />
/// <reference types="@stone/uebuilder-creator-base" />

declare global {
    namespace UE_BUILDER_WORKBENCH {
        type Config = {
            version: string;
            workbenchState: UE_BUILDER.State;
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
