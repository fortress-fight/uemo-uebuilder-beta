import { initWaveEffect } from "./wave-effect";
import { initRotateEffect } from "./rotate-effect";
import { initBackgroundHoverEffect } from "./background-effect";
import { initHoverEvent, initLottieIcon, initSvgIcon } from "./helper";

/**
 * 按钮创建器
 * @param theme - 按钮主题
 * @param button - 按钮DOM元素
 */
export async function buttonCreator(theme = "", button?: HTMLElement) {
    if (!button) return;

    initBackgroundHoverEffect(button).catch((error) => {
        console.error(error);
    });

    switch (theme.split("-")[0]) {
        case "wave":
            {
                await initWaveEffect(button).catch((error) => {
                    console.error(error);
                });
            }
            break;

        case "rotate":
            {
                initRotateEffect(button);
            }
            break;

        default:
            break;
    }

    initHoverEvent(button);
    initLottieIcon(button);
    initSvgIcon(button);
}
