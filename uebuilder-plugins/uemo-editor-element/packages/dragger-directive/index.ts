/*
 * @Description: 拖拽行为指令
 * @Author: F-Stone
 * @LastEditTime: 2025-02-28 15:21:30
 */

import type { App, DirectiveBinding } from "vue";
import { gsap } from "@stone/uemo-editor-utils/lib/gsap";
import { Dragger, DraggerControl } from "@stone/uemo-editor-utils/lib/dragger";
import { guid } from "@stone/uemo-editor-utils/lib/guid";
import $ from "@stone/uemo-editor-utils/lib/jquery";

import "./style.scss";

// 类型定义
interface DraggerControl {
    destroy: () => void;
    disable: () => void;
    enable: () => void;
    update: () => void;
}

// 常量定义
const CONSTANTS = {
    DATA_DRAGGER_KEY: "ue-el-dragger",
    DATA_DRAGGING_CONTROL_KEY: "ueElDraggingControl",
    RESIZE_DEBOUNCE_TIME: 200,
    ARROW_TEMPLATE: (x: number, y: number) => `
        <div class='resizable_arrow' style='left: ${x}px; top: ${y}px'>
            <svg class='resizable_arrow-svg' viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
                <path class='resizable_arrow-path' d="M1024 512a36.205714 36.205714 0 0 1-10.861714 25.709714l-146.285715 146.285715A36.425143 36.425143 0 0 1 841.142857 694.857143c-20.004571 0-36.571429-16.566857-36.571428-36.571429v-73.142857H219.428571v73.142857c0 20.004571-16.566857 36.571429-36.571428 36.571429a36.205714 36.205714 0 0 1-25.709714-10.861714l-146.285715-146.285715C4.022857 530.870857 0 521.691429 0 512s3.986286-18.870857 10.861714-25.709714l146.285715-146.285715A36.425143 36.425143 0 0 1 182.857143 329.142857c20.004571 0 36.571429 16.566857 36.571428 36.571429v73.142857h585.142858v-73.142857c0-20.004571 16.566857-36.571429 36.571428-36.571429a36.205714 36.205714 0 0 1 25.709714 10.861714l146.285715 146.285715A36.425143 36.425143 0 0 1 1024 512z" fill="#111"></path>
            </svg>
        </div>`,
};

/**
 * 全局状态管理对象
 * 维护全局共享的 DOM 引用和观察器实例
 */
const globalState = {
    $document: $(document),
    $window: $(window),
    resizeObserver: new ResizeObserver((entries) => {
        for (const entry of entries) {
            const $target = $(entry.target);
            const dragger = $target.data(CONSTANTS.DATA_DRAGGER_KEY);
            dragger?.update();
        }
    }),
};

/**
 * 创建新的拖拽器实例
 * @param el - 目标 DOM 元素
 * @returns DraggerControl 拖拽控制器实例
 */
function createDragger(el: HTMLElement): DraggerControl {
    const $el = $(el);
    const dragger = new Dragger(el, {
        padding: 17,
        mask: true,
        elastic: true,
        initPos: false,
        trigger: "[data-dragger-target]",
        excludeTrigger: "[data-dragger-disable]",
    });

    dragger.init();
    const uid = guid();
    const control = DraggerControl.get(el);

    const instance = {
        destroy: () => {
            control.destroy();
            globalState.resizeObserver.unobserve(el);
            $el.data(CONSTANTS.DATA_DRAGGER_KEY, null);
            globalState.$window.off(`resize.${uid}`);
        },
        disable: () => control.disable(),
        enable: () => control.enable(),
        update: () => {
            if (!control.isDisabled()) {
                control.applyBounds();
            }
        },
    };

    globalState.$window.on(`resize.${uid}`, instance.update);
    globalState.resizeObserver.observe(el);
    $el.data(CONSTANTS.DATA_DRAGGER_KEY, instance);

    return instance;
}

/**
 * 拖动处理类
 * 处理元素的拖动行为，包括指针锁定、虚拟光标显示等
 */
class DraggingHandler {
    private $el: JQuery<HTMLElement>;
    private binding: DirectiveBinding<UE_EL_UTIL.DraggerDirectiveParam>;
    /** 记录水平方向的移动距离 */
    private moveX = 0;
    /** 虚拟光标 DOM 元素 */
    private arrowDom: JQuery<HTMLElement> | null = null;

    /**
     * 初始化拖动处理器
     * @param el - 目标 DOM 元素
     * @param binding - Vue 指令绑定对象
     */
    constructor(el: HTMLElement, binding: DirectiveBinding<UE_EL_UTIL.DraggerDirectiveParam>) {
        this.$el = $(el);
        this.binding = binding;
        this.init();
    }

    private init(): void {
        this.$el.on("pointerdown.ue-el-dragging", this.lockPointer.bind(this));
        this.$el.on("pointerup.ue-el-dragging", this.releasePointer.bind(this));
    }

    /**
     * 锁定指针并创建虚拟光标
     * @param ev - 指针事件对象
     */
    private lockPointer(ev: JQuery.TriggeredEvent<HTMLElement, undefined, HTMLElement, HTMLElement>): void {
        const originalEvent = ev.originalEvent as PointerEvent | undefined;
        if (!originalEvent || !(originalEvent instanceof PointerEvent)) return;

        this.binding.value.onStart?.();
        this.$el.attr({ tabindex: "0", hidefocus: "true" }).trigger("focus");

        const clientX = originalEvent.clientX;
        const clientY = originalEvent.clientY;
        const movementX = originalEvent.movementX;

        this.moveX = movementX;
        this.arrowDom = $(CONSTANTS.ARROW_TEMPLATE(clientX - 12, clientY - 12));

        globalState.$document
            .on("pointerlockchange.ue-el-dragging", this.handleLockChange.bind(this))
            .on("pointerlockerror.ue-el-dragging", this.releasePointerLock.bind(this));

        void this.$el[0].requestPointerLock().catch(() => console.error("请求指针锁失败"));
    }

    /**
     * 处理指针移动事件
     * 更新虚拟光标位置并触发回调
     * @param ev - 指针事件对象
     */
    private handlePointerMove = (ev: JQuery.TriggeredEvent): void => {
        if (!(ev.originalEvent instanceof PointerEvent) || !this.arrowDom) return;

        this.moveX += ev.originalEvent.movementX;
        gsap.set(this.arrowDom, {
            left: () => {
                this.binding.value.onChange(this.moveX);

                const pos = (ev.originalEvent as PointerEvent).clientX - 12 + this.moveX;
                return pos > 0 ? pos % window.innerWidth : (pos + window.innerWidth) % window.innerWidth;
            },
        });
    };

    /**
     * 处理指针锁定状态变化
     * 管理虚拟光标的显示和事件绑定
     */
    private handleLockChange(): void {
        if (document.pointerLockElement === this.$el[0] && this.arrowDom) {
            this.arrowDom.appendTo("body");
            globalState.$document.on("pointermove.ue-el-dragging", this.handlePointerMove);
        } else {
            this.releasePointerLock();
        }
    }

    private releasePointerLock(): void {
        this.arrowDom?.remove();
        this.arrowDom = null;
        globalState.$document
            .off("pointerlockerror.ue-el-dragging")
            .off("pointerlockchange.ue-el-dragging")
            .off("pointermove.ue-el-dragging");
    }

    private releasePointer(): void {
        this.$el.trigger("blur").removeAttr("tabindex hidefocus");
        if (document.pointerLockElement === this.$el[0]) {
            document.exitPointerLock();
        }
    }

    destroy(): void {
        this.$el.removeAttr("dragger-changing").off("pointerdown.ue-el-dragging").off("pointerup.ue-el-dragging");
        this.releasePointerLock();
    }
}

/**
 * 拖拽管理器
 * 负责创建、销毁和管理拖拽实例
 */
const draggerManager = {
    /**
     * 添加拖拽功能到指定元素
     */
    add(el: HTMLElement): void {
        createDragger(el);
    },

    /**
     * 切换指定元素的拖拽功能状态
     */
    toggle(el: HTMLElement, enable: boolean): void {
        const $el = $(el);
        const dragger = $el.data(CONSTANTS.DATA_DRAGGER_KEY);

        if (dragger) {
            void (enable ? dragger.enable() : dragger.disable());
        } else if (enable) {
            draggerManager.add(el);
        }
    },

    /**
     * 移除指定元素的拖拽功能
     */
    remove(el: HTMLElement): void {
        $(el).data(CONSTANTS.DATA_DRAGGER_KEY)?.destroy();
    },
};

/**
 * 安装 Vue 指令
 * 注册 ue-el-dragging 和 ue-el-dragger 两个指令
 * @param app - Vue 应用实例
 */
export function install(app: App): void {
    // 拖动指令：处理元素的拖动行为
    app.directive("ue-el-dragging", {
        mounted(el: HTMLElement, binding: DirectiveBinding<UE_EL_UTIL.DraggerDirectiveParam>) {
            if (!binding.value?.onChange) return;
            const handler = new DraggingHandler(el, binding);
            $(el).data(CONSTANTS.DATA_DRAGGING_CONTROL_KEY, handler);
        },
        unmounted(el: HTMLElement) {
            const handler = $(el).data(CONSTANTS.DATA_DRAGGING_CONTROL_KEY) as DraggingHandler;
            handler?.destroy();
        },
    });

    // 拖拽器指令：处理元素的拖拽行为
    app.directive("ue-el-dragger", {
        mounted(el: HTMLElement, binding: DirectiveBinding<boolean>) {
            if (binding.value) draggerManager.add(el);
        },
        updated(el: HTMLElement, binding: DirectiveBinding<boolean>) {
            draggerManager.toggle(el, Boolean(binding.value));
        },
        unmounted(el: HTMLElement) {
            draggerManager.remove(el);
        },
    });
}
