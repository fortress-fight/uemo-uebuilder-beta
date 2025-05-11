import $ from "@stone/uemo-editor-utils/lib/jquery";

import { ButtonEventEventBus } from "./event-bus";
import $pageStyle from "../app.module.scss";

/**
 * 初始化按钮波浪效果
 * @param button - 按钮DOM元素
 * @returns 返回控制器对象，包含播放和销毁方法
 */
export async function initWaveEffect(button: HTMLElement) {
    // 动态导入GSAP相关依赖
    const { gsap, SplitText, CustomEase } = await import("@stone/uemo-editor-utils/lib/gsap");

    // 创建自定义缓动效果
    CustomEase.create("customEase1", ".46,.4,.56,.87");

    // 获取文本容器和原始文本
    const textBox = button?.querySelector<HTMLElement>("." + $pageStyle["btn-text"]);
    const originText = textBox?.textContent;

    // 初始化文本分割
    // @ts-expect-error
    const text = new SplitText(textBox, { tag: "span", type: "chars" });
    const chars = text.chars;

    /**
     * 创建GSAP动画时间轴
     * 设置初始状态并配置动画效果
     */
    const timeline = gsap.timeline({
        paused: true,
        onStart() {
            gsap.set(chars, { opacity: 0, display: "inline-block" });
        },
    });

    // 添加字符动画
    timeline.to(chars, {
        keyframes: {
            "0%": { opacity: 0, yPercent: 80 },
            "45%": { opacity: 1, yPercent: -20 },
            "100%": { opacity: 1, yPercent: 0 },
        },
        duration: 0.7,
        ease: "customEase1",
        stagger: 0.015,
    });

    /**
     * 创建动画控制器
     */
    const controller = {
        play: () => {
            timeline.play(0);
        },
        destroy: () => {
            timeline.kill();
            $(textBox!).text(originText || "");
            ButtonEventEventBus.unbind($(button), "ue.button.hover", controller.play);
            ButtonEventEventBus.unbind($(button), "ue.button.destroy", controller.destroy);
        },
    };

    // 将控制器绑定到按钮元素
    ButtonEventEventBus.bind($(button), "ue.button.hover", controller.play);
    ButtonEventEventBus.bind($(button), "ue.button.destroy", controller.destroy);
}
