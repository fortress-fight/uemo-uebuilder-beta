/*
 * @Description: 组件注册
 * @Author: F-Stone
 * @LastEditTime: 2025-02-20 15:32:50
 */
import UeElAlignItemSetting, { UeElAlignItemSettingBaseProps } from "../packages/align-item-setting";
import UeElAlignSetting, { UeElAlignSettingBaseProps } from "../packages/align-setting";
import UeElBorderSetting, { UeElBorderSettingBaseProps } from "../packages/border-setting";
import UeElButton, { UeElButtonBaseProps } from "../packages/button";
import UeElBoxShadowSetting, { UeElBoxShadowSettingBaseProps } from "../packages/box-shadow-setting";
import UeElCalenderPicker, { UeElCalenderPickerBaseProps } from "../packages/calender-picker";
import UeElCalenderSetting, { UeElCalenderSettingBaseProps } from "../packages/calender-setting";
import UeElCheckBox, { UeElCheckBoxBaseProps } from "../packages/check-box";
import UeElColorInput, { UeElColorInputBaseProps } from "../packages/color-input";
import UeElColorPicker, { UeElColorPickerBaseProps } from "../packages/color-picker";
import UeElColorPickerPanel, { UeElColorPickerPanelBaseProps } from "../packages/color-picker-panel";
import UeElColorSetting, { UeElColorSettingBaseProps } from "../packages/color-setting";
import UeElConfirmPanel, { UeElConfirmPanelBaseProps } from "../packages/confirm-panel";
import UeElContextmenu, { UeElContextmenuBaseProps } from "../packages/contextmenu";
import UeElControlGroup, { UeElControlGroupBaseProps } from "../packages/control-group";
import UeElEditorGroup, { UeElEditorGroupBaseProps } from "../packages/editor-group";
import UeElEditorPanel, { UeElEditorPanelBaseProps } from "../packages/editor-panel";
import UeElEnterAnimateSetting, { UeElEnterAnimateSettingBaseProps } from "../packages/enter-animate-setting";
import UeElGapSetting, { UeElGapSettingBaseProps } from "../packages/gap-setting";
import UeElIcon, { UeElIconBaseProps } from "../packages/icon";
import UeElJustifyContentSetting, { UeElJustifyContentSettingBaseProps } from "../packages/justify-content-setting";
import UeElLoading, { UeElLoadingBaseProps } from "../packages/loading";
import UeElMarginSetting, { UeElMarginSettingBaseProps } from "../packages/margin-setting";
import UeElNumberInput, { UeElNumberInputBaseProps } from "../packages/number-input";
import UeElOnOff, { UeElOnOffBaseProps } from "../packages/on-off";
import UeElPaddingSetting, { UeElPaddingSettingBaseProps } from "../packages/padding-setting";
import UeElRadiusSetting, { UeElRadiusSettingBaseProps } from "../packages/radius-setting";
import UeElPopPanel, { UeElPopPanelBaseProps } from "../packages/pop-panel";
import UeElSelect, { UeElSelectBaseProps } from "../packages/select";
import UeElSettingBar, { UeElSettingBarBaseProps } from "../packages/setting-bar";
import UeElSelectOption, { UeElSelectOptionBaseProps } from "../packages/select-option";
import UeElTabCard, { UeElTabCardBaseProps } from "../packages/tab-card";
import UeElTagInput, { UeElTagInputBaseProps } from "../packages/tag-input";
import UeElTextInput, { UeElTextInputBaseProps } from "../packages/text-input";
import UeElTipGroup, { UeElTipGroupBaseProps } from "../packages/tip-group";
import UeElVideoPanel, { UeElVideoPanelBaseProps } from "../packages/video-panel";

declare module "vue" {
    export interface GlobalComponents {
        UeElAlignItemSetting: typeof UeElAlignItemSetting;
        UeElAlignSetting: typeof UeElAlignSetting;
        UeElBorderSetting: typeof UeElBorderSetting;
        UeElButton: typeof UeElButton;
        UeElBoxShadowSetting: typeof UeElBoxShadowSetting;
        UeElCalenderPicker: typeof UeElCalenderPicker;
        UeElCalenderSetting: typeof UeElCalenderSetting;
        UeElCheckBox: typeof UeElCheckBox;
        UeElColorInput: typeof UeElColorInput;
        UeElColorPicker: typeof UeElColorPicker;
        UeElColorPickerPanel: typeof UeElColorPickerPanel;
        UeElColorSetting: typeof UeElColorSetting;
        UeElConfirmPanel: typeof UeElConfirmPanel;
        UeElContextmenu: typeof UeElContextmenu;
        UeElControlGroup: typeof UeElControlGroup;
        UeElEditorGroup: typeof UeElEditorGroup;
        UeElEditorPanel: typeof UeElEditorPanel;
        UeElEnterAnimateSetting: typeof UeElEnterAnimateSetting;
        UeElGapSetting: typeof UeElGapSetting;
        UeElIcon: typeof UeElIcon;
        UeElJustifyContentSetting: typeof UeElJustifyContentSetting;
        UeElLoading: typeof UeElLoading;
        UeElMarginSetting: typeof UeElMarginSetting;
        UeElNumberInput: typeof UeElNumberInput;
        UeElOnOff: typeof UeElOnOff;
        UeElPaddingSetting: typeof UeElPaddingSetting;
        UeElRadiusSetting: typeof UeElRadiusSetting;
        UeElPopPanel: typeof UeElPopPanel;
        UeElSelect: typeof UeElSelect;
        UeElSettingBar: typeof UeElSettingBar;
        UeElSelectOption: typeof UeElSelectOption;
        UeElTabCard: typeof UeElTabCard;
        UeElTagInput: typeof UeElTagInput;
        UeElTextInput: typeof UeElTextInput;
        UeElTipGroup: typeof UeElTipGroup;
        UeElVideoPanel: typeof UeElVideoPanel;
    }
}

declare global {
    namespace UE_EL_COMPONENT {
        interface UeElAlignItemSettingProps extends UeElAlignItemSettingBaseProps {}
        interface UeElAlignSettingProps extends UeElAlignSettingBaseProps {}
        interface UeElBorderSettingProps extends UeElBorderSettingBaseProps {}
        interface UeElButtonProps extends UeElButtonBaseProps {}
        interface UeElBoxShadowSettingProps extends UeElBoxShadowSettingBaseProps {}
        interface UeElCalenderPickerProps extends UeElCalenderPickerBaseProps {}
        interface UeElCalenderSettingProps extends UeElCalenderSettingBaseProps {}
        interface UeElCheckBoxProps extends UeElCheckBoxBaseProps {}
        interface UeElColorInputProps extends UeElColorInputBaseProps {}
        interface UeElColorPickerProps extends UeElColorPickerBaseProps {}
        interface UeElColorPickerPanelProps extends UeElColorPickerPanelBaseProps {}
        interface UeElColorSettingProps extends UeElColorSettingBaseProps {}
        interface UeElConfirmPanelProps extends UeElConfirmPanelBaseProps {}
        interface UeElContextmenuProps extends UeElContextmenuBaseProps {}
        interface UeElControlGroupProps extends UeElControlGroupBaseProps {}
        interface UeElEditorGroupProps extends UeElEditorGroupBaseProps {}
        interface UeElEditorPanelProps extends UeElEditorPanelBaseProps {}
        interface UeElEnterAnimateSettingProps extends UeElEnterAnimateSettingBaseProps {}
        interface UeElGapSettingProps extends UeElGapSettingBaseProps {}
        interface UeElIconProps extends UeElIconBaseProps {}
        interface UeElJustifyContentSettingProps extends UeElJustifyContentSettingBaseProps {}
        interface UeElLoadingProps extends UeElLoadingBaseProps {}
        interface UeElMarginSettingProps extends UeElMarginSettingBaseProps {}
        interface UeElNumberInputProps extends UeElNumberInputBaseProps {}
        interface UeElOnOffProps extends UeElOnOffBaseProps {}
        interface UeElPaddingSettingProps extends UeElPaddingSettingBaseProps {}
        interface UeElRadiusSettingProps extends UeElRadiusSettingBaseProps {}
        interface UeElPopPanelProps extends UeElPopPanelBaseProps {}
        interface UeElSelectProps extends UeElSelectBaseProps {}
        interface UeElSettingBarProps extends UeElSettingBarBaseProps {}
        interface UeElSelectOptionProps extends UeElSelectOptionBaseProps {}
        interface UeElTabCardProps extends UeElTabCardBaseProps {}
        interface UeElTagInputProps extends UeElTagInputBaseProps {}
        interface UeElTextInputProps extends UeElTextInputBaseProps {}
        interface UeElTipGroupProps extends UeElTipGroupBaseProps {}
        interface UeElVideoPanelProps extends UeElVideoPanelBaseProps {}
    }
}

export {};
