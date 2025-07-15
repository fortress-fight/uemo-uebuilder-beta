import type { UeElScrollEffectSettingPanelValue } from "../../../../../packages/scroll-effect-setting-panel";
import type { UeScrollEffectFactoryDomParams } from "./helper";

import $ from "@stone/uemo-editor-utils/lib/jquery";

import { ScrollEffectEventEventBus } from "./event-bus";
import { initOpacityScrollEffect } from "./scroll-effect-opacity";
import { initRotateScrollEffect } from "./scroll-effect-rotate";
import { initScaleScrollEffect } from "./scroll-effect-scale";
import { initTranslateScrollEffect } from "./scroll-effect-translate";
import { initStickyScrollEffect } from "./scroll-effect-sticky";
import { initFixedScrollEffect } from "./scroll-effect-fixed";
import { initParallaxScrollEffect } from "./scroll-effect-parallax";
import { initImageParallaxScrollEffect } from "./scroll-effect-image-parallax";
import { initTextScrollEffect } from "./scroll-effect-text";

import $pageStyle from "../app.module.scss";

/**
 * 初始化單個元素的滾動效果
 * @param dom - 目標DOM元素
 * @param params - 初始化參數
 */
export function initScrollEffect(dom: HTMLElement, params: UeScrollEffectFactoryDomParams) {
    $(params.stage).removeData("scroll-effect");
    const scrollEffectParams = $(params.stage).data("scroll-effect") as UeElScrollEffectSettingPanelValue;

    $(dom).addClass($pageStyle["js-scroll-container"]);
    $(params.stage).addClass($pageStyle["js-scroll-effect"]);

    switch (scrollEffectParams.type) {
        case "opacity":
            initOpacityScrollEffect(dom, params, scrollEffectParams.options);
            break;
        case "rotate":
            initRotateScrollEffect(dom, params, scrollEffectParams.options);
            break;
        case "scale":
            initScaleScrollEffect(dom, params, scrollEffectParams.options);
            break;
        case "translate":
            initTranslateScrollEffect(dom, params, scrollEffectParams.options);
            break;
        case "sticky":
            initStickyScrollEffect(dom, params, scrollEffectParams.options);
            break;
        case "fixed":
            initFixedScrollEffect(dom, params, scrollEffectParams.options).catch((error) => {
                console.error(error);
            });
            break;
        case "parallax":
            initParallaxScrollEffect(dom, params, scrollEffectParams.options).catch((error) => {
                console.error(error);
            });
            break;
        case "image-parallax":
            initImageParallaxScrollEffect(dom, params, scrollEffectParams.options).catch((error) => {
                console.error(error);
            });
            break;
        case "text-effect":
            initTextScrollEffect(dom, params, scrollEffectParams.options);
            break;
        default:
            break;
    }

    ScrollEffectEventEventBus.bind($(dom), "ue.scroll-effect.destroy", () => {
        $(dom).removeClass($pageStyle["js-scroll-container"]);
        $(params.stage).removeClass($pageStyle["js-scroll-effect"]);
    });
}
