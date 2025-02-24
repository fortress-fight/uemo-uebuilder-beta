/*
 * @Description: 组件注册
 * @Author: F-Stone
 * @LastEditTime: 2025-02-20 15:32:50
 */
import UeElCheckBox, { UeElCheckBoxBaseProps } from "../packages/check-box";
import UeElIcon, { UeElIconBaseProps } from "../packages/icon";
import UeElLoading, { UeElLoadingBaseProps } from "../packages/loading";
import UeElPopPanel, { UeElPopPanelBaseProps } from "../packages/pop-panel";
import UeElSelect, { UeElSelectBaseProps } from "../packages/select";
import UeElSelectOption, { UeElSelectOptionBaseProps } from "../packages/select-option";
import UeElTabCard, { UeElTabCardBaseProps } from "../packages/tab-card";
import UeElTextInput, { UeElTextInputBaseProps } from "../packages/text-input";

declare module "vue" {
    export interface GlobalComponents {
        UeElCheckBox: typeof UeElCheckBox;
        UeElIcon: typeof UeElIcon;
        UeElLoading: typeof UeElLoading;
        UeElPopPanel: typeof UeElPopPanel;
        UeElSelect: typeof UeElSelect;
        UeElSelectOption: typeof UeElSelectOption;
        UeElTabCard: typeof UeElTabCard;
        UeElTextInput: typeof UeElTextInput;
    }
}

declare global {
    namespace UE_EL_COMPONENT {
        interface UeElCheckBoxProps extends UeElCheckBoxBaseProps {}
        interface UeElIconProps extends UeElIconBaseProps {}
        interface UeElLoadingProps extends UeElLoadingBaseProps {}
        interface UeElPopPanelProps extends UeElPopPanelBaseProps {}
        interface UeElSelectProps extends UeElSelectBaseProps {}
        interface UeElSelectOptionProps extends UeElSelectOptionBaseProps {}
        interface UeElTabCardProps extends UeElTabCardBaseProps {}
        interface UeElTextInputProps extends UeElTextInputBaseProps {}
    }
}

export {};
