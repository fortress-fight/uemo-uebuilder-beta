<!--
 * @Description: 圆角控制器
 * @Author: F-Stone
 * @LastEditTime: 2025-03-01 04:42:28
-->
<template>
    <div :class="$style['radius-setting']" :data-disable="disable">
        <UeElControlGroup v-bind="onOffParam" @onOffChange="toggleMixType" :col-count="!isMix ? 2 : 1">
            <template v-if="isMix">
                <UeElNumberInput
                    v-bind="inputParam"
                    v-model:value="all"
                    :title="{ icon: { name: 'icon-tongyiyuanjiao' } }"
                />
            </template>
            <template v-else>
                <UeElNumberInput
                    v-bind="inputParam"
                    v-model:value="tl"
                    :title="{ icon: { name: 'icon-zuoshangyuanjiao' } }"
                />
                <UeElNumberInput
                    v-bind="inputParam"
                    v-model:value="tr"
                    :title="{ icon: { name: 'icon-youshangyuanjiao' } }"
                />
                <UeElNumberInput
                    v-bind="inputParam"
                    v-model:value="bl"
                    :title="{ icon: { name: 'icon-zuoxiayuanjiao' } }"
                />
                <UeElNumberInput
                    v-bind="inputParam"
                    v-model:value="br"
                    :title="{ icon: { name: 'icon-youxiayuanjiao' } }"
                />
            </template>
        </UeElControlGroup>
    </div>
</template>
<script lang="ts" setup>
import type { UeElRadiusSettingBaseProps } from "./index";

defineOptions({ name: "UeElRadiusSetting" });
const prop = withDefaults(defineProps<UeElRadiusSettingBaseProps>(), {
    defaultValue: "0px",
    limit: () => ({ px: [0, Infinity] }),
    units: () => [{ value: "px", text: "px", default: 50 }],
});

const valueRef = defineModel<string>("value", { required: false });

const inputParam = computed<Partial<UE_EL_COMPONENT.UeElNumberInputProps>>(() => ({
    limit: prop.limit,
    units: prop.units,
    paddingSize: "level2",
}));

// #region padding 数值解析

const useValue = computed(() => {
    return valueRef.value ?? prop.defaultValue;
});

const radius = computed(() => {
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

const all = computed({
    get() {
        return radius.value[0];
    },
    set(value) {
        changeRadius([value, value, value, value]);
    },
});

const tl = computed({
    get() {
        return radius.value[0];
    },
    set(value) {
        changeRadius([value, radius.value[1], radius.value[2], radius.value[3]]);
    },
});

const tr = computed({
    get() {
        return radius.value[1];
    },
    set(value) {
        changeRadius([radius.value[0], value, radius.value[2], radius.value[3]]);
    },
});

const br = computed({
    get() {
        return radius.value[2];
    },
    set(value) {
        changeRadius([radius.value[0], radius.value[1], value, radius.value[3]]);
    },
});

const bl = computed({
    get() {
        return radius.value[3];
    },
    set(value) {
        changeRadius([radius.value[0], radius.value[1], radius.value[2], value]);
    },
});

// #endregion

const isMix = ref(true);
const onOffParam = computed<UE_EL_COMPONENT.UeElControlGroupProps>(() => ({
    operType: "onOff",
    onOffParam: {
        disable: false,
        label: "独立调节",
        reverseStyle: true,
        value: isMix.value,
        icon: "icon-duliyuanjiao",
    },
}));
function toggleMixType(value: any) {
    isMix.value = value;
    changeRadius([tl.value, tl.value, tl.value, tl.value]);
}

function changeRadius(value: string[]) {
    if (prop.disable) return;

    const result = value.map((item) => (item === "0" ? "0px" : item));

    if (result[0] === result[1] && result[1] === result[2] && result[2] === result[3]) {
        valueRef.value = result[0];
        return;
    }
    if (result[0] === result[2] && result[1] === result[3]) {
        valueRef.value = `${result[0]} ${result[1]}`;
        return;
    }
    const isEmpty = !result.some((item) => item != "0px");
    valueRef.value = isEmpty ? "0px" : result.join(" ");
}

function updateMixState() {
    isMix.value = tl.value === tr.value && tr.value === br.value && br.value === bl.value;
}

defineExpose({
    updateMixState,
});

onBeforeMount(() => {
    updateMixState();
});
</script>
<style lang="scss" module>
.radius-setting {
    &[data-disable="true"] {
        pointer-events: none;

        opacity: 0.5;
    }
}
.setting-group {
    gap: var(--ue-editor-row-space--lv1);
}
</style>
