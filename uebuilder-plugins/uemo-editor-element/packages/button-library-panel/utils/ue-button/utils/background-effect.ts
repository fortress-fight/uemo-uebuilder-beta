import $ from "@stone/uemo-editor-utils/lib/jquery";

import { ButtonEventName } from "./helper";

/**
 * 初始化按钮背景悬浮效果
 * @param button - 按钮DOM元素
 */
export async function initBackgroundHoverEffect(button: HTMLElement) {
    // 动态导入GSAP
    const { gsap } = await import("@stone/uemo-editor-utils/lib/gsap");

    // 获取按钮样式
    const btnStyle = button.style;

    // 处理背景色
    const getBackgroundColor = () => {
        const oldBg = btnStyle.getPropertyValue("--background-color");
        const bg = btnStyle.getPropertyValue("--background") || "transparent";
        return oldBg || bg;
    };

    // 处理悬浮背景色
    const getHoverBackgroundColor = () => {
        const oldHoverBg = btnStyle.getPropertyValue("--hover-bg-color");
        const hoverBg = btnStyle.getPropertyValue("--hover-background");
        return oldHoverBg || hoverBg;
    };

    // 转换为线性渐变
    const toLinearGradient = (color: string) => {
        if (!color || color.includes("linear-gradient")) return color;
        return `linear-gradient(90deg, ${color} 0%, ${color} 100%)`;
    };

    // 初始化颜色
    const color = btnStyle.getPropertyValue("--color");
    const hoverColor = btnStyle.getPropertyValue("--hover-color") || color;
    const bgColor = toLinearGradient(getBackgroundColor());
    const hoverBgColor = toLinearGradient(getHoverBackgroundColor()) || bgColor;

    // 判断是否需要动画过渡
    const needsAnimation = bgColor.includes("linear-gradient") || hoverBgColor?.includes("linear-gradient");

    // 设置过渡效果
    $(button).css("transition", needsAnimation ? "0.26s ease, background 0s, color 0s" : "0.26s ease, background 0s");

    // 创建动画控制器
    const controller = {
        hover: () => {
            if (!needsAnimation) return;
            gsap.fromTo(
                button,
                { background: bgColor, color: color },
                { background: hoverBgColor, color: hoverColor, duration: 0.3 }
            );
        },
        leave: () => {
            if (!needsAnimation) return;
            gsap.fromTo(
                button,
                { background: hoverBgColor, color: hoverColor },
                { background: bgColor, color: color, duration: 0.3 }
            );
        },
        destroy: () => {
            $(button).off(ButtonEventName.HOVER, controller.hover);
            $(button).off(ButtonEventName.LEAVE, controller.leave);
            $(button).off(ButtonEventName.DESTROY, controller.destroy);
        },
    };

    // 绑定事件
    $(button).on(ButtonEventName.HOVER, controller.hover);
    $(button).on(ButtonEventName.LEAVE, controller.leave);
    $(button).on(ButtonEventName.DESTROY, controller.destroy);

    return controller;
}
