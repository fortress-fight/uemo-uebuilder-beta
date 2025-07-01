import type { DOMOutputSpec } from "@tiptap/pm/model";

import type { ImageAttrs } from "../src/index";

import { _pickBy } from "@stone/uemo-editor-utils/lib/lodash";
import { attrToStyle } from "@stone/uemo-editor-utils/lib/utils";

import pageStyle from "../../../src/app.module.scss";
import { resolveBorderStyle, transformLinkData } from "../../../utils/tiptap-helper";

/**
 * 生成图片 box 层的 style 字符串
 * @param attr 图片属性
 * @returns style 字符串
 */
export function resolveImageBoxStyle(attr: ImageAttrs) {
    const { pos, src } = attr;
    const styleAttr: Record<string, any> = {
        "background-position": pos,
        "background-image": `url(${src})`,
    };
    return attrToStyle(styleAttr);
}

/**
 * 计算图片比例
 * @param ratio 比例字符串
 * @param width 宽度
 * @param height 高度
 * @returns 百分比字符串
 */
function calcImageRatio(ratio?: string, width?: string, height?: string) {
    if (!ratio || ratio === "auto") {
        if (width && height) {
            return (parseInt(height) / parseInt(width)) * 100 + "%";
        }
        return null;
    }
    const defaultRatio: Record<string, string> = {
        "1-1": "100%",
        "3-4": "133.3333%",
        "4-3": "75%",
        "16-9": "56.25%",
        "9-16": "177.7777%",
    };
    if (defaultRatio[ratio]) {
        return defaultRatio[ratio];
    }

    const [w, h] = ratio.split("-");
    return (Number(h) / Number(w)) * 100 + "%";
}

/**
 * 生成图片 item 层的 style 字符串
 * @param attr 图片属性
 * @returns style 字符串
 */
function resolveImageItemStyle(attr: ImageAttrs) {
    const { imageMask, width, height, radius, ratio, shadow, border, background, imgW, imgH, sizeMode } = attr;
    const mdAttr = attr.md || {};
    const { borderWidth, borderColor, borderStyle } = resolveBorderStyle(border);

    const desktopRatio = calcImageRatio(ratio, imgW, imgH);

    const styleAttr: Record<string, any> = {
        "box-shadow": shadow,
        background: background,
        "--mask-color": imageMask,
        "--img-w": imgW,
        "--img-h": imgH,
        "--width": sizeMode ? width : null,
        "--ratio": desktopRatio,
        "--radius": radius,
        "--height": height,

        "--md-width": mdAttr.width,
        "--md-height": typeof mdAttr.height === "undefined" ? height : mdAttr.height,
        "--md-radius": typeof mdAttr.radius === "undefined" ? radius : mdAttr.radius || "0px",
        "--md-ratio": typeof mdAttr.ratio === "undefined" ? desktopRatio : calcImageRatio(mdAttr.ratio, imgW, imgH),
    };
    if (borderWidth) {
        styleAttr["border-style"] = borderStyle;
        styleAttr["border-width"] = borderWidth;
        styleAttr["border-color"] = borderColor;
    }
    return attrToStyle(styleAttr);
}

/**
 * 获取图片外层 wrapper 的属性
 * @param attrs 图片属性
 * @param defaultValue 默认属性
 * @returns wrapper 属性对象
 */
function resolveImageWrapperAttrs(attrs: ImageAttrs, defaultValue: Partial<ImageAttrs>) {
    const { align, imageEffect } = attrs;
    return {
        class: pageStyle.img_wrapper,
        style: align && align !== defaultValue.align ? `text-align: ${align}` : null,
        "data-image-effect": imageEffect?.type,
        "data-effect-option": imageEffect ? JSON.stringify(imageEffect?.options) : null,
    };
}

/**
 * 获取图片 item 层属性
 * @param attr 图片属性
 * @returns item 属性对象
 */
export function resolveImageItemAttrs(attr: ImageAttrs) {
    const desktopRatio = !attr.ratio || attr.ratio === "auto" ? "auto" : attr.ratio;
    const mdAttr = attr.md || {};
    const mdRatio = typeof mdAttr.ratio === "undefined" ? desktopRatio : mdAttr.ratio;
    const baseAttr = {
        class: pageStyle.image_item,
        style: resolveImageItemStyle(attr),
        "data-animate": attr.animate,
        "data-size-mode": attr.sizeMode,
        "data-image-ratio": desktopRatio,
        "data-md-image-ratio": mdRatio,
        "data-md-size-mode": attr.md?.sizeMode || attr.sizeMode,
    };
    return _pickBy(baseAttr, (v) => v !== null && v !== undefined && v !== "");
}

/**
 * 获取图片 box 层属性（含链接属性）
 * @param attr 图片属性
 * @returns box 属性对象
 */
function resolveImageBoxAttrs(attr: ImageAttrs) {
    const { imageLink } = attr;
    const linkData = transformLinkData(imageLink) || {};
    const { link, target, type, detail, triggerArea, popLayer } = linkData;
    const linkAttr = link
        ? {
              href: link,
              target: target || "_target",
              rel: "noopener noreferrer nofollow",
              "data-link-type": type,
              "data-link-detail": detail,
              "data-trigger-method": triggerArea,
              "data-pop-layer": popLayer ? JSON.stringify(popLayer) : undefined,
          }
        : {};
    const baseAttr = {
        class: pageStyle.image_box,
        style: resolveImageBoxStyle(attr),
        "data-forbid-image-gallery": attr.forbidImageGallery ? "true" : "",
    };
    return _pickBy(link ? { ...baseAttr, ...linkAttr } : baseAttr, (v) => v !== null && v !== undefined && v !== "");
}

/**
 * 获取 img 标签属性
 * @param attrs 图片属性
 * @returns img 属性对象
 */
function getImgAttr(attrs: ImageAttrs) {
    const { src, alt, title, imgW, imgH } = attrs;
    return { src, alt, title, width: imgW, height: imgH };
}

/**
 * 渲染图片 DOM 结构
 * @param attrs 图片属性
 * @returns ProseMirror DOMOutputSpec
 * @example
 * // 用法示例
 * imageRender({ src: 'xxx', ... })
 */
export function imageRender(attrs: ImageAttrs): DOMOutputSpec {
    const link = attrs.imageLink;
    return [
        "div",
        resolveImageWrapperAttrs(attrs, { align: "left" }),
        [
            "div",
            resolveImageItemAttrs(attrs),
            [link?.link ? "a" : "div", resolveImageBoxAttrs(attrs), ["img", getImgAttr(attrs)]],
        ],
    ];
}
