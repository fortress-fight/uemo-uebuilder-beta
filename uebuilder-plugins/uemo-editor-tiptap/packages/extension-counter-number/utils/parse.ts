import type { CounterNumberAttrs } from "../src";

import $pageStyle from "../../../src/app.module.scss";

/**
 * 安全解析 JSON 字符串，解析失败返回默认值
 * @param str - JSON 字符串
 * @param defaultValue - 解析失败时返回的默认值
 */
function safeParseJSON<T>(str: string | null, defaultValue: T): T {
    try {
        return str ? JSON.parse(str) : defaultValue;
    } catch {
        return defaultValue;
    }
}

/**
 * 判断字体粗细是否为 bold
 * @param weight - 字体粗细字符串
 * @returns 是否为 bold
 */
function isBoldWeight(weight: string | null | undefined): boolean | undefined {
    if (!weight) return undefined;
    const w = weight.replace(/['"]+/g, "");
    return /^(bold(er)?|[5-9]\d{2,})$/.test(w) || undefined;
}

/**tem.numPad
 * 解析计数器数字组件的 DOM 属性为 CounterNumberAttrs 对象
 * @param dom - 计数器数字组件的根 DOM 元素
 * @returns 解析后的属性对象
 */
export function parseCounterNumberAttr(dom: HTMLElement): CounterNumberAttrs {
    const domStyle = dom.style;
    const itemsList = dom.querySelectorAll<HTMLElement>(`.${$pageStyle["counter-number-item"]}`);
    const body: CounterNumberAttrs["body"] = Array.from(itemsList, (item) => {
        // 解析每个 item 的属性
        return {
            id: item.getAttribute("data-id") || "",
            numList: safeParseJSON<number[]>(item.getAttribute("data-nums"), []),
            numPad: parseInt(item.getAttribute("data-num-pad") || "0"),
            desc: item.querySelector(`.${$pageStyle["counter-number-item-desc"]}`)?.textContent || "",
            proxy: {
                type: "text",
                value: item.querySelector(`.${$pageStyle["counter-number-item-proxy"]}`)?.textContent || "",
            },
        };
    });

    // 处理字体家族，去除引号
    const fontFamily = domStyle.fontFamily?.replace(/['"]+/g, "");
    const dir = dom.getAttribute("data-dir");
    const fill = dom.getAttribute("data-fill") === "true";
    let widthValue: string | undefined = domStyle.getPropertyValue("--counter-number-width");
    if (!(dir === "col" || fill)) widthValue = undefined;

    return {
        width: widthValue,
        gap: domStyle.getPropertyValue("--counter-number-gap") || "1em",
        moGap: domStyle.getPropertyValue("--counter-number-mo-gap") || "1em",
        fill: !!fill,
        dir: dir || undefined,
        moDir: dom.getAttribute("data-mo-dir") || undefined,
        theme: dom.getAttribute("data-theme") || "",
        effect: dom.getAttribute("data-effect") || "",
        duration: dom.getAttribute("data-duration") || "",
        align: (dom.getAttribute("data-align") || "left") as UE_EL_UTIL.ALIGN_X,
        moAlign: (dom.getAttribute("data-mo-align") || "left") as UE_EL_UTIL.ALIGN_X,
        fontWeight: isBoldWeight(domStyle.fontWeight),
        fontSize: domStyle.fontSize,
        fontFamily: fontFamily === "inherit" ? undefined : fontFamily,
        fontStyle: domStyle.fontStyle?.replace(/['"]+/g, ""),
        textColor: domStyle.color || "#333",
        extStyle: {
            "--counter-number-desc-zoom": domStyle.getPropertyValue("--counter-number-desc-zoom"),
            "--counter-number-proxy-zoom": domStyle.getPropertyValue("--counter-number-proxy-zoom"),
            "--counter-number-proxy-translate": domStyle.getPropertyValue("--counter-number-proxy-translate"),
            "--counter-number-proxy-pos": domStyle.getPropertyValue("--counter-number-proxy-pos"),
            "--counter-number-desc-color": domStyle.getPropertyValue("--counter-number-desc-color"),
            "--counter-number-proxy-color": domStyle.getPropertyValue("--counter-number-proxy-color"),
            "--counter-number-desc-padding": domStyle.getPropertyValue("--counter-number-desc-padding"),
            // "--counter-number-desc-pos": rootStyle.getPropertyValue("--counter-number-desc-pos"),
        },
        body,
    };
}
