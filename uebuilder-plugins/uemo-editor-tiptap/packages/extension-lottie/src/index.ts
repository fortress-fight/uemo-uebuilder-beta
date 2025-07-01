/*
 * @Description: Lottie 节点类型
 * @Author: F-Stone
 * @LastEditTime: 2025-06-14 00:45:10
 */
export type LottieAttrs = {
    url?: string;

    ratio?: string;
    align?: UE_EL_UTIL.ALIGN_X;
    color?: string;

    width?: string;
    background?: string;

    border?: UE_EL_UTIL.BorderValue;

    padding?: string;
    shadow?: string;
    radius?: string;

    w?: string;
    h?: string;

    preview?: boolean;
    speed?: string;
    autoplay?: boolean;
    delay?: string;
    trigger?:
        | string
        | {
              value: string;
              options: { triggerArea?: string };
          };
};

export * from "./lottie";
