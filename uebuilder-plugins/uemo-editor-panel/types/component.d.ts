/*
 * @Description: 组件注册
 * @Author: F-Stone
 * @LastEditTime: 2025-05-07 18:17:59
 */
import UeEditorPanelTiptapButtonItem, { UeEditorPanelTiptapButtonItemBaseProps } from "../packages/tiptap-button-item";
import UeEditorPanelTiptapButtonRow, { UeEditorPanelTiptapButtonRowBaseProps } from "../packages/tiptap-button-row";
import UeEditorPanelTiptapCounterNumber, {
    UeEditorPanelTiptapCounterNumberBaseProps,
} from "../packages/tiptap-counter-number";
import UeEditorPanelTiptapDividerBlock, {
    UeEditorPanelTiptapDividerBlockBaseProps,
} from "../packages/tiptap-divider-block";
import UeEditorPanelTiptapEffectText, { UeEditorPanelTiptapEffectTextBaseProps } from "../packages/tiptap-effect-text";
import UeEditorPanelTiptapFrame, { UeEditorPanelTiptapFrameBaseProps } from "../packages/tiptap-frame";
import UeEditorPanelTiptapGridGroup, { UeEditorPanelTiptapGridGroupBaseProps } from "../packages/tiptap-grid-group";
import UeEditorPanelTiptapGridItem, { UeEditorPanelTiptapGridItemBaseProps } from "../packages/tiptap-grid-item";
import UeEditorPanelTiptapHrRule, { UeEditorPanelTiptapHrRuleBaseProps } from "../packages/tiptap-hr-rule";
import UeEditorPanelTiptapImage, { UeEditorPanelTiptapImageBaseProps } from "../packages/tiptap-image";
import UeEditorPanelTiptapLoopText, { UeEditorPanelTiptapLoopTextBaseProps } from "../packages/tiptap-loop-text";
import UeEditorPanelTiptapLottie, { UeEditorPanelTiptapLottieBaseProps } from "../packages/tiptap-lottie";
import UeEditorPanelTiptapShareItem, { UeEditorPanelTiptapShareItemBaseProps } from "../packages/tiptap-share-item";
import UeEditorPanelTiptapSpline, { UeEditorPanelTiptapSplineBaseProps } from "../packages/tiptap-spline";
import UeEditorPanelTiptapSvgIcon, { UeEditorPanelTiptapSvgIconBaseProps } from "../packages/tiptap-svg-icon";
import UeEditorPanelTiptapSvgView, { UeEditorPanelTiptapSvgViewBaseProps } from "../packages/tiptap-svg-view";
import UeEditorPanelTiptapTable, { UeEditorPanelTiptapTableBaseProps } from "../packages/tiptap-table";

declare module "vue" {
    export interface GlobalComponents {
        UeEditorPanelTiptapButtonItem: typeof UeEditorPanelTiptapButtonItem;
        UeEditorPanelTiptapButtonRow: typeof UeEditorPanelTiptapButtonRow;
        UeEditorPanelTiptapCounterNumber: typeof UeEditorPanelTiptapCounterNumber;
        UeEditorPanelTiptapDividerBlock: typeof UeEditorPanelTiptapDividerBlock;
        UeEditorPanelTiptapEffectText: typeof UeEditorPanelTiptapEffectText;
        UeEditorPanelTiptapFrame: typeof UeEditorPanelTiptapFrame;
        UeEditorPanelTiptapGridGroup: typeof UeEditorPanelTiptapGridGroup;
        UeEditorPanelTiptapGridItem: typeof UeEditorPanelTiptapGridItem;
        UeEditorPanelTiptapHrRule: typeof UeEditorPanelTiptapHrRule;
        UeEditorPanelTiptapImage: typeof UeEditorPanelTiptapImage;
        UeEditorPanelTiptapLoopText: typeof UeEditorPanelTiptapLoopText;
        UeEditorPanelTiptapLottie: typeof UeEditorPanelTiptapLottie;
        UeEditorPanelTiptapShareItem: typeof UeEditorPanelTiptapShareItem;
        UeEditorPanelTiptapSpline: typeof UeEditorPanelTiptapSpline;
        UeEditorPanelTiptapSvgIcon: typeof UeEditorPanelTiptapSvgIcon;
        UeEditorPanelTiptapSvgView: typeof UeEditorPanelTiptapSvgView;
        UeEditorPanelTiptapTable: typeof UeEditorPanelTiptapTable;
    }
}

declare global {
    namespace UE_EDITOR_PANEL_COMPONENT {
        interface UeEditorPanelTiptapButtonItemProps extends UeEditorPanelTiptapButtonItemBaseProps {}
        interface UeEditorPanelTiptapButtonRowProps extends UeEditorPanelTiptapButtonRowBaseProps {}
        interface UeEditorPanelTiptapCounterNumberProps extends UeEditorPanelTiptapCounterNumberBaseProps {}
        interface UeEditorPanelTiptapDividerBlockProps extends UeEditorPanelTiptapDividerBlockBaseProps {}
        interface UeEditorPanelTiptapEffectTextProps extends UeEditorPanelTiptapEffectTextBaseProps {}
        interface UeEditorPanelTiptapFrameProps extends UeEditorPanelTiptapFrameBaseProps {}
        interface UeEditorPanelTiptapGridGroupProps extends UeEditorPanelTiptapGridGroupBaseProps {}
        interface UeEditorPanelTiptapGridItemProps extends UeEditorPanelTiptapGridItemBaseProps {}
        interface UeEditorPanelTiptapHrRuleProps extends UeEditorPanelTiptapHrRuleBaseProps {}
        interface UeEditorPanelTiptapImageProps extends UeEditorPanelTiptapImageBaseProps {}
        interface UeEditorPanelTiptapLoopTextProps extends UeEditorPanelTiptapLoopTextBaseProps {}
        interface UeEditorPanelTiptapLottieProps extends UeEditorPanelTiptapLottieBaseProps {}
        interface UeEditorPanelTiptapShareItemProps extends UeEditorPanelTiptapShareItemBaseProps {}
        interface UeEditorPanelTiptapSplineProps extends UeEditorPanelTiptapSplineBaseProps {}
        interface UeEditorPanelTiptapSvgIconProps extends UeEditorPanelTiptapSvgIconBaseProps {}
        interface UeEditorPanelTiptapSvgViewProps extends UeEditorPanelTiptapSvgViewBaseProps {}
        interface UeEditorPanelTiptapTableProps extends UeEditorPanelTiptapTableBaseProps {}
    }
}

export {};
