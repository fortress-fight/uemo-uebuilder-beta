/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
import type {
    Middleware,
    MiddlewareReturn,
    MiddlewareState,
    ComputePositionConfig,
    flip,
    shift,
    size,
    offset,
} from "@floating-ui/dom";

/** 内部类型：表示 Flip 配置 */
type FLIP = ["flip", Parameters<typeof flip>[0]];

/** 内部类型：表示 Shift 配置 */
type SHIFT = ["shift", Parameters<typeof shift>[0]];

/** 内部类型：表示 Size 配置 */
type SIZE = ["size", Parameters<typeof size>[0]];

/** 内部类型：表示 Offset 配置 */
type OFFSET = ["offset", Parameters<typeof offset>[0]];

/** 内部类型：表示 Custom 中间件配置 */
type CUSTOM = [
    "custom",
    {
        name: string;
        fn: (state: MiddlewareState) => MaybePromise<MiddlewareReturn>;
    },
];

/** 内部类型：MaybePromise 表示 T 或 Promise<T> */
type MaybePromise<T> = T | Promise<T>;

/** 自定义中间件类型，包括 Floating UI 内置中间件、数组形式的中间件以及无效值 */
export type ExtendedMiddlewareItem = FLIP | SHIFT | OFFSET | CUSTOM | SIZE | Middleware | null | undefined | false;

export type ExtendedMiddleware = (Middleware | null | undefined | false)[] | undefined;

/**
 * 定位配置增强类型，主要扩展了 middleware 字段。
 */
export type EnhancedComputePositionConfig = Omit<ComputePositionConfig, "middleware"> & {
    /**
     * 自定义中间件数组
     */
    middleware?: ExtendedMiddlewareItem[];
};
