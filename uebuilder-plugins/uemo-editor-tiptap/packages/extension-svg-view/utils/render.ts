import type { DOMOutputSpec } from "@tiptap/pm/model";
import type { SvgViewerAttrs } from "../src";

import { attrToStyle } from "@stone/uemo-editor-utils/lib/utils";

import $pageStyle from "../../../src/app.module.scss";
import { resolveBorderStyle } from "../../../utils/tiptap-helper";

export function getSvgViewerStyle(attrs: SvgViewerAttrs) {
    const { border, md } = attrs || {};
    const { borderWidth, borderColor, borderStyle } = resolveBorderStyle(border);

    const calcBorder = borderWidth
        ? {
              "border-style": borderStyle,
              "border-color": borderColor,
              "border-width": borderWidth,
          }
        : {};

    return attrToStyle({
        background: attrs.background || "",
        color: attrs.color || "",
        "border-radius": attrs.radius || "",
        "box-shadow": attrs.shadow || "",
        "--svg-w": attrs.w || "",
        "--svg-h": attrs.h || "",
        "--width": attrs.width || "100%",
        "--md-width": md.width || "",
        ...calcBorder,
    });
}

export function svgViewRender(attr: SvgViewerAttrs): DOMOutputSpec {
    const { align, url, color, padding } = attr;

    if (!url) return ["p"];

    const style = getSvgViewerStyle(attr);
    const alignStyle = align ? `text-align: ${align};` : "";
    const paddingStyle = padding ? `--padding: ${padding};` : "";
    return [
        "div",
        {
            class: $pageStyle["svg-viewer-wrapper"],
            style: alignStyle || paddingStyle ? `${alignStyle} ${paddingStyle}` : null,
            "data-scroll-effect-param": JSON.stringify(attr.scrollEffect),
        },
        [
            "div",
            { class: $pageStyle["svg-viewer-box"], style },
            [
                "div",
                { style: `padding: var(--padding); width: 100%;` },
                [
                    "div",
                    { class: $pageStyle["svg-viewer-inner"] },
                    [
                        "ue-svg-viewer",
                        {
                            class: $pageStyle["svg-viewer"],
                            src: url,
                            "fill-color": color,
                            "stroke-color": color,
                        },
                    ],
                ],
            ],
        ],
    ];
}
