import $ from "@stone/uemo-editor-utils/lib/jquery";

import { ButtonEventEventBus } from "./event-bus";

/**
 * 初始化按钮旋转效果
 * @param button - 按钮DOM元素
 */
export function initRotateEffect(button: HTMLElement) {
    const updateOriginX = () => {
        if (!button) return;
        const height = button?.offsetHeight || 0;
        button.style.setProperty("--origin-z", `${-height / 2}px`);
    };

    updateOriginX();

    const controller = {
        play: () => {
            //
        },
        destroy: () => {
            ButtonEventEventBus.unbind($(button), "ue.button.resize", updateOriginX);
            ButtonEventEventBus.unbind($(button), "ue.button.hover", controller.play);
            ButtonEventEventBus.unbind($(button), "ue.button.destroy", controller.destroy);
        },
    };

    ButtonEventEventBus.bind($(button), "ue.button.resize", updateOriginX);
    ButtonEventEventBus.bind($(button), "ue.button.hover", controller.play);
    ButtonEventEventBus.bind($(button), "ue.button.destroy", controller.destroy);
}
