import { operMap } from "../../../utils/tiptap-oper-manage";
import { i18n } from "../../../src/i18n";

export type TYPE_SLASH_MENU = {
    title: string;
    key: string;
    list: { title: string; name: keyof typeof operMap }[];
};

export const slashMenuList: TYPE_SLASH_MENU[] = [
    {
        title: i18n.global.t("UNIT_BASE"),
        key: "baseBlock",
        list: [
            { title: "Text", name: "insertText" },
            { title: "Button", name: "insertButton" },
            { title: "Grid Group", name: "inertGridGroup" },
            { title: "Image", name: "addImage" },
            { title: "Icon", name: "insertSvgIcon" },
            { title: "Emoji", name: "insertEmoji" },
            { title: "Video", name: "insertVideoFrame" },
            { title: "Divider", name: "hrRule" },
            { title: "DividerBlock", name: "insertDividerBlock" },
        ],
    },
    {
        title: i18n.global.t("UNIT_OTHER"),
        key: "otherBlock",
        list: [
            { title: "Social Contact", name: "insertShare" },
            { title: "LoopText", name: "insertLoopText" },
            { title: "EffectText", name: "insertEffectText" },
            { title: "counterNumber", name: "insertCounterNumber" },
            { title: "Table", name: "inertTable" },
            { title: "Map", name: "insertMapFrame" },
            { title: "Web", name: "insertWebFrame" },
            { title: "svgViewer", name: "insertSvgViewer" },
            { title: "Spline", name: "insertSpline" },
            { title: "Lottie", name: "insertLottie" },
        ],
    },
];
