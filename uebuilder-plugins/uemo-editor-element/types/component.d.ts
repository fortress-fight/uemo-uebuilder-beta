/*
 * @Description: 组件注册
 * @Author: F-Stone
 * @LastEditTime: 2025-02-20 15:32:50
 */
import UeElAlignItemSetting, { UeElAlignItemSettingBaseProps } from "../packages/align-item-setting";
import UeElBackgroundImageSettingPanel, {
    UeElBackgroundImageSettingPanelBaseProps,
} from "../packages/background-image-setting-panel";
import UeElAlignSetting, { UeElAlignSettingBaseProps } from "../packages/align-setting";
import UeElBackgroundShapeSettingPanel, {
    UeElBackgroundShapeSettingPanelBaseProps,
} from "../packages/background-shape-setting-panel";
import UeElBackgroundSplineSettingPanel, {
    UeElBackgroundSplineSettingPanelBaseProps,
} from "../packages/background-spline-setting-panel";
import UeElBorderSetting, { UeElBorderSettingBaseProps } from "../packages/border-setting";
import UeElBorderSettingGroup, { UeElBorderSettingGroupBaseProps } from "../packages/border-setting-group";
import UeElBoxShadowSetting, { UeElBoxShadowSettingBaseProps } from "../packages/box-shadow-setting";
import UeElButton, { UeElButtonBaseProps } from "../packages/button";
import UeElButtonHoverEffectLibraryPanel, {
    UeElButtonHoverEffectLibraryPanelBaseProps,
} from "../packages/button-hover-effect-library-panel";
import UeElButtonHoverEffectSetting, {
    UeElButtonHoverEffectSettingBaseProps,
} from "../packages/button-hover-effect-setting";
import UeElButtonLibraryPanel, { UeElButtonLibraryPanelBaseProps } from "../packages/button-library-panel";
import UeElBoxShadowSettingGroup, { UeElBoxShadowSettingGroupBaseProps } from "../packages/box-shadow-setting-group";
import UeElButtonStyleSetting, { UeElButtonStyleSettingBaseProps } from "../packages/button-style-setting";
import UeElButtonIconSettingGroup, { UeElButtonIconSettingGroupBaseProps } from "../packages/button-icon-setting-group";
import UeElButtonIconSetting, { UeElButtonIconSettingBaseProps } from "../packages/button-icon-setting";
import UeElButtonStyleSettingPanel, {
    UeElButtonStyleSettingPanelBaseProps,
} from "../packages/button-style-setting-panel";
import UeElCalenderPicker, { UeElCalenderPickerBaseProps } from "../packages/calender-picker";
import UeElCalenderSettingGroup, { UeElCalenderSettingGroupBaseProps } from "../packages/calender-setting-group";
import UeElCheckBox, { UeElCheckBoxBaseProps } from "../packages/check-box";
import UeElCalenderSetting, { UeElCalenderSettingBaseProps } from "../packages/calender-setting";
import UeElColorInput, { UeElColorInputBaseProps } from "../packages/color-input";
import UeElColorPicker, { UeElColorPickerBaseProps } from "../packages/color-picker";
import UeElColorSetting, { UeElColorSettingBaseProps } from "../packages/color-setting";
import UeElColorSettingGroup, { UeElColorSettingGroupBaseProps } from "../packages/color-setting-group";
import UeElConfirmPanel, { UeElConfirmPanelBaseProps } from "../packages/confirm-panel";
import UeElContextmenu, { UeElContextmenuBaseProps } from "../packages/contextmenu";
import UeElColorPickerPanel, { UeElColorPickerPanelBaseProps } from "../packages/color-picker-panel";
import UeElControlGroup, { UeElControlGroupBaseProps } from "../packages/control-group";
import UeElEditorGroup, { UeElEditorGroupBaseProps } from "../packages/editor-group";
import UeElEmojiLibraryPanel, { UeElEmojiLibraryPanelBaseProps } from "../packages/emoji-library-panel";
import UeElEmptyPanel, { UeElEmptyPanelBaseProps } from "../packages/empty-panel";
import UeElEnterAnimateSetting, { UeElEnterAnimateSettingBaseProps } from "../packages/enter-animate-setting";
import UeElEditorPanel, { UeElEditorPanelBaseProps } from "../packages/editor-panel";
import UeElFileUploadButton, { UeElFileUploadButtonBaseProps } from "../packages/file-upload-button";
import UeElFileUploader, { UeElFileUploaderBaseProps } from "../packages/file-uploader";
import UeElFontFamilySetting, { UeElFontFamilySettingBaseProps } from "../packages/font-family-setting";
import UeElFontFamilyLibraryPanel, { UeElFontFamilyLibraryPanelBaseProps } from "../packages/font-family-library-panel";
import UeElGapSetting, { UeElGapSettingBaseProps } from "../packages/gap-setting";
import UeElGirdLayoutUtil, { UeElGirdLayoutUtilBaseProps } from "../packages/gird-layout-util";
import UeElIcon, { UeElIconBaseProps } from "../packages/icon";
import UeElGridLayoutLibraryPanel, { UeElGridLayoutLibraryPanelBaseProps } from "../packages/grid-layout-library-panel";
import UeElGridLayoutSetting, { UeElGridLayoutSettingBaseProps } from "../packages/grid-layout-setting";
import UeElImageLibraryPanel, { UeElImageLibraryPanelBaseProps } from "../packages/image-library-panel";
import UeElIconLibraryPanel, { UeElIconLibraryPanelBaseProps } from "../packages/icon-library-panel";
import UeElJustifyContentSetting, { UeElJustifyContentSettingBaseProps } from "../packages/justify-content-setting";
import UeElLibraryPanel, { UeElLibraryPanelBaseProps } from "../packages/library-panel";
import UeElLinkSetting, { UeElLinkSettingBaseProps } from "../packages/link-setting";
import UeElLinkSettingGroup, { UeElLinkSettingGroupBaseProps } from "../packages/link-setting-group";
import UeElLinkSettingPanel, { UeElLinkSettingPanelBaseProps } from "../packages/link-setting-panel";
import UeElLoading, { UeElLoadingBaseProps } from "../packages/loading";
import UeElMarginSetting, { UeElMarginSettingBaseProps } from "../packages/margin-setting";
import UeElNumberInput, { UeElNumberInputBaseProps } from "../packages/number-input";
import UeElLottieLibraryPanel, { UeElLottieLibraryPanelBaseProps } from "../packages/lottie-library-panel";
import UeElPaddingSetting, { UeElPaddingSettingBaseProps } from "../packages/padding-setting";
import UeElPopPanel, { UeElPopPanelBaseProps } from "../packages/pop-panel";
import UeElOnOff, { UeElOnOffBaseProps } from "../packages/on-off";
import UeElRadiusSettingGroup, { UeElRadiusSettingGroupBaseProps } from "../packages/radius-setting-group";
import UeElResourceSetting, { UeElResourceSettingBaseProps } from "../packages/resource-setting";
import UeElRadiusSetting, { UeElRadiusSettingBaseProps } from "../packages/radius-setting";
import UeElResourcePreview, { UeElResourcePreviewBaseProps } from "../packages/resource-preview";
import UeElScrollEffectSettingPanel, {
    UeElScrollEffectSettingPanelBaseProps,
} from "../packages/scroll-effect-setting-panel";
import UeElSelect, { UeElSelectBaseProps } from "../packages/select";
import UeElScrollEffectSettingGroup, {
    UeElScrollEffectSettingGroupBaseProps,
} from "../packages/scroll-effect-setting-group";
import UeElSelectOption, { UeElSelectOptionBaseProps } from "../packages/select-option";
import UeElSettingBar, { UeElSettingBarBaseProps } from "../packages/setting-bar";
import UeElSettingGroup, { UeElSettingGroupBaseProps } from "../packages/setting-group";
import UeElShapeLibraryPanel, { UeElShapeLibraryPanelBaseProps } from "../packages/shape-library-panel";
import UeElShareIconLibraryPanel, { UeElShareIconLibraryPanelBaseProps } from "../packages/share-icon-library-panel";
import UeElSplineLibraryPanel, { UeElSplineLibraryPanelBaseProps } from "../packages/spline-library-panel";
import UeElSvgLibraryPanel, { UeElSvgLibraryPanelBaseProps } from "../packages/svg-library-panel";
import UeElTabCard, { UeElTabCardBaseProps } from "../packages/tab-card";
import UeElTagInput, { UeElTagInputBaseProps } from "../packages/tag-input";
import UeElTextDecorationLibraryPanel, {
    UeElTextDecorationLibraryPanelBaseProps,
} from "../packages/text-decoration-library-panel";
import UeElTextDecorationSettingPanel, {
    UeElTextDecorationSettingPanelBaseProps,
} from "../packages/text-decoration-setting-panel";
import UeElTextInput, { UeElTextInputBaseProps } from "../packages/text-input";
import UeElTipGroup, { UeElTipGroupBaseProps } from "../packages/tip-group";
import UeElTranslateSetting, { UeElTranslateSettingBaseProps } from "../packages/translate-setting";
import UeElVideoLibraryPanel, { UeElVideoLibraryPanelBaseProps } from "../packages/video-library-panel";
import UeElVideoPanel, { UeElVideoPanelBaseProps } from "../packages/video-panel";

declare module "vue" {
    export interface GlobalComponents {
        UeElAlignItemSetting: typeof UeElAlignItemSetting;
        UeElBackgroundImageSettingPanel: typeof UeElBackgroundImageSettingPanel;
        UeElAlignSetting: typeof UeElAlignSetting;
        UeElBackgroundShapeSettingPanel: typeof UeElBackgroundShapeSettingPanel;
        UeElBackgroundSplineSettingPanel: typeof UeElBackgroundSplineSettingPanel;
        UeElBorderSetting: typeof UeElBorderSetting;
        UeElBorderSettingGroup: typeof UeElBorderSettingGroup;
        UeElBoxShadowSetting: typeof UeElBoxShadowSetting;
        UeElButton: typeof UeElButton;
        UeElButtonHoverEffectLibraryPanel: typeof UeElButtonHoverEffectLibraryPanel;
        UeElButtonHoverEffectSetting: typeof UeElButtonHoverEffectSetting;
        UeElButtonLibraryPanel: typeof UeElButtonLibraryPanel;
        UeElBoxShadowSettingGroup: typeof UeElBoxShadowSettingGroup;
        UeElButtonStyleSetting: typeof UeElButtonStyleSetting;
        UeElButtonIconSettingGroup: typeof UeElButtonIconSettingGroup;
        UeElButtonIconSetting: typeof UeElButtonIconSetting;
        UeElButtonStyleSettingPanel: typeof UeElButtonStyleSettingPanel;
        UeElCalenderPicker: typeof UeElCalenderPicker;
        UeElCalenderSettingGroup: typeof UeElCalenderSettingGroup;
        UeElCheckBox: typeof UeElCheckBox;
        UeElCalenderSetting: typeof UeElCalenderSetting;
        UeElColorInput: typeof UeElColorInput;
        UeElColorPicker: typeof UeElColorPicker;
        UeElColorSetting: typeof UeElColorSetting;
        UeElColorSettingGroup: typeof UeElColorSettingGroup;
        UeElConfirmPanel: typeof UeElConfirmPanel;
        UeElContextmenu: typeof UeElContextmenu;
        UeElColorPickerPanel: typeof UeElColorPickerPanel;
        UeElControlGroup: typeof UeElControlGroup;
        UeElEditorGroup: typeof UeElEditorGroup;
        UeElEmojiLibraryPanel: typeof UeElEmojiLibraryPanel;
        UeElEmptyPanel: typeof UeElEmptyPanel;
        UeElEnterAnimateSetting: typeof UeElEnterAnimateSetting;
        UeElEditorPanel: typeof UeElEditorPanel;
        UeElFileUploadButton: typeof UeElFileUploadButton;
        UeElFileUploader: typeof UeElFileUploader;
        UeElFontFamilySetting: typeof UeElFontFamilySetting;
        UeElFontFamilyLibraryPanel: typeof UeElFontFamilyLibraryPanel;
        UeElGapSetting: typeof UeElGapSetting;
        UeElGirdLayoutUtil: typeof UeElGirdLayoutUtil;
        UeElIcon: typeof UeElIcon;
        UeElGridLayoutLibraryPanel: typeof UeElGridLayoutLibraryPanel;
        UeElGridLayoutSetting: typeof UeElGridLayoutSetting;
        UeElImageLibraryPanel: typeof UeElImageLibraryPanel;
        UeElIconLibraryPanel: typeof UeElIconLibraryPanel;
        UeElJustifyContentSetting: typeof UeElJustifyContentSetting;
        UeElLibraryPanel: typeof UeElLibraryPanel;
        UeElLinkSetting: typeof UeElLinkSetting;
        UeElLinkSettingGroup: typeof UeElLinkSettingGroup;
        UeElLinkSettingPanel: typeof UeElLinkSettingPanel;
        UeElLoading: typeof UeElLoading;
        UeElMarginSetting: typeof UeElMarginSetting;
        UeElNumberInput: typeof UeElNumberInput;
        UeElLottieLibraryPanel: typeof UeElLottieLibraryPanel;
        UeElPaddingSetting: typeof UeElPaddingSetting;
        UeElPopPanel: typeof UeElPopPanel;
        UeElOnOff: typeof UeElOnOff;
        UeElRadiusSettingGroup: typeof UeElRadiusSettingGroup;
        UeElResourceSetting: typeof UeElResourceSetting;
        UeElRadiusSetting: typeof UeElRadiusSetting;
        UeElResourcePreview: typeof UeElResourcePreview;
        UeElScrollEffectSettingPanel: typeof UeElScrollEffectSettingPanel;
        UeElSelect: typeof UeElSelect;
        UeElScrollEffectSettingGroup: typeof UeElScrollEffectSettingGroup;
        UeElSelectOption: typeof UeElSelectOption;
        UeElSettingBar: typeof UeElSettingBar;
        UeElSettingGroup: typeof UeElSettingGroup;
        UeElShapeLibraryPanel: typeof UeElShapeLibraryPanel;
        UeElShareIconLibraryPanel: typeof UeElShareIconLibraryPanel;
        UeElSplineLibraryPanel: typeof UeElSplineLibraryPanel;
        UeElSvgLibraryPanel: typeof UeElSvgLibraryPanel;
        UeElTabCard: typeof UeElTabCard;
        UeElTagInput: typeof UeElTagInput;
        UeElTextDecorationLibraryPanel: typeof UeElTextDecorationLibraryPanel;
        UeElTextDecorationSettingPanel: typeof UeElTextDecorationSettingPanel;
        UeElTextInput: typeof UeElTextInput;
        UeElTipGroup: typeof UeElTipGroup;
        UeElTranslateSetting: typeof UeElTranslateSetting;
        UeElVideoLibraryPanel: typeof UeElVideoLibraryPanel;
        UeElVideoPanel: typeof UeElVideoPanel;
    }
}

declare global {
    namespace UE_EL_COMPONENT {
        interface UeElAlignItemSettingProps extends UeElAlignItemSettingBaseProps {}
        interface UeElBackgroundImageSettingPanelProps extends UeElBackgroundImageSettingPanelBaseProps {}
        interface UeElAlignSettingProps extends UeElAlignSettingBaseProps {}
        interface UeElBackgroundShapeSettingPanelProps extends UeElBackgroundShapeSettingPanelBaseProps {}
        interface UeElBackgroundSplineSettingPanelProps extends UeElBackgroundSplineSettingPanelBaseProps {}
        interface UeElBorderSettingProps extends UeElBorderSettingBaseProps {}
        interface UeElBorderSettingGroupProps extends UeElBorderSettingGroupBaseProps {}
        interface UeElBoxShadowSettingProps extends UeElBoxShadowSettingBaseProps {}
        interface UeElButtonProps extends UeElButtonBaseProps {}
        interface UeElButtonHoverEffectLibraryPanelProps extends UeElButtonHoverEffectLibraryPanelBaseProps {}
        interface UeElButtonHoverEffectSettingProps extends UeElButtonHoverEffectSettingBaseProps {}
        interface UeElButtonLibraryPanelProps extends UeElButtonLibraryPanelBaseProps {}
        interface UeElBoxShadowSettingGroupProps extends UeElBoxShadowSettingGroupBaseProps {}
        interface UeElButtonStyleSettingProps extends UeElButtonStyleSettingBaseProps {}
        interface UeElButtonIconSettingGroupProps extends UeElButtonIconSettingGroupBaseProps {}
        interface UeElButtonIconSettingProps extends UeElButtonIconSettingBaseProps {}
        interface UeElButtonStyleSettingPanelProps extends UeElButtonStyleSettingPanelBaseProps {}
        interface UeElCalenderPickerProps extends UeElCalenderPickerBaseProps {}
        interface UeElCalenderSettingGroupProps extends UeElCalenderSettingGroupBaseProps {}
        interface UeElCheckBoxProps extends UeElCheckBoxBaseProps {}
        interface UeElCalenderSettingProps extends UeElCalenderSettingBaseProps {}
        interface UeElColorInputProps extends UeElColorInputBaseProps {}
        interface UeElColorPickerProps extends UeElColorPickerBaseProps {}
        interface UeElColorSettingProps extends UeElColorSettingBaseProps {}
        interface UeElColorSettingGroupProps extends UeElColorSettingGroupBaseProps {}
        interface UeElConfirmPanelProps extends UeElConfirmPanelBaseProps {}
        interface UeElContextmenuProps extends UeElContextmenuBaseProps {}
        interface UeElColorPickerPanelProps extends UeElColorPickerPanelBaseProps {}
        interface UeElControlGroupProps extends UeElControlGroupBaseProps {}
        interface UeElEditorGroupProps extends UeElEditorGroupBaseProps {}
        interface UeElEmojiLibraryPanelProps extends UeElEmojiLibraryPanelBaseProps {}
        interface UeElEmptyPanelProps extends UeElEmptyPanelBaseProps {}
        interface UeElEnterAnimateSettingProps extends UeElEnterAnimateSettingBaseProps {}
        interface UeElEditorPanelProps extends UeElEditorPanelBaseProps {}
        interface UeElFileUploadButtonProps extends UeElFileUploadButtonBaseProps {}
        interface UeElFileUploaderProps extends UeElFileUploaderBaseProps {}
        interface UeElFontFamilySettingProps extends UeElFontFamilySettingBaseProps {}
        interface UeElFontFamilyLibraryPanelProps extends UeElFontFamilyLibraryPanelBaseProps {}
        interface UeElGapSettingProps extends UeElGapSettingBaseProps {}
        interface UeElGirdLayoutUtilProps extends UeElGirdLayoutUtilBaseProps {}
        interface UeElIconProps extends UeElIconBaseProps {}
        interface UeElGridLayoutLibraryPanelProps extends UeElGridLayoutLibraryPanelBaseProps {}
        interface UeElGridLayoutSettingProps extends UeElGridLayoutSettingBaseProps {}
        interface UeElImageLibraryPanelProps extends UeElImageLibraryPanelBaseProps {}
        interface UeElIconLibraryPanelProps extends UeElIconLibraryPanelBaseProps {}
        interface UeElJustifyContentSettingProps extends UeElJustifyContentSettingBaseProps {}
        interface UeElLibraryPanelProps extends UeElLibraryPanelBaseProps {}
        interface UeElLinkSettingProps extends UeElLinkSettingBaseProps {}
        interface UeElLinkSettingGroupProps extends UeElLinkSettingGroupBaseProps {}
        interface UeElLinkSettingPanelProps extends UeElLinkSettingPanelBaseProps {}
        interface UeElLoadingProps extends UeElLoadingBaseProps {}
        interface UeElMarginSettingProps extends UeElMarginSettingBaseProps {}
        interface UeElNumberInputProps extends UeElNumberInputBaseProps {}
        interface UeElLottieLibraryPanelProps extends UeElLottieLibraryPanelBaseProps {}
        interface UeElPaddingSettingProps extends UeElPaddingSettingBaseProps {}
        interface UeElPopPanelProps extends UeElPopPanelBaseProps {}
        interface UeElOnOffProps extends UeElOnOffBaseProps {}
        interface UeElRadiusSettingGroupProps extends UeElRadiusSettingGroupBaseProps {}
        interface UeElResourceSettingProps extends UeElResourceSettingBaseProps {}
        interface UeElRadiusSettingProps extends UeElRadiusSettingBaseProps {}
        interface UeElResourcePreviewProps extends UeElResourcePreviewBaseProps {}
        interface UeElScrollEffectSettingPanelProps extends UeElScrollEffectSettingPanelBaseProps {}
        interface UeElSelectProps extends UeElSelectBaseProps {}
        interface UeElScrollEffectSettingGroupProps extends UeElScrollEffectSettingGroupBaseProps {}
        interface UeElSelectOptionProps extends UeElSelectOptionBaseProps {}
        interface UeElSettingBarProps extends UeElSettingBarBaseProps {}
        interface UeElSettingGroupProps extends UeElSettingGroupBaseProps {}
        interface UeElShapeLibraryPanelProps extends UeElShapeLibraryPanelBaseProps {}
        interface UeElShareIconLibraryPanelProps extends UeElShareIconLibraryPanelBaseProps {}
        interface UeElSplineLibraryPanelProps extends UeElSplineLibraryPanelBaseProps {}
        interface UeElSvgLibraryPanelProps extends UeElSvgLibraryPanelBaseProps {}
        interface UeElTabCardProps extends UeElTabCardBaseProps {}
        interface UeElTagInputProps extends UeElTagInputBaseProps {}
        interface UeElTextDecorationLibraryPanelProps extends UeElTextDecorationLibraryPanelBaseProps {}
        interface UeElTextDecorationSettingPanelProps extends UeElTextDecorationSettingPanelBaseProps {}
        interface UeElTextInputProps extends UeElTextInputBaseProps {}
        interface UeElTipGroupProps extends UeElTipGroupBaseProps {}
        interface UeElTranslateSettingProps extends UeElTranslateSettingBaseProps {}
        interface UeElVideoLibraryPanelProps extends UeElVideoLibraryPanelBaseProps {}
        interface UeElVideoPanelProps extends UeElVideoPanelBaseProps {}
    }
}

export {};
