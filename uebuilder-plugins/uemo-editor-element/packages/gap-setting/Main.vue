<!--
 * @Description: 间隔设置
 * @Author: F-Stone
 * @LastEditTime: 2025-03-01 03:00:41
-->
<template>
    <div :class="$style['gap-setting']" :data-disable="disable" class="grid" :data-col-2="dir === 'xy'">
        <UeElNumberInput
            v-if="dir === 'x' || dir === 'xy'"
            v-model:value="x"
            v-bind="xInputParam"
            :label="t('GAP_SETTING_X')"
        />
        <UeElNumberInput
            v-if="dir === 'y' || dir === 'xy'"
            v-model:value="y"
            v-bind="yInputParam"
            :label="t('GAP_SETTING_Y')"
        />
    </div>
</template>
<script lang="ts" setup>
import type { UeElGapSettingBaseProps } from "./index";

const { t } = useI18n();

defineOptions({ name: "UeElGapSetting" });
const prop = withDefaults(defineProps<UeElGapSettingBaseProps>(), {
    disable: false,
    dir: "xy",
    defaultValue: "0",
    xLimit: () => ({ "%": [0, 30], px: [0, 500] }),
    xUnits: () => [
        { value: "px", text: "px", default: 20 },
        { value: "%", text: "%", default: 5 },
    ],
    yLimit: () => ({ px: [0, 500] }),
    yUnits: () => [{ value: "px", text: "px" }],
});
const valueRef = defineModel<string>("value", { required: false });

// #region padding 数值解析

const useValue = computed(() => valueRef.value || prop.defaultValue);

const gap = computed(() => {
    const arr = useValue.value.split(/\s+/);
    return arr.length === 2 ? [arr[0], arr[1]] : [arr[0], arr[0]];
});

const x = computed({
    get: () => gap.value[1],
    set(value) {
        changeGap([gap.value[0], value]);
    },
});

const xInputParam = computed<UE_EL_COMPONENT.UeElNumberInputProps>(() => ({
    limit: prop.xLimit,
    units: prop.xUnits,
    title: { icon: { name: "icon-fenlanjianju", size: 15 } },
    paddingSize: "level2",
}));

const y = computed({
    get: () => gap.value[0],
    set(value) {
        changeGap([value, gap.value[1]]);
    },
});

const yInputParam = computed<UE_EL_COMPONENT.UeElNumberInputProps>(() => ({
    limit: prop.yLimit,
    units: prop.yUnits,
    title: { icon: { name: "icon-fenglangzongjianju", size: 15 } },
    paddingSize: "level2",
}));

// #endregion

function changeGap(value: string[]) {
    if (prop.disable) return;

    const result = value.map((item) => (item === "0px" ? "0" : item));
    if (result[0] === result[1]) {
        valueRef.value = result[0];
    } else {
        const isEmpty = !result.some((item) => item != "0");
        valueRef.value = isEmpty ? "0" : result.join(" ");
    }
}
</script>
<style lang="scss" module>
.gap-setting {
    gap: var(--ue-editor-row-space--lv1);
    grid-template-columns: 1fr;
    &[data-disable="true"] {
        pointer-events: none;

        opacity: 0.5;
    }
    &[data-col-2] {
        grid-template-columns: 1fr 1fr;
    }
}
</style>
