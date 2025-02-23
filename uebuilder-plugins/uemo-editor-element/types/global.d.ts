import type { Props } from "@stone/uemo-editor-utils/lib/tippy";

declare global {
    namespace UE_EL_UTIL {
        /**
         * @description 输入框校验参数
         */
        type InputRule = { pattern?: RegExp; message?: string } | ((value: string) => boolean | string);

        /**
         * @description 提示框参数
         */
        type LabelOption = Partial<Props> | string | undefined;

        /**
         * @description 选择器选项
         */
        type SelectOption = {
            icon?: string;
            label?: string;
            text: string;
            value: string | number;
            [param: string]: any;
        };
    }
}

export {};
