<!--
 * @Description: 按钮图标属性控制
 * @Author: F-Stone
 * @LastEditTime: 2025-03-19 12:26:55
-->
<template>
    <UeElEditorGroup :class="$style['button-icon-setting']">
        <UeElControlGroup :col-count="3">
            <UeElButton
                v-bind="item"
                v-for="(item, index) in IconTypeButton"
                :class="$style['oper-btn']"
                :key="index"
                :theme="selectIconType === item.value ? 'fillText' : 'strokeText'"
                @trigger="selectIconType = item.value"
            />
        </UeElControlGroup>
        <UeElControlGroup :col-count="1">
            <UeElResourceSetting v-if="selectIconType === 'static'" type="icon" v-model:value="iconInfo" />
            <UeElResourceSetting v-if="selectIconType === 'lottie'" type="lottie" v-model:value="lottieInfo" />
            <UeElResourceSetting v-if="selectIconType === 'svg'" type="svg" v-model:value="svgInfo" />
        </UeElControlGroup>
        <UeElControlGroup
            :col-count="2"
            title="图标属性"
            v-if="localValueRef?.source && currentSourceType === selectIconType"
        >
            <UeElNumberInput v-bind="iconSizeInputParam" v-model:value="iconSize" />
            <UeElNumberInput v-bind="iconSpaceInputParam" v-model:value="iconSpace" />
            <UeElCheckBox v-if="selectIconType === 'svg'" text="跟随文字颜色" v-model:value="iconColorIsCurrentColor" />
        </UeElControlGroup>
    </UeElEditorGroup>
</template>
<script lang="ts" setup>
import type { UeElButtonIconSettingBaseProps, UeElButtonIconSettingType, UeElButtonIconSettingValue } from "./index";

defineOptions({ name: "UeElButtonIconSetting" });

const _prop = withDefaults(defineProps<UeElButtonIconSettingBaseProps>(), {});

const valueRef = defineModel<UeElButtonIconSettingValue>("value", {
    required: false,
});

const localValueRef = ref<UeElButtonIconSettingValue | undefined>(valueRef.value);
watch(localValueRef, (localValue) => {
    valueRef.value = localValue;
});
watch(valueRef, (value) => {
    if (value?.source !== localValueRef.value?.source) {
        localValueRef.value = value;
        selectIconType.value = currentSourceType.value || "static";
    } else {
        localValueRef.value = value;
    }
});

const currentSourceType = computed(() => {
    if (localValueRef.value?.source.endsWith(".lottie")) {
        return "lottie";
    }
    if (localValueRef.value?.source.endsWith(".svg")) {
        return "svg";
    }
    if (localValueRef.value?.source.endsWith(".js")) {
        return "static";
    }
    return undefined;
});

const selectIconType = ref<UeElButtonIconSettingType>(currentSourceType.value || "static");
const IconTypeButton = computed(() => {
    return [
        {
            size: "small-y",
            text: "静态",
            icon: { name: "icon-app-icon", size: 16 },
            value: "static",
        },
        {
            size: "small-y",
            text: "动态",
            icon: { name: "icon-app-lottie", size: 16 },
            value: "lottie",
        },
        {
            size: "small-y",
            text: "SVG",
            icon: { name: "icon-app-svg", size: 16 },
            value: "svg",
        },
    ] as const;
});

const iconSizeInputParam = computed<UE_EL_COMPONENT.UeElNumberInputProps>(() => {
    const isLottie = localValueRef.value?.source.endsWith(".lottie");
    const isSvg = localValueRef.value?.source.endsWith(".svg");

    return {
        limit: { em: [1, 3] },
        units: [{ value: "em", text: "em" }],
        title: { text: "尺寸" },
        step: 0.1,
        default: {
            num: isLottie || isSvg ? 1.5 : 1,
            unit: "em",
        },
    };
});

const iconSpaceInputParam = computed<UE_EL_COMPONENT.UeElNumberInputProps>(() => {
    return {
        limit: { em: [0.1, 3] },
        units: [{ value: "em", text: "em" }],
        title: { text: "间隔" },
        step: 0.1,
        default: { num: 0.5, unit: "em" },
    };
});

const iconInfo = computed<UE_EL_UTIL.ResourceIconAttrs | undefined>({
    get: () => {
        if (localValueRef.value && currentSourceType.value === "static") {
            const { source, name } = localValueRef.value;
            if (source && name) {
                return { source, name };
            }
            return undefined;
        }
        return undefined;
    },
    set: (value) => {
        changeValue(value);
    },
});

const lottieInfo = computed<string | undefined>({
    get: () => {
        if (localValueRef.value && currentSourceType.value === "lottie") {
            return localValueRef.value?.source;
        }
        return undefined;
    },
    set: (value) => {
        changeValue(value ? { source: value } : undefined);
    },
});

const svgInfo = computed<UE_EL_UTIL.ResourceSvgAttrs | undefined>({
    get: () => {
        if (localValueRef.value && currentSourceType.value === "svg") {
            return { source: localValueRef.value?.source };
        }
        return undefined;
    },
    set: (value) => {
        changeValue(value ? { source: value?.source } : undefined);
    },
});

const iconColorIsCurrentColor = computed<boolean>({
    get: () => {
        return localValueRef.value?.color === "currentColor";
    },
    set: (value) => {
        if (!localValueRef.value) return false;
        changeValue({ color: value ? "currentColor" : undefined });
    },
});
const iconSize = computed<string | undefined>({
    get: () => {
        return localValueRef.value?.size;
    },
    set: (value) => {
        if (!localValueRef.value?.source) return;
        changeValue({ size: value });
    },
});

const iconSpace = computed<string | undefined>({
    get: () => {
        return localValueRef.value?.space;
    },
    set: (value) => {
        if (!localValueRef.value?.source) return;
        changeValue({ space: value });
    },
});

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
        name: selectIconType.value === "static" ? localValueRef.value?.name : undefined,
        color: selectIconType.value === "svg" ? localValueRef.value?.color : undefined,
        ...value,
    };
}
</script>
<style lang="scss" module>
.button-icon-setting {
    border-bottom: 0 !important;
}
</style>
