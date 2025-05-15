<!--
 * @Description: 文字装饰效果控制组件
 * @Author: F-Stone
 * @LastEditTime: 2025-05-15 11:14:10
-->
<template>
    <UeElEditorPanel :class="$style['text-decoration-setting-panel']" :title="t('TEXT_DECORATION_TITLE')">
        <!-- 文字样式资源设置 -->
        <UeElSettingGroup is-first>
            <UeElResourceSetting type="textDecoration" v-model:value="svgName" />
        </UeElSettingGroup>

        <!-- 描边设置 -->
        <UeElSettingGroup :title="t('UNIT_STROKE')">
            <UeElControlGroup :col-count="2">
                <UeElNumberInput v-model:value="width" v-bind="widthInputProps" />
                <UeElSelect v-model:value="pointer" v-bind="pointerSelectProps" />
            </UeElControlGroup>
        </UeElSettingGroup>

        <!-- 颜色设置 -->
        <UeElColorSettingGroup v-model:value="color" :title="t('UNIT_MAIN_COLOR')" :enableOper="false" />

        <!-- 动画设置 -->
        <UeElSettingGroup v-bind="animateSettingGroup" is-last @trigger="handleTrigger">
            <template v-if="animate">
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
                    @trigger="emit('preview')"
                />
            </template>
        </UeElSettingGroup>
    </UeElEditorPanel>
</template>

<script lang="ts" setup>
import type { UeElTextDecorationSettingPanelBaseProps, UeElTextDecorationSettingPanelValue } from "./index";

import { useDefineObjectModel } from "@stone/uemo-editor-element/utils/model-mixin";

defineOptions({ name: "UeElTextDecorationSettingPanel" });

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
const _props = withDefaults(defineProps<UeElTextDecorationSettingPanelBaseProps>(), {});
const valueRef = defineModel<UeElTextDecorationSettingPanelValue>("value", { required: true });
const emit = defineEmits<{ (e: "preview"): void }>();

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

const svgName = useDefineObjectModel(valueRef, {
    get(modelValue) {
        return modelValue.svgName || "";
    },
    set(value, modelValue) {
        modelValue.svgName = value;
        return modelValue;
    },
});

const color = useDefineObjectModel(valueRef, {
    get(modelValue) {
        return modelValue.color || DEFAULT_COLOR;
    },
    set(value, modelValue) {
        modelValue.color = value;
        return modelValue;
    },
});

const width = useDefineObjectModel(valueRef, {
    get(modelValue) {
        return modelValue.width || DEFAULT_WIDTH;
    },
    set(value, modelValue) {
        modelValue.width = value;
        return modelValue;
    },
});

const pointer = useDefineObjectModel(valueRef, {
    get(modelValue) {
        return modelValue.pointer || "";
    },
    set(value, modelValue) {
        modelValue.pointer = value;
        return modelValue;
    },
});

const duration = useDefineObjectModel(valueRef, {
    get(modelValue) {
        return modelValue.duration || DEFAULT_DURATION;
    },
    set(value, modelValue) {
        modelValue.duration = value;
        return modelValue;
    },
});

const delay = useDefineObjectModel(valueRef, {
    get(modelValue) {
        return modelValue.delay || DEFAULT_DELAY;
    },
    set(value, modelValue) {
        modelValue.delay = value;
        return modelValue;
    },
});

const ease = useDefineObjectModel(valueRef, {
    get(modelValue) {
        return modelValue.ease || DEFAULT_EASE;
    },
    set(value, modelValue) {
        modelValue.ease = value;
        return modelValue;
    },
});

const animate = useDefineObjectModel(valueRef, {
    get(modelValue) {
        return modelValue.animate || false;
    },
    set(value, modelValue) {
        modelValue.animate = value;
        return modelValue;
    },
});
/**
 * 方法
 */
function handleTrigger(type: string) {
    switch (type) {
        case "add":
            animate.value = true;
            break;

        case "remove":
            animate.value = false;
            break;

        default:
            break;
    }
}
</script>

<style lang="scss" module>
.text-decoration-setting-panel {
    .oper-btn {
        width: 100%;
    }
}
</style>
