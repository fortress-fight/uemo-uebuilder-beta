import { i18n } from "../../../src/i18n";

const { t } = i18n.global;

type TYPE_OPTIONS = {
    title: string;
    default: string;
    options: { text: string; value: string }[];
};

export const libList: Record<
    string,
    {
        name: string;
        theme?: {
            title: string;
            options: { text: string; value: string; sub: TYPE_OPTIONS[] }[];
        };
        defaultAttrs: UE_TIPTAP_EXTENSION.CounterNumber["attrs"];
    }
> = {
    normal: {
        name: t("COUNTER_NUMBER_MODE_NORMAL"),
        theme: {
            title: t("COUNTER_NUMBER_THEME_TITLE"),
            options: [
                { text: t("COUNTER_NUMBER_NORMAL"), value: "NO01", sub: [] },
                { text: t("COUNTER_NUMBER_DECORATION"), value: "NO02", sub: [] },
                { text: t("COUNTER_NUMBER_DECORATION_DESC"), value: "NO03", sub: [] },
            ],
        },
        defaultAttrs: {
            effect: "normal",
            theme: "NO01",
            body: [
                {
                    id: "i-1",
                    desc: t("COUNTER_NUMBER_DESC_TEXT"),
                    numList: [9, 99999],
                    proxy: { type: "text", value: "个" },
                },
            ],
        },
    },
    odometer: {
        name: t("COUNTER_NUMBER_MODE_ODOMETER"),
        theme: {
            title: t("COUNTER_NUMBER_THEME_TITLE"),
            options: [
                { text: t("COUNTER_NUMBER_NORMAL"), value: "NO01", sub: [] },
                { text: t("COUNTER_NUMBER_DECORATION"), value: "NO02", sub: [] },
                { text: t("COUNTER_NUMBER_DECORATION_DESC"), value: "NO03", sub: [] },
            ],
        },
        defaultAttrs: {
            effect: "odometer",
            theme: "NO01",
            body: [
                {
                    id: "i-1",
                    desc: t("COUNTER_NUMBER_DESC_TEXT"),
                    numList: [9, 99999],
                    proxy: { type: "text", value: "个" },
                },
            ],
        },
    },
};
