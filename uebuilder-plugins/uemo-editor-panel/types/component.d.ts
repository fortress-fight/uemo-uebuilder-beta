/*
 * @Description: 组件注册
 * @Author: F-Stone
 * @LastEditTime: 2025-05-07 18:17:59
 */
import UeEditorPanelTiptapButtonItem, { UeEditorPanelTiptapButtonItemBaseProps } from "../packages/tiptap-button-item";
import UeEditorPanelTiptapButtonRow, { UeEditorPanelTiptapButtonRowBaseProps } from "../packages/tiptap-button-row";
import UeEditorPanelTiptapFrame, { UeEditorPanelTiptapFrameBaseProps } from "../packages/tiptap-frame";
import UeEditorPanelTiptapSvgIcon, { UeEditorPanelTiptapSvgIconBaseProps } from "../packages/tiptap-svg-icon";
import UeEditorPanelTiptapImage, { UeEditorPanelTiptapImageBaseProps } from "../packages/tiptap-image";
import UeEditorPanelTiptapSvgView, { UeEditorPanelTiptapSvgViewBaseProps } from "../packages/tiptap-svg-view";

declare module "vue" {
    export interface GlobalComponents {
        UeEditorPanelTiptapButtonItem: typeof UeEditorPanelTiptapButtonItem;
        UeEditorPanelTiptapButtonRow: typeof UeEditorPanelTiptapButtonRow;
        UeEditorPanelTiptapFrame: typeof UeEditorPanelTiptapFrame;
        UeEditorPanelTiptapSvgIcon: typeof UeEditorPanelTiptapSvgIcon;
        UeEditorPanelTiptapImage: typeof UeEditorPanelTiptapImage;
        UeEditorPanelTiptapSvgView: typeof UeEditorPanelTiptapSvgView;
    }
}

declare global {
    namespace UE_EDITOR_PANEL_COMPONENT {
        interface UeEditorPanelTiptapButtonItemProps extends UeEditorPanelTiptapButtonItemBaseProps {}
        interface UeEditorPanelTiptapButtonRowProps extends UeEditorPanelTiptapButtonRowBaseProps {}
        interface UeEditorPanelTiptapFrameProps extends UeEditorPanelTiptapFrameBaseProps {}
        interface UeEditorPanelTiptapSvgIconProps extends UeEditorPanelTiptapSvgIconBaseProps {}
        interface UeEditorPanelTiptapImageProps extends UeEditorPanelTiptapImageBaseProps {}
        interface UeEditorPanelTiptapSvgViewProps extends UeEditorPanelTiptapSvgViewBaseProps {}
    }
}

export {};
