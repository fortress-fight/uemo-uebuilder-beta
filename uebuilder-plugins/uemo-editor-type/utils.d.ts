
/**
 * 将类型 T 中的指定键 K 转换为必填项
 * @param T - 原始类型
 * @param K - 需要转换为必填的键
 * @returns 转换后的类型
 */
type MakeRequired<T, K extends keyof T> = T & {
    [P in K]-?: T[P];
};

/**
 * 获取类型 T 的所有键
 * @param T - 原始类型
 * @returns 类型 T 的所有键
 */
type AllKeys<T> = T extends any ? keyof T : never;


