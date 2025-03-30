import { i18n } from "@/i18n";

export function getEffectName(type: string) {
    const { t } = i18n.global;

    switch (type) {
        case "opacity":
            return t("SCROLL_EFFECT_SETTING_OPTION_TITLE");

        case "rotate":
            return t("SCROLL_EFFECT_SETTING_ROTATE_TITLE");

        case "fixed":
            return t("SCROLL_EFFECT_SETTING_FIXED_TITLE");

        case "sticky":
            return t("SCROLL_EFFECT_SETTING_STICKY_TITLE");

        case "image-parallax":
            return t("SCROLL_EFFECT_SETTING_IMAGE_PARALLAX_TITLE");

        case "parallax":
            return t("SCROLL_EFFECT_SETTING_PARALLAX_TITLE");

        case "scale":
            return t("SCROLL_EFFECT_SETTING_SCALE_TITLE");

        case "translate":
            return t("SCROLL_EFFECT_SETTING_TRANSLATE_TITLE");

        default:
            return "";
    }
}

export const defaultScrollOptions = {
    rotate: {
        axis: "x-b",
        start: "60",
        end: "0",
        startPos: "top bottom",
        endPos: "bottom bottom",
        opacityStart: "",
        opacityEnd: "",
    },
    opacity: {
        startPos: "top bottom",
        endPos: "bottom bottom",
        start: "0",
        end: "1",
    },
    fixed: { moveY: "0" },
    sticky: { padding: "0px" },
    scale: {
        startPos: "top bottom",
        endPos: "bottom bottom",
        start: "0.5",
        end: "1",
        opacityStart: "",
        opacityEnd: "",
    },
    translate: {
        startPos: "top bottom",
        endPos: "bottom bottom",
        xStart: "-50px",
        xEnd: "0px",
        yStart: "0px",
        yEnd: "0px",
        opacityStart: "",
        opacityEnd: "",
    },
    parallax: { speed: "-100" },
    "image-parallax": { mode: "image" },
} as const;
