import type { DOMOutputSpec } from "@tiptap/pm/model";
import type { LoopTextAttrs } from "../src";
import { attrToStyle, removeEmptyValue } from "@stone/uemo-editor-utils/lib/utils";
import $pageStyle from "../../../src/app.module.scss";

export function getLoopTextBlockCustomAttr(data: LoopTextAttrs): Record<string, any> {
    return {
        "data-theme": data.theme,
        "data-effect": data.effect,
        "data-delay": data.delay || "2.4",
        "data-align": data.align,
        "data-mo-align": data.moAlign,
    };
}

export function getLoopTextBlockStyle(data: LoopTextAttrs): string {
    return attrToStyle({
        "--loop-text-text-color": data.textColor,
        "font-family": data.fontFamily,
        "font-size": data.fontSize,
        "line-height": data.lineHeight,
        "font-weight": data.fontWeight ? "bold" : "",
        "font-style": data.fontStyle,
    });
}

/**
 * 生成跑马灯文本块的属性对象
 * @param {LoopTextAttrs} data 跑马灯文本属性
 * @returns {Record<string, any>} 属性对象
 */
function getLoopTextBlockAttr(data: LoopTextAttrs): Record<string, any> {
    const result: Record<string, any> = {
        class: $pageStyle["loop-text-block"],
        style: getLoopTextBlockStyle(data),
        ...getLoopTextBlockCustomAttr(data),
    };

    const { fontSize } = data;
    if (fontSize?.endsWith("px")) {
        // @ts-expect-error
        result.class += " " + $pageStyle["text-" + parseInt(data.fontSize)];
    } else {
        result["data-font-size"] = fontSize || "";
    }

    return removeEmptyValue(result);
}

/**
 * 渲染跑马灯文本组件
 * @param {LoopTextAttrs} attrs 跑马灯文本属性
 * @returns {DOMOutputSpec} Tiptap DOM 结构描述
 */
export function renderLoopText(attrs: LoopTextAttrs): DOMOutputSpec {
    if (!attrs.body || !Array.isArray(attrs.body)) return ["p"];

    // 构建主内容容器
    const loopTextWrapperDom: any[] = ["div", { class: $pageStyle["loop-text-inner"] }];

    // 前缀
    if (attrs.prefix) {
        loopTextWrapperDom.push([
            "div",
            {
                class: $pageStyle["loop-text--prefix"],
                "data-type": attrs.prefix.type,
                "data-value": attrs.prefix.value,
            },
            ["span", { class: $pageStyle.text }, attrs.prefix.value],
        ]);
    }

    // 渲染每个跑马灯文本项
    const loopTextList = (attrs.body || []).map((item, index) => [
        "div",
        {
            class: $pageStyle["loop-text-item"],
            "data-id": item.id,
            "data-active": index === 0 ? "" : null,
        },
        ["span", { class: $pageStyle["loop-text-item-text"] }, item.title],
    ]);
    // 跑马灯文本组
    loopTextWrapperDom.push(["div", { class: $pageStyle["loop-text-group"] }, ...loopTextList]);

    // 后缀
    if (attrs.suffix) {
        loopTextWrapperDom.push([
            "div",
            {
                class: $pageStyle["loop-text--suffix"],
                "data-type": attrs.suffix.type,
                "data-value": attrs.suffix.value,
            },
            ["span", { class: $pageStyle.text }, attrs.suffix.value],
        ]);
    }

    return ["div", getLoopTextBlockAttr(attrs), loopTextWrapperDom];
}
