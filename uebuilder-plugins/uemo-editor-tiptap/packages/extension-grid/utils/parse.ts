import type { GridGroupAttrs, GridItemAttrs } from "../src";

import $pageStyle from "../../../src/app.module.scss";

import { guid } from "@stone/uemo-editor-utils/lib/guid";
import { omitDefaultKey } from "@stone/uemo-editor-utils/lib/utils";

import { parseBorderStyle } from "../../../utils/tiptap-helper";

export function parseGridGroup(el: HTMLElement): GridGroupAttrs | false {
    if (!(el instanceof HTMLElement)) return false;

    const gridLayerInner = el.querySelector(`div.${$pageStyle["grid-layer--inner"]}`);

    if (!(gridLayerInner instanceof HTMLElement)) return false;

    if (el.hasAttribute("data-config")) {
        return JSON.parse(el.getAttribute("data-config") || "{}");
    }

    const innerStyle = gridLayerInner.style;

    const backgroundParams: UE_EL_UTIL.BackgroundValue[] = resolveBackgroundStyle(el, "grid-layer");

    return omitDefaultKey(
        {
            grid: el.getAttribute("data-grid"),
            alignX: el.getAttribute("data-align-x") || "left",
            alignY: el.getAttribute("data-align-y") || "top",
            width: innerStyle.width || "",
            gap: innerStyle.gap || "10px",
            padding: innerStyle.padding,
            shadow: innerStyle.boxShadow,
            overflow: innerStyle.overflow,
            radius: innerStyle.borderRadius,
            background: backgroundParams,
            border: parseBorderStyle(innerStyle),
            mdGrid: el.getAttribute("data-md-grid"),
            mdGap: innerStyle.getPropertyValue("--md-grid-layer-gap") || "10px",
        },
        {
            grid: undefined,
            alignX: "left",
            alignY: "top",
            padding: "0px",
            radius: "0px",
            mdGrid: undefined,
        }
    );
}

export function parseGridItem(el: HTMLElement): GridItemAttrs | false {
    if (!(el instanceof HTMLElement)) {
        return false;
    }

    if (el.hasAttribute("data-config")) {
        return JSON.parse(el.getAttribute("data-config") || "{}");
    }

    const gridItemStyle = el.style;
    const backgroundParams: UE_EL_UTIL.BackgroundValue[] = resolveBackgroundStyle(el, "grid-item");

    return omitDefaultKey(
        {
            gridArea: gridItemStyle.gridArea,
            overflow: gridItemStyle.overflow,
            mdGridArea: gridItemStyle.getPropertyValue("--md-grid-layer-item-area") || undefined,
            padding: gridItemStyle.getPropertyValue("--grid-layer-item-padding") || gridItemStyle.padding || undefined,
            mdPadding: gridItemStyle.getPropertyValue("--md-grid-layer-item-padding") || undefined,
            shadow: gridItemStyle.boxShadow,
            radius: gridItemStyle.borderRadius,
            border: parseBorderStyle(gridItemStyle),
            background: backgroundParams,
        },
        {
            padding: "0px",
            radius: "0px",
        }
    );
}

/**
 * 解析背景参数
 * @param {HTMLElement} dom - 目标 DOM 元素
 * @param {string} type - 背景类型（grid-item 或 grid-layer）
 * @returns {UE_EL_UTIL.BackgroundValue[]} 背景参数数组
 * @description
 * 1. 优先从特定类型的容器中查找背景层，兼容历史数据。
 * 2. 支持多种背景类型（color、svg、image、blur、video）。
 * 3. 结构优化，提升可读性和健壮性。
 * 4. 注意：如后续扩展类型，需同步完善 switch 逻辑。
 */
export function resolveBackgroundStyle(dom: HTMLElement, type: string): UE_EL_UTIL.BackgroundValue[] {
    let backgroundBoxDoms: NodeListOf<Element> | null = null;
    let oldBgStyle = "";

    // 兼容历史数据，优先查找特定类型的背景层
    if (type === "grid-item") {
        backgroundBoxDoms = dom.querySelectorAll(`div[data-type="grid-item"] .${$pageStyle["bg-box"]}`);

        // NOTE 这里是历史原因，之前只有 grid-item 存在背景层，所以没有区分 Type 新增 grid-group 后，需要兼容，当没有找到带有 data-type="grid-item" 的背景层时，使用 .${$pageStyle["bg-box"]} 来获取背景层
        if (!backgroundBoxDoms.length) {
            backgroundBoxDoms = dom.querySelectorAll(`.${$pageStyle["bg-box"]}`);
        }
        oldBgStyle = dom.querySelector<HTMLElement>(`.${$pageStyle["grid-item--inner"]}`)?.style.background || "";
    } else if (type === "grid-layer") {
        backgroundBoxDoms = dom.querySelectorAll(`div[data-type="grid-group"] .${$pageStyle["bg-box"]}`);
        oldBgStyle = dom.querySelector<HTMLElement>(`.${$pageStyle["grid-layer--inner"]}`)?.style.background || "";
    }

    /**
     * 生成基础背景参数
     * @param {string} color - 背景色
     * @param {number} opacity - 透明度
     * @returns {UE_EL_UTIL.BackgroundValue}
     */
    function createColorBgValue(color: string, opacity: number): UE_EL_UTIL.BackgroundValue {
        return {
            id: guid(5),
            type: "color",
            value: { color, opacity },
        };
    }

    const backgroundParams: UE_EL_UTIL.BackgroundValue[] = oldBgStyle
        ? [createColorBgValue(oldBgStyle, dom.style.opacity ? parseFloat(dom.style.opacity) : 1)]
        : [];

    if (backgroundBoxDoms?.length) {
        backgroundBoxDoms.forEach((item) => {
            const bgDom = item.firstChild as HTMLElement | null;
            if (!bgDom) return;
            const bgType = item.getAttribute("data-type");
            const id = bgDom.getAttribute("id");
            if (!id || !bgType) return;

            let value: any = {};
            switch (bgType) {
                case "color": {
                    const opacity = bgDom.style.opacity;
                    value = {
                        color: bgDom.style.background,
                        opacity: opacity ? parseFloat(opacity) : 1,
                    };
                    break;
                }
                case "svg":
                case "image": {
                    try {
                        value = JSON.parse(bgDom.getAttribute("data-attrs") || "{}") || {};
                    } catch (error) {
                        // 解析失败时，value 保持空对象，避免抛出异常
                        value = {};
                        console.error("背景 data-attrs 解析失败", error);
                    }
                    break;
                }
                case "blur": {
                    value = {
                        color: bgDom.style.backgroundColor,
                        blur: bgDom.style.backdropFilter.replace(/blur\((.*)\)/, "$1"),
                    };
                    break;
                }
                case "video": {
                    value = {
                        video: bgDom.querySelector("video")?.getAttribute("src") || "",
                    };
                    break;
                }
                default:
                    // 未知类型，跳过
                    return;
            }
            backgroundParams.push({ id, type: bgType, value });
        });
    }
    return backgroundParams;
}
