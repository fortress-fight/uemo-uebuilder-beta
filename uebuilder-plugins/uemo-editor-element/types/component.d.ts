/*
 * @Description: 组件注册
 * @Author: F-Stone
 * @LastEditTime: 2025-02-20 15:28:45
 */
import UeElIcon, { UeElIconBaseProps } from "../packages/icon";
import UeElTextInput, { UeElTextInputBaseProps } from "../packages/text-input";

declare module "vue" {
    export interface GlobalComponents {
        UeElIcon: typeof UeElIcon;
        UeElTextInput: typeof UeElTextInput;
    }
}

declare global {
    namespace UE_EL_COMPONENT {
        /**
         * @description 图标字
         */
        interface UeElIconProps extends UeElIconBaseProps {}

        /**
         * @description 输入框参数
         */
        interface UeElTextInputProps extends UeElTextInputBaseProps {}
    }
}

export {};
