<!--
 * @Description: 偏移属性控制器组件
 * @Author: F-Stone
 * @LastEditTime: 2025-03-21 03:36:23
-->
<template>
    <UeElControlGroup :title="t('TRANSLATE_SETTING_TITLE')" :class="$style['translate-setting']" :col-count="2">
        <UeElNumberInput v-bind="translateXInputParam" v-model:value="translateX" :label="t('TRANSLATE_X')" />
        <UeElNumberInput v-bind="translateYInputParam" v-model:value="translateY" :label="t('TRANSLATE_Y')" />
    </UeElControlGroup>
</template>

<script lang="ts" setup>
import type { UeElTranslateSettingBaseProps } from "./index";

defineOptions({ name: "UeElTranslateSetting" });

/**
 * 组件接口定义
 */
interface TranslateValue {
    x: string;
    y: string;
}

/**
 * 组件属性定义
 */
const _props = withDefaults(defineProps<UeElTranslateSettingBaseProps>(), {});

/**
 * 组件数据模型
 */
const valueRef = defineModel<string>("value", { required: false });

/**
 * 国际化
 */
const { t } = useI18n();

/**
 * 基础配置
 */
const DEFAULT_VALUE = "0";
const UNIT_CONFIG: UE_EL_UTIL.NumInputUnit[] = [
    { value: "px", text: "px", default: 200 },
    { value: "%", text: "%", default: 10 },
];

/**
 * 偏移值计算属性
 * @description 处理偏移值的解析和更新
 */
const translate = computed({
    get() {
        if (!valueRef.value) return { x: DEFAULT_VALUE, y: DEFAULT_VALUE };
        const [x = DEFAULT_VALUE, y = DEFAULT_VALUE] = valueRef.value.split(",");
        return { x, y };
    },
    set(value: TranslateValue) {
        valueRef.value = `${value.x},${value.y}`;
    },
});

/**
 * X轴偏移输入参数
 */
const translateXInputParam = computed<UE_EL_COMPONENT.UeElNumberInputProps>(() => ({
    limit: {
        px: [-Infinity, Infinity],
        "%": [-999, 999],
    },
    title: { text: t("UNIT_X") },
    paddingSize: "level1",
    units: UNIT_CONFIG,
}));

/**
 * X轴偏移值计算属性
 */
const translateX = computed({
    get() {
        return translate.value.x;
    },
    set(value: string) {
        translate.value = {
            ...translate.value,
            x: value,
        };
    },
});

/**
 * Y轴偏移输入参数
 */
const translateYInputParam = computed<UE_EL_COMPONENT.UeElNumberInputProps>(() => ({
    limit: {
        px: [-Infinity, Infinity],
        "%": [-999, 999],
    },
    title: { text: t("UNIT_Y") },
    paddingSize: "level1",
    units: UNIT_CONFIG,
}));

/**
 * Y轴偏移值计算属性
 */
const translateY = computed({
    get() {
        return translate.value.y;
    },
    set(value: string) {
        translate.value = {
            ...translate.value,
            y: value,
        };
    },
});
</script>

<style lang="scss" module>
.translate-setting {
    // 预留样式空间，方便后续扩展
}
</style>
