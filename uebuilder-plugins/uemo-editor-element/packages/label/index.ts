/*
 * @Description: tippy 插件
 * @Author: F-Stone
 * @LastEditTime: 2025-02-20 17:01:58
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
    if (Array.isArray(val)) return val;
    return [val];
}

/**
 * 创建标签控制器对象
 * @param el - 目标DOM元素
 * @param tippyGroup - tippy 实例数组
 * @returns 标签的控制器对象，包括 update、disable 和 destroy 方法
 */
function createLabelControl(el: HTMLElement, tippyGroup: (ReturnType<typeof tippy>[number] | undefined)[]) {
    return {
        /**
         * 更新 tippy 实例
         * @param params - 标签配置数组
         */
        update: (params: UE_EL_UTIL.LabelOption[]) => {
            if (params.length === 0) {
                tippyGroup.forEach((t) => t?.disable?.());
                return;
            }
            params.forEach((param, index) => {
                if (typeof param === "undefined") {
                    tippyGroup[index]?.disable?.();
                    return;
                }
                if (param && !tippyGroup[index]) {
                    tippyGroup[index] =
                        typeof param === "string" ? tippy(el, { offset: [0, 6], content: param }) : tippy(el, param);
                    return;
                }
                if (param && tippyGroup[index]) {
                    tippyGroup[index]?.enable?.();
                    if (typeof param === "string") {
                        tippyGroup[index]?.setContent?.(param);
                    } else {
                        tippyGroup[index]?.setProps?.(param);
                    }
                }
            });

            // 禁用多余的 tippy 实例
            if (params.length < tippyGroup.length) {
                tippyGroup.slice(params.length).forEach((t) => t?.disable?.());
            }
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
 * @param el - 被绑定的DOM元素
 * @param options - 标签配置选项数组
 */
function initUeElLabel(el: HTMLElement, options: UE_EL_UTIL.LabelOption[]) {
    if (options.length === 0) return;

    // 构造所有 tippy 实例
    const tippyGroup: (ReturnType<typeof tippy>[number] | undefined)[] = options.map((param) => {
        if (typeof param === "undefined") return undefined;
        return typeof param === "string" ? tippy(el, { offset: [0, 6], content: param }) : tippy(el, param);
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
        mounted(el: HTMLElement, binding: DirectiveBinding) {
            if (!binding.value) return;
            initUeElLabel(el, toArr(binding.value));
        },
        /**
         * 更新时修改标签状态
         */
        updated(el: HTMLElement, binding: DirectiveBinding) {
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
