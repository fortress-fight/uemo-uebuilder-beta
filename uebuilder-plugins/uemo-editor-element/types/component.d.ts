/*
 * @Description: 组件注册
 * @Author: F-Stone
 * @LastEditTime: 2025-02-20 15:32:50
 */
import UeElButton, { UeElButtonBaseProps } from "../packages/button";
import UeElCheckBox, { UeElCheckBoxBaseProps } from "../packages/check-box";
import UeElIcon, { UeElIconBaseProps } from "../packages/icon";
import UeElOnOff, { UeElOnOffBaseProps } from "../packages/on-off";
import UeElLoading, { UeElLoadingBaseProps } from "../packages/loading";
import UeElPopPanel, { UeElPopPanelBaseProps } from "../packages/pop-panel";
import UeElSelect, { UeElSelectBaseProps } from "../packages/select";
import UeElSelectOption, { UeElSelectOptionBaseProps } from "../packages/select-option";
import UeElTabCard, { UeElTabCardBaseProps } from "../packages/tab-card";
import UeElTextInput, { UeElTextInputBaseProps } from "../packages/text-input";
import UeElTipGroup, { UeElTipGroupBaseProps } from "../packages/tip-group";

declare module "vue" {
    export interface GlobalComponents {
        UeElButton: typeof UeElButton;
        UeElCheckBox: typeof UeElCheckBox;
        UeElIcon: typeof UeElIcon;
        UeElOnOff: typeof UeElOnOff;
        UeElLoading: typeof UeElLoading;
        UeElPopPanel: typeof UeElPopPanel;
        UeElSelect: typeof UeElSelect;
        UeElSelectOption: typeof UeElSelectOption;
        UeElTabCard: typeof UeElTabCard;
        UeElTextInput: typeof UeElTextInput;
        UeElTipGroup: typeof UeElTipGroup;
    }
}

declare global {
    namespace UE_EL_COMPONENT {
        interface UeElButtonProps extends UeElButtonBaseProps {}
        interface UeElCheckBoxProps extends UeElCheckBoxBaseProps {}
        interface UeElIconProps extends UeElIconBaseProps {}
        interface UeElOnOffProps extends UeElOnOffBaseProps {}
        interface UeElLoadingProps extends UeElLoadingBaseProps {}
        interface UeElPopPanelProps extends UeElPopPanelBaseProps {}
        interface UeElSelectProps extends UeElSelectBaseProps {}
        interface UeElSelectOptionProps extends UeElSelectOptionBaseProps {}
        interface UeElTabCardProps extends UeElTabCardBaseProps {}
        interface UeElTextInputProps extends UeElTextInputBaseProps {}
        interface UeElTipGroupProps extends UeElTipGroupBaseProps {}
    }
}

export {};
