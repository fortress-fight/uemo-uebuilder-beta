/*
 * @Description: 组件注册
 * @Author: F-Stone
 * @LastEditTime: 2025-02-23 23:56:28
 */
import UeElCheckBox, { UeElCheckBoxBaseProps } from "../packages/check-box";
import UeElSelect, { UeElSelectBaseProps } from "../packages/select";
import UeElPopPanel, { UeElPopPanelBaseProps } from "../packages/pop-panel";
import UeElSelectOption, { UeElSelectOptionBaseProps } from "../packages/select-option";
import UeElIcon, { UeElIconBaseProps } from "../packages/icon";
import UeElTextInput, { UeElTextInputBaseProps } from "../packages/text-input";

declare module "vue" {
    export interface GlobalComponents {
        UeElCheckBox: typeof UeElCheckBox;
        UeElSelect: typeof UeElSelect;
        UeElPopPanel: typeof UeElPopPanel;
        UeElSelectOption: typeof UeElSelectOption;
        UeElIcon: typeof UeElIcon;
        UeElTextInput: typeof UeElTextInput;
    }
}

declare global {
    namespace UE_EL_COMPONENT {
        interface UeElCheckBoxProps extends UeElCheckBoxBaseProps {}
        interface UeElSelectProps extends UeElSelectBaseProps {}
        interface UeElPopPanelProps extends UeElPopPanelBaseProps {}
        interface UeElSelectOptionProps extends UeElSelectOptionBaseProps {}
        interface UeElIconProps extends UeElIconBaseProps {}
        interface UeElTextInputProps extends UeElTextInputBaseProps {}
    }
}

export {};
