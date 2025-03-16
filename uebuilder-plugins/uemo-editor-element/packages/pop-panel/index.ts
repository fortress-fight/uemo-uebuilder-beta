/*
 * @Description: 弹窗组件
 * @Author: F-Stone
 * @LastEditTime: 2025-03-17 02:18:16
 */
import type { App } from "vue";
import type { ReferenceElement, EnhancedComputePositionConfig } from "@stone/uemo-editor-utils/lib/floating-ui";

import UeElPopPanel from "./Main.vue";

export const UeElProvideDialogCalcPosHandler = Symbol() as InjectionKey<(fn: DialogUpdatePosHandler) => void>;
export const UeElProvideDialogCloseHandler = Symbol() as InjectionKey<() => void>;

UeElPopPanel.install = (app: App) => {
    if (!UeElPopPanel.name) return;
    app.component(UeElPopPanel.name, UeElPopPanel);
};

/**
 * @description: 默认计算弹窗位置的参数
 */
export const defaultCalcPosParam: EnhancedComputePositionConfig = {
    placement: "right-start",
    middleware: [
        ["shift", { crossAxis: true, padding: 17 }],
        ["flip", undefined],
    ],
};

export interface UeElPopPanelBaseProps {
    zIndex?: number;
    immediate?: boolean;
    autoClose?: boolean;
    draggable?: boolean;
    mask?: { color?: string } | true;
    panel?: {
        position: "center" | { autoUpdate?: boolean; refEl: ReferenceElement; options?: EnhancedComputePositionConfig };
    };
    checkAllowClose?: () => boolean;
}
export type UeElPopPanelInstance = InstanceType<typeof UeElPopPanel>;

export type DialogUpdatePosHandler = (param: EnhancedComputePositionConfig) => EnhancedComputePositionConfig;

export default UeElPopPanel;
