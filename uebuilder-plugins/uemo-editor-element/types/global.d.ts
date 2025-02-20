declare global {
    namespace UE_EL_UTIL {
        /**
         * @description 输入框校验参数
         */
        type InputRule = { pattern?: RegExp; message?: string } | ((value: string) => boolean | string);
    }
}

export {};
