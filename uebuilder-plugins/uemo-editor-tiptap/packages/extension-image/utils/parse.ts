import type { ImageAttrs } from "../src/index";

import $ from "@stone/uemo-editor-utils/lib/jquery";
import { _pickBy } from "@stone/uemo-editor-utils/lib/lodash";
import { isImageReg } from "@stone/uemo-editor-utils/lib/utils";

import $pageStyle from "../../../src/app.module.scss";

// #region 解析图片元素，获取图片属性

/**
 * 获取指定 DOM 属性值
 * @template T 返回类型
 * @param dom - 目标元素
 * @param attr - 属性名
 * @returns 属性值或 undefined
 */
export function getAttribute<T extends string>(dom: HTMLElement | null, attr: string): T | undefined {
    return (dom?.getAttribute(attr) || undefined) as any;
}

/**
 * 解析 CKEditor 链接元素，自动识别图片链接类型
 * @param link - a 标签元素
 * @returns 链接相关属性对象
 */
export function parseCkLink(link: HTMLElement | null): Partial<UE_EL_UTIL.LinkValue> {
    if (!link) return {};
    const href = getAttribute(link, "href");

    let type: any = getAttribute(link, "data-link-type") || "link";
    let detail: any = getAttribute(link, "data-link-detail");
    if (href && isImageReg.test(href)) {
        type = "function";
        detail = "image";
    }

    return href
        ? {
              link: href,
              target: getAttribute(link, "target"),
              type,
              detail,
          }
        : {};
}

/**
 * 解析图片容器样式
 * @param imgBox - 图片容器元素
 * @returns 图片样式相关属性
 */
export function parseCkImageBox(imgBox: HTMLElement): Partial<ImageAttrs> {
    if (!imgBox) return {};
    const {
        borderRadius: radius,
        boxShadow: shadow,
        borderStyle,
        borderColor,
        borderWidth,
        backgroundPosition: pos,
    } = imgBox.style;
    return {
        radius,
        shadow,
        border: borderWidth
            ? {
                  style: borderStyle,
                  color: borderColor,
                  width: borderWidth,
              }
            : undefined,
        pos,
    };
}

/**
 * 解析 CKEditor 图片元素，整合图片、链接、样式等属性
 * @param el - 图片外层元素
 * @returns 完整图片属性对象
 */
export function parseCkImage(el: HTMLElement): ImageAttrs {
    const link = el.querySelector("a");
    const mask = el.querySelector<HTMLElement>(".ue-image-mask")!;
    const imgBox = el.querySelector<HTMLElement>(".ue-image-shadow")!;
    const img = el.querySelector("img");
    const hasResize = el.classList.contains("image_resized");

    return {
        ratio: getAttribute(el, "data-image-ratio"),
        src: getAttribute(img, "src") || "",
        alt: getAttribute(img, "alt") || "",
        imageMask: mask?.style.backgroundColor,
        align: getAttribute(el, "data-align")! || "left",
        width: hasResize ? el.style.width : imgBox?.style.width || "",

        ...parseCkImageBox(imgBox),
        ...parseCkLink(link),
    };
}

/**
 * 解析图片元素样式
 * @param imgItem - 图片元素
 * @returns 图片样式相关属性
 */
export function parseImage(imageDom: HTMLElement): ImageAttrs {
    const imageBox = imageDom.querySelector<HTMLElement>("." + $pageStyle.image_box)!;
    const imageItem = imageDom.querySelector<HTMLElement>("." + $pageStyle.image_item)!;
    const image = imageDom.querySelector("img");
    const imageBoxStyle = imageBox.style;

    const linkData = parseImageLink(imageBox);

    return {
        src: getAttribute(image, "src") || "",
        alt: getAttribute(image, "alt") || "",
        align: (imageDom.style.textAlign as UE_EL_UTIL.ALIGN_X) || "left",
        imageEffect: {
            type: $(imageDom).data("image-effect") || "",
            options: $(imageDom).data("effect-option") || {},
        },
        animate: getAttribute(imageItem, "data-animate"),
        pos: imageBoxStyle.backgroundPosition,
        imgW: getAttribute(image, "width"),
        imgH: getAttribute(image, "height"),
        ...parseImageItem(imageItem),
        imageLink: linkData ? linkData : undefined,
    };
}

export function parseImageLink(imageLink: HTMLElement | null): UE_EL_UTIL.LinkValue | undefined {
    if (!imageLink) return undefined;
    const href = getAttribute(imageLink, "href");

    let popLayer = undefined;
    try {
        popLayer = JSON.parse(getAttribute(imageLink, "data-pop-layer") || "{}");
    } catch (error) {
        console.error(error);
    }

    return href
        ? {
              link: getAttribute(imageLink, "href") || "",
              target: getAttribute(imageLink, "target") || "_blank",
              type: getAttribute(imageLink, "data-link-type") || "link",
              detail: getAttribute(imageLink, "data-link-detail") || "anchor",
              triggerArea: getAttribute(imageLink, "data-trigger-method"),
              popLayer: popLayer,
          }
        : undefined;
}

export function parseImageItem(imageItem: HTMLElement): Partial<ImageAttrs> {
    if (!imageItem) return {};
    const imageItemStyle = imageItem.style;
    const radius = imageItemStyle.getPropertyValue("--radius") || imageItemStyle.borderRadius;
    const mdRadius = imageItemStyle.getPropertyValue("--md-radius") || undefined;

    const ratio = getAttribute(imageItem, "data-image-ratio");
    const sizeMode: ImageAttrs["sizeMode"] = getAttribute(imageItem, "data-size-mode");

    const mdRatio = getAttribute(imageItem, "data-md-image-ratio");
    const mdSizeMode: ImageAttrs["sizeMode"] = getAttribute(imageItem, "data-md-size-mode");

    return {
        ratio,
        sizeMode: sizeMode || (ratio ? ("ratio" as const) : undefined),
        width: imageItemStyle.getPropertyValue("--width") || imageItemStyle.width,
        background: imageItemStyle.background || imageItemStyle.backgroundColor,
        shadow: imageItemStyle.boxShadow,
        border: imageItemStyle.borderWidth
            ? {
                  style: imageItemStyle.borderStyle,
                  color: imageItemStyle.borderColor,
                  width: imageItemStyle.borderWidth,
              }
            : undefined,
        radius: radius,
        imageMask: imageItemStyle.getPropertyValue("--mask-color"),
        height: imageItemStyle.getPropertyValue("--height"),
        md: {
            radius: mdRadius,
            ratio: mdRatio,
            sizeMode: mdSizeMode || (ratio ? ("ratio" as const) : undefined),
            width: imageItemStyle.getPropertyValue("--md-width"),
            height: imageItemStyle.getPropertyValue("--md-height"),
        },
    };
}

// #endregion
