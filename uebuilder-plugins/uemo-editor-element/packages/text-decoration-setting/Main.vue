<!--
 * @Description: 文字装饰效果控制组件
 * @Author: F-Stone
 * @LastEditTime: 2025-03-22 01:20:35
-->
<template>
    <UeElEditorPanel :class="$style['text-decoration-setting']" :title="t('TEXT_DECORATION_TITLE')">
        <!-- 文字样式资源设置 -->
        <UeElSettingGroup is-first>
            <template #body>
                <UeElResourceSetting type="textDecoration" :removable="false" v-model:value="valueRef.svgName" />
            </template>
        </UeElSettingGroup>

        <!-- 描边设置 -->
        <UeElSettingGroup :title="t('UNIT_STROKE')">
            <template #body>
                <UeElControlGroup :col-count="2">
                    <UeElNumberInput v-model:value="width" v-bind="widthInputProps" />
                    <UeElSelect v-model:value="pointer" v-bind="pointerSelectProps" />
                </UeElControlGroup>
            </template>
        </UeElSettingGroup>

        <!-- 颜色设置 -->
        <UeElColorSettingGroup v-model:value="color" :title="t('UNIT_MAIN_COLOR')" :enableOper="false" />

        <!-- 动画设置 -->
        <UeElSettingGroup v-bind="animateSettingGroup" is-last @trigger="handleTrigger">
            <template #body v-if="animate">
                <UeElControlGroup :col-count="2">
                    <UeElNumberInput v-model:value="duration" v-bind="durationInputProps" />
                    <UeElNumberInput v-model:value="delay" v-bind="delayInputProps" />
                </UeElControlGroup>
                <UeElSelect v-model:value="ease" :title="t('UNIT_EASE')" :options="easeOptions" />
                <UeElButton
                    size="normal"
                    :text="t('UNIT_PREVIEW')"
                    theme="strokeText"
                    :icon="{ name: 'icon-app-play', size: 16 }"
                    :class="$style['oper-btn']"
                    @trigger="togglePreview"
                />
            </template>
        </UeElSettingGroup>
    </UeElEditorPanel>
</template>

<script lang="ts" setup>
import type { UeElTextDecorationSettingBaseProps, UeElTextDecorationSettingValue } from "./index";

defineOptions({ name: "UeElTextDecorationSetting" });

/**
 * 组件配置常量
 */
const DEFAULT_COLOR = "#333";
const DEFAULT_WIDTH = "0.1em";
const DEFAULT_DURATION = "1s";
const DEFAULT_DELAY = "0s";
const DEFAULT_EASE = "power4.out";

/**
 * 组件状态和工具函数
 */
const { t } = useI18n();
const _props = withDefaults(defineProps<UeElTextDecorationSettingBaseProps>(), {});
const valueRef = defineModel<UeElTextDecorationSettingValue>("value", { required: true });

/**
 * 输入控件配置
 */
const widthInputProps = computed<UE_EL_COMPONENT.UeElNumberInputProps>(() => ({
    units: [{ value: "em", text: "em", default: 1 }],
    limit: { em: [0.01, 1.5] },
    title: { text: t("UNIT_WIDTH") },
    hideUnit: true,
    step: 0.01,
    show: {
        input(value) {
            return `${value.num}em`;
        },
    },
}));

const pointerSelectProps = computed<UE_EL_COMPONENT.UeElSelectProps>(() => ({
    title: t("UNIT_POINTER"),
    options: [
        { value: "", text: t("UNIT_RADIUS") },
        { value: "square", text: t("UNIT_SQUARE") },
    ],
}));

const durationInputProps: UE_EL_COMPONENT.UeElNumberInputProps = {
    units: [{ value: "s", text: "s", default: 1 }],
    limit: { s: [0.5, 5] },
    title: { text: t("UNIT_DURATION") },
    hideUnit: true,
    step: 0.1,
    show: {
        input(value) {
            return `${value.num}s`;
        },
    },
};

const delayInputProps: UE_EL_COMPONENT.UeElNumberInputProps = {
    units: [{ value: "s", text: "s", default: 0 }],
    limit: { s: [0, 5] },
    title: { text: t("UNIT_DELAY") },
    hideUnit: true,
    step: 0.1,
    show: {
        input(value) {
            return `${value.num}s`;
        },
    },
};

/**
 * 动画选项
 */
const easeOptions = computed<UE_EL_COMPONENT.UeElSelectProps["options"]>(() => [
    { value: "power4.out", text: t("UNIT_EASE_OUT_IN") },
    { value: "power4.in", text: t("UNIT_EASE_IN_OUT") },
]);

/**
 * 设置组
 */
const animateSettingGroup = computed<UE_EL_COMPONENT.UeElSettingGroupProps>(() => {
    return {
        title: t("UNIT_ANIMATION"),
        oper: !animate.value ? [{ id: "add", type: "add" }] : [{ id: "remove", type: "remove" }],
    };
});

/**
 * 计算属性
 */
const color = computed({
    get() {
        return valueRef.value.color || DEFAULT_COLOR;
    },
    set(value) {
        valueRef.value.color = value;
    },
});

const width = computed({
    get() {
        return valueRef.value.width || DEFAULT_WIDTH;
    },
    set(value) {
        valueRef.value.width = value;
    },
});

const pointer = computed({
    get() {
        return valueRef.value.pointer || "";
    },
    set(value) {
        valueRef.value.pointer = value;
    },
});

const duration = computed({
    get() {
        return valueRef.value.duration || DEFAULT_DURATION;
    },
    set(value) {
        valueRef.value.duration = value;
    },
});

const delay = computed({
    get() {
        return valueRef.value.delay || DEFAULT_DELAY;
    },
    set(value) {
        valueRef.value.delay = value;
    },
});

const ease = computed({
    get() {
        return valueRef.value.ease || DEFAULT_EASE;
    },
    set(value) {
        valueRef.value.ease = value;
    },
});

const animate = computed({
    get() {
        return valueRef.value.animate || false;
    },
    set(value) {
        valueRef.value.animate = value;
    },
});
/**
 * 方法
 */
function handleTrigger(type: string) {
    switch (type) {
        case "add":
            valueRef.value.animate = true;
            break;

        case "remove":
            valueRef.value.animate = false;
            break;

        default:
            break;
    }
}

const togglePreview = () => {
    valueRef.value.preview = !valueRef.value.preview;
};
</script>

<style lang="scss" module>
.text-decoration-setting {
    .oper-btn {
        width: 100%;
    }
}
</style>
