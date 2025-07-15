/*
 * @Description:
 * @Author: F-Stone
 * @LastEditTime: 2025-07-02 10:53:27
 */
import type { ShareRowAttrs, ShareItemAttrs } from "../src";

import { isImageReg } from "@stone/uemo-editor-utils/lib/utils";

import { parseBorderStyle } from "../../../utils/tiptap-helper";

export function parseShareRowAttrs(el: HTMLElement): ShareRowAttrs {
    if (!(el instanceof HTMLElement)) {
        return {};
    }

    return {
        fontSize: el.style.fontSize,
        align: el.style.textAlign,
        moAlign: el.getAttribute("data-mo-align") || undefined,
    };
}

export function parseCkShareItemAttr(el: HTMLElement): ShareItemAttrs {
    if (!(el instanceof HTMLElement)) {
        return {
            icon: "",
        };
    }

    const dataDom = el.parentElement?.parentElement;
    if (!dataDom) {
        return { icon: "", link: "" };
    }

    const text = el.innerText.trim();
    const classList = dataDom.classList;
    const iconClass = el.querySelector(".ifont")?.getAttribute("class");

    let icon = "";
    if (iconClass) {
        icon = "ue-share" + iconClass.replaceAll("ifont", "").trim();
    }

    // layout 解析
    let layout = "";
    if (classList.contains("ck_share_style_one")) {
        layout = "one";
    } else if (classList.contains("ck_share_style_two")) {
        layout = "two";
    } else if (classList.contains("ck_share_style_three")) {
        layout = "three";
    } else {
        layout = "four";
    }

    // theme 解析
    let theme = "";
    if (classList.contains("ck_share_theme_black")) {
        theme = "black";
    } else {
        theme = "white";
    }

    let color = "#fff";
    let background = "rgba(170, 170, 170, 0.3)";
    const borderColor = "rgba(170, 170, 170, 0.3)";
    let radius = "20px";
    let borderWidth = "0";

    if (theme === "white") {
        switch (layout) {
            case "one":
                background = "rgba(105, 105, 105, 0.77)";
                borderWidth = "1px";
                break;
            case "two":
                color = "#dcdcdc";
                background = "transparent";
                break;
            case "three":
                color = "#dcdcdc";
                background = "transparent";
                borderWidth = "1px";
                break;
            case "four":
                radius = "0";
                break;

            default:
                break;
        }
    }

    if (theme === "black") {
        switch (layout) {
            case "one":
                borderWidth = "0";
                background = "rgba(105, 105, 105, 0.3)";
                break;
            case "two":
                color = "#999";
                background = "transparent";
                break;
            case "three":
                color = "#999";
                background = "transparent";
                borderWidth = "1px";
                break;
            case "four":
                radius = "0";
                break;

            default:
                break;
        }
    }

    const href = dataDom?.getAttribute("href") || "";

    let linkType = dataDom?.getAttribute("data-link-type") || "link";

    if (href && isImageReg.test(href)) {
        linkType = "function";
    }

    return {
        text,
        icon,
        color,
        radius,
        background,
        border: parseBorderStyle({ borderColor, borderWidth, borderStyle: "solid" }),
        // 链接相关
        link: href,
        linkType: linkType,
    };
}

export function parseShareItemAttr(el: HTMLElement): ShareItemAttrs {
    if (!(el instanceof HTMLElement)) {
        return {
            icon: "",
        };
    }

    const style = el.style;

    let popLayer = undefined;
    try {
        popLayer = JSON.parse(el.getAttribute("data-pop-layer") || "{}");
    } catch (error) {
        console.error(error);
    }

    let linkType = el.getAttribute("data-link-type") || "link";

    if (linkType === "image") {
        linkType = "frame";
    }

    return {
        text: el.getAttribute("title") || "",
        icon: el.querySelector("[class*='ue-share-']")?.getAttribute("class") || "",
        color: style.getPropertyValue("--share-color") || "",
        radius: style.getPropertyValue("--share-border-radius") || "",
        background: style.getPropertyValue("--share-background-color") || "",
        border: parseBorderStyle({
            borderColor: style.getPropertyValue("--share-border-color") || "",
            borderWidth: style.getPropertyValue("--share-border-width") || "",
            borderStyle: style.getPropertyValue("--share-border-style") || "",
        }),
        // 链接相关
        link: el.getAttribute("href") || "",
        linkTarget: el.getAttribute("target") || "",
        linkType: linkType,
        linkDetail: el.getAttribute("data-link-detail") || "",
        triggerMethod: el.getAttribute("data-trigger-method") || "",
        linkPopLayer: popLayer,
    };
}
