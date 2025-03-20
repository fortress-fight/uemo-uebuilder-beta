<!--
 * @Description: 网格布局尺寸调整组件
 * @Author: F-Stone
-->
<template>
    <UeElEditorPanel :class="$style['size-adjust']" :title="t('GRID_LAYOUT_SETTING_ADJUST_SIZE')">
        <UeElEditorGroup :class="[$style['first-group'], $style['last-group']]">
            <UeElControlGroup
                :col-count="sizeType === 'auto' ? 1 : 2"
                :class="$style['grid-layout-setting']"
                :title="t('UNIT_ATTR')"
            >
                <UeElSelect v-model:value="sizeType" class="w-full" :title="t('UNIT_MODE')" :options="typeOptions" />
                <UeElNumberInput
                    v-bind="inputParam"
                    v-model:value="girdSize"
                    v-if="sizeType !== 'auto'"
                    :title="{ icon: { name: 'icon-kuandu' } }"
                    :label="t('UNIT_SIZE')"
                />
            </UeElControlGroup>
        </UeElEditorGroup>
    </UeElEditorPanel>
</template>

<script lang="ts" setup>
const { t } = useI18n();
const props = defineProps<{ size: string }>();
const emit = defineEmits<{ (e: "change", size: string): void }>();

/**
 * 尺寸类型选项
 */
const typeOptions = computed(() => [
    { value: "ratio", text: t("GRID_LAYOUT_SETTING_SIZE_RATIO") },
    { value: "auto", text: t("GRID_LAYOUT_SETTING_SIZE_AUTO") },
    { value: "fixed", text: t("GRID_LAYOUT_SETTING_SIZE_FIXED") },
]);

/**
 * 尺寸类型计算属性
 */
const sizeType = computed({
    get() {
        if (props.size === "auto") return "auto";
        if (props.size.endsWith("px")) return "fixed";
        return "ratio";
    },
    set(val) {
        const sizeMap = { auto: "auto", ratio: "1fr", fixed: "100px" };
        emit("change", sizeMap[val]);
    },
});

/**
 * 网格尺寸计算属性
 */
const girdSize = computed({
    get() {
        return props.size === "auto" ? "0fr" : props.size;
    },
    set(val) {
        emit("change", val);
    },
});

/**
 * 输入框参数计算属性
 */
const inputParam = computed<UE_EL_COMPONENT.UeElNumberInputProps>(() => {
    const isFixed = sizeType.value === "fixed";

    return {
        step: 1,
        limit: isFixed ? [20, 200] : [1, 12],
        required: true,
        show: {
            input(value) {
                if (value.num === 0) return "auto";
                return `${value.num || 1}${isFixed ? "px" : "fr"}`;
            },
        },
    };
});
</script>

<style lang="scss" module>
.size-adjust {
    .first-group {
        padding-top: 0 !important;
    }
    .last-group {
        padding-bottom: 0 !important;

        border-bottom: 0 !important;
    }
}
.size-adjust-item {
    // 样式定义
}
</style>
