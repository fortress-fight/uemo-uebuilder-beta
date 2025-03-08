/*
 * @Description: 组件注册
 * @Author: F-Stone
 * @LastEditTime: 2025-02-20 15:32:50
 */
import UeElAlignItemSetting, { UeElAlignItemSettingBaseProps } from "../packages/align-item-setting";
import UeElAlignSetting, { UeElAlignSettingBaseProps } from "../packages/align-setting";
import UeElBorderSetting, { UeElBorderSettingBaseProps } from "../packages/border-setting";
import UeElBorderSettingGroup, { UeElBorderSettingGroupBaseProps } from "../packages/border-setting-group";
import UeElBoxShadowSetting, { UeElBoxShadowSettingBaseProps } from "../packages/box-shadow-setting";
import UeElButton, { UeElButtonBaseProps } from "../packages/button";
import UeElBoxShadowSettingGroup, { UeElBoxShadowSettingGroupBaseProps } from "../packages/box-shadow-setting-group";
import UeElCalenderSetting, { UeElCalenderSettingBaseProps } from "../packages/calender-setting";
import UeElCalenderPicker, { UeElCalenderPickerBaseProps } from "../packages/calender-picker";
import UeElCalenderSettingGroup, { UeElCalenderSettingGroupBaseProps } from "../packages/calender-setting-group";
import UeElCheckBox, { UeElCheckBoxBaseProps } from "../packages/check-box";
import UeElColorInput, { UeElColorInputBaseProps } from "../packages/color-input";
import UeElColorSettingGroup, { UeElColorSettingGroupBaseProps } from "../packages/color-setting-group";
import UeElColorPicker, { UeElColorPickerBaseProps } from "../packages/color-picker";
import UeElColorPickerPanel, { UeElColorPickerPanelBaseProps } from "../packages/color-picker-panel";
import UeElColorSetting, { UeElColorSettingBaseProps } from "../packages/color-setting";
import UeElConfirmPanel, { UeElConfirmPanelBaseProps } from "../packages/confirm-panel";
import UeElContextmenu, { UeElContextmenuBaseProps } from "../packages/contextmenu";
import UeElEditorGroup, { UeElEditorGroupBaseProps } from "../packages/editor-group";
import UeElControlGroup, { UeElControlGroupBaseProps } from "../packages/control-group";
import UeElEmptyPanel, { UeElEmptyPanelBaseProps } from "../packages/empty-panel";
import UeElEnterAnimateSetting, { UeElEnterAnimateSettingBaseProps } from "../packages/enter-animate-setting";
import UeElFileUploadButton, { UeElFileUploadButtonBaseProps } from "../packages/file-upload-button";
import UeElGapSetting, { UeElGapSettingBaseProps } from "../packages/gap-setting";
import UeElFileUploader, { UeElFileUploaderBaseProps } from "../packages/file-uploader";
import UeElEditorPanel, { UeElEditorPanelBaseProps } from "../packages/editor-panel";
import UeElIcon, { UeElIconBaseProps } from "../packages/icon";
import UeElJustifyContentSetting, { UeElJustifyContentSettingBaseProps } from "../packages/justify-content-setting";
import UeElLibraryPanel, { UeElLibraryPanelBaseProps } from "../packages/library-panel";
import UeElLoading, { UeElLoadingBaseProps } from "../packages/loading";
import UeElOnOff, { UeElOnOffBaseProps } from "../packages/on-off";
import UeElNumberInput, { UeElNumberInputBaseProps } from "../packages/number-input";
import UeElPopPanel, { UeElPopPanelBaseProps } from "../packages/pop-panel";
import UeElMarginSetting, { UeElMarginSettingBaseProps } from "../packages/margin-setting";
import UeElRadiusSetting, { UeElRadiusSettingBaseProps } from "../packages/radius-setting";
import UeElSelect, { UeElSelectBaseProps } from "../packages/select";
import UeElSelectOption, { UeElSelectOptionBaseProps } from "../packages/select-option";
import UeElSettingBar, { UeElSettingBarBaseProps } from "../packages/setting-bar";
import UeElShapeLibraryPanel, { UeElShapeLibraryPanelBaseProps } from "../packages/shape-library-panel";
import UeElSplineLibraryPanel, { UeElSplineLibraryPanelBaseProps } from "../packages/spline-library-panel";
import UeElPaddingSetting, { UeElPaddingSettingBaseProps } from "../packages/padding-setting";
import UeElRadiusSettingGroup, { UeElRadiusSettingGroupBaseProps } from "../packages/radius-setting-group";
import UeElTagInput, { UeElTagInputBaseProps } from "../packages/tag-input";
import UeElSettingGroup, { UeElSettingGroupBaseProps } from "../packages/setting-group";
import UeElTextDecorationLibraryPanel, {
    UeElTextDecorationLibraryPanelBaseProps,
} from "../packages/text-decoration-library-panel";
import UeElTextInput, { UeElTextInputBaseProps } from "../packages/text-input";
import UeElTabCard, { UeElTabCardBaseProps } from "../packages/tab-card";
import UeElVideoPanel, { UeElVideoPanelBaseProps } from "../packages/video-panel";
import UeElTipGroup, { UeElTipGroupBaseProps } from "../packages/tip-group";

declare module "vue" {
    export interface GlobalComponents {
        UeElAlignItemSetting: typeof UeElAlignItemSetting;
        UeElAlignSetting: typeof UeElAlignSetting;
        UeElBorderSetting: typeof UeElBorderSetting;
        UeElBorderSettingGroup: typeof UeElBorderSettingGroup;
        UeElBoxShadowSetting: typeof UeElBoxShadowSetting;
        UeElButton: typeof UeElButton;
        UeElBoxShadowSettingGroup: typeof UeElBoxShadowSettingGroup;
        UeElCalenderSetting: typeof UeElCalenderSetting;
        UeElCalenderPicker: typeof UeElCalenderPicker;
        UeElCalenderSettingGroup: typeof UeElCalenderSettingGroup;
        UeElCheckBox: typeof UeElCheckBox;
        UeElColorInput: typeof UeElColorInput;
        UeElColorSettingGroup: typeof UeElColorSettingGroup;
        UeElColorPicker: typeof UeElColorPicker;
        UeElColorPickerPanel: typeof UeElColorPickerPanel;
        UeElColorSetting: typeof UeElColorSetting;
        UeElConfirmPanel: typeof UeElConfirmPanel;
        UeElContextmenu: typeof UeElContextmenu;
        UeElEditorGroup: typeof UeElEditorGroup;
        UeElControlGroup: typeof UeElControlGroup;
        UeElEmptyPanel: typeof UeElEmptyPanel;
        UeElEnterAnimateSetting: typeof UeElEnterAnimateSetting;
        UeElFileUploadButton: typeof UeElFileUploadButton;
        UeElGapSetting: typeof UeElGapSetting;
        UeElFileUploader: typeof UeElFileUploader;
        UeElEditorPanel: typeof UeElEditorPanel;
        UeElIcon: typeof UeElIcon;
        UeElJustifyContentSetting: typeof UeElJustifyContentSetting;
        UeElLibraryPanel: typeof UeElLibraryPanel;
        UeElLoading: typeof UeElLoading;
        UeElOnOff: typeof UeElOnOff;
        UeElNumberInput: typeof UeElNumberInput;
        UeElPopPanel: typeof UeElPopPanel;
        UeElMarginSetting: typeof UeElMarginSetting;
        UeElRadiusSetting: typeof UeElRadiusSetting;
        UeElSelect: typeof UeElSelect;
        UeElSelectOption: typeof UeElSelectOption;
        UeElSettingBar: typeof UeElSettingBar;
        UeElShapeLibraryPanel: typeof UeElShapeLibraryPanel;
        UeElSplineLibraryPanel: typeof UeElSplineLibraryPanel;
        UeElPaddingSetting: typeof UeElPaddingSetting;
        UeElRadiusSettingGroup: typeof UeElRadiusSettingGroup;
        UeElTagInput: typeof UeElTagInput;
        UeElSettingGroup: typeof UeElSettingGroup;
        UeElTextDecorationLibraryPanel: typeof UeElTextDecorationLibraryPanel;
        UeElTextInput: typeof UeElTextInput;
        UeElTabCard: typeof UeElTabCard;
        UeElVideoPanel: typeof UeElVideoPanel;
        UeElTipGroup: typeof UeElTipGroup;
    }
}

declare global {
    namespace UE_EL_COMPONENT {
        interface UeElAlignItemSettingProps extends UeElAlignItemSettingBaseProps {}
        interface UeElAlignSettingProps extends UeElAlignSettingBaseProps {}
        interface UeElBorderSettingProps extends UeElBorderSettingBaseProps {}
        interface UeElBorderSettingGroupProps extends UeElBorderSettingGroupBaseProps {}
        interface UeElBoxShadowSettingProps extends UeElBoxShadowSettingBaseProps {}
        interface UeElButtonProps extends UeElButtonBaseProps {}
        interface UeElBoxShadowSettingGroupProps extends UeElBoxShadowSettingGroupBaseProps {}
        interface UeElCalenderSettingProps extends UeElCalenderSettingBaseProps {}
        interface UeElCalenderPickerProps extends UeElCalenderPickerBaseProps {}
        interface UeElCalenderSettingGroupProps extends UeElCalenderSettingGroupBaseProps {}
        interface UeElCheckBoxProps extends UeElCheckBoxBaseProps {}
        interface UeElColorInputProps extends UeElColorInputBaseProps {}
        interface UeElColorSettingGroupProps extends UeElColorSettingGroupBaseProps {}
        interface UeElColorPickerProps extends UeElColorPickerBaseProps {}
        interface UeElColorPickerPanelProps extends UeElColorPickerPanelBaseProps {}
        interface UeElColorSettingProps extends UeElColorSettingBaseProps {}
        interface UeElConfirmPanelProps extends UeElConfirmPanelBaseProps {}
        interface UeElContextmenuProps extends UeElContextmenuBaseProps {}
        interface UeElEditorGroupProps extends UeElEditorGroupBaseProps {}
        interface UeElControlGroupProps extends UeElControlGroupBaseProps {}
        interface UeElEmptyPanelProps extends UeElEmptyPanelBaseProps {}
        interface UeElEnterAnimateSettingProps extends UeElEnterAnimateSettingBaseProps {}
        interface UeElFileUploadButtonProps extends UeElFileUploadButtonBaseProps {}
        interface UeElGapSettingProps extends UeElGapSettingBaseProps {}
        interface UeElFileUploaderProps extends UeElFileUploaderBaseProps {}
        interface UeElEditorPanelProps extends UeElEditorPanelBaseProps {}
        interface UeElIconProps extends UeElIconBaseProps {}
        interface UeElJustifyContentSettingProps extends UeElJustifyContentSettingBaseProps {}
        interface UeElLibraryPanelProps extends UeElLibraryPanelBaseProps {}
        interface UeElLoadingProps extends UeElLoadingBaseProps {}
        interface UeElOnOffProps extends UeElOnOffBaseProps {}
        interface UeElNumberInputProps extends UeElNumberInputBaseProps {}
        interface UeElPopPanelProps extends UeElPopPanelBaseProps {}
        interface UeElMarginSettingProps extends UeElMarginSettingBaseProps {}
        interface UeElRadiusSettingProps extends UeElRadiusSettingBaseProps {}
        interface UeElSelectProps extends UeElSelectBaseProps {}
        interface UeElSelectOptionProps extends UeElSelectOptionBaseProps {}
        interface UeElSettingBarProps extends UeElSettingBarBaseProps {}
        interface UeElShapeLibraryPanelProps extends UeElShapeLibraryPanelBaseProps {}
        interface UeElSplineLibraryPanelProps extends UeElSplineLibraryPanelBaseProps {}
        interface UeElPaddingSettingProps extends UeElPaddingSettingBaseProps {}
        interface UeElRadiusSettingGroupProps extends UeElRadiusSettingGroupBaseProps {}
        interface UeElTagInputProps extends UeElTagInputBaseProps {}
        interface UeElSettingGroupProps extends UeElSettingGroupBaseProps {}
        interface UeElTextDecorationLibraryPanelProps extends UeElTextDecorationLibraryPanelBaseProps {}
        interface UeElTextInputProps extends UeElTextInputBaseProps {}
        interface UeElTabCardProps extends UeElTabCardBaseProps {}
        interface UeElVideoPanelProps extends UeElVideoPanelBaseProps {}
        interface UeElTipGroupProps extends UeElTipGroupBaseProps {}
    }
}

export {};
