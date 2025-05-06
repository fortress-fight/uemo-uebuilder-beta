import type { DOMOutputSpec } from "@tiptap/pm/model";
import type { ButtonItemAttrs, ButtonItemIconAttrs } from "../src";

import { _pickBy } from "@stone/uemo-editor-utils/lib/lodash";
import { attrToStyle } from "@stone/uemo-editor-utils/lib/utils";

import $pageStyle from "../../../src/app.module.scss";

import { getButtonStyle } from "./parse";

/**
 * 创建图标DOM
 */
function createIconDom(type: "before" | "after", attrs?: ButtonItemIconAttrs) {
    if (!attrs?.source) return null;

    const { name, source, color, space, size } = attrs;
    const style = attrToStyle({ "--icon-space": space, "--icon-size": size });

    if (source.endsWith(".lottie")) {
        const className =
            type === "before" ? $pageStyle["btn-before-lottie-icon"] : $pageStyle["btn-after-lottie-icon"];

        return [
            "dotlottie-player",
            {
                style: "--lottie-player-path-fill: currentColor; --lottie-player-path-stroke: currentColor;" + style,
                lottietype: "btnIcon",
                src: source,
                mode: "normal",
                loop: "false",
                class: [className, $pageStyle["btn-icon"]].join(" "),
            },
        ];
    }
    if (source.endsWith(".svg")) {
        const className = type === "before" ? $pageStyle["btn-before-svg-icon"] : $pageStyle["btn-after-svg-icon"];

        return [
            "ue-svg-viewer",
            {
                style,
                src: source,
                class: [className, $pageStyle["btn-icon"]].join(" "),
                "fill-color": color === "currentColor" ? "currentColor" : undefined,
                "stroke-color": color === "currentColor" ? "currentColor" : undefined,
            },
        ];
    }

    const className = type === "before" ? $pageStyle["btn-before-icon"] : $pageStyle["btn-after-icon"];

    return [
        "iconpark-icon",
        {
            style,
            name,
            "data-source": source,
            class: [className, $pageStyle["btn-icon"]].join(" "),
        },
    ];
}

/**
 * 创建内部DOM
 */
function createButtonInnerDom(attrs: ButtonItemAttrs) {
    const children = [];

    const beforeIconDom = createIconDom("before", attrs.beforeSvgIcon);

    if (beforeIconDom) {
        children.push(beforeIconDom);
    }

    children.push(["div", { class: $pageStyle["btn-text"] }, attrs.text]);

    const afterIconDom = createIconDom("after", attrs.afterSvgIcon);

    if (afterIconDom) {
        children.push(afterIconDom);
    }

    return children;
}

/**
 * 创建普通按钮DOM
 */
function normalButtonRender(attrs: ButtonItemAttrs): DOMOutputSpec {
    const children = createButtonInnerDom(attrs);
    return [
        attrs.link ? "a" : "div",
        {
            class: $pageStyle.btn,
            ..._pickBy(
                {
                    href: attrs.link,
                    target: attrs.linkTarget || "_blank",
                    "data-animation": attrs.animation,
                    "data-text-empty": attrs.text?.length == 0 ? "1" : null,
                    "data-trigger-method": attrs.triggerMethod,
                    "data-theme": attrs.theme,
                    "data-link-type": attrs.linkType,
                    "data-link-detail": attrs.linkDetail,
                    "data-pop-layer": attrs.linkPopLayer ? JSON.stringify(attrs.linkPopLayer) : undefined,
                },
                (v) => v != ""
            ),
            style: getButtonStyle(attrs),
        },
        ...children,
    ];
}

/**
 * 创建旋转按钮DOM
 */
function rotateButtonRender(attrs: ButtonItemAttrs): DOMOutputSpec {
    const frontDom = ["div", { class: $pageStyle["btn-front-3d"] }, ...createButtonInnerDom(attrs)];
    const backDom = ["div", { class: $pageStyle["btn-back-3d"] }, ...createButtonInnerDom(attrs)];
    const innerWrapper = ["div", { class: $pageStyle["btn--inner-wrapper"] }, frontDom, backDom];
    return [
        attrs.link ? "a" : "div",
        {
            class: $pageStyle.btn,
            ..._pickBy(
                {
                    href: attrs.link,
                    target: attrs.linkTarget || "_blank",
                    "data-animation": attrs.animation,
                    "data-text-empty": attrs.text?.length == 0 ? "1" : null,
                    "data-theme": attrs.theme,
                    "data-trigger-method": attrs.triggerMethod,
                    "data-link-type": attrs.linkType,
                    "data-link-detail": attrs.linkDetail,
                    "data-pop-layer": attrs.linkPopLayer ? JSON.stringify(attrs.linkPopLayer) : undefined,
                },
                (v) => v != ""
            ),
            style: getButtonStyle(attrs),
        },
        innerWrapper,
    ];
}

export function buttonRender(attrs: ButtonItemAttrs): DOMOutputSpec | null {
    switch ((attrs.theme || "").split("-")[0]) {
        case "rotate": {
            return rotateButtonRender(attrs);
        }

        default: {
            return normalButtonRender(attrs);
        }
    }
}
