/*
 * @Description: 组件注册
 * @Author: F-Stone
 * @LastEditTime: 2025-05-07 18:17:59
 */
import UeEditorPanelTiptapButtonItem, { UeEditorPanelTiptapButtonItemBaseProps } from "../packages/tiptap-button-item";
import UeEditorPanelTiptapButtonRow, { UeEditorPanelTiptapButtonRowBaseProps } from "../packages/tiptap-button-row";
import UeEditorPanelTiptapDividerBlock, {
    UeEditorPanelTiptapDividerBlockBaseProps,
} from "../packages/tiptap-divider-block";
import UeEditorPanelTiptapFrame, { UeEditorPanelTiptapFrameBaseProps } from "../packages/tiptap-frame";
import UeEditorPanelTiptapGridGroup, { UeEditorPanelTiptapGridGroupBaseProps } from "../packages/tiptap-grid-group";
import UeEditorPanelTiptapGridItem, { UeEditorPanelTiptapGridItemBaseProps } from "../packages/tiptap-grid-item";
import UeEditorPanelTiptapImage, { UeEditorPanelTiptapImageBaseProps } from "../packages/tiptap-image";
import UeEditorPanelTiptapLottie, { UeEditorPanelTiptapLottieBaseProps } from "../packages/tiptap-lottie";
import UeEditorPanelTiptapSpline, { UeEditorPanelTiptapSplineBaseProps } from "../packages/tiptap-spline";
import UeEditorPanelTiptapSvgIcon, { UeEditorPanelTiptapSvgIconBaseProps } from "../packages/tiptap-svg-icon";
import UeEditorPanelTiptapSvgView, { UeEditorPanelTiptapSvgViewBaseProps } from "../packages/tiptap-svg-view";

declare module "vue" {
    export interface GlobalComponents {
        UeEditorPanelTiptapButtonItem: typeof UeEditorPanelTiptapButtonItem;
        UeEditorPanelTiptapButtonRow: typeof UeEditorPanelTiptapButtonRow;
        UeEditorPanelTiptapDividerBlock: typeof UeEditorPanelTiptapDividerBlock;
        UeEditorPanelTiptapFrame: typeof UeEditorPanelTiptapFrame;
        UeEditorPanelTiptapGridGroup: typeof UeEditorPanelTiptapGridGroup;
        UeEditorPanelTiptapGridItem: typeof UeEditorPanelTiptapGridItem;
        UeEditorPanelTiptapImage: typeof UeEditorPanelTiptapImage;
        UeEditorPanelTiptapLottie: typeof UeEditorPanelTiptapLottie;
        UeEditorPanelTiptapSpline: typeof UeEditorPanelTiptapSpline;
        UeEditorPanelTiptapSvgIcon: typeof UeEditorPanelTiptapSvgIcon;
        UeEditorPanelTiptapSvgView: typeof UeEditorPanelTiptapSvgView;
    }
}

declare global {
    namespace UE_EDITOR_PANEL_COMPONENT {
        interface UeEditorPanelTiptapButtonItemProps extends UeEditorPanelTiptapButtonItemBaseProps {}
        interface UeEditorPanelTiptapButtonRowProps extends UeEditorPanelTiptapButtonRowBaseProps {}
        interface UeEditorPanelTiptapDividerBlockProps extends UeEditorPanelTiptapDividerBlockBaseProps {}
        interface UeEditorPanelTiptapFrameProps extends UeEditorPanelTiptapFrameBaseProps {}
        interface UeEditorPanelTiptapGridGroupProps extends UeEditorPanelTiptapGridGroupBaseProps {}
        interface UeEditorPanelTiptapGridItemProps extends UeEditorPanelTiptapGridItemBaseProps {}
        interface UeEditorPanelTiptapImageProps extends UeEditorPanelTiptapImageBaseProps {}
        interface UeEditorPanelTiptapLottieProps extends UeEditorPanelTiptapLottieBaseProps {}
        interface UeEditorPanelTiptapSplineProps extends UeEditorPanelTiptapSplineBaseProps {}
        interface UeEditorPanelTiptapSvgIconProps extends UeEditorPanelTiptapSvgIconBaseProps {}
        interface UeEditorPanelTiptapSvgViewProps extends UeEditorPanelTiptapSvgViewBaseProps {}
    }
}

export {};
