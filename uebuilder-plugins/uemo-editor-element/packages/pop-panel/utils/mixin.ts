/*
 * @Description: 创建弹窗主题 (Vue3 版本)
 * @Author: F-Stone
 * @LastEditTime: 2025-09-19 13:15:48
 */

import type { App, VNode } from "vue";
import type { UeElPopPanelBaseProps } from "../index";

import { h, isRef, getCurrentInstance, onBeforeUnmount, computed, nextTick, render } from "vue";
import UeElDialogLayer from "../Main.vue";

/**
 * 弹窗组件实例接口
 */
export interface PopPanelInstance {
    closePanel: () => void;
    updateDialogPos: () => Promise<void>;
}

/**
 * 弹窗实例管理接口
 */
export interface DialogInstance {
    /** 弹窗应用实例 */
    app: App;
    /** 弹窗组件实例 */
    dialogLayer: PopPanelInstance | undefined;
    /** 关闭弹窗 */
    closeDialog: () => void;
    /** 更新弹窗位置 */
    updateDialogBoxPos: () => void;
    /** 销毁弹窗实例 */
    destroy: () => void;
}

/**
 * 插槽渲染函数类型
 */
export type SlotRenderFunction = () => VNode | VNode[];

/**
 * @description 安全渲染函数，确保 VNode 有正确的应用上下文
 */
function safeRender(vnode: VNode, container: Element, app: App) {
    try {
        // 设置正确的应用上下文
        vnode.appContext = app._context;

        // 如果 VNode 有子节点，递归设置上下文
        if (vnode.children && Array.isArray(vnode.children)) {
            vnode.children.forEach((child) => {
                if (typeof child === "object" && child !== null && "appContext" in child) {
                    (child as VNode).appContext = app._context;
                }
            });
        }

        render(vnode, container);
    } catch (error) {
        console.error("渲染弹窗时出错:", error);
        throw error;
    }
}

/**
 * @description 创建弹窗层展示 (使用现有应用实例，避免插件问题)
 */
function createDialogLayer(
    parentApp: App | undefined,
    props: UeElPopPanelBaseProps,
    slots: Record<string, SlotRenderFunction>
): DialogInstance {
    let dialogLayer: PopPanelInstance | undefined;
    let container: HTMLElement | undefined;

    // 获取父组件实例
    const currentInstance = getCurrentInstance();
    const parentInstance = currentInstance || undefined;

    // 优先使用现有应用实例，避免插件安装检查问题
    const targetApp = parentApp || parentInstance?.appContext.app;

    if (!targetApp) {
        throw new Error("无法获取应用实例，请确保在 Vue 应用上下文中调用或传入 app 参数");
    }

    // 创建容器
    container = document.createElement("div");
    container.style.position = "absolute";
    container.style.top = "0";
    container.style.left = "0";
    container.style.zIndex = "9999";
    document.body.appendChild(container);

    // 处理响应式 props
    const resolvedProps = computed(() => {
        const result: Record<string, unknown> = {};
        Object.entries(props).forEach(([key, value]) => {
            result[key] = isRef(value) ? value.value : value;
        });
        return result;
    });

    // 创建弹窗虚拟节点，先以隐藏状态渲染
    const vnode = h(
        UeElDialogLayer,
        {
            ...resolvedProps.value,
            open: false, // 先设置为 false，让 Transition 能够正确触发
            onOnHide: () => {
                // 当弹窗关闭时自动销毁
                setTimeout(() => {
                    destroy();
                }, 100);
            },
        },
        slots
    );

    // 使用安全渲染函数，确保正确的应用上下文
    safeRender(vnode, container, targetApp);

    // 获取弹窗组件实例
    const getInstance = (): PopPanelInstance | undefined => {
        try {
            const componentInstance = vnode.component;
            const exposed = componentInstance?.exposed as PopPanelInstance;
            if (exposed && typeof exposed.closePanel === "function" && typeof exposed.updateDialogPos === "function") {
                return exposed;
            }
        } catch (error) {
            console.warn("获取弹窗组件实例失败:", error);
        }
        return undefined;
    };

    // 等待组件挂载完成，然后触发显示动画
    void nextTick(() => {
        dialogLayer = getInstance();

        // 触发显示动画：在下一个 tick 中设置 open 为 true
        void nextTick(() => {
            if (dialogLayer) {
                // 通过更新 vnode 的 props 来触发 Transition
                if (vnode.component?.props) {
                    vnode.component.props.open = true;
                    // 触发组件更新
                    vnode.component.update();
                }
            }
        });
    });

    function closeDialog() {
        if (dialogLayer) {
            dialogLayer.closePanel();
        }
    }

    function updateDialogBoxPos() {
        if (dialogLayer) {
            void dialogLayer.updateDialogPos();
        }
    }

    function destroy() {
        try {
            // 卸载组件
            if (container) {
                render(null, container);

                // 移除容器
                if (container.parentNode) {
                    container.parentNode.removeChild(container);
                }
                container = undefined;
            }

            dialogLayer = undefined;
        } catch (error) {
            console.error("销毁弹窗实例时出错:", error);
        }
    }

    return {
        app: targetApp,
        dialogLayer,
        closeDialog,
        updateDialogBoxPos,
        destroy,
    };
}

/**
 * @description: 弹窗方法 (Vue3 Composable)
 * @param props 弹窗属性配置
 * @param slots 插槽配置
 * @param parentApp 可选的父应用实例，如果不提供则尝试从当前组件实例获取
 */
export default function useElDialog(
    props: UeElPopPanelBaseProps,
    slots: Record<string, SlotRenderFunction> = {},
    parentApp?: App
): DialogInstance {
    let resolvedParentApp = parentApp;

    // 如果没有手动传递 app 实例，尝试从当前组件实例获取
    if (!resolvedParentApp) {
        const currentInstance = getCurrentInstance();
        resolvedParentApp = currentInstance?.appContext.app;
    }

    // 创建弹窗实例
    const dialogInstance = createDialogLayer(resolvedParentApp, props, slots);

    // 只有在组件环境中才自动销毁（即能获取到 getCurrentInstance）
    const currentInstance = getCurrentInstance();
    if (currentInstance) {
        onBeforeUnmount(() => {
            dialogInstance.destroy();
        });
    }

    return dialogInstance;
}

/**
 * @description: 全局弹窗方法 (不依赖组件上下文)
 */
export function createGlobalDialog(
    props: UeElPopPanelBaseProps,
    slots: Record<string, SlotRenderFunction> = {}
): DialogInstance {
    return createDialogLayer(undefined, props, slots);
}

/**
 * @description: JavaScript 环境中使用的弹窗方法
 * @param app 通过 createApp 创建的应用实例
 * @param props 弹窗属性配置
 * @param slots 插槽配置
 */
export function createDialogWithApp(
    app: App,
    props: UeElPopPanelBaseProps,
    slots: Record<string, SlotRenderFunction> = {}
): DialogInstance {
    return createDialogLayer(app, props, slots);
}

/**
 * @description: 使用 render 函数创建弹窗 (类似 Vue2 的 parent 方式)
 * 这种方式直接使用当前组件的上下文，完全避免了上下文继承问题
 * @param props 弹窗属性配置
 * @param slots 插槽配置
 * @param app 可选的应用实例，如果提供则使用该实例的上下文，否则使用当前组件上下文
 */
export function createDialogWithRender(
    props: UeElPopPanelBaseProps,
    slots: Record<string, SlotRenderFunction> = {},
    app?: App
): {
    container: HTMLElement;
    unmount: () => void;
    closeDialog: () => void;
    updateDialogBoxPos: () => void;
} {
    // 创建容器
    const container = document.createElement("div");
    container.style.position = "absolute";
    container.style.top = "0";
    container.style.left = "0";
    container.style.zIndex = "9999";
    document.body.appendChild(container);

    let dialogLayer: PopPanelInstance | undefined;
    let vnode: VNode;

    if (app) {
        // 如果传入了 app 实例，使用 createDialogLayer 函数来处理
        // 这样可以确保完整的上下文继承
        const dialogInstance = createDialogLayer(app, props, slots);

        // 移除之前创建的容器，使用 createDialogLayer 创建的容器
        if (container.parentNode) {
            container.parentNode.removeChild(container);
        }

        // 返回 createDialogLayer 的结果，但调整返回格式以匹配接口
        return {
            container: dialogInstance.app._container || container,
            unmount: dialogInstance.destroy,
            closeDialog: dialogInstance.closeDialog,
            updateDialogBoxPos: dialogInstance.updateDialogBoxPos,
        };
    } else {
        // 使用当前组件的上下文渲染 (类似 Vue2 的 parent 机制)

        // 处理响应式 props
        const resolvedProps = computed(() => {
            const result: Record<string, unknown> = {};
            Object.entries(props).forEach(([key, value]) => {
                result[key] = isRef(value) ? value.value : value;
            });
            return result;
        });

        // 创建弹窗虚拟节点，先以隐藏状态渲染
        vnode = h(
            UeElDialogLayer,
            {
                ...resolvedProps.value,
                open: false, // 先设置为 false，让 Transition 能够正确触发
                onOnHide: () => {
                    // 当弹窗关闭时自动卸载
                    setTimeout(() => {
                        unmount();
                    }, 100);
                },
            },
            slots
        );

        // 使用当前组件的上下文渲染
        const currentInstance = getCurrentInstance();
        const currentApp = currentInstance?.appContext.app;

        if (currentApp) {
            safeRender(vnode, container, currentApp);
        } else {
            // 降级处理：如果无法获取应用实例，使用普通渲染
            console.warn("无法获取当前应用实例，使用降级渲染");
            render(vnode, container);
        }

        // 获取组件实例
        const getInstance = (): PopPanelInstance | undefined => {
            try {
                const componentInstance = vnode.component;
                const exposed = componentInstance?.exposed as PopPanelInstance;
                if (
                    exposed &&
                    typeof exposed.closePanel === "function" &&
                    typeof exposed.updateDialogPos === "function"
                ) {
                    return exposed;
                }
            } catch (error) {
                console.warn("获取弹窗组件实例失败:", error);
            }
            return undefined;
        };

        // 等待组件挂载完成，然后触发显示动画
        void nextTick(() => {
            dialogLayer = getInstance();

            // 触发显示动画：在下一个 tick 中设置 open 为 true
            void nextTick(() => {
                if (dialogLayer) {
                    // 通过更新 vnode 的 props 来触发 Transition
                    if (vnode.component?.props) {
                        vnode.component.props.open = true;
                        // 触发组件更新
                        vnode.component.update();
                    }
                }
            });
        });

        function closeDialog() {
            if (dialogLayer) {
                dialogLayer.closePanel();
            }
        }

        function updateDialogBoxPos() {
            if (dialogLayer) {
                void dialogLayer.updateDialogPos();
            }
        }

        function unmount() {
            try {
                // 卸载组件
                render(null, container);

                // 移除容器
                if (container.parentNode) {
                    container.parentNode.removeChild(container);
                }

                dialogLayer = undefined;
            } catch (error) {
                console.error("卸载弹窗组件时出错:", error);
            }
        }

        return {
            container,
            unmount,
            closeDialog,
            updateDialogBoxPos,
        };
    }
}
