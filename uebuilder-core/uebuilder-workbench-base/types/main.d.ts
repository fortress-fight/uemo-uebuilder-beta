/// <reference types="@stone/uebuilder-type" />
/// <reference types="@stone/uemo-editor-type" />
/// <reference types="@stone/uebuilder-creator-base" />

declare global {
    namespace UE_BUILDER_WORKBENCH {
        type Config = {
            version: string;
            workbenchPath: string;
            workbenchType: UE_BUILDER.Type;
            workbenchState: UE_BUILDER.State;
        };

        type InitParams = {
            // 应用主路径
            appPath: string;
        };
    }
}

export {};
