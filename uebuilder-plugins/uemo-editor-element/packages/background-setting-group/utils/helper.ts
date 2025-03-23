import type { TYPE_BG_TYPE, TYPE_BG_TYPE_PARAM } from "../index";
import { i18n } from "@/i18n";

/**
 * @description 获取背景数据
 *
 * @export
 * @return {*}
 */
export function useBackgroundData() {
    const instance = getCurrentInstance();
    const globalConfig = instance?.appContext.config.globalProperties.$ueElGlobalConfig;
    const backgroundSetting = globalConfig?.backgroundSetting;

    const backgroundTypeInfo = computed<Record<TYPE_BG_TYPE, { text: string; icon: string }>>(() => {
        const { t } = i18n.global;
        return {
            color: { text: t("UNIT_COLOR"), icon: "icon-yanse" },
            image: { text: t("UNIT_IMAGE"), icon: "icon-tupian" },
            shape: { text: t("UNIT_SHAPE"), icon: "icon-xingzhuang" },
            svg: { text: "SVG", icon: "icon-app-svg" },
            video: { text: t("UNIT_VIDEO"), icon: "icon-app-video" },
            blur: { text: t("UNIT_BLUR"), icon: "icon-app-blur" },
            spline: { text: "Spline", icon: "icon-app-spline" },
        };
    });

    const backgroundTypeParam = computed<undefined | TYPE_BG_TYPE_PARAM>(() => {
        if (!backgroundSetting) {
            return undefined;
        }

        const { defaultImageData, defaultSvgData, defaultVideoData, defaultSplineData } = backgroundSetting;

        return {
            color: { limit: Infinity, data: { color: "#999", opacity: 1 } },
            image: { limit: 3, data: defaultImageData },
            shape: { limit: 2, data: { name: "shape-bg-1" } },
            svg: { limit: 3, data: defaultSvgData },
            video: { limit: 1, data: defaultVideoData },
            blur: { limit: 1, data: { color: "rgba(255,255,255,0.1)", blur: "50px" } },
            spline: { limit: 1, data: defaultSplineData },
        };
    });

    return { backgroundTypeInfo, backgroundTypeParam };
}
