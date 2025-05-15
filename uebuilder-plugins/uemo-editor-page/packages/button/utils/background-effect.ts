import $ from "@stone/uemo-editor-utils/lib/jquery";

import { ButtonEventEventBus } from "./event-bus";

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

    /**
     * 获取按钮属性值
     * @returns 按钮属性值
     */
    const getPropertyValue = () => {
        // 初始化颜色
        const bgColor = toLinearGradient(getBackgroundColor());
        const hoverBgColor = toLinearGradient(getHoverBackgroundColor()) || bgColor;

        // 判断是否需要动画过渡
        const needsAnimation = bgColor.includes("linear-gradient") || hoverBgColor?.includes("linear-gradient");
        const transition = needsAnimation ? "0.26s ease, background 0s" : undefined;

        // 设置过渡效果
        if (transition) {
            $(button).css("transition", transition);
        }

        return {
            bgColor,
            hoverBgColor,
            transition,
        };
    };

    // 创建动画控制器
    const controller = {
        hover: () => {
            const { bgColor, hoverBgColor, transition } = getPropertyValue();

            if (!transition) return;

            gsap.fromTo(
                button,
                { background: bgColor, transition },
                {
                    background: hoverBgColor,
                    duration: 0.3,
                    clearProps: "background,transition",
                    overwrite: "auto",
                }
            );
        },
        leave: () => {
            const { bgColor, hoverBgColor, transition } = getPropertyValue();

            if (!transition) return;

            gsap.fromTo(
                button,
                { background: hoverBgColor, transition },
                {
                    background: bgColor,
                    duration: 0.3,
                    overwrite: "auto",
                    clearProps: "background,transition",
                }
            );
        },
        destroy: () => {
            ButtonEventEventBus.unbind($(button), "ue.button.hover", controller.hover);
            ButtonEventEventBus.unbind($(button), "ue.button.leave", controller.leave);
            ButtonEventEventBus.unbind($(button), "ue.button.destroy", controller.destroy);
        },
    };

    // 绑定事件
    ButtonEventEventBus.bind($(button), "ue.button.hover", controller.hover);
    ButtonEventEventBus.bind($(button), "ue.button.leave", controller.leave);
    ButtonEventEventBus.bind($(button), "ue.button.destroy", controller.destroy);

    return controller;
}
