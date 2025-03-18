/*
 * @Description: 组件注册
 * @Author: F-Stone
 * @LastEditTime: 2025-02-20 15:32:50
 */
import UeElBorderSetting, { UeElBorderSettingBaseProps } from "../packages/border-setting";
import UeElAlignItemSetting, { UeElAlignItemSettingBaseProps } from "../packages/align-item-setting";
import UeElAlignSetting, { UeElAlignSettingBaseProps } from "../packages/align-setting";
import UeElBorderSettingGroup, { UeElBorderSettingGroupBaseProps } from "../packages/border-setting-group";
import UeElBoxShadowSetting, { UeElBoxShadowSettingBaseProps } from "../packages/box-shadow-setting";
import UeElButton, { UeElButtonBaseProps } from "../packages/button";
import UeElBoxShadowSettingGroup, { UeElBoxShadowSettingGroupBaseProps } from "../packages/box-shadow-setting-group";
import UeElButtonHoverEffectLibraryPanel, {
    UeElButtonHoverEffectLibraryPanelBaseProps,
} from "../packages/button-hover-effect-library-panel";
import UeElButtonLibraryPanel, { UeElButtonLibraryPanelBaseProps } from "../packages/button-library-panel";
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
import UeElControlGroup, { UeElControlGroupBaseProps } from "../packages/control-group";
import UeElEditorGroup, { UeElEditorGroupBaseProps } from "../packages/editor-group";
import UeElEditorPanel, { UeElEditorPanelBaseProps } from "../packages/editor-panel";
import UeElEmptyPanel, { UeElEmptyPanelBaseProps } from "../packages/empty-panel";
import UeElEnterAnimateSetting, { UeElEnterAnimateSettingBaseProps } from "../packages/enter-animate-setting";
import UeElEmojiLibraryPanel, { UeElEmojiLibraryPanelBaseProps } from "../packages/emoji-library-panel";
import UeElFileUploadButton, { UeElFileUploadButtonBaseProps } from "../packages/file-upload-button";
import UeElFileUploader, { UeElFileUploaderBaseProps } from "../packages/file-uploader";
import UeElFontFamilyLibraryPanel, { UeElFontFamilyLibraryPanelBaseProps } from "../packages/font-family-library-panel";
import UeElFontFamilySetting, { UeElFontFamilySettingBaseProps } from "../packages/font-family-setting";
import UeElGapSetting, { UeElGapSettingBaseProps } from "../packages/gap-setting";
import UeElGirdLayoutUtil, { UeElGirdLayoutUtilBaseProps } from "../packages/gird-layout-util";
import UeElGridLayoutLibraryPanel, { UeElGridLayoutLibraryPanelBaseProps } from "../packages/grid-layout-library-panel";
import UeElIcon, { UeElIconBaseProps } from "../packages/icon";
import UeElIconLibraryPanel, { UeElIconLibraryPanelBaseProps } from "../packages/icon-library-panel";
import UeElImageLibraryPanel, { UeElImageLibraryPanelBaseProps } from "../packages/image-library-panel";
import UeElJustifyContentSetting, { UeElJustifyContentSettingBaseProps } from "../packages/justify-content-setting";
import UeElLibraryPanel, { UeElLibraryPanelBaseProps } from "../packages/library-panel";
import UeElLoading, { UeElLoadingBaseProps } from "../packages/loading";
import UeElLottieLibraryPanel, { UeElLottieLibraryPanelBaseProps } from "../packages/lottie-library-panel";
import UeElMarginSetting, { UeElMarginSettingBaseProps } from "../packages/margin-setting";
import UeElNumberInput, { UeElNumberInputBaseProps } from "../packages/number-input";
import UeElOnOff, { UeElOnOffBaseProps } from "../packages/on-off";
import UeElPaddingSetting, { UeElPaddingSettingBaseProps } from "../packages/padding-setting";
import UeElPopPanel, { UeElPopPanelBaseProps } from "../packages/pop-panel";
import UeElRadiusSetting, { UeElRadiusSettingBaseProps } from "../packages/radius-setting";
import UeElRadiusSettingGroup, { UeElRadiusSettingGroupBaseProps } from "../packages/radius-setting-group";
import UeElResourcePreview, { UeElResourcePreviewBaseProps } from "../packages/resource-preview";
import UeElResourceSetting, { UeElResourceSettingBaseProps } from "../packages/resource-setting";
import UeElSelect, { UeElSelectBaseProps } from "../packages/select";
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
import UeElTextInput, { UeElTextInputBaseProps } from "../packages/text-input";
import UeElTipGroup, { UeElTipGroupBaseProps } from "../packages/tip-group";
import UeElVideoLibraryPanel, { UeElVideoLibraryPanelBaseProps } from "../packages/video-library-panel";
import UeElVideoPanel, { UeElVideoPanelBaseProps } from "../packages/video-panel";

declare module "vue" {
    export interface GlobalComponents {
        UeElBorderSetting: typeof UeElBorderSetting;
        UeElAlignItemSetting: typeof UeElAlignItemSetting;
        UeElAlignSetting: typeof UeElAlignSetting;
        UeElBorderSettingGroup: typeof UeElBorderSettingGroup;
        UeElBoxShadowSetting: typeof UeElBoxShadowSetting;
        UeElButton: typeof UeElButton;
        UeElBoxShadowSettingGroup: typeof UeElBoxShadowSettingGroup;
        UeElButtonHoverEffectLibraryPanel: typeof UeElButtonHoverEffectLibraryPanel;
        UeElButtonLibraryPanel: typeof UeElButtonLibraryPanel;
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
        UeElControlGroup: typeof UeElControlGroup;
        UeElEditorGroup: typeof UeElEditorGroup;
        UeElEditorPanel: typeof UeElEditorPanel;
        UeElEmptyPanel: typeof UeElEmptyPanel;
        UeElEnterAnimateSetting: typeof UeElEnterAnimateSetting;
        UeElEmojiLibraryPanel: typeof UeElEmojiLibraryPanel;
        UeElFileUploadButton: typeof UeElFileUploadButton;
        UeElFileUploader: typeof UeElFileUploader;
        UeElFontFamilyLibraryPanel: typeof UeElFontFamilyLibraryPanel;
        UeElFontFamilySetting: typeof UeElFontFamilySetting;
        UeElGapSetting: typeof UeElGapSetting;
        UeElGirdLayoutUtil: typeof UeElGirdLayoutUtil;
        UeElGridLayoutLibraryPanel: typeof UeElGridLayoutLibraryPanel;
        UeElIcon: typeof UeElIcon;
        UeElIconLibraryPanel: typeof UeElIconLibraryPanel;
        UeElImageLibraryPanel: typeof UeElImageLibraryPanel;
        UeElJustifyContentSetting: typeof UeElJustifyContentSetting;
        UeElLibraryPanel: typeof UeElLibraryPanel;
        UeElLoading: typeof UeElLoading;
        UeElLottieLibraryPanel: typeof UeElLottieLibraryPanel;
        UeElMarginSetting: typeof UeElMarginSetting;
        UeElNumberInput: typeof UeElNumberInput;
        UeElOnOff: typeof UeElOnOff;
        UeElPaddingSetting: typeof UeElPaddingSetting;
        UeElPopPanel: typeof UeElPopPanel;
        UeElRadiusSetting: typeof UeElRadiusSetting;
        UeElRadiusSettingGroup: typeof UeElRadiusSettingGroup;
        UeElResourcePreview: typeof UeElResourcePreview;
        UeElResourceSetting: typeof UeElResourceSetting;
        UeElSelect: typeof UeElSelect;
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
        UeElTextInput: typeof UeElTextInput;
        UeElTipGroup: typeof UeElTipGroup;
        UeElVideoLibraryPanel: typeof UeElVideoLibraryPanel;
        UeElVideoPanel: typeof UeElVideoPanel;
    }
}

declare global {
    namespace UE_EL_COMPONENT {
        interface UeElBorderSettingProps extends UeElBorderSettingBaseProps {}
        interface UeElAlignItemSettingProps extends UeElAlignItemSettingBaseProps {}
        interface UeElAlignSettingProps extends UeElAlignSettingBaseProps {}
        interface UeElBorderSettingGroupProps extends UeElBorderSettingGroupBaseProps {}
        interface UeElBoxShadowSettingProps extends UeElBoxShadowSettingBaseProps {}
        interface UeElButtonProps extends UeElButtonBaseProps {}
        interface UeElBoxShadowSettingGroupProps extends UeElBoxShadowSettingGroupBaseProps {}
        interface UeElButtonHoverEffectLibraryPanelProps extends UeElButtonHoverEffectLibraryPanelBaseProps {}
        interface UeElButtonLibraryPanelProps extends UeElButtonLibraryPanelBaseProps {}
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
        interface UeElControlGroupProps extends UeElControlGroupBaseProps {}
        interface UeElEditorGroupProps extends UeElEditorGroupBaseProps {}
        interface UeElEditorPanelProps extends UeElEditorPanelBaseProps {}
        interface UeElEmptyPanelProps extends UeElEmptyPanelBaseProps {}
        interface UeElEnterAnimateSettingProps extends UeElEnterAnimateSettingBaseProps {}
        interface UeElEmojiLibraryPanelProps extends UeElEmojiLibraryPanelBaseProps {}
        interface UeElFileUploadButtonProps extends UeElFileUploadButtonBaseProps {}
        interface UeElFileUploaderProps extends UeElFileUploaderBaseProps {}
        interface UeElFontFamilyLibraryPanelProps extends UeElFontFamilyLibraryPanelBaseProps {}
        interface UeElFontFamilySettingProps extends UeElFontFamilySettingBaseProps {}
        interface UeElGapSettingProps extends UeElGapSettingBaseProps {}
        interface UeElGirdLayoutUtilProps extends UeElGirdLayoutUtilBaseProps {}
        interface UeElGridLayoutLibraryPanelProps extends UeElGridLayoutLibraryPanelBaseProps {}
        interface UeElIconProps extends UeElIconBaseProps {}
        interface UeElIconLibraryPanelProps extends UeElIconLibraryPanelBaseProps {}
        interface UeElImageLibraryPanelProps extends UeElImageLibraryPanelBaseProps {}
        interface UeElJustifyContentSettingProps extends UeElJustifyContentSettingBaseProps {}
        interface UeElLibraryPanelProps extends UeElLibraryPanelBaseProps {}
        interface UeElLoadingProps extends UeElLoadingBaseProps {}
        interface UeElLottieLibraryPanelProps extends UeElLottieLibraryPanelBaseProps {}
        interface UeElMarginSettingProps extends UeElMarginSettingBaseProps {}
        interface UeElNumberInputProps extends UeElNumberInputBaseProps {}
        interface UeElOnOffProps extends UeElOnOffBaseProps {}
        interface UeElPaddingSettingProps extends UeElPaddingSettingBaseProps {}
        interface UeElPopPanelProps extends UeElPopPanelBaseProps {}
        interface UeElRadiusSettingProps extends UeElRadiusSettingBaseProps {}
        interface UeElRadiusSettingGroupProps extends UeElRadiusSettingGroupBaseProps {}
        interface UeElResourcePreviewProps extends UeElResourcePreviewBaseProps {}
        interface UeElResourceSettingProps extends UeElResourceSettingBaseProps {}
        interface UeElSelectProps extends UeElSelectBaseProps {}
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
        interface UeElTextInputProps extends UeElTextInputBaseProps {}
        interface UeElTipGroupProps extends UeElTipGroupBaseProps {}
        interface UeElVideoLibraryPanelProps extends UeElVideoLibraryPanelBaseProps {}
        interface UeElVideoPanelProps extends UeElVideoPanelBaseProps {}
    }
}

export {};
