/*
 * @Description: 粘性滾動效果
 * @Author: F-Stone
 * @LastEditTime: 2025-07-06 15:32:18
 */

import type { ScrollStickyOptions } from "../../../../scroll-effect-setting-panel";
import type { UeScrollEffectFactoryDomParams } from "./helper";

import $ from "@stone/uemo-editor-utils/lib/jquery";
import { _debounce } from "@stone/uemo-editor-utils/lib/lodash";

import { updateScrollMarkerText } from "./helper";
import { ScrollEffectEventEventBus } from "./event-bus";
import { defaultScrollOptions } from "../../../../scroll-effect-setting-panel/utils/helper";

/**
 * 初始化粘性滾動效果
 *
 * @param {HTMLElement} dom
 * @param {UeScrollEffectFactoryDomParams} params
 * @param {ScrollStickyOptions} [options={}]
 */
export function initStickyScrollEffect(
    dom: HTMLElement,
    params: UeScrollEffectFactoryDomParams,
    options: ScrollStickyOptions = {}
) {
    const useOptions = Object.assign(defaultScrollOptions.sticky, options);

    function getPaddingArr() {
        const arr = useOptions.padding.split(/\s+/);
        if (arr.length === 1) {
            return [arr[0], arr[0], arr[0], arr[0]];
        }
        if (arr.length === 2) {
            return [arr[0], arr[1], arr[0], arr[1]];
        }
        if (arr.length === 3) {
            return [arr[0], arr[1], arr[2], arr[1]];
        }
        if (arr.length === 4) {
            return [arr[0], arr[1], arr[2], arr[3]];
        }
        return [arr[0], arr[0], arr[0], arr[0]];
    }

    const ctrl = ScrollTrigger.create({
        trigger: dom,
        pin: true,
        pinSpacing: false,
        anticipatePin: 1,
        scroller: params.scroller,
        start: "top top+=" + parseFloat(getPaddingArr()[0]),
        end: () => {
            const distance = params.stage.clientHeight - dom.offsetTop;
            const padding = parseFloat(getPaddingArr()[2]);
            return `top+=${distance - padding} ${dom.clientHeight + padding}`;
        },
        markers: params.debugger
            ? {
                  startColor: "#ff740e",
                  endColor: "#2c48ff",
                  fontSize: "14px",
                  fontWeight: "bold",
                  indent: 0,
              }
            : false,
    });
    if (params.debugger) {
        updateScrollMarkerText("top top", "bottom bottom");
    }

    const updateSticky = _debounce(() => {
        ctrl.refresh();
    }, 200);

    ScrollEffectEventEventBus.bind($(dom), "ue.scroll-effect.update", updateSticky);
    ScrollEffectEventEventBus.bind($(dom), "ue.scroll-effect.destroy", () => {
        ctrl.kill();
        ScrollEffectEventEventBus.unbind($(dom), "ue.scroll-effect.update", updateSticky);
    });
}
