<!--
 * @Description: 按钮图标属性控制
 * @Author: F-Stone
 * @LastEditTime: 2025-03-19 14:12:00
-->
<template>
    <UeElEditorGroup :class="$style['button-icon-setting']">
        <UeElControlGroup :col-count="3">
            <UeElButton
                v-bind="item"
                v-for="(item, index) in iconTypeButtons"
                :class="$style['oper-btn']"
                :key="index"
                :theme="selectedIconType === item.value ? 'fillText' : 'strokeText'"
                @trigger="handleIconTypeSelect(item.value)"
            />
        </UeElControlGroup>
        <UeElControlGroup :col-count="1">
            <UeElResourceSetting v-if="selectedIconType === 'static'" type="icon" v-model:value="iconInfo" />
            <UeElResourceSetting
                v-if="selectedIconType === 'lottie'"
                type="lottie"
                v-model:value="lottieInfo"
                :library-attrs="{ type: 'icon' }"
            />
            <UeElResourceSetting v-if="selectedIconType === 'svg'" type="svg" v-model:value="svgInfo" />
        </UeElControlGroup>
        <UeElControlGroup
            :col-count="2"
            :title="t('BUTTON_ICON_ATTR')"
            v-if="localValueRef?.source && currentSourceType === selectedIconType"
        >
            <UeElNumberInput v-bind="iconSizeInputParam" v-model:value="iconSize" />
            <UeElNumberInput v-bind="iconSpaceInputParam" v-model:value="iconSpace" />
            <UeElCheckBox
                v-if="selectedIconType === 'svg'"
                :text="t('BUTTON_ICON_ATTR_FOLLOW_TEXT')"
                v-model:value="iconColorIsCurrentColor"
            />
        </UeElControlGroup>
    </UeElEditorGroup>
</template>

<script lang="ts" setup>
import type { UeElButtonIconSettingBaseProps, UeElButtonIconSettingType, UeElButtonIconSettingValue } from "./index";

import { detectModelChangeOrigin } from "@stone/uemo-editor-element/utils/model-mixin";

defineOptions({ name: "UeElButtonIconSetting" });

const { t } = useI18n();

const _props = withDefaults(defineProps<UeElButtonIconSettingBaseProps>(), {});

/**
 * 使用 defineModel 创建双向绑定的值
 */
const valueRef = defineModel<UeElButtonIconSettingValue>("value", {
    required: false,
});

/**
 * 本地状态引用，用于处理值的更新
 */
const { localValueRef } = detectModelChangeOrigin<UeElButtonIconSettingValue | undefined>(valueRef, {
    equalityFn: (a, b) => a?.source === b?.source,
    onParentChange: (local, parent) => {
        if (local?.source !== parent?.source) {
            selectedIconType.value = getSourceIconType(parent?.source) || "static";
        }
    },
});

/**
 * 获取资源类型
 */
function getSourceIconType(source?: string) {
    if (!source) return undefined;

    if (source.endsWith(".lottie")) return "lottie";
    if (source.endsWith(".svg")) return "svg";
    if (source.endsWith(".js")) return "static";
    return undefined;
}

/**
 * 计算当前资源类型
 */
const currentSourceType = computed(() => {
    return getSourceIconType(localValueRef.value?.source);
});

/**
 * 选中的图标类型
 */
const selectedIconType = ref<UeElButtonIconSettingType>(currentSourceType.value || "static");

/**
 * 图标类型按钮列表
 */
const iconTypeButtons = computed(
    () =>
        [
            {
                size: "small-y",
                text: "Icon",
                icon: { name: "icon-app-icon", size: 16 },
                value: "static",
            },
            {
                size: "small-y",
                text: "Lottie",
                icon: { name: "icon-app-lottie", size: 16 },
                value: "lottie",
            },
            {
                size: "small-y",
                text: "SVG",
                icon: { name: "icon-app-svg", size: 16 },
                value: "svg",
            },
        ] as const
);

/**
 * 处理图标类型选择
 * @param type - 选中的图标类型
 */
function handleIconTypeSelect(type: UeElButtonIconSettingType) {
    selectedIconType.value = type;
}

/**
 * 图标尺寸输入参数
 */
const iconSizeInputParam = computed<UE_EL_COMPONENT.UeElNumberInputProps>(() => {
    const isLottie = localValueRef.value?.source.endsWith(".lottie");
    const isSvg = localValueRef.value?.source.endsWith(".svg");

    return {
        limit: { em: [1, 3] },
        units: [{ value: "em", text: "em" }],
        title: { text: t("UNIT_SIZE") },
        step: 0.1,
        default: {
            num: isLottie || isSvg ? 1.5 : 1,
            unit: "em",
        },
    };
});

/**
 * 图标间距输入参数
 */
const iconSpaceInputParam = computed<UE_EL_COMPONENT.UeElNumberInputProps>(() => ({
    limit: { em: [0.1, 3] },
    units: [{ value: "em", text: "em" }],
    title: { text: t("UNIT_SPACE") },
    step: 0.1,
    default: { num: 0.5, unit: "em" },
}));

/**
 * 图标信息计算属性
 */
const iconInfo = computed<UE_EL_UTIL.ResourceIconAttrs | undefined>({
    get: () => {
        if (localValueRef.value && currentSourceType.value === "static") {
            const { source, name } = localValueRef.value;
            if (source && name) {
                return { source, name };
            }
        }
        return undefined;
    },
    set: (value) => changeValue(value),
});

/**
 * Lottie 信息计算属性
 */
const lottieInfo = computed<string | undefined>({
    get: () => {
        if (localValueRef.value && currentSourceType.value === "lottie") {
            return localValueRef.value?.source;
        }
        return undefined;
    },
    set: (value) => changeValue(value ? { source: value } : undefined),
});

/**
 * SVG 信息计算属性
 */
const svgInfo = computed<UE_EL_UTIL.ResourceSvgAttrs | undefined>({
    get: () => {
        if (localValueRef.value && currentSourceType.value === "svg") {
            return { source: localValueRef.value?.source };
        }
        return undefined;
    },
    set: (value) => changeValue(value ? { source: value?.source } : undefined),
});

/**
 * 图标颜色是否跟随文字颜色
 */
const iconColorIsCurrentColor = computed<boolean>({
    get: () => localValueRef.value?.color === "currentColor",
    set: (value) => {
        if (!localValueRef.value) return false;
        changeValue({ color: value ? "currentColor" : undefined });
    },
});

/**
 * 图标尺寸计算属性
 */
const iconSize = computed<string | undefined>({
    get: () => localValueRef.value?.size,
    set: (value) => {
        if (!localValueRef.value?.source) return;
        changeValue({ size: value });
    },
});

/**
 * 图标间距计算属性
 */
const iconSpace = computed<string | undefined>({
    get: () => localValueRef.value?.space,
    set: (value) => {
        if (!localValueRef.value?.source) return;
        changeValue({ space: value });
    },
});

/**
 * 更新值的统一处理函数
 * @param value - 要更新的值
 */
function changeValue(value: undefined | Partial<UeElButtonIconSettingValue>) {
    if (!value) {
        localValueRef.value = undefined;
        return;
    }

    const source = value?.source || localValueRef.value?.source;
    if (!source) {
        localValueRef.value = undefined;
        return;
    }

    localValueRef.value = {
        ...localValueRef.value,
        source,
        name: selectedIconType.value === "static" ? localValueRef.value?.name : undefined,
        color: selectedIconType.value === "svg" ? localValueRef.value?.color : undefined,
        ...value,
    };
}
</script>

<style lang="scss" module>
.button-icon-setting {
    padding-top: 0 !important;
    padding-bottom: 0 !important;

    border-bottom: 0 !important;
}
</style>
