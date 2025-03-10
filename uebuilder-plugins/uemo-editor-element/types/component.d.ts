/*
 * @Description: 组件注册
 * @Author: F-Stone
 * @LastEditTime: 2025-02-20 15:32:50
 */
import UeElAlignItemSetting, { UeElAlignItemSettingBaseProps } from "../packages/align-item-setting";
import UeElAlignSetting, { UeElAlignSettingBaseProps } from "../packages/align-setting";
import UeElBorderSettingGroup, { UeElBorderSettingGroupBaseProps } from "../packages/border-setting-group";
import UeElBorderSetting, { UeElBorderSettingBaseProps } from "../packages/border-setting";
import UeElBoxShadowSetting, { UeElBoxShadowSettingBaseProps } from "../packages/box-shadow-setting";
import UeElBoxShadowSettingGroup, { UeElBoxShadowSettingGroupBaseProps } from "../packages/box-shadow-setting-group";
import UeElButton, { UeElButtonBaseProps } from "../packages/button";
import UeElButtonHoverEffectLibraryPanel, {
    UeElButtonHoverEffectLibraryPanelBaseProps,
} from "../packages/button-hover-effect-library-panel";
import UeElCalenderPicker, { UeElCalenderPickerBaseProps } from "../packages/calender-picker";
import UeElCalenderSetting, { UeElCalenderSettingBaseProps } from "../packages/calender-setting";
import UeElCalenderSettingGroup, { UeElCalenderSettingGroupBaseProps } from "../packages/calender-setting-group";
import UeElCheckBox, { UeElCheckBoxBaseProps } from "../packages/check-box";
import UeElColorInput, { UeElColorInputBaseProps } from "../packages/color-input";
import UeElColorPicker, { UeElColorPickerBaseProps } from "../packages/color-picker";
import UeElColorPickerPanel, { UeElColorPickerPanelBaseProps } from "../packages/color-picker-panel";
import UeElColorSetting, { UeElColorSettingBaseProps } from "../packages/color-setting";
import UeElColorSettingGroup, { UeElColorSettingGroupBaseProps } from "../packages/color-setting-group";
import UeElContextmenu, { UeElContextmenuBaseProps } from "../packages/contextmenu";
import UeElEditorGroup, { UeElEditorGroupBaseProps } from "../packages/editor-group";
import UeElEditorPanel, { UeElEditorPanelBaseProps } from "../packages/editor-panel";
import UeElEmojiLibraryPanel, { UeElEmojiLibraryPanelBaseProps } from "../packages/emoji-library-panel";
import UeElEmptyPanel, { UeElEmptyPanelBaseProps } from "../packages/empty-panel";
import UeElEnterAnimateSetting, { UeElEnterAnimateSettingBaseProps } from "../packages/enter-animate-setting";
import UeElControlGroup, { UeElControlGroupBaseProps } from "../packages/control-group";
import UeElFileUploadButton, { UeElFileUploadButtonBaseProps } from "../packages/file-upload-button";
import UeElConfirmPanel, { UeElConfirmPanelBaseProps } from "../packages/confirm-panel";
import UeElFileUploader, { UeElFileUploaderBaseProps } from "../packages/file-uploader";
import UeElGapSetting, { UeElGapSettingBaseProps } from "../packages/gap-setting";
import UeElGirdLayoutUtil, { UeElGirdLayoutUtilBaseProps } from "../packages/gird-layout-util";
import UeElJustifyContentSetting, { UeElJustifyContentSettingBaseProps } from "../packages/justify-content-setting";
import UeElLibraryPanel, { UeElLibraryPanelBaseProps } from "../packages/library-panel";
import UeElLoading, { UeElLoadingBaseProps } from "../packages/loading";
import UeElMarginSetting, { UeElMarginSettingBaseProps } from "../packages/margin-setting";
import UeElNumberInput, { UeElNumberInputBaseProps } from "../packages/number-input";
import UeElIcon, { UeElIconBaseProps } from "../packages/icon";
import UeElOnOff, { UeElOnOffBaseProps } from "../packages/on-off";
import UeElPaddingSetting, { UeElPaddingSettingBaseProps } from "../packages/padding-setting";
import UeElPopPanel, { UeElPopPanelBaseProps } from "../packages/pop-panel";
import UeElRadiusSetting, { UeElRadiusSettingBaseProps } from "../packages/radius-setting";
import UeElSelect, { UeElSelectBaseProps } from "../packages/select";
import UeElRadiusSettingGroup, { UeElRadiusSettingGroupBaseProps } from "../packages/radius-setting-group";
import UeElSelectOption, { UeElSelectOptionBaseProps } from "../packages/select-option";
import UeElShareIconLibraryPanel, { UeElShareIconLibraryPanelBaseProps } from "../packages/share-icon-library-panel";
import UeElSettingBar, { UeElSettingBarBaseProps } from "../packages/setting-bar";
import UeElShapeLibraryPanel, { UeElShapeLibraryPanelBaseProps } from "../packages/shape-library-panel";
import UeElSettingGroup, { UeElSettingGroupBaseProps } from "../packages/setting-group";
import UeElSplineLibraryPanel, { UeElSplineLibraryPanelBaseProps } from "../packages/spline-library-panel";
import UeElSvgLibraryPanel, { UeElSvgLibraryPanelBaseProps } from "../packages/svg-library-panel";
import UeElTabCard, { UeElTabCardBaseProps } from "../packages/tab-card";
import UeElTagInput, { UeElTagInputBaseProps } from "../packages/tag-input";
import UeElTextDecorationLibraryPanel, {
    UeElTextDecorationLibraryPanelBaseProps,
} from "../packages/text-decoration-library-panel";
import UeElTipGroup, { UeElTipGroupBaseProps } from "../packages/tip-group";
import UeElTextInput, { UeElTextInputBaseProps } from "../packages/text-input";
import UeElVideoPanel, { UeElVideoPanelBaseProps } from "../packages/video-panel";

declare module "vue" {
    export interface GlobalComponents {
        UeElAlignItemSetting: typeof UeElAlignItemSetting;
        UeElAlignSetting: typeof UeElAlignSetting;
        UeElBorderSettingGroup: typeof UeElBorderSettingGroup;
        UeElBorderSetting: typeof UeElBorderSetting;
        UeElBoxShadowSetting: typeof UeElBoxShadowSetting;
        UeElBoxShadowSettingGroup: typeof UeElBoxShadowSettingGroup;
        UeElButton: typeof UeElButton;
        UeElButtonHoverEffectLibraryPanel: typeof UeElButtonHoverEffectLibraryPanel;
        UeElCalenderPicker: typeof UeElCalenderPicker;
        UeElCalenderSetting: typeof UeElCalenderSetting;
        UeElCalenderSettingGroup: typeof UeElCalenderSettingGroup;
        UeElCheckBox: typeof UeElCheckBox;
        UeElColorInput: typeof UeElColorInput;
        UeElColorPicker: typeof UeElColorPicker;
        UeElColorPickerPanel: typeof UeElColorPickerPanel;
        UeElColorSetting: typeof UeElColorSetting;
        UeElColorSettingGroup: typeof UeElColorSettingGroup;
        UeElContextmenu: typeof UeElContextmenu;
        UeElEditorGroup: typeof UeElEditorGroup;
        UeElEditorPanel: typeof UeElEditorPanel;
        UeElEmojiLibraryPanel: typeof UeElEmojiLibraryPanel;
        UeElEmptyPanel: typeof UeElEmptyPanel;
        UeElEnterAnimateSetting: typeof UeElEnterAnimateSetting;
        UeElControlGroup: typeof UeElControlGroup;
        UeElFileUploadButton: typeof UeElFileUploadButton;
        UeElConfirmPanel: typeof UeElConfirmPanel;
        UeElFileUploader: typeof UeElFileUploader;
        UeElGapSetting: typeof UeElGapSetting;
        UeElGirdLayoutUtil: typeof UeElGirdLayoutUtil;
        UeElJustifyContentSetting: typeof UeElJustifyContentSetting;
        UeElLibraryPanel: typeof UeElLibraryPanel;
        UeElLoading: typeof UeElLoading;
        UeElMarginSetting: typeof UeElMarginSetting;
        UeElNumberInput: typeof UeElNumberInput;
        UeElIcon: typeof UeElIcon;
        UeElOnOff: typeof UeElOnOff;
        UeElPaddingSetting: typeof UeElPaddingSetting;
        UeElPopPanel: typeof UeElPopPanel;
        UeElRadiusSetting: typeof UeElRadiusSetting;
        UeElSelect: typeof UeElSelect;
        UeElRadiusSettingGroup: typeof UeElRadiusSettingGroup;
        UeElSelectOption: typeof UeElSelectOption;
        UeElShareIconLibraryPanel: typeof UeElShareIconLibraryPanel;
        UeElSettingBar: typeof UeElSettingBar;
        UeElShapeLibraryPanel: typeof UeElShapeLibraryPanel;
        UeElSettingGroup: typeof UeElSettingGroup;
        UeElSplineLibraryPanel: typeof UeElSplineLibraryPanel;
        UeElSvgLibraryPanel: typeof UeElSvgLibraryPanel;
        UeElTabCard: typeof UeElTabCard;
        UeElTagInput: typeof UeElTagInput;
        UeElTextDecorationLibraryPanel: typeof UeElTextDecorationLibraryPanel;
        UeElTipGroup: typeof UeElTipGroup;
        UeElTextInput: typeof UeElTextInput;
        UeElVideoPanel: typeof UeElVideoPanel;
    }
}

declare global {
    namespace UE_EL_COMPONENT {
        interface UeElAlignItemSettingProps extends UeElAlignItemSettingBaseProps {}
        interface UeElAlignSettingProps extends UeElAlignSettingBaseProps {}
        interface UeElBorderSettingGroupProps extends UeElBorderSettingGroupBaseProps {}
        interface UeElBorderSettingProps extends UeElBorderSettingBaseProps {}
        interface UeElBoxShadowSettingProps extends UeElBoxShadowSettingBaseProps {}
        interface UeElBoxShadowSettingGroupProps extends UeElBoxShadowSettingGroupBaseProps {}
        interface UeElButtonProps extends UeElButtonBaseProps {}
        interface UeElButtonHoverEffectLibraryPanelProps extends UeElButtonHoverEffectLibraryPanelBaseProps {}
        interface UeElCalenderPickerProps extends UeElCalenderPickerBaseProps {}
        interface UeElCalenderSettingProps extends UeElCalenderSettingBaseProps {}
        interface UeElCalenderSettingGroupProps extends UeElCalenderSettingGroupBaseProps {}
        interface UeElCheckBoxProps extends UeElCheckBoxBaseProps {}
        interface UeElColorInputProps extends UeElColorInputBaseProps {}
        interface UeElColorPickerProps extends UeElColorPickerBaseProps {}
        interface UeElColorPickerPanelProps extends UeElColorPickerPanelBaseProps {}
        interface UeElColorSettingProps extends UeElColorSettingBaseProps {}
        interface UeElColorSettingGroupProps extends UeElColorSettingGroupBaseProps {}
        interface UeElContextmenuProps extends UeElContextmenuBaseProps {}
        interface UeElEditorGroupProps extends UeElEditorGroupBaseProps {}
        interface UeElEditorPanelProps extends UeElEditorPanelBaseProps {}
        interface UeElEmojiLibraryPanelProps extends UeElEmojiLibraryPanelBaseProps {}
        interface UeElEmptyPanelProps extends UeElEmptyPanelBaseProps {}
        interface UeElEnterAnimateSettingProps extends UeElEnterAnimateSettingBaseProps {}
        interface UeElControlGroupProps extends UeElControlGroupBaseProps {}
        interface UeElFileUploadButtonProps extends UeElFileUploadButtonBaseProps {}
        interface UeElConfirmPanelProps extends UeElConfirmPanelBaseProps {}
        interface UeElFileUploaderProps extends UeElFileUploaderBaseProps {}
        interface UeElGapSettingProps extends UeElGapSettingBaseProps {}
        interface UeElGirdLayoutUtilProps extends UeElGirdLayoutUtilBaseProps {}
        interface UeElJustifyContentSettingProps extends UeElJustifyContentSettingBaseProps {}
        interface UeElLibraryPanelProps extends UeElLibraryPanelBaseProps {}
        interface UeElLoadingProps extends UeElLoadingBaseProps {}
        interface UeElMarginSettingProps extends UeElMarginSettingBaseProps {}
        interface UeElNumberInputProps extends UeElNumberInputBaseProps {}
        interface UeElIconProps extends UeElIconBaseProps {}
        interface UeElOnOffProps extends UeElOnOffBaseProps {}
        interface UeElPaddingSettingProps extends UeElPaddingSettingBaseProps {}
        interface UeElPopPanelProps extends UeElPopPanelBaseProps {}
        interface UeElRadiusSettingProps extends UeElRadiusSettingBaseProps {}
        interface UeElSelectProps extends UeElSelectBaseProps {}
        interface UeElRadiusSettingGroupProps extends UeElRadiusSettingGroupBaseProps {}
        interface UeElSelectOptionProps extends UeElSelectOptionBaseProps {}
        interface UeElShareIconLibraryPanelProps extends UeElShareIconLibraryPanelBaseProps {}
        interface UeElSettingBarProps extends UeElSettingBarBaseProps {}
        interface UeElShapeLibraryPanelProps extends UeElShapeLibraryPanelBaseProps {}
        interface UeElSettingGroupProps extends UeElSettingGroupBaseProps {}
        interface UeElSplineLibraryPanelProps extends UeElSplineLibraryPanelBaseProps {}
        interface UeElSvgLibraryPanelProps extends UeElSvgLibraryPanelBaseProps {}
        interface UeElTabCardProps extends UeElTabCardBaseProps {}
        interface UeElTagInputProps extends UeElTagInputBaseProps {}
        interface UeElTextDecorationLibraryPanelProps extends UeElTextDecorationLibraryPanelBaseProps {}
        interface UeElTipGroupProps extends UeElTipGroupBaseProps {}
        interface UeElTextInputProps extends UeElTextInputBaseProps {}
        interface UeElVideoPanelProps extends UeElVideoPanelBaseProps {}
    }
}

export {};
