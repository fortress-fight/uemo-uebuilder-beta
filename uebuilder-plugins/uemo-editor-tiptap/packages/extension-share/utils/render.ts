/*
 * @Description: 渲染分享行属性
 * @Author: F-Stone
 * @LastEditTime: 2025-07-02 11:34:37
 */
import type { DOMOutputSpec } from "@tiptap/pm/model";

import type { ShareRowAttrs, ShareItemAttrs } from "../src";

import { attrToStyle } from "@stone/uemo-editor-utils/lib/utils";

import { resolveBorderStyle } from "../../../utils/tiptap-helper";

import $pageStyle from "../../../src/app.module.scss";

import { _pickBy } from "@stone/uemo-editor-utils/lib/lodash";

/**
 * 获取分享行属性
 *
 * @export
 * @param {ShareRowAttrs} attrs
 * @return {*}  {Record<string, string | undefined>}
 */
export function getShareRowAttrs(attrs: ShareRowAttrs): Record<string, string | undefined> {
    const { fontSize, align, moAlign } = attrs;
    const dataMap: Record<string, string | undefined> = {};

    if (fontSize?.endsWith("px")) {
        dataMap.class = ($pageStyle as any)["text-" + parseInt(fontSize)];
    } else {
        dataMap["data-font-size"] = fontSize;
    }

    if (!(!moAlign || moAlign === align)) {
        dataMap["data-mo-align"] = moAlign;
    }

    return {
        ...dataMap,
        style: attrToStyle({ "font-size": fontSize, "text-align": align }),
    };
}

/**
 * 渲染分享行属性
 *
 * @export
 * @param {ShareRowAttrs} attrs
 * @return {*}  {DOMOutputSpec}
 */
export function renderShareRowAttrs(attrs: ShareRowAttrs): DOMOutputSpec {
    const { fontSize, align, moAlign } = attrs;

    const dataMap: Record<string, string | undefined> = {};

    if (fontSize?.endsWith("px")) {
        dataMap.class = ($pageStyle as any)["text-" + parseInt(fontSize)];
    } else {
        dataMap["data-font-size"] = fontSize;
    }

    if (!(!moAlign || moAlign === align)) {
        dataMap["data-mo-align"] = moAlign;
    }

    return ["div", getShareRowAttrs(attrs), ["div", { class: $pageStyle["share-list"] }, 0]];
}

const attrDefaultMap: Record<string, any> = {
    "--share-border-style": "solid",
    "--share-border-radius": "50%",
    "--share-color": "",
};

/**
 * 获取分享项样式
 *
 * @export
 * @param {ShareItemAttrs} attrs
 * @return {*}  {string}
 */
export function getShareItemStyle(attrs: ShareItemAttrs): string {
    const { borderWidth, borderColor, borderStyle } = resolveBorderStyle(attrs.border);

    return attrToStyle(
        {
            "--share-color": attrs.color,
            "--share-border-radius": attrs.radius,
            ...(borderWidth && borderWidth != "0px"
                ? {
                      "--share-border-width": borderWidth,
                      "--share-border-color": borderColor,
                      "--share-border-style": borderStyle,
                  }
                : {}),
            "--share-background-color": attrs.background,
        },
        attrDefaultMap
    );
}

/**
 * 渲染分享项属性
 *
 * @export
 * @param {ShareItemAttrs} attrs
 * @return {*}  {DOMOutputSpec}
 */
export function renderShareItemAttrs(attrs: ShareItemAttrs): DOMOutputSpec {
    return [
        attrs.link ? "a" : "div",
        {
            class: $pageStyle.share,
            ..._pickBy(
                {
                    href: attrs.link,
                    target: attrs.linkTarget || "_blank",
                    "data-link-type": attrs.linkType,
                    "data-link-detail": attrs.linkDetail,
                    "data-trigger-method": attrs.triggerMethod,
                    "data-pop-layer": attrs.linkPopLayer ? JSON.stringify(attrs.linkPopLayer) : undefined,
                    style: getShareItemStyle(attrs),
                },
                (v) => v != ""
            ),
        },
        ["div", { class: $pageStyle["share-icon"] }, ["i", { class: attrs.icon }]],
    ];
}
