import type { ModelRef } from "vue";

import { _isEqual, _set, _cloneDeep } from "@stone/uemo-editor-utils/lib/lodash";

/**
 * 模型变化检测的配置选项
 * @template T - 模型值的类型
 */
interface DetectModelChangeOptions<T> {
    /** 当父组件值发生变化时的回调函数 */
    onParentChange?: (local: T, parent: T) => void;
    /** 当本地值发生变化时的回调函数 */
    onLocalChange?: (local: T, previous: T) => void;
    /** 是否深度监听对象变化 */
    deep?: boolean;
    /** 自定义相等性比较函数 */
    equalityFn?: (a: T, b: T) => boolean;
    /** 是否自动更新父组件值 */
    autoUpdateParent?: boolean;
    /** 自定义转换值的函数 */
    transformValue?: (value: T) => T;
    /** 是否监听值变化 */
    watchChange?: boolean;
}

/**
 * 创建一个模型变化检测器，用于处理组件间的双向绑定，将自动同步可以转换成手动同步，并在同步时，允许进行值的转换。
 * @template T - 模型值的类型
 * @param valueRef - 父组件传入的模型引用
 * @param options - 配置选项
 * @returns 包含本地值引用和控制方法的对象
 * @example
 * const value = ref({ name: "John", age: 30 });
 * const { localValueRef, reset, syncToParent, checkHasUnsyncedChanges } = useDetectModelChange(value, {
 *     onParentChange: (local, parent) => console.log("Parent changed:", local, parent),
 *     onLocalChange: (local, previous) => console.log("Local changed:", local, previous),
 * });
 */
export function useDetectModelChange<T>(valueRef: ModelRef<T>, options: DetectModelChangeOptions<T>) {
    const {
        onParentChange,
        onLocalChange,
        deep = true,
        equalityFn = _isEqual,
        autoUpdateParent = true,
        transformValue = (value) => value,
    } = options;

    /**
     * 本地状态引用，用于处理值的更新
     */
    const localValueRef = ref<T>(transformValue(valueRef.value));

    /**
     * 监听本地值变化，同步到父组件
     */
    watch(
        localValueRef,
        (current, _previous) => {
            if (autoUpdateParent) {
                valueRef.value = current;
            }
            onLocalChange?.(toRaw(current), toRaw(valueRef.value));
        },
        { deep }
    );

    /**
     * 监听父组件值变化，同步到本地状态
     */
    watch(
        valueRef,
        (current) => {
            const rawCurrent = toRaw(current);
            const rawLocal = toRaw(localValueRef.value);

            if (!equalityFn(rawCurrent, rawLocal)) {
                onParentChange?.(rawLocal, rawCurrent);
            }

            localValueRef.value = current;
        },
        { deep }
    );

    return {
        localValueRef,
        valueChange: options.watchChange
            ? computed(() => {
                  return !equalityFn(toRaw(valueRef.value), toRaw(localValueRef.value));
              })
            : null,
        /** 重置本地值为父组件值 */
        reset: () => (localValueRef.value = valueRef.value),
        /** 同步本地值到父组件 */
        syncToParent: () => (valueRef.value = localValueRef.value),
        /** 判断本地值是否有未同步的改变 */
        checkHasUnsyncedChanges: () => !equalityFn(toRaw(valueRef.value), toRaw(localValueRef.value)),
    };
}

/**
 * 定义一个对象模型的计算属性，用于处理复杂对象的双向绑定。 避免 model 对象，修改子属性时，相应差异（子属性如果不是相应属性，将无法触发数据更新）
 * @template T - 源对象类型，必须是键值对对象
 * @template R - 转换后的值类型
 * @param valueRef - 父组件传入的模型引用
 * @param param - 包含 get 和 set 方法的配置对象
 * @returns 一个计算属性，用于双向绑定转换后的值
 * @example
 * const value = ref({ name: "John", age: 30 });
 * const computedValue = useDefineObjectModel(value, {
 *     get: (modelValue) => modelValue.name,
 *     set: (value, modelValue) => {
 *         modelValue.name = value;
 *         return modelValue;
 *     },
 * });
 *
 */
export function useDefineObjectModel<T extends Record<string, any> | undefined, R>(
    valueRef: ModelRef<T>,
    param: {
        get: (modelValue: T) => R;
        set: (value: R, modelValue: NonNullable<T>) => T | undefined;
    },
    options?: { deep?: boolean }
): WritableComputedRef<R, R> {
    const { deep = false } = options || {};

    /**
     * 缓存原始值引用，避免重复调用 toRaw
     */
    const rawValue = computed(() => toRaw(valueRef.value));

    return computed<R>({
        get() {
            try {
                return param.get(rawValue.value);
            } catch (error) {
                console.warn("[useDefineObjectModel] Error in getter:", error);
                throw error;
            }
        },
        set(newValue) {
            try {
                const currentValue = rawValue.value
                    ? deep
                        ? _cloneDeep(rawValue.value)
                        : { ...rawValue.value }
                    : ({} as NonNullable<T>);

                const result = param.set(newValue, currentValue);
                if (typeof result !== "undefined") {
                    valueRef.value = result;
                }
            } catch (error) {
                console.warn("[useDefineObjectModel] Error in setter:", error);
                throw error;
            }
        },
    });
}

/**
 * 定义一个对象模型的计算属性，用于处理复杂对象的双向绑定
 * @template T - 源对象类型，必须是键值对对象
 * @param valueRef - 父组件传入的模型引用
 * @returns 一个函数，用于设置对象的属性值
 */
export function useDefineObjectModuleProxy<T extends Record<string, any>>(valueRef: ModelRef<T>) {
    return <K extends keyof T>(key: K, value: T[K], deep = false) => {
        const rawValue = toRaw(valueRef.value);
        const currentValue = deep ? _cloneDeep(rawValue) : { ...rawValue };

        const result = _set(currentValue, key, value);
        if (typeof result !== "undefined") {
            valueRef.value = result;
        }
    };
}

/**
 * 定义一个对象模型的计算属性，用于处理复杂对象的双向绑定
 * @template T - 源对象类型，必须是键值对对象
 * @param valueRef - 父组件传入的模型引用
 * @returns 一个函数，用于设置对象的属性值
 */
export function useDefineObjectModuleCustomProxy<T extends Record<string, any>>(valueRef: ModelRef<T>) {
    return (handler: (value: T) => T, deep = false) => {
        const rawValue = toRaw(valueRef.value);
        const currentValue = deep ? _cloneDeep(rawValue) : { ...rawValue };

        const result = handler(currentValue);

        if (typeof result !== "undefined") {
            valueRef.value = result;
        }
    };
}
