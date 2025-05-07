import type { ButtonItemAttrs, ButtonItemIconAttrs } from "../src";

import { _pickBy } from "@stone/uemo-editor-utils/lib/lodash";
import { attrToStyle, isImageReg } from "@stone/uemo-editor-utils/lib/utils";

import $pageStyle from "../../../src/app.module.scss";

/**
 * 获取按钮样式
 */
export function getButtonStyle(attrs: ButtonItemAttrs) {
    return attrToStyle(
        _pickBy(
            {
                "--padding": attrs.padding,

                "--color": attrs.color,
                "--hover-color": attrs.hoverColor,

                "--box-shadow": attrs.shadow,
                "--hover-box-shadow": attrs.hoverShadow,

                "--border-radius": attrs.radius,
                "--hover-radius": attrs.hoverRadius,

                "--border-width": attrs.borderWidth,
                "--hover-border-width": attrs.hoverBorderWidth,

                "--border-color": attrs.borderColor,
                "--hover-border-color": attrs.hoverBorderColor,

                "--background": attrs.background,
                "--hover-background": attrs.hoverBackground,

                "--border-style": attrs.borderStyle,
                "--hover-border-style": attrs.hoverBorderStyle,
            },
            (v) => v != ""
        )
    );
}

/**
 * 解析旧数据中按钮属性
 */
export function parseCkButtonAttr(el: HTMLElement): Partial<ButtonItemAttrs> {
    let layout = el.getAttribute("data-layout");
    const theme = el.getAttribute("data-style");
    const isOutline = el.getAttribute("data-before-outline") === "1";
    const hoverOutline = el.getAttribute("data-after-outline") === "1";

    const color = el.getAttribute("data-before-color");
    const hoverColor = el.getAttribute("data-after-color");

    const backgroundColor = el.getAttribute("data-before-bg");
    const hoverBackgroundColor = el.getAttribute("data-after-bg");

    if (layout === "0") {
        layout = "";
    }

    let radius = "";
    switch (layout) {
        case "2":
            radius = "5px";
            break;
        case "3":
            radius = "24px";
            break;

        default:
            break;
    }

    const defaultColor = color ? color : theme === "white" ? "#333" : "#fff";

    const defaultHoverColor = !hoverColor || hoverColor === defaultColor ? "" : hoverColor;

    const defaultBackgroundColor = backgroundColor ? backgroundColor : theme === "white" ? "#f0f0f0" : "#333";

    const defaultHoverBackgroundColor = hoverBackgroundColor || "";

    const linkHref = el?.getAttribute("href");
    let linkType: ButtonItemAttrs["linkType"] = el?.getAttribute("data-link-type") || "link";

    if (linkHref && isImageReg.test(linkHref)) {
        linkType = "function";
    }

    return {
        theme: layout ? "custom" : "",
        text: el.innerText || "BUTTON",
        padding: layout ? "10px 35px" : "",

        radius,
        hoverRadius: "",

        color: defaultColor,
        hoverColor: defaultHoverColor,

        background: isOutline ? "" : defaultBackgroundColor,
        hoverBackground: hoverOutline ? "" : defaultHoverBackgroundColor,

        borderColor: isOutline ? defaultColor : defaultBackgroundColor,
        hoverBorderColor: hoverOutline ? "transparent" : defaultHoverBackgroundColor,

        borderWidth: layout ? "2px" : isOutline ? "1px" : "",
        hoverBorderWidth: "",

        borderStyle: layout ? "solid" : "",
        hoverBorderStyle: "",

        shadow: "",
        hoverShadow: "",

        // 链接相关
        link: linkHref || "",
        linkTarget: el?.getAttribute("target") || "",
        linkType: linkType,
        linkDetail: linkType === "function" ? el?.getAttribute("data-link-detail") || "" : "",
        triggerMethod: el.getAttribute("data-trigger-method") || "",
    };
}

/**
 * 解析按钮图标
 */
function parseIcon(el: HTMLElement | null, type: "before" | "after"): ButtonItemIconAttrs | undefined {
    if (type === "before") {
        const beforeIconDom = el?.querySelector<HTMLElement>("." + $pageStyle["btn-before-icon"]);
        const beforeLottieIconDom = el?.querySelector<HTMLElement>("." + $pageStyle["btn-before-lottie-icon"]);
        const beforeSvgIconDom = el?.querySelector<HTMLElement>("." + $pageStyle["btn-before-svg-icon"]);

        if (beforeIconDom) {
            return parseNormalIcon(beforeIconDom);
        } else if (beforeLottieIconDom) {
            return parseLottieIcon(beforeLottieIconDom);
        } else if (beforeSvgIconDom) {
            return parseSvgIcon(beforeSvgIconDom);
        }
    } else {
        const afterIconDom = el?.querySelector<HTMLElement>("." + $pageStyle["btn-after-icon"]);
        const afterLottieIconDom = el?.querySelector<HTMLElement>("." + $pageStyle["btn-after-lottie-icon"]);
        const afterSvgIconDom = el?.querySelector<HTMLElement>("." + $pageStyle["btn-after-svg-icon"]);

        if (afterIconDom) {
            return parseNormalIcon(afterIconDom);
        } else if (afterLottieIconDom) {
            return parseLottieIcon(afterLottieIconDom);
        } else if (afterSvgIconDom) {
            return parseSvgIcon(afterSvgIconDom);
        }
    }
}

/**
 * 解析普通图标
 */
function parseNormalIcon(iconDom: HTMLElement | null): ButtonItemIconAttrs | undefined {
    if (!iconDom) return undefined;

    return {
        name: iconDom.getAttribute("name") || "",
        source: iconDom.getAttribute("data-source") || "",
        space: iconDom.style.getPropertyValue("--icon-space") || "",
        size: iconDom.style.getPropertyValue("--icon-size") || "",
    };
}

/**
 * 解析Lottie图标
 */
function parseLottieIcon(lottieIconDom: HTMLElement | null): ButtonItemIconAttrs | undefined {
    if (!lottieIconDom) return undefined;

    return {
        name: "",
        source: lottieIconDom.getAttribute("src") || "",
        space: lottieIconDom.style.getPropertyValue("--icon-space") || "",
        size: lottieIconDom.style.getPropertyValue("--icon-size") || "",
    };
}

/**
 * 解析SVG图标
 */
function parseSvgIcon(svgIconDom: HTMLElement | null): ButtonItemIconAttrs | undefined {
    if (!svgIconDom) return undefined;

    const color = svgIconDom.getAttribute("fill-color") || "";
    return {
        name: "",
        source: svgIconDom.getAttribute("src") || "",
        color: color === "currentColor" ? "currentColor" : "",
        space: svgIconDom.style.getPropertyValue("--icon-space") || "",
        size: svgIconDom.style.getPropertyValue("--icon-size") || "",
    };
}

/**
 * 解析按钮属性
 */
export function parseButtonAttr(el: HTMLElement): Partial<ButtonItemAttrs> {
    const style = el.style;

    const beforeSvgIcon: ButtonItemAttrs["beforeSvgIcon"] = parseIcon(el, "before");
    const afterSvgIcon: ButtonItemAttrs["afterSvgIcon"] = parseIcon(el, "after");

    const isEmptyBtn = !el.innerText && !beforeSvgIcon && !afterSvgIcon;

    let text = el.textContent || "";
    const textDom = el.querySelector("." + $pageStyle["btn-text"]);

    if (textDom instanceof HTMLElement) {
        text = textDom.innerText;
    }

    let popLayer = undefined;
    try {
        popLayer = JSON.parse(el.getAttribute("data-pop-layer") || "{}");
    } catch (error) {
        console.error(error);
    }

    const linkType: ButtonItemAttrs["linkType"] = el.getAttribute("data-link-type") || "link";

    return {
        theme: el.getAttribute("data-theme") || "normal",
        animation: el.getAttribute("data-animation") || undefined,
        text: isEmptyBtn ? "BUTTON" : text,
        padding: style.padding || style.getPropertyValue("--padding") || "",
        beforeSvgIcon,
        afterSvgIcon,

        radius: style.getPropertyValue("--border-radius") || "",
        hoverRadius: style.getPropertyValue("--hover-radius") || "",

        color: style.getPropertyValue("--color") || "",
        hoverColor: style.getPropertyValue("--hover-color") || "",

        background: style.getPropertyValue("--background-color") || style.getPropertyValue("--background") || "",
        hoverBackground:
            style.getPropertyValue("--hover-bg-color") || style.getPropertyValue("--hover-background") || "",

        borderColor: style.getPropertyValue("--border-color") || "",
        hoverBorderColor: style.getPropertyValue("--hover-border-color") || "",

        borderWidth: style.getPropertyValue("--border-width") || "",
        hoverBorderWidth: style.getPropertyValue("--hover-border-width") || "",
        borderStyle: style.getPropertyValue("--border-style") || "",
        hoverBorderStyle: style.getPropertyValue("--hover-border-style") || "",

        shadow: style.getPropertyValue("--box-shadow") || "",
        hoverShadow: style.getPropertyValue("--hover-box-shadow") || "",

        // 链接相关
        link: el.getAttribute("href") || "",
        linkTarget: el.getAttribute("target") || "",
        linkType: linkType,
        linkDetail: linkType === "function" ? el.getAttribute("data-link-detail") || "" : "",
        triggerMethod: el.getAttribute("data-trigger-method") || "",
        linkPopLayer: popLayer,
    };
}
