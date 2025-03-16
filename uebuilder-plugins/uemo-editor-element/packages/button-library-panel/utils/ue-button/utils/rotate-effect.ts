import $ from "@stone/uemo-editor-utils/lib/jquery";

import { ButtonEventName } from "./helper";

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
            $(button).off(ButtonEventName.RESIZE, updateOriginX);
            $(button).off(ButtonEventName.PLAY, controller.play);
            $(button).off(ButtonEventName.HOVER, controller.play);
            $(button).off(ButtonEventName.DESTROY, controller.destroy);
        },
    };

    $(button).on(ButtonEventName.RESIZE, updateOriginX);
    $(button).on(ButtonEventName.PLAY, controller.play);
    $(button).on(ButtonEventName.HOVER, controller.play);
    $(button).on(ButtonEventName.DESTROY, controller.destroy);
}
