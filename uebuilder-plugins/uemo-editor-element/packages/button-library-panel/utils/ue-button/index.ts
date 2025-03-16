import $ from "@stone/uemo-editor-utils/lib/jquery";
import { _debounce } from "@stone/uemo-editor-utils/lib/lodash";
import { ButtonEventName } from "./utils/helper";
import { buttonCreator } from "./utils/create-button";

/**
 * 按钮管理器类 - 负责按钮组件的生命周期管理和功能初始化
 */
export class UeElButton {
    private static instance: UeElButton | null;
    private static buttonElements = new Set<HTMLElement>();

    // 使用防抖优化 resize 事件处理
    private static resizeObserver: ResizeObserver;

    /**
     * 触发指定事件
     * @param eventName - 事件名称
     * @param button - 按钮DOM元素
     */
    static triggerEvent(eventName: ButtonEventName, button: HTMLElement | HTMLElement[] | NodeListOf<HTMLElement>) {
        if (Array.isArray(button)) {
            button.forEach((btn) => {
                $(btn).trigger(eventName);
            });
        } else {
            $(button).trigger(eventName);
        }
    }

    // 标记 Lottie 组件是否已初始化
    private isLottieReady = false;

    constructor() {
        if (UeElButton.instance) return UeElButton.instance;

        UeElButton.resizeObserver = new ResizeObserver(
            _debounce((targets) => {
                targets.forEach(({ target }: { target: HTMLElement }) => {
                    $(target).trigger(ButtonEventName.RESIZE);
                });
            }, 200)
        );
        UeElButton.instance = this;
    }

    /**
     * 初始化 Lottie 动画组件
     */
    private async initLottieComponent(elements: HTMLElement[]) {
        if (elements.length === 0 || this.isLottieReady) return;
        await import("@stone/uemo-editor-utils/lib/lottie");
        this.isLottieReady = true;
    }

    /**
     * 初始化图标组件
     */
    private async initIcons(elements: HTMLElement[]) {
        if (elements.length === 0) return;
        const { initIconParkComponent } = await import("@stone/uemo-editor-utils/lib/icon");
        initIconParkComponent(elements);
    }

    /**
     * 初始化按钮组
     * @param buttons - 需要初始化的按钮DOM元素数组
     */
    public initButton(buttons: HTMLElement[]) {
        // 并行初始化组件
        Promise.all([
            this.initLottieComponent(Array.from($(buttons).find("dotlottie-player"))),
            this.initIcons(Array.from($(buttons).find("iconpark-icon"))),
        ]).catch(console.error);

        // 初始化每个按钮
        buttons.forEach((button) => {
            const theme = $(button).data("theme") || "normal";
            buttonCreator(theme, button).catch(console.error);

            // 添加 resize 监听并记录按钮
            UeElButton.resizeObserver.observe(button);
            UeElButton.buttonElements.add(button);

            function destroy() {
                UeElButton.resizeObserver.unobserve(button);
                UeElButton.buttonElements.delete(button);
                $(button).off(ButtonEventName.DESTROY, destroy);
            }
            $(button).on(ButtonEventName.DESTROY, destroy);
        });
    }

    /**
     * 销毁指定按钮组
     */
    public destroyButton(buttons: HTMLElement[]) {
        $(buttons).trigger(ButtonEventName.DESTROY);
    }

    /**
     * 清理所有资源
     */
    public destroy() {
        UeElButton.instance = null;
        this.isLottieReady = false;
        this.destroyButton(Array.from(UeElButton.buttonElements));
        UeElButton.resizeObserver.disconnect();
        UeElButton.buttonElements.clear();
    }
}
