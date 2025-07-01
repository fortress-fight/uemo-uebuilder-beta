import type { GridGroupAttrs, GridItemAttrs } from "../src";
import type { DOMOutputSpec } from "@tiptap/pm/model";

import { _omit } from "@stone/uemo-editor-utils/lib/lodash";

import $pageStyle from "../../../src/app.module.scss";

import { resolveBorderStyle } from "../../../utils/tiptap-helper";

import { attrToStyle } from "@stone/uemo-editor-utils/lib/utils";
import { getGridInfo } from "@stone/uemo-editor-utils/lib/css-grid";
import { renderBackgroundLayer } from "@stone/uemo-editor-tiptap/utils/background-layer";

/**
 * 网格分组渲染
 * @param {GridGroupAttrs} attrs - 分组属性
 * @returns {DOMOutputSpec} 分组 DOM 结构
 */
export function gridGroupRender(attrs: GridGroupAttrs): DOMOutputSpec {
    const children = [];

    if (attrs.background?.length || attrs.mdBackground?.length) {
        children.push(
            renderBackgroundLayer(
                { radius: attrs.radius, xxlBg: attrs.background, mdBg: attrs.mdBackground },
                "grid-group"
            )
        );
    }

    children.push([
        "div",
        {
            class: $pageStyle["grid-layer--inner"],
            style: getGridGroupStyle(attrs),
        },
        0,
    ]);

    return [
        "div",
        {
            class: $pageStyle["grid-layer"],
            "data-config": JSON.stringify(attrs),
            "data-align-x": attrs.alignX,
            "data-align-y": attrs.alignY,
        },
        ...children,
    ];
}

/**
 * 网格项渲染
 * @param {GridItemAttrs} attrs - 网格项属性
 * @returns {DOMOutputSpec} 网格项 DOM 结构
 */
export function gridItemRender(attrs: GridItemAttrs): DOMOutputSpec {
    const children = [];

    if (attrs.background?.length || attrs.mdBackground?.length) {
        children.push(
            renderBackgroundLayer(
                { radius: attrs.radius, xxlBg: attrs.background, mdBg: attrs.mdBackground },
                "grid-item"
            )
        );
    }

    children.push(["div", { class: $pageStyle["grid-item--inner"] }, 0]);

    return [
        "div",
        {
            class: $pageStyle["grid-item"],
            "data-config": JSON.stringify(attrs),
            style: getGridItemStyle(attrs),
        },
        ...children,
    ];
}

/**
 * 生成网格分组样式
 * @param {GridGroupAttrs} attrs - 分组属性
 * @returns {string} 样式字符串
 */
export function getGridGroupStyle(attrs: GridGroupAttrs): string {
    const pcGridInfo = getGridInfo(attrs.grid);
    const mdGridInfo = getGridInfo(attrs.mdGrid);

    const { borderWidth, borderColor, borderStyle } = resolveBorderStyle(attrs.border);

    const styleAttr: Record<string, any> = {
        "--grid-template-columns": pcGridInfo.colTemplate,
        "--grid-template-rows": pcGridInfo.rowTemplate,
        "--md-grid-template-columns": mdGridInfo.colTemplate,
        "--md-grid-template-rows": mdGridInfo.rowTemplate,

        gap: attrs.gap,
        "--md-grid-layer-gap": attrs.mdGap,

        padding: attrs.padding,
        width: attrs.width,
        "border-radius": attrs.radius,
        overflow: attrs.overflow || undefined,
        "box-shadow": attrs.shadow,
        background: attrs.background,
    };

    if (borderWidth) {
        styleAttr["border-style"] = borderStyle;
        styleAttr["border-width"] = borderWidth;
        styleAttr["border-color"] = borderColor;
    }

    return attrToStyle(styleAttr);
}

/**
 * 生成网格项样式
 * @param {GridItemAttrs} attrs - 网格项属性
 * @returns {string} 样式字符串
 */
export function getGridItemStyle(attrs: GridItemAttrs): string {
    const { borderWidth, borderColor, borderStyle } = resolveBorderStyle(attrs.border);

    const styleAttr: Record<string, any> = {
        "grid-area": attrs.gridArea,
        "--md-grid-layer-item-area": attrs.mdGridArea,
        "--grid-layer-item-padding": attrs.padding,
        "--md-grid-layer-item-padding": attrs.mdPadding,
        "border-radius": attrs.radius,
        "box-shadow": attrs.shadow,
        overflow: attrs.overflow || undefined,
    };

    if (borderWidth) {
        styleAttr["border-style"] = borderStyle;
        styleAttr["border-width"] = borderWidth;
        styleAttr["border-color"] = borderColor;
    }

    return attrToStyle(styleAttr);
}
