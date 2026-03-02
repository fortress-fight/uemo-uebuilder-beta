import type { UE_AI_CONFIG } from "./index";

export const AI_CONFIG: UE_AI_CONFIG = {
    uid: "",
    // 是否支持 -- 是否显示 AI 控件
    allow: true,
    // 是否禁用 -- 支持但没有开启
    disable: false,
    aiHelper: ["general"],
    findImageUse: ["findImage"],
    tiptapTextUse: ["translateText", "beautifyText", "simplifyText", "extendText"],
    plugin: [
        {
            name: "中英互译",
            type: "translateText",
            aiType: "translateText",
            icon: "ue-tiptap-ai-translate",
            url: "/ai-api/ai/Api/Platform/Ai/Chat",
            key: "d1a18f5f00ffa1d3dd",
        },
        {
            name: "润色文字",
            type: "beautifyText",
            aiType: "beautifyText",
            icon: "ue-tiptap-ai-beautify",
            url: "/ai-api/ai/Api/Platform/Ai/Text",
            key: "e8757e2f79a50f1a10",
            defaultVars: {
                TYPE: "更专业精确",
            },
            vars: [
                {
                    title: "类型",
                    key: "TYPE",
                    options: ["更专业精确", "更具有创造性", "更生动有趣"],
                },
            ],
        },
        {
            name: "精简文字",
            type: "simplifyText",
            aiType: "simplifyText",
            icon: "ue-tiptap-ai-simplify",
            url: "/ai-api/ai/Api/Platform/Ai/Text",
            key: "c838c1b0030ba6ac4a",
        },
        {
            name: "扩展文字",
            type: "extendText",
            aiType: "extendText",
            icon: "ue-tiptap-ai-extend",
            url: "/ai-api/ai/Api/Platform/Ai/Text",
            key: "00a9fe116257d00215",
        },
        {
            name: "智能找图",
            type: "findImage",
            aiType: "findImage",
            icon: "ue-tiptap-ai",
            url: "/ai-api/ai/Api/Platform/Ai/Chat",
            key: "061385fc7158c61e59",
        },
        {
            name: "广告文案",
            type: "helperChat",
            aiType: "helperChat",
            icon: "ue-tiptap-ai",
            url: "/ai-api/ai/Api/Platform/Ai/Text",
            key: "f5cb2cf7c93df81799",
        },
        {
            name: "AI 助手",
            type: "general",
            aiType: "general",
            icon: "ue-tiptap-ai",
            url: "/ai-api/ai/Api/Platform/Ai/Text",
            key: "f5cb2cf7c93df81799",
        },
    ],
};
