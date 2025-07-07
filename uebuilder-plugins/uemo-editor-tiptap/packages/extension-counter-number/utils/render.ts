import type { DOMOutputSpec } from "@tiptap/pm/model";

import type { CounterNumberAttrs } from "../src";

import { attrToStyle, removeEmptyValue } from "@stone/uemo-editor-utils/lib/utils";

import $pageStyle from "../../../src/app.module.scss";

/**
 * 生成计数器块的 style 样式字符串
 * @param data 计数器属性
 * @returns style 字符串
 */
export function getCounterNumberBlockStyle(data: CounterNumberAttrs): string {
    return attrToStyle({
        "--counter-number-width": data.width,
        "--counter-number-gap": data.gap,
        "--counter-number-mo-gap": data.moGap,
        ...(data.extStyle || {}),

        color: data.textColor,
        "font-family": data.fontFamily,
        "font-size": data.fontSize,
        "font-weight": data.fontWeight ? "bold" : "",
        "font-style": data.fontStyle,
    });
}

export function getCounterNumberBlockCustomAttr(data: CounterNumberAttrs): Record<string, any> {
    return {
        "data-theme": data.theme,
        "data-effect": data.effect,
        "data-duration": data.duration,
        "data-align": data.align,
        "data-mo-align": data.moAlign,
        "data-fill": data.fill ? "true" : "false",
        "data-dir": data.dir,
        "data-mo-dir": data.moDir,
    };
}

/**
 * 生成计数器块的属性对象
 * @param data 计数器属性
 * @returns 属性对象
 */
function getCounterNumberBlockAttr(data: CounterNumberAttrs): Record<string, any> {
    const result: Record<string, any> = {
        class: $pageStyle["counter-number-block"],
        style: getCounterNumberBlockStyle(data),
        ...getCounterNumberBlockCustomAttr(data),
    };

    if (data.fontSize?.endsWith("px")) {
        // @ts-expect-error
        result.class += " " + $pageStyle["text-" + parseInt(data.fontSize)];
    } else {
        result["data-font-size"] = data.fontSize || "";
    }

    return removeEmptyValue(result);
}

/**
 * 渲染计数器数字组件
 * @param attrs 计数器属性
 * @returns DOMOutputSpec
 */
export function renderCounterNumber(attrs: CounterNumberAttrs): DOMOutputSpec {
    if (!attrs.body || !Array.isArray(attrs.body)) return ["div", getCounterNumberBlockAttr(attrs), []];

    const counterNumberList: any[] = attrs.body.map((item) => {
        const numList = JSON.stringify(item.numList);

        const numDecimal = Math.max(
            item.numPad || 0,
            item.numList[0]?.toString().length || 0,
            item.numList[1]?.toString().length || 0
        );

        const itemInfoDom: any[] = [
            "div",
            { class: $pageStyle["counter-number-item-info"] },
            [
                "div",
                { class: $pageStyle["counter-number-item-text"] },
                item.numList[1]?.toString().padStart(numDecimal, "0") || "",
            ],
        ];

        if (item.proxy) {
            itemInfoDom.push(["div", { class: $pageStyle["counter-number-item-proxy"] }, item.proxy.value]);
        }

        const itemDom: any[] = [
            "div",
            {
                class: $pageStyle["counter-number-item"],
                "data-id": item.id,
                "data-nums": numList,
                "data-num-pad": item.numPad,
            },
            itemInfoDom,
        ];

        if (item.desc) {
            itemDom.push(["div", { class: $pageStyle["counter-number-item-desc"] }, item.desc]);
        }
        return itemDom;
    });

    return [
        "div",
        getCounterNumberBlockAttr(attrs),
        [
            "div",
            { class: $pageStyle["counter-number-inner"] },
            ["div", { class: $pageStyle["counter-number-group"] }, ...counterNumberList],
        ],
    ];
}
