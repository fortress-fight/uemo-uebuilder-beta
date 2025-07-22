/// <reference types="@stone/uebuilder-type" />
/// <reference types="@stone/uemo-editor-type" />
/// <reference types="@stone/uebuilder-creator-base" />

declare global {
    namespace UE_BUILDER_STOREHOUSE {
        interface Config {
            version: string;
            uploadConfig: UE_EL_UTIL.UploadConfig;
            resourceConfig: UE_BUILDER.ResourceConfig;
        }
    }
}

export {};
