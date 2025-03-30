/*
 * @Description: 获取按钮样式
 * @Author: F-Stone
 * @LastEditTime: 2025-03-16 16:49:42
 */

import { _pickBy } from "@stone/uemo-editor-utils/lib/lodash";
import { attrToStyle } from "@stone/uemo-editor-utils/lib/utils";

export function getBoxStyle(attrs: UE_EL_UTIL.ResourceButtonItem["attrs"]) {
    const styleVar = {
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
    };
    return attrToStyle(_pickBy(styleVar, (v) => v != ""));
}
