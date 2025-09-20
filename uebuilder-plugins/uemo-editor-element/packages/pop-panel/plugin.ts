/*
 * @Description: 创建弹窗主题 (Vue3 版本) - 重构优化版本
 * @Author: F-Stone
 * @LastEditTime: 2025-09-20 16:29:35
 */

import type { App, VNode } from "vue";
import type { UeElPopPanelBaseProps } from "./index";

import { render } from "vue";

import UeElDialogLayer from "./Main.vue";

/**
 * 弹窗组件实例接口
 * @interface PopPanelInstance
 */
export interface PopPanelInstance {
    /** 关闭弹窗面板 */
    closePanel: () => void;
    /** 更新弹窗位置 */
    updateDialogPos: () => Promise<void>;
}

/**
 * 弹窗实例管理接口
 * @interface DialogInstance
 */
export interface DialogInstance {
    /** 弹窗应用实例 */
    readonly app: App;
    /** 弹窗组件实例 */
    readonly dialogLayer: PopPanelInstance | undefined;
    /** 关闭弹窗 */
    closeDialog: () => void;
    /** 更新弹窗位置 */
    updateDialogBoxPos: () => void;
    /** 销毁弹窗实例 */
    destroy: () => void;
}

/**
 * 插槽渲染函数类型
 * @typedef {Function} SlotRenderFunction
 */
export type SlotRenderFunction = () => VNode | VNode[];

/**
 * 弹窗关闭延迟时间（毫秒）
 * @constant
 */
const DIALOG_CLOSE_DELAY = 100;

/**
 * 创建弹窗容器元素
 * @returns {HTMLElement} 弹窗容器DOM元素
 */
function createDialogContainer(): HTMLElement {
    const container = document.createElement("div");
    Object.assign(container.style, { position: "absolute", top: "0", left: "0", zIndex: "9999" });
    document.body.appendChild(container);
    return container;
}

/**
 * 安全移除DOM容器
 * @param {HTMLElement | undefined} container - 要移除的容器元素
 */
function safeRemoveContainer(container: HTMLElement | undefined): void {
    if (container?.parentNode) {
        try {
            container.parentNode.removeChild(container);
        } catch (error) {
            console.warn("移除弹窗容器时出错:", error);
        }
    }
}

/**
 * 处理响应式属性，将ref类型的值解包
 * @param {UeElPopPanelBaseProps} props - 原始属性对象
 * @returns {Record<string, unknown>} 解包后的属性对象
 */
function resolveReactiveProps(props: UeElPopPanelBaseProps): Record<string, unknown> {
    const result: Record<string, unknown> = {};
    Object.entries(props).forEach(([key, value]) => {
        result[key] = isRef(value) ? value.value : value;
    });
    return result;
}

/**
 * 递归设置VNode的应用上下文
 * @param {VNode} vnode - 虚拟节点
 * @param {App} app - Vue应用实例
 */
function setVNodeAppContext(vnode: VNode, app: App): void {
    vnode.appContext = app._context;

    // 递归处理子节点
    if (vnode.children && Array.isArray(vnode.children)) {
        vnode.children.forEach((child) => {
            if (typeof child === "object" && child !== null && "appContext" in child) {
                (child as VNode).appContext = app._context;
            }
        });
    }
}

/**
 * 安全渲染函数，确保VNode有正确的应用上下文
 * @param {VNode} vnode - 要渲染的虚拟节点
 * @param {Element} container - 渲染容器
 * @param {App} app - Vue应用实例
 * @throws {Error} 渲染失败时抛出错误
 */
function safeRender(vnode: VNode, container: Element, app: App): void {
    try {
        void (app && setVNodeAppContext(vnode, app));
        render(vnode, container);
    } catch (error) {
        console.error("渲染弹窗时出错:", error);
        throw error;
    }
}

/**
 * 获取弹窗组件实例的工厂函数
 * @param {VNode} vnode - 弹窗虚拟节点
 * @returns {() => PopPanelInstance | undefined} 获取实例的函数
 */
function createInstanceGetter(vnode: VNode): () => PopPanelInstance | undefined {
    return (): PopPanelInstance | undefined => {
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
}

/**
 * 触发弹窗显示动画
 * @param {VNode} vnode - 弹窗虚拟节点
 * @param {() => PopPanelInstance | undefined} getInstance - 获取实例的函数
 * @returns {Promise<PopPanelInstance | undefined>} 弹窗实例
 */
async function triggerDialogShow(
    vnode: VNode,
    getInstance: () => PopPanelInstance | undefined
): Promise<PopPanelInstance | undefined> {
    return new Promise((resolve) => {
        void nextTick(() => {
            const dialogLayer = getInstance();

            // 触发显示动画：在下一个 tick 中设置 open 为 true
            void nextTick(() => {
                if (dialogLayer && vnode.component?.props) {
                    vnode.component.props.open = true;
                    vnode.component.update();
                }
                resolve(dialogLayer);
            });
        });
    });
}

/**
 * 创建弹窗层展示 (使用现有应用实例，避免插件问题)
 * @param {App | undefined} parentApp - 父应用实例
 * @param {UeElPopPanelBaseProps} props - 弹窗属性配置
 * @param {Record<string, SlotRenderFunction>} slots - 插槽配置
 * @returns {DialogInstance} 弹窗实例管理对象
 * @throws {Error} 当无法获取应用实例时抛出错误
 */
function createDialogLayer(
    parentApp: App | undefined,
    props: UeElPopPanelBaseProps,
    slots: Record<string, SlotRenderFunction>
): DialogInstance {
    let dialogLayer: PopPanelInstance | undefined;
    let container: HTMLElement | undefined;
    let destroyTimeout: number | undefined;

    // 获取应用实例
    const currentInstance = getCurrentInstance();
    const targetApp = parentApp || currentInstance?.appContext.app;

    if (!targetApp) {
        throw new Error("无法获取应用实例，请确保在 Vue 应用上下文中调用或传入 app 参数");
    }

    // 创建容器
    container = createDialogContainer();

    // 处理响应式 props
    const resolvedProps = computed(() => resolveReactiveProps(props));

    // 销毁函数
    const destroy = (): void => {
        try {
            // 清理定时器
            if (destroyTimeout) {
                clearTimeout(destroyTimeout);
                destroyTimeout = undefined;
            }

            // 卸载组件
            if (container) {
                render(null, container);
                safeRemoveContainer(container);
                container = undefined;
            }

            dialogLayer = undefined;
        } catch (error) {
            console.error("销毁弹窗实例时出错:", error);
        }
    };

    // 创建弹窗虚拟节点
    const vnode = h(
        UeElDialogLayer,
        {
            ...resolvedProps.value,
            open: false, // 先设置为 false，让 Transition 能够正确触发
            onOnHide: () => {
                // 当弹窗关闭时自动销毁，使用防抖避免重复调用
                if (destroyTimeout) {
                    clearTimeout(destroyTimeout);
                }
                destroyTimeout = setTimeout(destroy, DIALOG_CLOSE_DELAY);
            },
        },
        slots
    );

    // 渲染弹窗
    safeRender(vnode, container, targetApp);

    // 获取实例并触发显示动画
    const getInstance = createInstanceGetter(vnode);
    void triggerDialogShow(vnode, getInstance).then((instance) => {
        dialogLayer = instance;
    });

    // 弹窗操作函数
    const closeDialog = (): void => {
        dialogLayer?.closePanel();
    };

    const updateDialogBoxPos = (): void => {
        if (dialogLayer) {
            void dialogLayer.updateDialogPos();
        }
    };

    return {
        app: targetApp,
        get dialogLayer() {
            return dialogLayer;
        },
        closeDialog,
        updateDialogBoxPos,
        destroy,
    };
}

/**
 * Vue3 Composable 弹窗方法 - 在组件内使用，支持自动清理
 * @param {UeElPopPanelBaseProps} props - 弹窗属性配置
 * @param {Record<string, SlotRenderFunction>} slots - 插槽配置，默认为空对象
 * @param {App} [parentApp] - 可选的父应用实例，不提供则从当前组件实例获取
 * @returns {DialogInstance} 弹窗实例管理对象
 * @example
 * ```typescript
 * const dialog = useElDialog({ title: '标题' }, {
 *   default: () => h('div', '内容')
 * });
 * ```
 */
export function useElDialog(
    props: UeElPopPanelBaseProps,
    slots: Record<string, SlotRenderFunction> = {},
    parentApp?: App
): DialogInstance {
    // 创建弹窗实例
    const dialogInstance = createDialogLayer(parentApp, props, slots);

    if (parentApp) {
        parentApp.onUnmount(() => {
            dialogInstance.destroy();
        });
    } else {
        // 在组件环境中自动清理资源
        const currentInstance = getCurrentInstance();
        if (currentInstance) {
            onBeforeUnmount(() => {
                dialogInstance.destroy();
            });
        }
    }

    return dialogInstance;
}

export function install(app: App) {
    app.config.globalProperties.$ueElDialog = useElDialog;
}
