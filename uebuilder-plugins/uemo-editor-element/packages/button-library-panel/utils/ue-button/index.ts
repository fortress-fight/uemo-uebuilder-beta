import $ from "@stone/uemo-editor-utils/lib/jquery";
import { _debounce } from "@stone/uemo-editor-utils/lib/lodash";
import { ButtonEventEventBus } from "./utils/event-bus";
import { buttonCreator } from "./utils/create-button";

/**
 * 按钮管理器类
 * 负责按钮组件的生命周期管理和功能初始化
 * 包括 Lottie 动画、图标等组件的动态加载和初始化
 */
class UeElButtonFactory {
    /** 标记工厂是否已初始化 */
    private initialized = false;

    /** 存储已初始化的按钮元素集合 */
    private buttonElements = new Set<HTMLElement>();

    /** 用于监听按钮大小变化的观察器，使用防抖优化性能 */
    private resizeObserver: ResizeObserver | null = null;

    /** 标记 Lottie 组件是否已初始化 */
    private isLottieReady = false;

    constructor() {
        this.init();
    }

    /**
     * 初始化工厂实例，绑定必要的事件监听
     */
    init() {
        this.bindEvent();
        this.initialized = true;
    }

    /**
     * 绑定按钮大小变化事件监听器
     */
    bindEvent() {
        this.resizeObserver = new ResizeObserver(
            _debounce((targets) => {
                targets.forEach(({ target }: { target: HTMLElement }) => {
                    ButtonEventEventBus.emit($(target), "ue.button.resize");
                });
            }, 200)
        );
    }

    /**
     * 创建新的按钮管理器实例
     * @returns 新的 UeElButtonFactory 实例
     */
    create() {
        return new UeElButtonFactory();
    }

    /**
     * 初始化 Lottie 动画组件
     * @param elements - 包含 Lottie 播放器的元素数组
     */
    private async initLottieComponent(elements: HTMLElement[]) {
        if (elements.length === 0 || this.isLottieReady) return;
        try {
            await import("@stone/uemo-editor-utils/lib/lottie");
            this.isLottieReady = true;
        } catch (error) {
            console.error(error);
        }
    }

    /**
     * 初始化图标组件
     * @param elements - 包含图标组件的元素数组
     */
    private async initIcons(elements: HTMLElement[]) {
        if (elements.length === 0) return;
        const { initIconParkComponent } = await import("@stone/uemo-editor-utils/lib/icon");
        initIconParkComponent(elements);
    }

    /**
     * 初始化按钮组
     * @param buttons - 需要初始化的按钮DOM元素数组
     * @returns 包含销毁方法的对象
     */
    public initButton(buttons: HTMLElement[]) {
        if (!this.initialized) {
            this.init();
        }

        // 并行初始化组件
        Promise.all([
            this.initLottieComponent(Array.from($(buttons).find("dotlottie-player"))),
            this.initIcons(Array.from($(buttons).find("iconpark-icon"))),
        ]).catch(console.error);

        // 初始化每个按钮
        buttons.forEach((button) => {
            // 如果按钮已经存在，则不进行初始化
            if (this.buttonElements.has(button)) return;

            const theme = $(button).data("theme") || "normal";
            buttonCreator(theme, button).catch(console.error);

            // 添加 resize 监听并记录按钮
            this.resizeObserver?.observe(button);
            this.buttonElements.add(button);
        });

        return {
            kill: () => {
                this.destroyButton(buttons);
            },
        };
    }

    /**
     * 销毁工厂实例，清理资源
     */
    private destroyInstance() {
        this.removeEvent();
        this.isLottieReady = false;
        this.initialized = false;
    }

    /**
     * 移除所有事件监听器
     */
    private removeEvent() {
        this.resizeObserver?.disconnect();
    }

    /**
     * 销毁指定按钮组
     * @param buttons - 需要销毁的按钮DOM元素数组，如果不提供则销毁所有按钮
     */
    public destroyButton(buttons: HTMLElement[] = Array.from(this.buttonElements)) {
        buttons.forEach((button) => {
            if (!this.buttonElements.has(button)) return;

            this.resizeObserver?.unobserve(button);
            this.buttonElements.delete(button);
            ButtonEventEventBus.emit($(button), "ue.button.destroy");
            ButtonEventEventBus.clear($(button));
        });

        if (this.buttonElements.size === 0) {
            this.destroyInstance();
        }
    }
}

const ueElButton = new UeElButtonFactory();

export { ueElButton };
