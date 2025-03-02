<!--
 * @Description: 投影控制器
 * @Author: F-Stone
 * @LastEditTime: 2025-03-03 00:06:35
-->
<template>
    <div :class="$style['box-shadow-setting']" :data-disable="disable">
        <UeElControlGroup v-bind="onOffParam" :col-count="2" @onOffChange="toggleShowDetail">
            <UeElColorSetting v-model:value="color" :class="$style['color-input']" />
            <template v-if="showDetail">
                <UeElNumberInput v-bind="xInputParam" v-model:value="x" />
                <UeElNumberInput v-bind="blurInputParam" v-model:value="blur" />
                <UeElNumberInput v-bind="yInputParam" v-model:value="y" />
                <UeElNumberInput v-bind="spreadInputParam" v-model:value="spread" />
            </template>
        </UeElControlGroup>
    </div>
</template>
<script lang="ts" setup>
import type { UeElBoxShadowSettingBaseProps } from "./index";

import { _isEqual } from "@stone/uemo-editor-utils/lib/lodash";
import { parseShadowValue, getShadowParam } from "./utils/helper";

const { t } = useI18n();

defineOptions({ name: "UeElBoxShadowSetting" });
const prop = withDefaults(defineProps<UeElBoxShadowSettingBaseProps>(), {
    disable: false,
    defaultValue: "0 4px 4px 0 rgba(0,0,0,25%)",
});
const valueRef = defineModel<string>("value", { required: false });

const useValue = computed(() => {
    return valueRef.value || prop.defaultValue;
});

const shadowParam = computed(() => {
    let paramArr = getShadowParam(useValue.value);
    if (!paramArr || paramArr.length < 4) {
        paramArr = getShadowParam(prop.defaultValue)!;
    }
    return parseShadowValue(paramArr);
});

const showDetail = ref<boolean>(true);
const onOffParam = computed<UE_EL_COMPONENT.UeElControlGroupProps>(() => ({
    operType: "onOff",
    onOffParam: {
        disable: false,
        label: t("BOX_SHADOW_SETTING_INDEPENDENT"),
        value: showDetail.value,
        icon: "icon-touying",
    },
}));

function toggleShowDetail(value: any) {
    showDetail.value = value;
}

// #region padding 数值解析

const color = computed({
    get: () => shadowParam.value.color,
    set(value) {
        changeShadow({ ...shadowParam.value, color: value });
    },
});

const xInputParam = computed<UE_EL_COMPONENT.UeElNumberInputProps>(() => ({
    label: t("BOX_SHADOW_SETTING_X"),
    title: { text: t("UNIT_X") },
    units: [{ text: "px", value: "px" }],
    hideUnit: true,
    show: {
        input: (value) => (value?.num || "0") + "px",
    },
}));

const x = computed({
    get() {
        return shadowParam.value.x;
    },
    set(value) {
        changeShadow({ ...shadowParam.value, x: value });
    },
});

const yInputParam = computed<UE_EL_COMPONENT.UeElNumberInputProps>(() => ({
    title: { text: t("UNIT_Y") },
    label: t("BOX_SHADOW_SETTING_Y"),
    units: [{ text: "px", value: "px" }],
    hideUnit: true,
    show: {
        input: (value) => (value?.num || "0") + "px",
    },
}));

const y = computed({
    get() {
        return shadowParam.value.y;
    },
    set(value) {
        changeShadow({ ...shadowParam.value, y: value });
    },
});

const blurInputParam = computed<UE_EL_COMPONENT.UeElNumberInputProps>(() => ({
    limit: [0, Infinity],
    title: { text: t("UNIT_BLUR") },
    label: t("BOX_SHADOW_SETTING_BLUR"),
    units: [{ text: "px", value: "px" }],
    hideUnit: true,
    show: {
        input: (value) => (value?.num || "0") + "px",
    },
}));

const blur = computed({
    get() {
        return shadowParam.value.blur;
    },
    set(value) {
        changeShadow({ ...shadowParam.value, blur: value });
    },
});

const spreadInputParam = computed<UE_EL_COMPONENT.UeElNumberInputProps>(() => ({
    title: { text: t("UNIT_SPREAD") },
    label: t("BOX_SHADOW_SETTING_SPREAD"),
    units: [{ text: "px", value: "px" }],
    hideUnit: true,
    show: {
        input: (value) => (value?.num || "0") + "px",
    },
}));

const spread = computed({
    get() {
        return shadowParam.value.spread;
    },
    set(value) {
        changeShadow({ ...shadowParam.value, spread: value });
    },
});

//#endregion

function changeShadow(param: typeof shadowParam.value) {
    if (!param) {
        valueRef.value = "";
        return;
    }
    valueRef.value = `${param.x} ${param.y} ${param.blur} ${param.spread} ${param.color}`;
}

/**
 * 更新详情是否开启
 */
function updateDetailOpen() {
    const valueArr = getShadowParam(useValue.value);
    const defaultValueArr = getShadowParam(prop.defaultValue);
    if (!defaultValueArr) {
        showDetail.value = true;
        return;
    }
    if (!valueArr) {
        showDetail.value = false;
        return;
    }

    const valueParam = parseShadowValue(valueArr);
    const defaultValueParam = parseShadowValue(defaultValueArr);
    if (_isEqual(valueParam, defaultValueParam)) {
        showDetail.value = false;
    } else {
        showDetail.value = true;
    }
}

onBeforeMount(() => {
    updateDetailOpen();
});
</script>
<style lang="scss" module>
.box-shadow-setting {
    &[data-disable="true"] {
        pointer-events: none;

        opacity: 0.5;
    }
}
.input-group {
    gap: var(--ue-control-col-space) var(--ue-control-row-space);
}
.color-input {
    grid-area: 1 / 1 / 2 / 3;
}
</style>
