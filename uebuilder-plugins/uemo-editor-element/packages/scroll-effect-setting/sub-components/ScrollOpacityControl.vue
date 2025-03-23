<template>
    <UeElSettingGroup v-bind="settingGroup" @trigger="handleTrigger">
        <template #body v-if="isActive">
            <UeElControlGroup v-if="isActive" :col-count="triggerMode !== 'enter-leaver' ? 2 : 1">
                <UeElNumberInput v-bind="inputParam" v-model:value="start" :title="{ text: '起始' }" />
                <UeElNumberInput
                    v-if="triggerMode !== 'enter-leaver'"
                    v-bind="inputParam"
                    v-model:value="end"
                    :title="{ text: '结束' }"
                />
            </UeElControlGroup>
        </template>
    </UeElSettingGroup>
</template>
<script lang="ts" setup>
import { useDefineObjectModel } from "@stone/uemo-editor-element/utils/model-mixin";

type TYPE_OPACITY_VALUE = { opacityStart?: string; opacityEnd?: string };

const _props = defineProps<{ triggerMode?: string }>();
const valueRef = defineModel<TYPE_OPACITY_VALUE>("value", { required: true });

const isActive = computed(() => {
    return !!(valueRef.value.opacityStart || valueRef.value.opacityEnd);
});

const settingGroup = computed<UE_EL_COMPONENT.UeElSettingGroupProps>(() => {
    return {
        title: "透明过渡",
        oper: !isActive.value ? [{ id: "add", type: "add" }] : [{ id: "remove", type: "remove" }],
    };
});

const inputParam = ref<UE_EL_COMPONENT.UeElNumberInputProps>({
    limit: [0, 1],
    step: 0.01,
    required: true,
    hideUnit: true,
});

function handleTrigger(id: string) {
    switch (id) {
        case "add":
            valueRef.value = { opacityStart: "0", opacityEnd: "1" };
            break;

        case "remove":
            valueRef.value = {};
            break;

        default:
            break;
    }
}

const start = useDefineObjectModel(valueRef, {
    get(modelValue) {
        return modelValue.opacityStart || "0";
    },
    set(value, modelValue) {
        modelValue.opacityStart = value;
        return modelValue;
    },
});

const end = useDefineObjectModel(valueRef, {
    get(modelValue) {
        return modelValue.opacityEnd || "1";
    },
    set(value, modelValue) {
        modelValue.opacityEnd = value;
        return modelValue;
    },
});
</script>
<style lang="scss" module>
//
</style>
