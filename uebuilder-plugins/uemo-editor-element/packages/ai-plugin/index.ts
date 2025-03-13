import type { App } from "vue";

export type UE_AI_PLUGIN = {
    name?: string;
    type: string;
    aiType: string;
    icon?: string;
    url: string;
    key?: string;
    defaultVars?: Record<string, string>;
    vars?: { title: string; key: string; options: string[] }[];
};
export type UE_AI_CONFIG = {
    uid?: string;
    allow?: boolean;
    disable?: string[] | boolean;
    aiHelper?: string[];
    tiptapTextUse?: string[];
    findImageUse?: string[];
    plugin: UE_AI_PLUGIN[];
};

export function install(app: App, param?: UE_AI_CONFIG) {
    app.config.globalProperties.$ueElAI = param;

    // NOTE 获取 AI 找图的配置
    function getAiFindImageConfig(ueAiConfig?: UE_AI_CONFIG) {
        if (!ueAiConfig?.plugin) return undefined;
        return ueAiConfig.plugin?.find((plugin) => {
            if (plugin.type === "findImage") {
                return plugin;
            }
        });
    }

    app.config.globalProperties.$ueElImageAI = getAiFindImageConfig(param);
}
