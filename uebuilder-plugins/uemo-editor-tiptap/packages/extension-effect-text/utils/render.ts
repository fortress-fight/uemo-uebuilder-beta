import type { DOMOutputSpec } from "@tiptap/pm/model";

import type { EffectTextAttrs } from "../src";

import { attrToStyle, removeEmptyValue } from "@stone/uemo-editor-utils/lib/utils";

import $pageStyle from "../../../src/app.module.scss";

export function getEffectTextStyle(data: EffectTextAttrs) {
    return attrToStyle({
        "--effect-text-text-color": data.textColor,
        "font-family": data.fontFamily,
        "font-size": data.fontSize,
        "line-height": data.lineHeight,
        "font-weight": data.fontWeight ? "bold" : "",
        "font-style": data.fontStyle,
    });
}

function getEffectTextBlockAttr(data: EffectTextAttrs) {
    const result: any = {
        class: $pageStyle["effect-text-block"],
        "data-align": data.align,
        "data-mo-align": data.moAlign,
        "data-scroll-effect": JSON.stringify(data.scrollEffect),
        style: getEffectTextStyle(data),
    };

    if (data.fontSize?.endsWith("px")) {
        // @ts-expect-error
        result.class += " " + $pageStyle["text-" + parseInt(data.fontSize)];
    } else {
        result["data-font-size"] = data.fontSize || "";
    }

    return removeEmptyValue(result);
}

export function renderHTML(data: EffectTextAttrs): DOMOutputSpec {
    return ["div", getEffectTextBlockAttr(data), ["div", { class: $pageStyle["effect-text-inner"] }, data.content]];
}
