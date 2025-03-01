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

        /**
         * @description 选择器参数
         */
        type SelectValue = number | string | undefined;

        /**
         * @description 开关参数
         */
        type OnOffValue = boolean | string | number;

        /**
         * @description 对齐参数
         */
        type ALIGN_X = `${"left" | "center" | "right"}`;
        type ALIGN_Y = `${"top" | "center" | "bottom"}`;
        type ALIGN = `${ALIGN_X} ${ALIGN_Y}` | ALIGN_X | ALIGN_Y;

        /**
         * @description 数字输入框参数
         */
        type NumInputLimit = number[] | Record<string, number[]>;
        type NumInputUnit = { value: string; text: string; default?: number; step?: number };

        /**
         * @description 拖拽指令参数
         */
        type DraggerDirectiveParam = {
            onStart?: () => void;
            onChange: (moveX: number) => void;
        };

        /**
         * @description 输入框内边距大小
         */
        type InputPaddingSize = "level1" | "level2" | "level3" | "level4";

        /**
         * @description 图标参数
         */
        type IconParam = string | { name: string; size?: number };
    }
}

export {};
