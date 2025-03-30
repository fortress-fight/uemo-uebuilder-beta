/*
 * @Description: tippy 插件
 * @Author: F-Stone
 * @LastEditTime: 2025-02-28 12:38:35
 */
import type { App, DirectiveBinding } from "vue";
import type { Placement } from "@stone/uemo-editor-utils/lib/tippy";

import tippy, { followCursor } from "@stone/uemo-editor-utils/lib/tippy";

import "./style.scss";

tippy.setDefaultProps({ plugins: [followCursor] });

export type TippyPlacement = Placement;

// 使用 WeakMap 缓存绑定数据，避免重复 DOM 查询
const controlMap = new WeakMap<HTMLElement, ReturnType<typeof createLabelControl>>();

/**
 * 将非数组类型转换为数组
 * @param val - 单个值或数组
 * @returns 数组形式的值
 */
function toArr<T>(val: T | T[]): T[] {
    if (!val) return [];
    return Array.isArray(val) ? val : [val];
}

/**
 * 创建 tippy 实例
 * @param el - 目标 DOM 元素
 * @param config - 标签配置，可为字符串或配置对象
 * @returns tippy 实例
 */
function createTippyInstance(el: HTMLElement, config: UE_EL_UTIL.LabelOption) {
    return typeof config === "string" ? tippy(el, { offset: [0, 6], content: config }) : tippy(el, config);
}

/**
 * 创建标签控制器对象
 * @param el - 目标 DOM 元素
 * @param tippyGroup - tippy 实例数组
 * @returns 控制器对象，含 update、disable 与 destroy 方法
 */
function createLabelControl(el: HTMLElement, tippyGroup: (ReturnType<typeof tippy>[number] | undefined)[]) {
    return {
        /**
         * 更新 tippy 实例
         * @param params - 标签配置数组
         */
        update: (params: UE_EL_UTIL.LabelOption[]) => {
            // 若新参数数量少于现有实例，禁用多余的实例
            if (params.length < tippyGroup.length) {
                tippyGroup.slice(params.length).forEach((t) => t?.disable?.());
            }
            params.forEach((param, index) => {
                if (typeof param === "undefined") {
                    tippyGroup[index]?.disable?.();
                    return;
                }
                if (!tippyGroup[index]) {
                    tippyGroup[index] = createTippyInstance(el, param);
                    return;
                }
                tippyGroup[index]?.enable?.();
                if (typeof param === "string") {
                    tippyGroup[index]?.setContent?.(param);
                } else {
                    tippyGroup[index]?.setProps?.(param);
                }
            });
        },
        /**
         * 禁用所有 tippy 实例
         */
        disable: () => {
            tippyGroup.forEach((t) => t?.disable?.());
        },
        /**
         * 销毁所有 tippy 实例
         */
        destroy: () => {
            tippyGroup.forEach((t) => t?.destroy?.());
        },
    };
}

/**
 * 初始化元素的标签
 * @param el - 被绑定的 DOM 元素
 * @param options - 标签配置选项数组
 */
function initUeElLabel(el: HTMLElement, options: UE_EL_UTIL.LabelOption[]) {
    if (options.length === 0) return;

    // 构造所有 tippy 实例
    const tippyGroup: (ReturnType<typeof tippy>[number] | undefined)[] = options.map((param) => {
        if (typeof param === "undefined") return undefined;
        return createTippyInstance(el, param);
    });

    // 使用 WeakMap 缓存控制对象
    controlMap.set(el, createLabelControl(el, tippyGroup));
}

// 注册 vue 指令
/**
 * vue3 插件安装方法
 * @param app - vue 应用实例
 */
export function install(app: App) {
    app.directive("ue-el-label", {
        /**
         * 挂载时初始化标签
         */
        mounted(el: HTMLElement, binding: DirectiveBinding<UE_EL_UTIL.LabelOption | UE_EL_UTIL.LabelOption[]>) {
            if (!binding.value) return;
            initUeElLabel(el, toArr(binding.value));
        },
        /**
         * 更新时修改标签状态
         */
        updated(el: HTMLElement, binding: DirectiveBinding<UE_EL_UTIL.LabelOption | UE_EL_UTIL.LabelOption[]>) {
            const control = controlMap.get(el);
            if (!control) {
                if (!binding.value) return;
                initUeElLabel(el, toArr(binding.value));
                return;
            }
            if (!binding.value) {
                control.disable();
                return;
            }
            control.update(toArr(binding.value));
        },
        /**
         * 卸载时销毁标签
         */
        unmounted(el: HTMLElement) {
            controlMap.get(el)?.destroy();
            controlMap.delete(el);
        },
    });
}
