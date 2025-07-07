/*
 * @Description: 组件注册
 * @Author: F-Stone
 * @LastEditTime: 2025-05-07 18:17:59
 */
import UeEditorPanelTiptapButtonItem, { UeEditorPanelTiptapButtonItemBaseProps } from "../packages/tiptap-button-item";
import UeEditorPanelTiptapCounterNumber, {
    UeEditorPanelTiptapCounterNumberBaseProps,
} from "../packages/tiptap-counter-number";
import UeEditorPanelTiptapButtonRow, { UeEditorPanelTiptapButtonRowBaseProps } from "../packages/tiptap-button-row";
import UeEditorPanelTiptapFrame, { UeEditorPanelTiptapFrameBaseProps } from "../packages/tiptap-frame";
import UeEditorPanelTiptapDividerBlock, {
    UeEditorPanelTiptapDividerBlockBaseProps,
} from "../packages/tiptap-divider-block";
import UeEditorPanelTiptapEffectText, { UeEditorPanelTiptapEffectTextBaseProps } from "../packages/tiptap-effect-text";
import UeEditorPanelTiptapGridGroup, { UeEditorPanelTiptapGridGroupBaseProps } from "../packages/tiptap-grid-group";
import UeEditorPanelTiptapGridItem, { UeEditorPanelTiptapGridItemBaseProps } from "../packages/tiptap-grid-item";
import UeEditorPanelTiptapHrRule, { UeEditorPanelTiptapHrRuleBaseProps } from "../packages/tiptap-hr-rule";
import UeEditorPanelTiptapImage, { UeEditorPanelTiptapImageBaseProps } from "../packages/tiptap-image";
import UeEditorPanelTiptapLottie, { UeEditorPanelTiptapLottieBaseProps } from "../packages/tiptap-lottie";
import UeEditorPanelTiptapShareItem, { UeEditorPanelTiptapShareItemBaseProps } from "../packages/tiptap-share-item";
import UeEditorPanelTiptapSpline, { UeEditorPanelTiptapSplineBaseProps } from "../packages/tiptap-spline";
import UeEditorPanelTiptapSvgIcon, { UeEditorPanelTiptapSvgIconBaseProps } from "../packages/tiptap-svg-icon";
import UeEditorPanelTiptapSvgView, { UeEditorPanelTiptapSvgViewBaseProps } from "../packages/tiptap-svg-view";
import UeEditorPanelTiptapTable, { UeEditorPanelTiptapTableBaseProps } from "../packages/tiptap-table";

declare module "vue" {
    export interface GlobalComponents {
        UeEditorPanelTiptapButtonItem: typeof UeEditorPanelTiptapButtonItem;
        UeEditorPanelTiptapCounterNumber: typeof UeEditorPanelTiptapCounterNumber;
        UeEditorPanelTiptapButtonRow: typeof UeEditorPanelTiptapButtonRow;
        UeEditorPanelTiptapFrame: typeof UeEditorPanelTiptapFrame;
        UeEditorPanelTiptapDividerBlock: typeof UeEditorPanelTiptapDividerBlock;
        UeEditorPanelTiptapEffectText: typeof UeEditorPanelTiptapEffectText;
        UeEditorPanelTiptapGridGroup: typeof UeEditorPanelTiptapGridGroup;
        UeEditorPanelTiptapGridItem: typeof UeEditorPanelTiptapGridItem;
        UeEditorPanelTiptapHrRule: typeof UeEditorPanelTiptapHrRule;
        UeEditorPanelTiptapImage: typeof UeEditorPanelTiptapImage;
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
        interface UeEditorPanelTiptapCounterNumberProps extends UeEditorPanelTiptapCounterNumberBaseProps {}
        interface UeEditorPanelTiptapButtonRowProps extends UeEditorPanelTiptapButtonRowBaseProps {}
        interface UeEditorPanelTiptapFrameProps extends UeEditorPanelTiptapFrameBaseProps {}
        interface UeEditorPanelTiptapDividerBlockProps extends UeEditorPanelTiptapDividerBlockBaseProps {}
        interface UeEditorPanelTiptapEffectTextProps extends UeEditorPanelTiptapEffectTextBaseProps {}
        interface UeEditorPanelTiptapGridGroupProps extends UeEditorPanelTiptapGridGroupBaseProps {}
        interface UeEditorPanelTiptapGridItemProps extends UeEditorPanelTiptapGridItemBaseProps {}
        interface UeEditorPanelTiptapHrRuleProps extends UeEditorPanelTiptapHrRuleBaseProps {}
        interface UeEditorPanelTiptapImageProps extends UeEditorPanelTiptapImageBaseProps {}
        interface UeEditorPanelTiptapLottieProps extends UeEditorPanelTiptapLottieBaseProps {}
        interface UeEditorPanelTiptapShareItemProps extends UeEditorPanelTiptapShareItemBaseProps {}
        interface UeEditorPanelTiptapSplineProps extends UeEditorPanelTiptapSplineBaseProps {}
        interface UeEditorPanelTiptapSvgIconProps extends UeEditorPanelTiptapSvgIconBaseProps {}
        interface UeEditorPanelTiptapSvgViewProps extends UeEditorPanelTiptapSvgViewBaseProps {}
        interface UeEditorPanelTiptapTableProps extends UeEditorPanelTiptapTableBaseProps {}
    }
}

export {};
