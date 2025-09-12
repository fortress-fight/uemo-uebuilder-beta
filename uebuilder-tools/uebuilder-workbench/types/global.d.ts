/// <reference types="@stone/uebuilder-api--tools" />

declare global {
    namespace UE_BUILDER_WORKBENCH_TOOLS {
        type UserInfo = {
            weixin: string;
            avatar: string;
            level: string;
            ainfo: { name: string };
            tools_guide: string;
            tools_industry?: string;
        };
    }
}

export {};
