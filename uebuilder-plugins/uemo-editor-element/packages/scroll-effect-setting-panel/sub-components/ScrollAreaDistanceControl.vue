<template>
    <UeElSettingGroup v-bind="settingGroup" @trigger="handleTrigger">
        <template #body v-if="isActive">
            <UeElControlGroup v-if="isActive" :col-count="triggerMode !== 'enter-leaver' ? 2 : 1">
                <UeElNumberInput v-bind="inputParam" v-model:value="startPosDis" :title="{ text: t('UNIT_START') }" />
                <UeElNumberInput
                    v-if="triggerMode !== 'enter-leaver'"
                    v-bind="inputParam"
                    v-model:value="endPosDis"
                    :title="{ text: t('UNIT_END') }"
                />
            </UeElControlGroup>
        </template>
    </UeElSettingGroup>
</template>
<script lang="ts" setup>
import { useDefineObjectModel } from "@stone/uemo-editor-element/utils/model-mixin";

type TYPE_SCROLL_POS_DIS = { startPosDis?: string; endPosDis?: string };

const { t } = useI18n();

const _props = defineProps<{ triggerMode?: string }>();
const valueRef = defineModel<TYPE_SCROLL_POS_DIS>("value", { required: true });

const isActive = computed(() => {
    return !!(valueRef.value.startPosDis || valueRef.value.endPosDis);
});

const settingGroup = computed<UE_EL_COMPONENT.UeElSettingGroupProps>(() => {
    return {
        title: t("SCROLL_AREA_DISTANCE_SETTING_TITLE_OFFSET"),
        oper: !isActive.value ? [{ id: "add", type: "add" }] : [{ id: "remove", type: "remove" }],
    };
});

const inputParam = ref<UE_EL_COMPONENT.UeElNumberInputProps>({
    limit: { px: [-200, 200], vh: [-40, 40], "%": [-100, 100] },
    units: [
        { value: "px", text: "px", default: 0 },
        { value: "%", text: "%", default: 0 },
        { value: "vh", text: "vh", default: 0 },
    ],
    required: true,
});

function handleTrigger(id: string) {
    switch (id) {
        case "add":
            valueRef.value = { startPosDis: "0", endPosDis: "0" };
            break;

        case "remove":
            valueRef.value = {};
            break;

        default:
            break;
    }
}

const startPosDis = useDefineObjectModel(valueRef, {
    get(modelValue) {
        return modelValue.startPosDis || "0";
    },
    set(value, modelValue) {
        modelValue.startPosDis = value;
        return modelValue;
    },
});
const endPosDis = useDefineObjectModel(valueRef, {
    get(modelValue) {
        return modelValue.endPosDis || "0";
    },
    set(value, modelValue) {
        modelValue.endPosDis = value;
        return modelValue;
    },
});
</script>
<style lang="scss" module>
//
</style>
