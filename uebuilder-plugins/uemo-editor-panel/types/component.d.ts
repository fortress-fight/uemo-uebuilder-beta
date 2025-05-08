/*
 * @Description: 组件注册
 * @Author: F-Stone
 * @LastEditTime: 2025-05-07 18:17:59
 */
import UeEditorPanelTiptapButtonRow, { UeEditorPanelTiptapButtonRowBaseProps } from "../packages/tiptap-button-row";

declare module "vue" {
    export interface GlobalComponents {
        UeEditorPanelTiptapButtonRow: typeof UeEditorPanelTiptapButtonRow;
    }
}

declare global {
    namespace UE_EDITOR_PANEL_COMPONENT {
        interface UeEditorPanelTiptapButtonRowProps extends UeEditorPanelTiptapButtonRowBaseProps {}
    }
}

export {};
