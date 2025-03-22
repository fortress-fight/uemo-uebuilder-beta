import type { ModelRef } from "vue";

import { _isEqual } from "@stone/uemo-editor-utils/lib/lodash";

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
}

/**
 * 创建一个模型变化检测器，用于处理组件间的双向绑定
 * @template T - 模型值的类型
 * @param valueRef - 父组件传入的模型引用
 * @param options - 配置选项
 * @returns 包含本地值引用和控制方法的对象
 */
export function detectModelChangeOrigin<T>(valueRef: ModelRef<T>, options: DetectModelChangeOptions<T>) {
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
        /** 重置本地值为父组件值 */
        reset: () => (localValueRef.value = valueRef.value),
        /** 同步本地值到父组件 */
        syncToParent: () => (valueRef.value = localValueRef.value),
        /** 判断本地值是否有未同步的改变 */
        checkHasUnsyncedChanges: () => !equalityFn(toRaw(valueRef.value), toRaw(localValueRef.value)),
    };
}
