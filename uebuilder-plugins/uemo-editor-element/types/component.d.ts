/*
 * @Description: 组件注册
 * @Author: F-Stone
 * @LastEditTime: 2025-02-23 02:37:08
 */
import UeElPopPanel, { UeElPopPanelBaseProps } from "../packages/pop-panel";
import UeElSelect, { UeElSelectBaseProps } from "../packages/select";
import UeElIcon, { UeElIconBaseProps } from "../packages/icon";
import UeElSelectOption, { UeElSelectOptionBaseProps } from "../packages/select-option";
import UeElTextInput, { UeElTextInputBaseProps } from "../packages/text-input";

declare module "vue" {
    export interface GlobalComponents {
        UeElPopPanel: typeof UeElPopPanel;
        UeElSelect: typeof UeElSelect;
        UeElIcon: typeof UeElIcon;
        UeElSelectOption: typeof UeElSelectOption;
        UeElTextInput: typeof UeElTextInput;
    }
}

declare global {
    namespace UE_EL_COMPONENT {
        interface UeElPopPanelProps extends UeElPopPanelBaseProps {}
        interface UeElSelectProps extends UeElSelectBaseProps {}
        interface UeElSelectProps extends UeElSelectBaseProps {}
        interface UeElIconProps extends UeElIconBaseProps {}
        interface UeElSelectOptionProps extends UeElSelectOptionBaseProps {}
        interface UeElTextInputProps extends UeElTextInputBaseProps {}
    }
}

export {};
