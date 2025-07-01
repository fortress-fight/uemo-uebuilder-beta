/*
 * @Description: 渲染 spline 元素
 * @Author: F-Stone
 * @LastEditTime: 2025-06-13 09:10:56
 */

import type { SplineAttrs } from "../src";
import type { DOMOutputSpec } from "@tiptap/pm/model";

import { attrToStyle } from "@stone/uemo-editor-utils/lib/utils";

import $pageStyle from "../../../src/app.module.scss";
import { resolveBorderStyle } from "../../../utils/tiptap-helper";

export function getSplineStyle(attrs: SplineAttrs) {
    const { border } = attrs || {};
    const { borderWidth, borderColor, borderStyle } = resolveBorderStyle(border);

    const ratio: string =
        {
            "1-1": "100%",
            "3-4": "133.3333%",
            "4-3": "75%",
            "16-9": "56.25%",
            "9-16": "177.7777%",
        }[attrs.ratio! || "auto"] || "";

    const styleAttr: Record<string, any> = {
        background: attrs.background || "",
        width: attrs.width || "",
        "border-radius": attrs.radius || "",
        "box-shadow": attrs.shadow || "",
        "--spline-ratio": ratio,
        "--spline-w": attrs.w || "",
        "--spline-h": attrs.h || "",
    };

    if (borderWidth) {
        styleAttr["border-style"] = borderStyle;
        styleAttr["border-width"] = borderWidth;
        styleAttr["border-color"] = borderColor;
    }

    return attrToStyle(styleAttr);
}

export function splineRender(attrs: SplineAttrs): DOMOutputSpec {
    const { align, url, ratio } = attrs;
    const style = getSplineStyle(attrs);
    return [
        "div",
        {
            class: $pageStyle["spline-wrapper"],
            "data-url": url,
            "data-ratio": ratio || null,
            style: align ? `text-align:` + align : null,
        },
        [
            "div",
            {
                class: $pageStyle["spline-box"],
                style,
            },
            [
                "div",
                {
                    loading: "auto",
                    class: $pageStyle["spline-viewer"],
                    "data-url": url,
                },
            ],
        ],
    ];
}
