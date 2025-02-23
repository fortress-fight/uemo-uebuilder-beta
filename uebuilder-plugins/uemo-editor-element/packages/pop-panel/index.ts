/*
 * @Description: 弹窗组件
 * @Author: F-Stone
 * @LastEditTime: 2025-02-23 18:23:52
 */
import type { App } from "vue";
import type { ReferenceElement, EnhancedComputePositionConfig } from "@stone/uemo-editor-utils/lib/floating-ui";

import UeElPopPanel from "./Main.vue";

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
    mask?: { color?: string } | true;
    panel?: {
        position: "center" | { autoUpdate?: boolean; refEl: ReferenceElement; options?: EnhancedComputePositionConfig };
    };
    checkAllowClose?: () => boolean;
}
export type UeElPopPanelInstance = InstanceType<typeof UeElPopPanel>;

export type DialogUpdatePosHandler = (param: EnhancedComputePositionConfig) => EnhancedComputePositionConfig;

export default UeElPopPanel;
