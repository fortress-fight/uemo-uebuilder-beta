/*
 * @Description: 组件注册
 * @Author: F-Stone
 * @LastEditTime: 2025-02-20 15:32:50
 */
import UeElAlignSetting, { UeElAlignSettingBaseProps } from "../packages/align-setting";
import UeElButton, { UeElButtonBaseProps } from "../packages/button";
import UeElCheckBox, { UeElCheckBoxBaseProps } from "../packages/check-box";
import UeElConfirmPanel, { UeElConfirmPanelBaseProps } from "../packages/confirm-panel";
import UeElControlGroup, { UeElControlGroupBaseProps } from "../packages/control-group";
import UeElContextmenu, { UeElContextmenuBaseProps } from "../packages/contextmenu";
import UeElIcon, { UeElIconBaseProps } from "../packages/icon";
import UeElNumberInput, { UeElNumberInputBaseProps } from "../packages/number-input";
import UeElOnOff, { UeElOnOffBaseProps } from "../packages/on-off";
import UeElPopPanel, { UeElPopPanelBaseProps } from "../packages/pop-panel";
import UeElSelect, { UeElSelectBaseProps } from "../packages/select";
import UeElLoading, { UeElLoadingBaseProps } from "../packages/loading";
import UeElTabCard, { UeElTabCardBaseProps } from "../packages/tab-card";
import UeElSelectOption, { UeElSelectOptionBaseProps } from "../packages/select-option";
import UeElTagInput, { UeElTagInputBaseProps } from "../packages/tag-input";
import UeElTextInput, { UeElTextInputBaseProps } from "../packages/text-input";
import UeElTipGroup, { UeElTipGroupBaseProps } from "../packages/tip-group";
import UeElVideoPanel, { UeElVideoPanelBaseProps } from "../packages/video-panel";

declare module "vue" {
    export interface GlobalComponents {
        UeElAlignSetting: typeof UeElAlignSetting;
        UeElButton: typeof UeElButton;
        UeElCheckBox: typeof UeElCheckBox;
        UeElConfirmPanel: typeof UeElConfirmPanel;
        UeElControlGroup: typeof UeElControlGroup;
        UeElContextmenu: typeof UeElContextmenu;
        UeElIcon: typeof UeElIcon;
        UeElNumberInput: typeof UeElNumberInput;
        UeElOnOff: typeof UeElOnOff;
        UeElPopPanel: typeof UeElPopPanel;
        UeElSelect: typeof UeElSelect;
        UeElLoading: typeof UeElLoading;
        UeElTabCard: typeof UeElTabCard;
        UeElSelectOption: typeof UeElSelectOption;
        UeElTagInput: typeof UeElTagInput;
        UeElTextInput: typeof UeElTextInput;
        UeElTipGroup: typeof UeElTipGroup;
        UeElVideoPanel: typeof UeElVideoPanel;
    }
}

declare global {
    namespace UE_EL_COMPONENT {
        interface UeElAlignSettingProps extends UeElAlignSettingBaseProps {}
        interface UeElButtonProps extends UeElButtonBaseProps {}
        interface UeElCheckBoxProps extends UeElCheckBoxBaseProps {}
        interface UeElConfirmPanelProps extends UeElConfirmPanelBaseProps {}
        interface UeElControlGroupProps extends UeElControlGroupBaseProps {}
        interface UeElContextmenuProps extends UeElContextmenuBaseProps {}
        interface UeElIconProps extends UeElIconBaseProps {}
        interface UeElNumberInputProps extends UeElNumberInputBaseProps {}
        interface UeElOnOffProps extends UeElOnOffBaseProps {}
        interface UeElPopPanelProps extends UeElPopPanelBaseProps {}
        interface UeElSelectProps extends UeElSelectBaseProps {}
        interface UeElLoadingProps extends UeElLoadingBaseProps {}
        interface UeElTabCardProps extends UeElTabCardBaseProps {}
        interface UeElSelectOptionProps extends UeElSelectOptionBaseProps {}
        interface UeElTagInputProps extends UeElTagInputBaseProps {}
        interface UeElTextInputProps extends UeElTextInputBaseProps {}
        interface UeElTipGroupProps extends UeElTipGroupBaseProps {}
        interface UeElVideoPanelProps extends UeElVideoPanelBaseProps {}
    }
}

export {};
