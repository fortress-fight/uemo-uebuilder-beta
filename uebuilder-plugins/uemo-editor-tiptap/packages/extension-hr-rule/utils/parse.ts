/*
 * @Description: 解析 hr 规则
 * @Author: F-Stone
 * @LastEditTime: 2025-07-02 01:42:15
 */
import type { HrRuleAttrs } from "../src";

export function parseNormalHrRule(el: HTMLElement): HrRuleAttrs {
    if (!(el instanceof HTMLElement)) {
        return {};
    }

    return {
        color: el.style.borderColor,
        lineType: (el.style.borderStyle || "solid") as "solid" | "dotted" | "dashed",
    };
}

export function parseHrRule(el: HTMLElement): HrRuleAttrs {
    if (!(el instanceof HTMLElement)) {
        return {};
    }

    const style = el.style;
    const borderStyle = style.getPropertyValue("--hr-rule-border-style") || el.style.borderStyle || "solid";

    let borderColor = "";
    if (el.classList.contains("hr")) {
        borderColor = style.borderColor;
    }
    borderColor = style.getPropertyValue("--hr-rule-border-color") || style.borderColor;

    const result = {
        color: borderColor,
        lineType: borderStyle as HrRuleAttrs["lineType"],
        height: style.getPropertyValue("--hr-rule-size") || "40px",
        mdHeight: style.getPropertyValue("--hr-rule-md-size") || "40px",
    };

    return result;
}
