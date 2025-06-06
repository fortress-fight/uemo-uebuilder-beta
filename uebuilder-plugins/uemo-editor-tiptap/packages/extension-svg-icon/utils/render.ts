/*
 * @Description: svgIcon 渲染
 * @Author: F-Stone
 * @LastEditTime: 2025-06-06 14:37:25
 */

import type { SvgIconAttrs } from "../src";
import type { DOMOutputSpec } from "@tiptap/pm/model";

import { attrToStyle } from "@stone/uemo-editor-utils/lib/utils";

import $pageStyle from "../../../src/app.module.scss";
import { resolveBorderStyle } from "../../../utils/tiptap-helper";

/**
 * 获取 svgIcon 样式
 * @param attrs
 * @returns
 */
export function getSvgIconStyle(attrs: SvgIconAttrs) {
    const { border, color } = attrs || {};

    const { borderWidth, borderColor, borderStyle } = resolveBorderStyle(border);

    const styleAttr: Record<string, any> = {
        background: attrs.background || "",
        width: attrs.width || "",
        height: attrs.width || "",
        "border-radius": attrs.radius || "",
        "box-shadow": attrs.shadow || "",
        color: color || "",
        padding: attrs.padding || "",
    };

    if (borderWidth) {
        styleAttr["border-style"] = borderStyle;
        styleAttr["border-width"] = borderWidth;
        styleAttr["border-color"] = borderColor;
    }

    return attrToStyle(styleAttr);
}

/**
 * 渲染 svgIcon
 * @param svgIconAttr
 * @returns
 */
export function svgIconRender(svgIconAttr: SvgIconAttrs): DOMOutputSpec {
    const { align, source, name } = svgIconAttr;

    return [
        "div",
        { class: $pageStyle["svg-icon-wrapper"], style: align ? `text-align:` + align : null },
        [
            "div",
            { class: $pageStyle["svg-icon-box"], style: getSvgIconStyle(svgIconAttr) },
            [
                "iconpark-icon",
                { class: $pageStyle["svg-icon-viewer"], "data-source": source, width: "100%", height: "100%", name },
            ],
        ],
    ];
}
