/*
 * @Description: 组件注册
 * @Author: F-Stone
 * @LastEditTime: 2025-02-20 15:32:50
 */
import UeElAlignItemSetting, { UeElAlignItemSettingBaseProps } from "../packages/align-item-setting";
import UeElBorderSetting, { UeElBorderSettingBaseProps } from "../packages/border-setting";
import UeElAlignSetting, { UeElAlignSettingBaseProps } from "../packages/align-setting";
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
import UeElButtonLibraryPanel, { UeElButtonLibraryPanelBaseProps } from "../packages/button-library-panel";
import UeElButtonIconSettingGroup, { UeElButtonIconSettingGroupBaseProps } from "../packages/button-icon-setting-group";
import UeElCalenderPicker, { UeElCalenderPickerBaseProps } from "../packages/calender-picker";
import UeElCalenderSetting, { UeElCalenderSettingBaseProps } from "../packages/calender-setting";
import UeElCalenderSettingGroup, { UeElCalenderSettingGroupBaseProps } from "../packages/calender-setting-group";
import UeElCheckBox, { UeElCheckBoxBaseProps } from "../packages/check-box";
import UeElColorInput, { UeElColorInputBaseProps } from "../packages/color-input";
import UeElColorPicker, { UeElColorPickerBaseProps } from "../packages/color-picker";
import UeElColorPickerPanel, { UeElColorPickerPanelBaseProps } from "../packages/color-picker-panel";
import UeElColorSetting, { UeElColorSettingBaseProps } from "../packages/color-setting";
import UeElColorSettingGroup, { UeElColorSettingGroupBaseProps } from "../packages/color-setting-group";
import UeElConfirmPanel, { UeElConfirmPanelBaseProps } from "../packages/confirm-panel";
import UeElContextmenu, { UeElContextmenuBaseProps } from "../packages/contextmenu";
import UeElEditorGroup, { UeElEditorGroupBaseProps } from "../packages/editor-group";
import UeElEditorPanel, { UeElEditorPanelBaseProps } from "../packages/editor-panel";
import UeElEmptyPanel, { UeElEmptyPanelBaseProps } from "../packages/empty-panel";
import UeElEmojiLibraryPanel, { UeElEmojiLibraryPanelBaseProps } from "../packages/emoji-library-panel";
import UeElControlGroup, { UeElControlGroupBaseProps } from "../packages/control-group";
import UeElEnterAnimateSetting, { UeElEnterAnimateSettingBaseProps } from "../packages/enter-animate-setting";
import UeElFileUploadButton, { UeElFileUploadButtonBaseProps } from "../packages/file-upload-button";
import UeElFileUploader, { UeElFileUploaderBaseProps } from "../packages/file-uploader";
import UeElFontFamilyLibraryPanel, { UeElFontFamilyLibraryPanelBaseProps } from "../packages/font-family-library-panel";
import UeElGirdLayoutUtil, { UeElGirdLayoutUtilBaseProps } from "../packages/gird-layout-util";
import UeElGapSetting, { UeElGapSettingBaseProps } from "../packages/gap-setting";
import UeElGridLayoutLibraryPanel, { UeElGridLayoutLibraryPanelBaseProps } from "../packages/grid-layout-library-panel";
import UeElIcon, { UeElIconBaseProps } from "../packages/icon";
import UeElIconLibraryPanel, { UeElIconLibraryPanelBaseProps } from "../packages/icon-library-panel";
import UeElImageLibraryPanel, { UeElImageLibraryPanelBaseProps } from "../packages/image-library-panel";
import UeElLibraryPanel, { UeElLibraryPanelBaseProps } from "../packages/library-panel";
import UeElLoading, { UeElLoadingBaseProps } from "../packages/loading";
import UeElLottieLibraryPanel, { UeElLottieLibraryPanelBaseProps } from "../packages/lottie-library-panel";
import UeElJustifyContentSetting, { UeElJustifyContentSettingBaseProps } from "../packages/justify-content-setting";
import UeElMarginSetting, { UeElMarginSettingBaseProps } from "../packages/margin-setting";
import UeElNumberInput, { UeElNumberInputBaseProps } from "../packages/number-input";
import UeElPaddingSetting, { UeElPaddingSettingBaseProps } from "../packages/padding-setting";
import UeElPopPanel, { UeElPopPanelBaseProps } from "../packages/pop-panel";
import UeElRadiusSetting, { UeElRadiusSettingBaseProps } from "../packages/radius-setting";
import UeElOnOff, { UeElOnOffBaseProps } from "../packages/on-off";
import UeElResourceSetting, { UeElResourceSettingBaseProps } from "../packages/resource-setting";
import UeElRadiusSettingGroup, { UeElRadiusSettingGroupBaseProps } from "../packages/radius-setting-group";
import UeElSelect, { UeElSelectBaseProps } from "../packages/select";
import UeElSelectOption, { UeElSelectOptionBaseProps } from "../packages/select-option";
import UeElFontFamilySetting, { UeElFontFamilySettingBaseProps } from "../packages/font-family-setting";
import UeElSettingBar, { UeElSettingBarBaseProps } from "../packages/setting-bar";
import UeElSettingGroup, { UeElSettingGroupBaseProps } from "../packages/setting-group";
import UeElResourcePreview, { UeElResourcePreviewBaseProps } from "../packages/resource-preview";
import UeElShareIconLibraryPanel, { UeElShareIconLibraryPanelBaseProps } from "../packages/share-icon-library-panel";
import UeElShapeLibraryPanel, { UeElShapeLibraryPanelBaseProps } from "../packages/shape-library-panel";
import UeElSplineLibraryPanel, { UeElSplineLibraryPanelBaseProps } from "../packages/spline-library-panel";
import UeElSvgLibraryPanel, { UeElSvgLibraryPanelBaseProps } from "../packages/svg-library-panel";
import UeElTabCard, { UeElTabCardBaseProps } from "../packages/tab-card";
import UeElTagInput, { UeElTagInputBaseProps } from "../packages/tag-input";
import UeElTextDecorationLibraryPanel, {
    UeElTextDecorationLibraryPanelBaseProps,
} from "../packages/text-decoration-library-panel";
import UeElTextInput, { UeElTextInputBaseProps } from "../packages/text-input";
import UeElTipGroup, { UeElTipGroupBaseProps } from "../packages/tip-group";
import UeElVideoLibraryPanel, { UeElVideoLibraryPanelBaseProps } from "../packages/video-library-panel";
import UeElVideoPanel, { UeElVideoPanelBaseProps } from "../packages/video-panel";

declare module "vue" {
    export interface GlobalComponents {
        UeElAlignItemSetting: typeof UeElAlignItemSetting;
        UeElBorderSetting: typeof UeElBorderSetting;
        UeElAlignSetting: typeof UeElAlignSetting;
        UeElBorderSettingGroup: typeof UeElBorderSettingGroup;
        UeElBoxShadowSetting: typeof UeElBoxShadowSetting;
        UeElBoxShadowSettingGroup: typeof UeElBoxShadowSettingGroup;
        UeElButton: typeof UeElButton;
        UeElButtonHoverEffectLibraryPanel: typeof UeElButtonHoverEffectLibraryPanel;
        UeElButtonHoverEffectSetting: typeof UeElButtonHoverEffectSetting;
        UeElButtonIconSetting: typeof UeElButtonIconSetting;
        UeElButtonLibraryPanel: typeof UeElButtonLibraryPanel;
        UeElButtonIconSettingGroup: typeof UeElButtonIconSettingGroup;
        UeElCalenderPicker: typeof UeElCalenderPicker;
        UeElCalenderSetting: typeof UeElCalenderSetting;
        UeElCalenderSettingGroup: typeof UeElCalenderSettingGroup;
        UeElCheckBox: typeof UeElCheckBox;
        UeElColorInput: typeof UeElColorInput;
        UeElColorPicker: typeof UeElColorPicker;
        UeElColorPickerPanel: typeof UeElColorPickerPanel;
        UeElColorSetting: typeof UeElColorSetting;
        UeElColorSettingGroup: typeof UeElColorSettingGroup;
        UeElConfirmPanel: typeof UeElConfirmPanel;
        UeElContextmenu: typeof UeElContextmenu;
        UeElEditorGroup: typeof UeElEditorGroup;
        UeElEditorPanel: typeof UeElEditorPanel;
        UeElEmptyPanel: typeof UeElEmptyPanel;
        UeElEmojiLibraryPanel: typeof UeElEmojiLibraryPanel;
        UeElControlGroup: typeof UeElControlGroup;
        UeElEnterAnimateSetting: typeof UeElEnterAnimateSetting;
        UeElFileUploadButton: typeof UeElFileUploadButton;
        UeElFileUploader: typeof UeElFileUploader;
        UeElFontFamilyLibraryPanel: typeof UeElFontFamilyLibraryPanel;
        UeElGirdLayoutUtil: typeof UeElGirdLayoutUtil;
        UeElGapSetting: typeof UeElGapSetting;
        UeElGridLayoutLibraryPanel: typeof UeElGridLayoutLibraryPanel;
        UeElIcon: typeof UeElIcon;
        UeElIconLibraryPanel: typeof UeElIconLibraryPanel;
        UeElImageLibraryPanel: typeof UeElImageLibraryPanel;
        UeElLibraryPanel: typeof UeElLibraryPanel;
        UeElLoading: typeof UeElLoading;
        UeElLottieLibraryPanel: typeof UeElLottieLibraryPanel;
        UeElJustifyContentSetting: typeof UeElJustifyContentSetting;
        UeElMarginSetting: typeof UeElMarginSetting;
        UeElNumberInput: typeof UeElNumberInput;
        UeElPaddingSetting: typeof UeElPaddingSetting;
        UeElPopPanel: typeof UeElPopPanel;
        UeElRadiusSetting: typeof UeElRadiusSetting;
        UeElOnOff: typeof UeElOnOff;
        UeElResourceSetting: typeof UeElResourceSetting;
        UeElRadiusSettingGroup: typeof UeElRadiusSettingGroup;
        UeElSelect: typeof UeElSelect;
        UeElSelectOption: typeof UeElSelectOption;
        UeElFontFamilySetting: typeof UeElFontFamilySetting;
        UeElSettingBar: typeof UeElSettingBar;
        UeElSettingGroup: typeof UeElSettingGroup;
        UeElResourcePreview: typeof UeElResourcePreview;
        UeElShareIconLibraryPanel: typeof UeElShareIconLibraryPanel;
        UeElShapeLibraryPanel: typeof UeElShapeLibraryPanel;
        UeElSplineLibraryPanel: typeof UeElSplineLibraryPanel;
        UeElSvgLibraryPanel: typeof UeElSvgLibraryPanel;
        UeElTabCard: typeof UeElTabCard;
        UeElTagInput: typeof UeElTagInput;
        UeElTextDecorationLibraryPanel: typeof UeElTextDecorationLibraryPanel;
        UeElTextInput: typeof UeElTextInput;
        UeElTipGroup: typeof UeElTipGroup;
        UeElVideoLibraryPanel: typeof UeElVideoLibraryPanel;
        UeElVideoPanel: typeof UeElVideoPanel;
    }
}

declare global {
    namespace UE_EL_COMPONENT {
        interface UeElAlignItemSettingProps extends UeElAlignItemSettingBaseProps {}
        interface UeElBorderSettingProps extends UeElBorderSettingBaseProps {}
        interface UeElAlignSettingProps extends UeElAlignSettingBaseProps {}
        interface UeElBorderSettingGroupProps extends UeElBorderSettingGroupBaseProps {}
        interface UeElBoxShadowSettingProps extends UeElBoxShadowSettingBaseProps {}
        interface UeElBoxShadowSettingGroupProps extends UeElBoxShadowSettingGroupBaseProps {}
        interface UeElButtonProps extends UeElButtonBaseProps {}
        interface UeElButtonHoverEffectLibraryPanelProps extends UeElButtonHoverEffectLibraryPanelBaseProps {}
        interface UeElButtonHoverEffectSettingProps extends UeElButtonHoverEffectSettingBaseProps {}
        interface UeElButtonIconSettingProps extends UeElButtonIconSettingBaseProps {}
        interface UeElButtonLibraryPanelProps extends UeElButtonLibraryPanelBaseProps {}
        interface UeElButtonIconSettingGroupProps extends UeElButtonIconSettingGroupBaseProps {}
        interface UeElCalenderPickerProps extends UeElCalenderPickerBaseProps {}
        interface UeElCalenderSettingProps extends UeElCalenderSettingBaseProps {}
        interface UeElCalenderSettingGroupProps extends UeElCalenderSettingGroupBaseProps {}
        interface UeElCheckBoxProps extends UeElCheckBoxBaseProps {}
        interface UeElColorInputProps extends UeElColorInputBaseProps {}
        interface UeElColorPickerProps extends UeElColorPickerBaseProps {}
        interface UeElColorPickerPanelProps extends UeElColorPickerPanelBaseProps {}
        interface UeElColorSettingProps extends UeElColorSettingBaseProps {}
        interface UeElColorSettingGroupProps extends UeElColorSettingGroupBaseProps {}
        interface UeElConfirmPanelProps extends UeElConfirmPanelBaseProps {}
        interface UeElContextmenuProps extends UeElContextmenuBaseProps {}
        interface UeElEditorGroupProps extends UeElEditorGroupBaseProps {}
        interface UeElEditorPanelProps extends UeElEditorPanelBaseProps {}
        interface UeElEmptyPanelProps extends UeElEmptyPanelBaseProps {}
        interface UeElEmojiLibraryPanelProps extends UeElEmojiLibraryPanelBaseProps {}
        interface UeElControlGroupProps extends UeElControlGroupBaseProps {}
        interface UeElEnterAnimateSettingProps extends UeElEnterAnimateSettingBaseProps {}
        interface UeElFileUploadButtonProps extends UeElFileUploadButtonBaseProps {}
        interface UeElFileUploaderProps extends UeElFileUploaderBaseProps {}
        interface UeElFontFamilyLibraryPanelProps extends UeElFontFamilyLibraryPanelBaseProps {}
        interface UeElGirdLayoutUtilProps extends UeElGirdLayoutUtilBaseProps {}
        interface UeElGapSettingProps extends UeElGapSettingBaseProps {}
        interface UeElGridLayoutLibraryPanelProps extends UeElGridLayoutLibraryPanelBaseProps {}
        interface UeElIconProps extends UeElIconBaseProps {}
        interface UeElIconLibraryPanelProps extends UeElIconLibraryPanelBaseProps {}
        interface UeElImageLibraryPanelProps extends UeElImageLibraryPanelBaseProps {}
        interface UeElLibraryPanelProps extends UeElLibraryPanelBaseProps {}
        interface UeElLoadingProps extends UeElLoadingBaseProps {}
        interface UeElLottieLibraryPanelProps extends UeElLottieLibraryPanelBaseProps {}
        interface UeElJustifyContentSettingProps extends UeElJustifyContentSettingBaseProps {}
        interface UeElMarginSettingProps extends UeElMarginSettingBaseProps {}
        interface UeElNumberInputProps extends UeElNumberInputBaseProps {}
        interface UeElPaddingSettingProps extends UeElPaddingSettingBaseProps {}
        interface UeElPopPanelProps extends UeElPopPanelBaseProps {}
        interface UeElRadiusSettingProps extends UeElRadiusSettingBaseProps {}
        interface UeElOnOffProps extends UeElOnOffBaseProps {}
        interface UeElResourceSettingProps extends UeElResourceSettingBaseProps {}
        interface UeElRadiusSettingGroupProps extends UeElRadiusSettingGroupBaseProps {}
        interface UeElSelectProps extends UeElSelectBaseProps {}
        interface UeElSelectOptionProps extends UeElSelectOptionBaseProps {}
        interface UeElFontFamilySettingProps extends UeElFontFamilySettingBaseProps {}
        interface UeElSettingBarProps extends UeElSettingBarBaseProps {}
        interface UeElSettingGroupProps extends UeElSettingGroupBaseProps {}
        interface UeElResourcePreviewProps extends UeElResourcePreviewBaseProps {}
        interface UeElShareIconLibraryPanelProps extends UeElShareIconLibraryPanelBaseProps {}
        interface UeElShapeLibraryPanelProps extends UeElShapeLibraryPanelBaseProps {}
        interface UeElSplineLibraryPanelProps extends UeElSplineLibraryPanelBaseProps {}
        interface UeElSvgLibraryPanelProps extends UeElSvgLibraryPanelBaseProps {}
        interface UeElTabCardProps extends UeElTabCardBaseProps {}
        interface UeElTagInputProps extends UeElTagInputBaseProps {}
        interface UeElTextDecorationLibraryPanelProps extends UeElTextDecorationLibraryPanelBaseProps {}
        interface UeElTextInputProps extends UeElTextInputBaseProps {}
        interface UeElTipGroupProps extends UeElTipGroupBaseProps {}
        interface UeElVideoLibraryPanelProps extends UeElVideoLibraryPanelBaseProps {}
        interface UeElVideoPanelProps extends UeElVideoPanelBaseProps {}
    }
}

export {};
