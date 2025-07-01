/*
 * @Description: 渲染 hr 规则
 * @Author: F-Stone
 * @LastEditTime: 2025-07-02 02:38:39
 */

import type { DOMOutputSpec } from "@tiptap/pm/model";
import type { HrRuleAttrs } from "../src";

import { attrToStyle } from "@stone/uemo-editor-utils/lib/utils";

import $pageStyle from "../../../src/app.module.scss";

export function getHrRuleStyle(attrs: HrRuleAttrs): string {
    return attrToStyle({
        "--hr-rule-size": attrs.height,
        "--hr-rule-md-size": attrs.mdHeight,
        "--hr-rule-border-color": attrs.color,
        "--hr-rule-border-style": attrs.lineType,
    });
}

export function renderHrRule(attrs: HrRuleAttrs): DOMOutputSpec {
    return [
        "div",
        {
            class: $pageStyle["editor-hr"],
            style: getHrRuleStyle(attrs),
        },
        ["div", { class: $pageStyle["editor-hr--inner"] }],
    ];
}
