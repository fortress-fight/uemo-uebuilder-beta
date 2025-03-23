/*
 * @Description: 组件注册
 * @Author: F-Stone
 * @LastEditTime: 2025-02-20 15:32:50
 */
import UeElAlignItemSetting, { UeElAlignItemSettingBaseProps } from "../packages/align-item-setting";
import UeElBackgroundSettingGroup, { UeElBackgroundSettingGroupBaseProps } from "../packages/background-setting-group";
import UeElAlignSetting, { UeElAlignSettingBaseProps } from "../packages/align-setting";
import UeElBackgroundImageSettingPanel, {
    UeElBackgroundImageSettingPanelBaseProps,
} from "../packages/background-image-setting-panel";
import UeElBackgroundShapeSettingPanel, {
    UeElBackgroundShapeSettingPanelBaseProps,
} from "../packages/background-shape-setting-panel";
import UeElBackgroundSplineSettingPanel, {
    UeElBackgroundSplineSettingPanelBaseProps,
} from "../packages/background-spline-setting-panel";
import UeElBorderSetting, { UeElBorderSettingBaseProps } from "../packages/border-setting";
import UeElBorderSettingGroup, { UeElBorderSettingGroupBaseProps } from "../packages/border-setting-group";
import UeElBoxShadowSetting, { UeElBoxShadowSettingBaseProps } from "../packages/box-shadow-setting";
import UeElBoxShadowSettingGroup, { UeElBoxShadowSettingGroupBaseProps } from "../packages/box-shadow-setting-group";
import UeElButton, { UeElButtonBaseProps } from "../packages/button";
import UeElButtonHoverEffectLibraryPanel, {
    UeElButtonHoverEffectLibraryPanelBaseProps,
} from "../packages/button-hover-effect-library-panel";
import UeElButtonHoverEffectSetting, {
    UeElButtonHoverEffectSettingBaseProps,
} from "../packages/button-hover-effect-setting";
import UeElButtonIconSetting, { UeElButtonIconSettingBaseProps } from "../packages/button-icon-setting";
import UeElButtonIconSettingGroup, { UeElButtonIconSettingGroupBaseProps } from "../packages/button-icon-setting-group";
import UeElButtonLibraryPanel, { UeElButtonLibraryPanelBaseProps } from "../packages/button-library-panel";
import UeElButtonStyleSetting, { UeElButtonStyleSettingBaseProps } from "../packages/button-style-setting";
import UeElButtonStyleSettingPanel, {
    UeElButtonStyleSettingPanelBaseProps,
} from "../packages/button-style-setting-panel";
import UeElCalenderPicker, { UeElCalenderPickerBaseProps } from "../packages/calender-picker";
import UeElCalenderSetting, { UeElCalenderSettingBaseProps } from "../packages/calender-setting";
import UeElCalenderSettingGroup, { UeElCalenderSettingGroupBaseProps } from "../packages/calender-setting-group";
import UeElCheckBox, { UeElCheckBoxBaseProps } from "../packages/check-box";
import UeElColorInput, { UeElColorInputBaseProps } from "../packages/color-input";
import UeElColorPicker, { UeElColorPickerBaseProps } from "../packages/color-picker";
import UeElColorSetting, { UeElColorSettingBaseProps } from "../packages/color-setting";
import UeElColorPickerPanel, { UeElColorPickerPanelBaseProps } from "../packages/color-picker-panel";
import UeElColorSettingGroup, { UeElColorSettingGroupBaseProps } from "../packages/color-setting-group";
import UeElConfirmPanel, { UeElConfirmPanelBaseProps } from "../packages/confirm-panel";
import UeElContextmenu, { UeElContextmenuBaseProps } from "../packages/contextmenu";
import UeElControlGroup, { UeElControlGroupBaseProps } from "../packages/control-group";
import UeElEditorGroup, { UeElEditorGroupBaseProps } from "../packages/editor-group";
import UeElEditorPanel, { UeElEditorPanelBaseProps } from "../packages/editor-panel";
import UeElEmojiLibraryPanel, { UeElEmojiLibraryPanelBaseProps } from "../packages/emoji-library-panel";
import UeElEmptyPanel, { UeElEmptyPanelBaseProps } from "../packages/empty-panel";
import UeElEnterAnimateSetting, { UeElEnterAnimateSettingBaseProps } from "../packages/enter-animate-setting";
import UeElFileUploadButton, { UeElFileUploadButtonBaseProps } from "../packages/file-upload-button";
import UeElFileUploader, { UeElFileUploaderBaseProps } from "../packages/file-uploader";
import UeElFontFamilyLibraryPanel, { UeElFontFamilyLibraryPanelBaseProps } from "../packages/font-family-library-panel";
import UeElGapSetting, { UeElGapSettingBaseProps } from "../packages/gap-setting";
import UeElFontFamilySetting, { UeElFontFamilySettingBaseProps } from "../packages/font-family-setting";
import UeElGridLayoutLibraryPanel, { UeElGridLayoutLibraryPanelBaseProps } from "../packages/grid-layout-library-panel";
import UeElGirdLayoutUtil, { UeElGirdLayoutUtilBaseProps } from "../packages/gird-layout-util";
import UeElGridLayoutSetting, { UeElGridLayoutSettingBaseProps } from "../packages/grid-layout-setting";
import UeElIcon, { UeElIconBaseProps } from "../packages/icon";
import UeElIconLibraryPanel, { UeElIconLibraryPanelBaseProps } from "../packages/icon-library-panel";
import UeElJustifyContentSetting, { UeElJustifyContentSettingBaseProps } from "../packages/justify-content-setting";
import UeElLibraryPanel, { UeElLibraryPanelBaseProps } from "../packages/library-panel";
import UeElImageLibraryPanel, { UeElImageLibraryPanelBaseProps } from "../packages/image-library-panel";
import UeElLinkSettingGroup, { UeElLinkSettingGroupBaseProps } from "../packages/link-setting-group";
import UeElLinkSettingPanel, { UeElLinkSettingPanelBaseProps } from "../packages/link-setting-panel";
import UeElLinkSetting, { UeElLinkSettingBaseProps } from "../packages/link-setting";
import UeElLoading, { UeElLoadingBaseProps } from "../packages/loading";
import UeElNumberInput, { UeElNumberInputBaseProps } from "../packages/number-input";
import UeElMarginSetting, { UeElMarginSettingBaseProps } from "../packages/margin-setting";
import UeElLottieLibraryPanel, { UeElLottieLibraryPanelBaseProps } from "../packages/lottie-library-panel";
import UeElOnOff, { UeElOnOffBaseProps } from "../packages/on-off";
import UeElPaddingSetting, { UeElPaddingSettingBaseProps } from "../packages/padding-setting";
import UeElPopPanel, { UeElPopPanelBaseProps } from "../packages/pop-panel";
import UeElRadiusSetting, { UeElRadiusSettingBaseProps } from "../packages/radius-setting";
import UeElRadiusSettingGroup, { UeElRadiusSettingGroupBaseProps } from "../packages/radius-setting-group";
import UeElResourceSetting, { UeElResourceSettingBaseProps } from "../packages/resource-setting";
import UeElResourcePreview, { UeElResourcePreviewBaseProps } from "../packages/resource-preview";
import UeElScrollEffectSettingGroup, {
    UeElScrollEffectSettingGroupBaseProps,
} from "../packages/scroll-effect-setting-group";
import UeElSelectOption, { UeElSelectOptionBaseProps } from "../packages/select-option";
import UeElScrollEffectSettingPanel, {
    UeElScrollEffectSettingPanelBaseProps,
} from "../packages/scroll-effect-setting-panel";
import UeElSelect, { UeElSelectBaseProps } from "../packages/select";
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
        UeElBackgroundSettingGroup: typeof UeElBackgroundSettingGroup;
        UeElAlignSetting: typeof UeElAlignSetting;
        UeElBackgroundImageSettingPanel: typeof UeElBackgroundImageSettingPanel;
        UeElBackgroundShapeSettingPanel: typeof UeElBackgroundShapeSettingPanel;
        UeElBackgroundSplineSettingPanel: typeof UeElBackgroundSplineSettingPanel;
        UeElBorderSetting: typeof UeElBorderSetting;
        UeElBorderSettingGroup: typeof UeElBorderSettingGroup;
        UeElBoxShadowSetting: typeof UeElBoxShadowSetting;
        UeElBoxShadowSettingGroup: typeof UeElBoxShadowSettingGroup;
        UeElButton: typeof UeElButton;
        UeElButtonHoverEffectLibraryPanel: typeof UeElButtonHoverEffectLibraryPanel;
        UeElButtonHoverEffectSetting: typeof UeElButtonHoverEffectSetting;
        UeElButtonIconSetting: typeof UeElButtonIconSetting;
        UeElButtonIconSettingGroup: typeof UeElButtonIconSettingGroup;
        UeElButtonLibraryPanel: typeof UeElButtonLibraryPanel;
        UeElButtonStyleSetting: typeof UeElButtonStyleSetting;
        UeElButtonStyleSettingPanel: typeof UeElButtonStyleSettingPanel;
        UeElCalenderPicker: typeof UeElCalenderPicker;
        UeElCalenderSetting: typeof UeElCalenderSetting;
        UeElCalenderSettingGroup: typeof UeElCalenderSettingGroup;
        UeElCheckBox: typeof UeElCheckBox;
        UeElColorInput: typeof UeElColorInput;
        UeElColorPicker: typeof UeElColorPicker;
        UeElColorSetting: typeof UeElColorSetting;
        UeElColorPickerPanel: typeof UeElColorPickerPanel;
        UeElColorSettingGroup: typeof UeElColorSettingGroup;
        UeElConfirmPanel: typeof UeElConfirmPanel;
        UeElContextmenu: typeof UeElContextmenu;
        UeElControlGroup: typeof UeElControlGroup;
        UeElEditorGroup: typeof UeElEditorGroup;
        UeElEditorPanel: typeof UeElEditorPanel;
        UeElEmojiLibraryPanel: typeof UeElEmojiLibraryPanel;
        UeElEmptyPanel: typeof UeElEmptyPanel;
        UeElEnterAnimateSetting: typeof UeElEnterAnimateSetting;
        UeElFileUploadButton: typeof UeElFileUploadButton;
        UeElFileUploader: typeof UeElFileUploader;
        UeElFontFamilyLibraryPanel: typeof UeElFontFamilyLibraryPanel;
        UeElGapSetting: typeof UeElGapSetting;
        UeElFontFamilySetting: typeof UeElFontFamilySetting;
        UeElGridLayoutLibraryPanel: typeof UeElGridLayoutLibraryPanel;
        UeElGirdLayoutUtil: typeof UeElGirdLayoutUtil;
        UeElGridLayoutSetting: typeof UeElGridLayoutSetting;
        UeElIcon: typeof UeElIcon;
        UeElIconLibraryPanel: typeof UeElIconLibraryPanel;
        UeElJustifyContentSetting: typeof UeElJustifyContentSetting;
        UeElLibraryPanel: typeof UeElLibraryPanel;
        UeElImageLibraryPanel: typeof UeElImageLibraryPanel;
        UeElLinkSettingGroup: typeof UeElLinkSettingGroup;
        UeElLinkSettingPanel: typeof UeElLinkSettingPanel;
        UeElLinkSetting: typeof UeElLinkSetting;
        UeElLoading: typeof UeElLoading;
        UeElNumberInput: typeof UeElNumberInput;
        UeElMarginSetting: typeof UeElMarginSetting;
        UeElLottieLibraryPanel: typeof UeElLottieLibraryPanel;
        UeElOnOff: typeof UeElOnOff;
        UeElPaddingSetting: typeof UeElPaddingSetting;
        UeElPopPanel: typeof UeElPopPanel;
        UeElRadiusSetting: typeof UeElRadiusSetting;
        UeElRadiusSettingGroup: typeof UeElRadiusSettingGroup;
        UeElResourceSetting: typeof UeElResourceSetting;
        UeElResourcePreview: typeof UeElResourcePreview;
        UeElScrollEffectSettingGroup: typeof UeElScrollEffectSettingGroup;
        UeElSelectOption: typeof UeElSelectOption;
        UeElScrollEffectSettingPanel: typeof UeElScrollEffectSettingPanel;
        UeElSelect: typeof UeElSelect;
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
        interface UeElBackgroundSettingGroupProps extends UeElBackgroundSettingGroupBaseProps {}
        interface UeElAlignSettingProps extends UeElAlignSettingBaseProps {}
        interface UeElBackgroundImageSettingPanelProps extends UeElBackgroundImageSettingPanelBaseProps {}
        interface UeElBackgroundShapeSettingPanelProps extends UeElBackgroundShapeSettingPanelBaseProps {}
        interface UeElBackgroundSplineSettingPanelProps extends UeElBackgroundSplineSettingPanelBaseProps {}
        interface UeElBorderSettingProps extends UeElBorderSettingBaseProps {}
        interface UeElBorderSettingGroupProps extends UeElBorderSettingGroupBaseProps {}
        interface UeElBoxShadowSettingProps extends UeElBoxShadowSettingBaseProps {}
        interface UeElBoxShadowSettingGroupProps extends UeElBoxShadowSettingGroupBaseProps {}
        interface UeElButtonProps extends UeElButtonBaseProps {}
        interface UeElButtonHoverEffectLibraryPanelProps extends UeElButtonHoverEffectLibraryPanelBaseProps {}
        interface UeElButtonHoverEffectSettingProps extends UeElButtonHoverEffectSettingBaseProps {}
        interface UeElButtonIconSettingProps extends UeElButtonIconSettingBaseProps {}
        interface UeElButtonIconSettingGroupProps extends UeElButtonIconSettingGroupBaseProps {}
        interface UeElButtonLibraryPanelProps extends UeElButtonLibraryPanelBaseProps {}
        interface UeElButtonStyleSettingProps extends UeElButtonStyleSettingBaseProps {}
        interface UeElButtonStyleSettingPanelProps extends UeElButtonStyleSettingPanelBaseProps {}
        interface UeElCalenderPickerProps extends UeElCalenderPickerBaseProps {}
        interface UeElCalenderSettingProps extends UeElCalenderSettingBaseProps {}
        interface UeElCalenderSettingGroupProps extends UeElCalenderSettingGroupBaseProps {}
        interface UeElCheckBoxProps extends UeElCheckBoxBaseProps {}
        interface UeElColorInputProps extends UeElColorInputBaseProps {}
        interface UeElColorPickerProps extends UeElColorPickerBaseProps {}
        interface UeElColorSettingProps extends UeElColorSettingBaseProps {}
        interface UeElColorPickerPanelProps extends UeElColorPickerPanelBaseProps {}
        interface UeElColorSettingGroupProps extends UeElColorSettingGroupBaseProps {}
        interface UeElConfirmPanelProps extends UeElConfirmPanelBaseProps {}
        interface UeElContextmenuProps extends UeElContextmenuBaseProps {}
        interface UeElControlGroupProps extends UeElControlGroupBaseProps {}
        interface UeElEditorGroupProps extends UeElEditorGroupBaseProps {}
        interface UeElEditorPanelProps extends UeElEditorPanelBaseProps {}
        interface UeElEmojiLibraryPanelProps extends UeElEmojiLibraryPanelBaseProps {}
        interface UeElEmptyPanelProps extends UeElEmptyPanelBaseProps {}
        interface UeElEnterAnimateSettingProps extends UeElEnterAnimateSettingBaseProps {}
        interface UeElFileUploadButtonProps extends UeElFileUploadButtonBaseProps {}
        interface UeElFileUploaderProps extends UeElFileUploaderBaseProps {}
        interface UeElFontFamilyLibraryPanelProps extends UeElFontFamilyLibraryPanelBaseProps {}
        interface UeElGapSettingProps extends UeElGapSettingBaseProps {}
        interface UeElFontFamilySettingProps extends UeElFontFamilySettingBaseProps {}
        interface UeElGridLayoutLibraryPanelProps extends UeElGridLayoutLibraryPanelBaseProps {}
        interface UeElGirdLayoutUtilProps extends UeElGirdLayoutUtilBaseProps {}
        interface UeElGridLayoutSettingProps extends UeElGridLayoutSettingBaseProps {}
        interface UeElIconProps extends UeElIconBaseProps {}
        interface UeElIconLibraryPanelProps extends UeElIconLibraryPanelBaseProps {}
        interface UeElJustifyContentSettingProps extends UeElJustifyContentSettingBaseProps {}
        interface UeElLibraryPanelProps extends UeElLibraryPanelBaseProps {}
        interface UeElImageLibraryPanelProps extends UeElImageLibraryPanelBaseProps {}
        interface UeElLinkSettingGroupProps extends UeElLinkSettingGroupBaseProps {}
        interface UeElLinkSettingPanelProps extends UeElLinkSettingPanelBaseProps {}
        interface UeElLinkSettingProps extends UeElLinkSettingBaseProps {}
        interface UeElLoadingProps extends UeElLoadingBaseProps {}
        interface UeElNumberInputProps extends UeElNumberInputBaseProps {}
        interface UeElMarginSettingProps extends UeElMarginSettingBaseProps {}
        interface UeElLottieLibraryPanelProps extends UeElLottieLibraryPanelBaseProps {}
        interface UeElOnOffProps extends UeElOnOffBaseProps {}
        interface UeElPaddingSettingProps extends UeElPaddingSettingBaseProps {}
        interface UeElPopPanelProps extends UeElPopPanelBaseProps {}
        interface UeElRadiusSettingProps extends UeElRadiusSettingBaseProps {}
        interface UeElRadiusSettingGroupProps extends UeElRadiusSettingGroupBaseProps {}
        interface UeElResourceSettingProps extends UeElResourceSettingBaseProps {}
        interface UeElResourcePreviewProps extends UeElResourcePreviewBaseProps {}
        interface UeElScrollEffectSettingGroupProps extends UeElScrollEffectSettingGroupBaseProps {}
        interface UeElSelectOptionProps extends UeElSelectOptionBaseProps {}
        interface UeElScrollEffectSettingPanelProps extends UeElScrollEffectSettingPanelBaseProps {}
        interface UeElSelectProps extends UeElSelectBaseProps {}
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
