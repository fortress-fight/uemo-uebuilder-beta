import type { ReferenceElement, FloatingElement } from "@floating-ui/dom";
import type { ExtendedMiddlewareItem, EnhancedComputePositionConfig, ExtendedMiddleware } from "./type";

import { computePosition, shift, offset, size, flip } from "@floating-ui/dom";

export type * from "@floating-ui/dom";
export type { EnhancedComputePositionConfig };

/**
 * 转换中间件列表，将自定义中间件数组转换为 Floating UI 可识别的中间件。
 *
 * @param param - 中间件数组（可包含自定义格式与直接传入的 Middleware 实例）
 * @returns 转换后的中间件数组
 */
export function middlewareTransform(param?: ExtendedMiddlewareItem[]): ExtendedMiddleware {
    if (typeof param === "undefined") {
        return undefined;
    }
    return param.map((item) => {
        if (!Array.isArray(item)) {
            return item;
        }
        switch (item[0]) {
            case "flip":
                return flip(item[1]);
            case "shift":
                return shift(item[1]);
            case "offset":
                return offset(item[1]);
            case "size":
                return size(item[1]);
            case "custom":
                return item[1];
        }
    });
}

/**
 * 计算浮动定位，可传入扩展配置中带自定义中间件的参数。
 *
 * @param reference - 参考元素
 * @param floating - 浮动元素
 * @param options - 定位配置，支持扩展的中间件配置
 * @returns 计算后的定位结果（Promise）
 */
export function computeFloatingPosition(
    reference: ReferenceElement,
    floating: FloatingElement,
    options?: Partial<EnhancedComputePositionConfig>
): Promise<import("@floating-ui/core").ComputePositionReturn> {
    const useMiddleArea = middlewareTransform(options?.middleware);
    const calcOptions = options ? { ...options, middleware: useMiddleArea } : undefined;
    return computePosition(reference, floating, calcOptions);
}
