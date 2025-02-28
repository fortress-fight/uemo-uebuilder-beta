<!--
 * @Description: 外间距控制器
 * @Author: F-Stone
 * @LastEditTime: 2025-03-01 04:03:02
-->
<template>
    <div :class="$style['margin-setting']" :data-disable="disable">
        <UeElControlGroup v-bind="onOffParam" @onOffChange="toggleMixType">
            <div :class="$style['setting-group']" class="grid" :data-col-2="!isMix || type === 'xy'">
                <template v-if="isMix">
                    <UeElNumberInput
                        v-if="type == 'y' || type == 'xy'"
                        v-bind="inputParam"
                        v-model:value="tb"
                        :title="{ icon: { name: 'icon-shangxianbianju' } }"
                        :label="i18n.t('MARGIN_SETTING_TB')"
                    />
                    <UeElNumberInput
                        v-if="type == 'x' || type == 'xy'"
                        v-bind="inputParam"
                        v-model:value="lr"
                        :title="{ icon: { name: 'icon-zuoyoubianju' } }"
                        :label="i18n.t('MARGIN_SETTING_LR')"
                    />
                </template>
                <template v-else>
                    <UeElNumberInput
                        v-if="type == 'y' || type == 'xy'"
                        v-bind="inputParam"
                        v-model:value="tb"
                        :title="{ icon: { name: 'icon-shangbianju' } }"
                        :label="i18n.t('MARGIN_SETTING_T')"
                    />
                    <UeElNumberInput
                        v-if="type == 'x' || type == 'xy'"
                        v-bind="inputParam"
                        v-model:value="lr"
                        :title="{ icon: { name: 'icon-zuobianju' } }"
                        :label="i18n.t('MARGIN_SETTING_L')"
                    />
                    <UeElNumberInput
                        v-if="type == 'y' || type == 'xy'"
                        v-bind="inputParam"
                        v-model:value="b"
                        :title="{ icon: { name: 'icon-xiabianju' } }"
                        :label="i18n.t('MARGIN_SETTING_B')"
                    />
                    <UeElNumberInput
                        v-if="type == 'x' || type == 'xy'"
                        v-bind="inputParam"
                        v-model:value="r"
                        :title="{ icon: { name: 'icon-youbianju' } }"
                        :label="i18n.t('MARGIN_SETTING_R')"
                    />
                </template>
            </div>
        </UeElControlGroup>
    </div>
</template>
<script lang="ts" setup>
import type { UeElMarginSettingBaseProps } from "./index";

defineOptions({ name: "UeElMarginSetting" });
const prop = withDefaults(defineProps<UeElMarginSettingBaseProps>(), {
    disable: false,
    type: "xy",
    defaultValue: "0",
    limit: () => ({ "%": [0, 100], px: [0, 500] }),
    units: () => [
        { value: "px", text: "px", default: 50 },
        { value: "%", text: "%", default: 20 },
    ],
});

const i18n = useI18n();
const valueRef = defineModel<string>("value", { required: false });

// #region 组件参数

const isMix = ref<boolean>(false);
const onOffParam = computed<UE_EL_COMPONENT.UeElControlGroupProps>(() => ({
    operType: "onOff",
    onOffParam: {
        disable: false,
        label: i18n.t("TOGGLE_INDEPENDENT"),
        reverseStyle: true,
        value: isMix.value,
        icon: "icon-shangxiazuoyoubianju",
    },
}));
const inputParam = computed<UE_EL_COMPONENT.UeElNumberInputProps>(() => ({
    limit: prop.limit,
    units: prop.units,
    paddingSize: "level2",
}));

// #endregion

// #region margin 数值解析

const useValue = computed(() => {
    return valueRef.value || prop.defaultValue;
});

const margin = computed(() => {
    const arr = useValue.value.split(/\s+/);

    if (arr.length === 1) {
        return [arr[0], arr[0], arr[0], arr[0]];
    }
    if (arr.length === 2) {
        return [arr[0], arr[1], arr[0], arr[1]];
    }
    if (arr.length === 3) {
        return [arr[0], arr[1], arr[2], arr[1]];
    }
    if (arr.length === 4) {
        return [arr[0], arr[1], arr[2], arr[3]];
    }
    return [arr[0], arr[0], arr[0], arr[0]];
});

const t = computed({
    get() {
        return margin.value[0];
    },
    set(value) {
        changeMargin([value, margin.value[1], margin.value[2], margin.value[3]]);
    },
});

const r = computed({
    get() {
        return margin.value[1];
    },
    set(value) {
        changeMargin([margin.value[0], value, margin.value[2], margin.value[3]]);
    },
});

const b = computed({
    get() {
        return margin.value[2];
    },
    set(value) {
        changeMargin([margin.value[0], margin.value[1], value, margin.value[3]]);
    },
});

const l = computed({
    get() {
        return margin.value[3];
    },
    set(value) {
        changeMargin([margin.value[0], margin.value[1], margin.value[2], value]);
    },
});

const tb = computed({
    get() {
        return margin.value[0];
    },
    set(value) {
        changeMargin([value, margin.value[1], value, margin.value[3]]);
    },
});

const lr = computed({
    get() {
        return margin.value[1];
    },
    set(value) {
        changeMargin([margin.value[0], value, margin.value[2], value]);
    },
});

// #endregion

function toggleMixType(value: UE_EL_UTIL.OnOffValue) {
    isMix.value = value as boolean;
    changeMargin([t.value, r.value, t.value, r.value]);
}

/**
 * @description 改变外间距
 * @param value 外间距值
 */
function changeMargin(value: string[]) {
    if (prop.disable) return;

    const result = value.map((item) => (item === "0px" ? "0" : item));

    // 四角相等
    if (result[0] === result[1] && result[1] === result[2] && result[2] === result[3]) {
        valueRef.value = result[0];
        return;
    }

    // 上下相等，左右相等
    if (result[0] === result[2] && result[1] === result[3]) {
        valueRef.value = `${result[0]} ${result[1]}`;
        return;
    }

    // 全为0
    const isEmpty = !result.some((item) => item != "0");
    valueRef.value = isEmpty ? "0" : result.join(" ");
}

onBeforeMount(() => {
    // 初始化独立调节状态
    isMix.value = t.value === b.value && r.value === l.value;
});
</script>
<style lang="scss" module>
.margin-setting {
    &[data-disable="true"] {
        pointer-events: none;

        opacity: 0.5;
    }
}
.setting-group {
    display: grid;

    gap: var(--ue-editor-row-space--lv1);
    grid-template-columns: minmax(0, 1fr);
    &[data-col-2="true"] {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
}
</style>
