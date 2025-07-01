/*
 * @Description: 渲染 spline 元素
 * @Author: F-Stone
 * @LastEditTime: 2025-06-14 01:01:43
 */

import type { LottieAttrs } from "../src";
import type { DOMOutputSpec } from "@tiptap/pm/model";

import { attrToStyle } from "@stone/uemo-editor-utils/lib/utils";

import $pageStyle from "../../../src/app.module.scss";
import { resolveBorderStyle } from "../../../utils/tiptap-helper";

export function getLottieBoxStyle(attrs: LottieAttrs) {
    const { border } = attrs || {};
    const { borderWidth, borderColor, borderStyle } = resolveBorderStyle(border);

    const styleAttr: Record<string, any> = {
        background: attrs.background || "",
        width: attrs.width || "",
        color: attrs.color || "",
        "border-radius": attrs.radius || "",
        "box-shadow": attrs.shadow || "",
        "--lottie-w": attrs.w || "",
        "--lottie-h": attrs.h || "",
    };

    if (borderWidth) {
        styleAttr["border-style"] = borderStyle;
        styleAttr["border-width"] = borderWidth;
        styleAttr["border-color"] = borderColor;
    }

    return attrToStyle(styleAttr);
}

export function getLottieViewStyle(attrs: LottieAttrs) {
    const data: Record<string, any> = {
        padding: attrs.padding || "",
    };

    return attrToStyle(data);
}

export function lottieRender(attr: LottieAttrs): DOMOutputSpec {
    const { align, url, trigger } = attr;
    return [
        "div",
        {
            class: $pageStyle["lottie-wrapper"],
            "data-url": url,
            "data-trigger": typeof trigger === "object" ? JSON.stringify(trigger) : trigger || "hover",
            style: align ? `text-align:` + align : null,
        },
        [
            "div",
            {
                class: $pageStyle["lottie-box"],
                style: getLottieBoxStyle(attr),
            },
            [
                "div",
                {
                    class: $pageStyle["lottie-viewer"],
                    style: getLottieViewStyle(attr),
                },
                [
                    "dotlottie-player",
                    {
                        mode: "normal",
                        loop: "false",
                        src: url,
                        lottietype: attr.color ? "btnIcon" : null,
                        style: attr.color
                            ? `--lottie-player-path-fill: currentColor; --lottie-player-path-stroke: currentColor;`
                            : "",
                    },
                ],
            ],
        ],
    ];
}
