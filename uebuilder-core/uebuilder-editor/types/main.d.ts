/// <reference types="@stone/uebuilder-type" />
/// <reference types="@stone/uemo-editor-type" />
/// <reference types="@stone/uebuilder-creator-base" />

declare global {
    namespace UE_BUILDER_EDITOR_FACTORY {
        interface Config {
            version: string;
            uploadConfig: UE_EL_UTIL.UploadConfig;
            resourceConfig: UE_BUILDER.ResourceConfig;
            device?: UE_BUILDER.DeviceType;
        }
    }
    namespace UE_BUILDER_EDITOR_INDEX {
        interface Config {
            version: string;
            uploadConfig: UE_EL_UTIL.UploadConfig;
            resourceConfig: UE_BUILDER.ResourceConfig;
            device?: UE_BUILDER.DeviceType;
        }
    }
}

export {};
