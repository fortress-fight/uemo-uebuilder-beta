/*
 * @Description: 组件注册
 * @Author: F-Stone
 * @LastEditTime: 2025-02-20 15:32:50
 */
import UeElAlignItemSetting, { UeElAlignItemSettingBaseProps } from "../packages/align-item-setting";
import UeElBackgroundImageSettingPanel, {
    UeElBackgroundImageSettingPanelBaseProps,
} from "../packages/background-image-setting-panel";
import UeElBackgroundSettingGroup, { UeElBackgroundSettingGroupBaseProps } from "../packages/background-setting-group";
import UeElAlignSetting, { UeElAlignSettingBaseProps } from "../packages/align-setting";
import UeElBackgroundShapeSettingPanel, {
    UeElBackgroundShapeSettingPanelBaseProps,
} from "../packages/background-shape-setting-panel";
import UeElBackgroundSplineSettingPanel, {
    UeElBackgroundSplineSettingPanelBaseProps,
} from "../packages/background-spline-setting-panel";
import UeElBackgroundSvgSettingPanel, {
    UeElBackgroundSvgSettingPanelBaseProps,
} from "../packages/background-svg-setting-panel";
import UeElBackgroundVideoSettingPanel, {
    UeElBackgroundVideoSettingPanelBaseProps,
} from "../packages/background-video-setting-panel";
import UeElBorderSetting, { UeElBorderSettingBaseProps } from "../packages/border-setting";
import UeElBorderSettingGroup, { UeElBorderSettingGroupBaseProps } from "../packages/border-setting-group";
import UeElBoxShadowSetting, { UeElBoxShadowSettingBaseProps } from "../packages/box-shadow-setting";
import UeElBoxShadowSettingGroup, { UeElBoxShadowSettingGroupBaseProps } from "../packages/box-shadow-setting-group";
import UeElBrowserMockupPanel, { UeElBrowserMockupPanelBaseProps } from "../packages/browser-mockup-panel";
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
import UeElColorPickerPanel, { UeElColorPickerPanelBaseProps } from "../packages/color-picker-panel";
import UeElColorSettingGroup, { UeElColorSettingGroupBaseProps } from "../packages/color-setting-group";
import UeElConfirmPanel, { UeElConfirmPanelBaseProps } from "../packages/confirm-panel";
import UeElContextmenu, { UeElContextmenuBaseProps } from "../packages/contextmenu";
import UeElControlGroup, { UeElControlGroupBaseProps } from "../packages/control-group";
import UeElDraggable, { UeElDraggableBaseProps } from "../packages/draggable";
import UeElColorSetting, { UeElColorSettingBaseProps } from "../packages/color-setting";
import UeElEditorPanel, { UeElEditorPanelBaseProps } from "../packages/editor-panel";
import UeElEmojiLibraryPanel, { UeElEmojiLibraryPanelBaseProps } from "../packages/emoji-library-panel";
import UeElFileUploadButton, { UeElFileUploadButtonBaseProps } from "../packages/file-upload-button";
import UeElEmptyPanel, { UeElEmptyPanelBaseProps } from "../packages/empty-panel";
import UeElFileUploader, { UeElFileUploaderBaseProps } from "../packages/file-uploader";
import UeElEnterAnimateSetting, { UeElEnterAnimateSettingBaseProps } from "../packages/enter-animate-setting";
import UeElFontFamilyLibraryPanel, { UeElFontFamilyLibraryPanelBaseProps } from "../packages/font-family-library-panel";
import UeElFontFamilySetting, { UeElFontFamilySettingBaseProps } from "../packages/font-family-setting";
import UeElFontSizeSetting, { UeElFontSizeSettingBaseProps } from "../packages/font-size-setting";
import UeElGapSetting, { UeElGapSettingBaseProps } from "../packages/gap-setting";
import UeElGridLayoutSetting, { UeElGridLayoutSettingBaseProps } from "../packages/grid-layout-setting";
import UeElGirdLayoutUtil, { UeElGirdLayoutUtilBaseProps } from "../packages/gird-layout-util";
import UeElGridLayoutLibraryPanel, { UeElGridLayoutLibraryPanelBaseProps } from "../packages/grid-layout-library-panel";
import UeElIcon, { UeElIconBaseProps } from "../packages/icon";
import UeElIconLibraryPanel, { UeElIconLibraryPanelBaseProps } from "../packages/icon-library-panel";
import UeElImageLibraryPanel, { UeElImageLibraryPanelBaseProps } from "../packages/image-library-panel";
import UeElJustifyContentSetting, { UeElJustifyContentSettingBaseProps } from "../packages/justify-content-setting";
import UeElLibraryPanel, { UeElLibraryPanelBaseProps } from "../packages/library-panel";
import UeElLinkSetting, { UeElLinkSettingBaseProps } from "../packages/link-setting";
import UeElLinkSettingGroup, { UeElLinkSettingGroupBaseProps } from "../packages/link-setting-group";
import UeElLoading, { UeElLoadingBaseProps } from "../packages/loading";
import UeElLinkSettingPanel, { UeElLinkSettingPanelBaseProps } from "../packages/link-setting-panel";
import UeElLottieLibraryPanel, { UeElLottieLibraryPanelBaseProps } from "../packages/lottie-library-panel";
import UeElMapSettingPanel, { UeElMapSettingPanelBaseProps } from "../packages/map-setting-panel";
import UeElMarginSetting, { UeElMarginSettingBaseProps } from "../packages/margin-setting";
import UeElMiniEditorPanel, { UeElMiniEditorPanelBaseProps } from "../packages/mini-editor-panel";
import UeElNumberInput, { UeElNumberInputBaseProps } from "../packages/number-input";
import UeElOnOff, { UeElOnOffBaseProps } from "../packages/on-off";
import UeElPaddingSetting, { UeElPaddingSettingBaseProps } from "../packages/padding-setting";
import UeElPaddingSettingGroup, { UeElPaddingSettingGroupBaseProps } from "../packages/padding-setting-group";
import UeElPopPanel, { UeElPopPanelBaseProps } from "../packages/pop-panel";
import UeElRatioSettingGroup, { UeElRatioSettingGroupBaseProps } from "../packages/ratio-setting-group";
import UeElRadiusSettingGroup, { UeElRadiusSettingGroupBaseProps } from "../packages/radius-setting-group";
import UeElResourcePreview, { UeElResourcePreviewBaseProps } from "../packages/resource-preview";
import UeElRadiusSetting, { UeElRadiusSettingBaseProps } from "../packages/radius-setting";
import UeElResourceSetting, { UeElResourceSettingBaseProps } from "../packages/resource-setting";
import UeElRichTextLibraryPanel, { UeElRichTextLibraryPanelBaseProps } from "../packages/rich-text-library-panel";
import UeElScrollEffectSettingPanel, {
    UeElScrollEffectSettingPanelBaseProps,
} from "../packages/scroll-effect-setting-panel";
import UeElScrollEffectSettingGroup, {
    UeElScrollEffectSettingGroupBaseProps,
} from "../packages/scroll-effect-setting-group";
import UeElSelect, { UeElSelectBaseProps } from "../packages/select";
import UeElSelectOption, { UeElSelectOptionBaseProps } from "../packages/select-option";
import UeElSettingBar, { UeElSettingBarBaseProps } from "../packages/setting-bar";
import UeElSettingGroup, { UeElSettingGroupBaseProps } from "../packages/setting-group";
import UeElShapeLibraryPanel, { UeElShapeLibraryPanelBaseProps } from "../packages/shape-library-panel";
import UeElSizeSettingGroup, { UeElSizeSettingGroupBaseProps } from "../packages/size-setting-group";
import UeElSplineLibraryPanel, { UeElSplineLibraryPanelBaseProps } from "../packages/spline-library-panel";
import UeElShareIconLibraryPanel, { UeElShareIconLibraryPanelBaseProps } from "../packages/share-icon-library-panel";
import UeElSvgLibraryPanel, { UeElSvgLibraryPanelBaseProps } from "../packages/svg-library-panel";
import UeElTagInput, { UeElTagInputBaseProps } from "../packages/tag-input";
import UeElTextDecorationLibraryPanel, {
    UeElTextDecorationLibraryPanelBaseProps,
} from "../packages/text-decoration-library-panel";
import UeElTabCard, { UeElTabCardBaseProps } from "../packages/tab-card";
import UeElTextDecorationSettingPanel, {
    UeElTextDecorationSettingPanelBaseProps,
} from "../packages/text-decoration-setting-panel";
import UeElTranslateSetting, { UeElTranslateSettingBaseProps } from "../packages/translate-setting";
import UeElTextInput, { UeElTextInputBaseProps } from "../packages/text-input";
import UeElTipGroup, { UeElTipGroupBaseProps } from "../packages/tip-group";
import UeElVideoLibraryPanel, { UeElVideoLibraryPanelBaseProps } from "../packages/video-library-panel";
import UeElWebSettingPanel, { UeElWebSettingPanelBaseProps } from "../packages/web-setting-panel";
import UeElVideoPanel, { UeElVideoPanelBaseProps } from "../packages/video-panel";
import UeElWidthSettingGroup, { UeElWidthSettingGroupBaseProps } from "../packages/width-setting-group";

declare module "vue" {
    export interface GlobalComponents {
        UeElAlignItemSetting: typeof UeElAlignItemSetting;
        UeElBackgroundImageSettingPanel: typeof UeElBackgroundImageSettingPanel;
        UeElBackgroundSettingGroup: typeof UeElBackgroundSettingGroup;
        UeElAlignSetting: typeof UeElAlignSetting;
        UeElBackgroundShapeSettingPanel: typeof UeElBackgroundShapeSettingPanel;
        UeElBackgroundSplineSettingPanel: typeof UeElBackgroundSplineSettingPanel;
        UeElBackgroundSvgSettingPanel: typeof UeElBackgroundSvgSettingPanel;
        UeElBackgroundVideoSettingPanel: typeof UeElBackgroundVideoSettingPanel;
        UeElBorderSetting: typeof UeElBorderSetting;
        UeElBorderSettingGroup: typeof UeElBorderSettingGroup;
        UeElBoxShadowSetting: typeof UeElBoxShadowSetting;
        UeElBoxShadowSettingGroup: typeof UeElBoxShadowSettingGroup;
        UeElBrowserMockupPanel: typeof UeElBrowserMockupPanel;
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
        UeElColorPickerPanel: typeof UeElColorPickerPanel;
        UeElColorSettingGroup: typeof UeElColorSettingGroup;
        UeElConfirmPanel: typeof UeElConfirmPanel;
        UeElContextmenu: typeof UeElContextmenu;
        UeElControlGroup: typeof UeElControlGroup;
        UeElDraggable: typeof UeElDraggable;
        UeElColorSetting: typeof UeElColorSetting;
        UeElEditorPanel: typeof UeElEditorPanel;
        UeElEmojiLibraryPanel: typeof UeElEmojiLibraryPanel;
        UeElFileUploadButton: typeof UeElFileUploadButton;
        UeElEmptyPanel: typeof UeElEmptyPanel;
        UeElFileUploader: typeof UeElFileUploader;
        UeElEnterAnimateSetting: typeof UeElEnterAnimateSetting;
        UeElFontFamilyLibraryPanel: typeof UeElFontFamilyLibraryPanel;
        UeElFontFamilySetting: typeof UeElFontFamilySetting;
        UeElFontSizeSetting: typeof UeElFontSizeSetting;
        UeElGapSetting: typeof UeElGapSetting;
        UeElGridLayoutSetting: typeof UeElGridLayoutSetting;
        UeElGirdLayoutUtil: typeof UeElGirdLayoutUtil;
        UeElGridLayoutLibraryPanel: typeof UeElGridLayoutLibraryPanel;
        UeElIcon: typeof UeElIcon;
        UeElIconLibraryPanel: typeof UeElIconLibraryPanel;
        UeElImageLibraryPanel: typeof UeElImageLibraryPanel;
        UeElJustifyContentSetting: typeof UeElJustifyContentSetting;
        UeElLibraryPanel: typeof UeElLibraryPanel;
        UeElLinkSetting: typeof UeElLinkSetting;
        UeElLinkSettingGroup: typeof UeElLinkSettingGroup;
        UeElLoading: typeof UeElLoading;
        UeElLinkSettingPanel: typeof UeElLinkSettingPanel;
        UeElLottieLibraryPanel: typeof UeElLottieLibraryPanel;
        UeElMapSettingPanel: typeof UeElMapSettingPanel;
        UeElMarginSetting: typeof UeElMarginSetting;
        UeElMiniEditorPanel: typeof UeElMiniEditorPanel;
        UeElNumberInput: typeof UeElNumberInput;
        UeElOnOff: typeof UeElOnOff;
        UeElPaddingSetting: typeof UeElPaddingSetting;
        UeElPaddingSettingGroup: typeof UeElPaddingSettingGroup;
        UeElPopPanel: typeof UeElPopPanel;
        UeElRatioSettingGroup: typeof UeElRatioSettingGroup;
        UeElRadiusSettingGroup: typeof UeElRadiusSettingGroup;
        UeElResourcePreview: typeof UeElResourcePreview;
        UeElRadiusSetting: typeof UeElRadiusSetting;
        UeElResourceSetting: typeof UeElResourceSetting;
        UeElRichTextLibraryPanel: typeof UeElRichTextLibraryPanel;
        UeElScrollEffectSettingPanel: typeof UeElScrollEffectSettingPanel;
        UeElScrollEffectSettingGroup: typeof UeElScrollEffectSettingGroup;
        UeElSelect: typeof UeElSelect;
        UeElSelectOption: typeof UeElSelectOption;
        UeElSettingBar: typeof UeElSettingBar;
        UeElSettingGroup: typeof UeElSettingGroup;
        UeElShapeLibraryPanel: typeof UeElShapeLibraryPanel;
        UeElSizeSettingGroup: typeof UeElSizeSettingGroup;
        UeElSplineLibraryPanel: typeof UeElSplineLibraryPanel;
        UeElShareIconLibraryPanel: typeof UeElShareIconLibraryPanel;
        UeElSvgLibraryPanel: typeof UeElSvgLibraryPanel;
        UeElTagInput: typeof UeElTagInput;
        UeElTextDecorationLibraryPanel: typeof UeElTextDecorationLibraryPanel;
        UeElTabCard: typeof UeElTabCard;
        UeElTextDecorationSettingPanel: typeof UeElTextDecorationSettingPanel;
        UeElTranslateSetting: typeof UeElTranslateSetting;
        UeElTextInput: typeof UeElTextInput;
        UeElTipGroup: typeof UeElTipGroup;
        UeElVideoLibraryPanel: typeof UeElVideoLibraryPanel;
        UeElWebSettingPanel: typeof UeElWebSettingPanel;
        UeElVideoPanel: typeof UeElVideoPanel;
        UeElWidthSettingGroup: typeof UeElWidthSettingGroup;
    }
}

declare global {
    namespace UE_EL_COMPONENT {
        interface UeElAlignItemSettingProps extends UeElAlignItemSettingBaseProps {}
        interface UeElBackgroundImageSettingPanelProps extends UeElBackgroundImageSettingPanelBaseProps {}
        interface UeElBackgroundSettingGroupProps extends UeElBackgroundSettingGroupBaseProps {}
        interface UeElAlignSettingProps extends UeElAlignSettingBaseProps {}
        interface UeElBackgroundShapeSettingPanelProps extends UeElBackgroundShapeSettingPanelBaseProps {}
        interface UeElBackgroundSplineSettingPanelProps extends UeElBackgroundSplineSettingPanelBaseProps {}
        interface UeElBackgroundSvgSettingPanelProps extends UeElBackgroundSvgSettingPanelBaseProps {}
        interface UeElBackgroundVideoSettingPanelProps extends UeElBackgroundVideoSettingPanelBaseProps {}
        interface UeElBorderSettingProps extends UeElBorderSettingBaseProps {}
        interface UeElBorderSettingGroupProps extends UeElBorderSettingGroupBaseProps {}
        interface UeElBoxShadowSettingProps extends UeElBoxShadowSettingBaseProps {}
        interface UeElBoxShadowSettingGroupProps extends UeElBoxShadowSettingGroupBaseProps {}
        interface UeElBrowserMockupPanelProps extends UeElBrowserMockupPanelBaseProps {}
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
        interface UeElColorPickerPanelProps extends UeElColorPickerPanelBaseProps {}
        interface UeElColorSettingGroupProps extends UeElColorSettingGroupBaseProps {}
        interface UeElConfirmPanelProps extends UeElConfirmPanelBaseProps {}
        interface UeElContextmenuProps extends UeElContextmenuBaseProps {}
        interface UeElControlGroupProps extends UeElControlGroupBaseProps {}
        interface UeElDraggableProps extends UeElDraggableBaseProps {}
        interface UeElColorSettingProps extends UeElColorSettingBaseProps {}
        interface UeElEditorPanelProps extends UeElEditorPanelBaseProps {}
        interface UeElEmojiLibraryPanelProps extends UeElEmojiLibraryPanelBaseProps {}
        interface UeElFileUploadButtonProps extends UeElFileUploadButtonBaseProps {}
        interface UeElEmptyPanelProps extends UeElEmptyPanelBaseProps {}
        interface UeElFileUploaderProps extends UeElFileUploaderBaseProps {}
        interface UeElEnterAnimateSettingProps extends UeElEnterAnimateSettingBaseProps {}
        interface UeElFontFamilyLibraryPanelProps extends UeElFontFamilyLibraryPanelBaseProps {}
        interface UeElFontFamilySettingProps extends UeElFontFamilySettingBaseProps {}
        interface UeElFontSizeSettingProps extends UeElFontSizeSettingBaseProps {}
        interface UeElGapSettingProps extends UeElGapSettingBaseProps {}
        interface UeElGridLayoutSettingProps extends UeElGridLayoutSettingBaseProps {}
        interface UeElGirdLayoutUtilProps extends UeElGirdLayoutUtilBaseProps {}
        interface UeElGridLayoutLibraryPanelProps extends UeElGridLayoutLibraryPanelBaseProps {}
        interface UeElIconProps extends UeElIconBaseProps {}
        interface UeElIconLibraryPanelProps extends UeElIconLibraryPanelBaseProps {}
        interface UeElImageLibraryPanelProps extends UeElImageLibraryPanelBaseProps {}
        interface UeElJustifyContentSettingProps extends UeElJustifyContentSettingBaseProps {}
        interface UeElLibraryPanelProps extends UeElLibraryPanelBaseProps {}
        interface UeElLinkSettingProps extends UeElLinkSettingBaseProps {}
        interface UeElLinkSettingGroupProps extends UeElLinkSettingGroupBaseProps {}
        interface UeElLoadingProps extends UeElLoadingBaseProps {}
        interface UeElLinkSettingPanelProps extends UeElLinkSettingPanelBaseProps {}
        interface UeElLottieLibraryPanelProps extends UeElLottieLibraryPanelBaseProps {}
        interface UeElMapSettingPanelProps extends UeElMapSettingPanelBaseProps {}
        interface UeElMarginSettingProps extends UeElMarginSettingBaseProps {}
        interface UeElMiniEditorPanelProps extends UeElMiniEditorPanelBaseProps {}
        interface UeElNumberInputProps extends UeElNumberInputBaseProps {}
        interface UeElOnOffProps extends UeElOnOffBaseProps {}
        interface UeElPaddingSettingProps extends UeElPaddingSettingBaseProps {}
        interface UeElPaddingSettingGroupProps extends UeElPaddingSettingGroupBaseProps {}
        interface UeElPopPanelProps extends UeElPopPanelBaseProps {}
        interface UeElRatioSettingGroupProps extends UeElRatioSettingGroupBaseProps {}
        interface UeElRadiusSettingGroupProps extends UeElRadiusSettingGroupBaseProps {}
        interface UeElResourcePreviewProps extends UeElResourcePreviewBaseProps {}
        interface UeElRadiusSettingProps extends UeElRadiusSettingBaseProps {}
        interface UeElResourceSettingProps extends UeElResourceSettingBaseProps {}
        interface UeElRichTextLibraryPanelProps extends UeElRichTextLibraryPanelBaseProps {}
        interface UeElScrollEffectSettingPanelProps extends UeElScrollEffectSettingPanelBaseProps {}
        interface UeElScrollEffectSettingGroupProps extends UeElScrollEffectSettingGroupBaseProps {}
        interface UeElSelectProps extends UeElSelectBaseProps {}
        interface UeElSelectOptionProps extends UeElSelectOptionBaseProps {}
        interface UeElSettingBarProps extends UeElSettingBarBaseProps {}
        interface UeElSettingGroupProps extends UeElSettingGroupBaseProps {}
        interface UeElShapeLibraryPanelProps extends UeElShapeLibraryPanelBaseProps {}
        interface UeElSizeSettingGroupProps extends UeElSizeSettingGroupBaseProps {}
        interface UeElSplineLibraryPanelProps extends UeElSplineLibraryPanelBaseProps {}
        interface UeElShareIconLibraryPanelProps extends UeElShareIconLibraryPanelBaseProps {}
        interface UeElSvgLibraryPanelProps extends UeElSvgLibraryPanelBaseProps {}
        interface UeElTagInputProps extends UeElTagInputBaseProps {}
        interface UeElTextDecorationLibraryPanelProps extends UeElTextDecorationLibraryPanelBaseProps {}
        interface UeElTabCardProps extends UeElTabCardBaseProps {}
        interface UeElTextDecorationSettingPanelProps extends UeElTextDecorationSettingPanelBaseProps {}
        interface UeElTranslateSettingProps extends UeElTranslateSettingBaseProps {}
        interface UeElTextInputProps extends UeElTextInputBaseProps {}
        interface UeElTipGroupProps extends UeElTipGroupBaseProps {}
        interface UeElVideoLibraryPanelProps extends UeElVideoLibraryPanelBaseProps {}
        interface UeElWebSettingPanelProps extends UeElWebSettingPanelBaseProps {}
        interface UeElVideoPanelProps extends UeElVideoPanelBaseProps {}
        interface UeElWidthSettingGroupProps extends UeElWidthSettingGroupBaseProps {}
    }
}

export {};
