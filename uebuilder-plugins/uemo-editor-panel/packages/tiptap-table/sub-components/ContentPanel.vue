<template>
    <UeElWidthSettingGroup :title="t('UNIT_MIN_WIDTH')" v-bind="widthInputProps" v-model:value="width" />

    <UeElSettingGroup :title="t('TABLE_CELL_WIDTH')">
        <template #body>
            <UeElControlGroup>
                <UeElButton
                    size="normal"
                    :text="t('TABLE_RESET_CELL_WIDTH')"
                    theme="strokeText"
                    :class="$style['oper-btn']"
                    @trigger="emit('fire', { type: 'resetCellWidth' })"
                />
            </UeElControlGroup>
        </template>
    </UeElSettingGroup>

    <UeElSettingGroup :title="t('UNIT_COLOR')">
        <template #body>
            <UeElColorSetting v-model:value="borderColor" type="color" />
        </template>
    </UeElSettingGroup>

    <UeElSettingGroup :title="t('TABLE_BORDER')">
        <template #body>
            <UeElControlGroup>
                <UeElCheckBox v-model:value="showBorder" :text="t('TABLE_BORDER_TIP')" />
            </UeElControlGroup>
        </template>
    </UeElSettingGroup>

    <!-- 提示信息 -->
    <UeElSettingGroup :title="t('UNIT_TIP')">
        <template #body>
            <UeElTipGroup :tips="[t('TABLE_TIP_1')]" />
        </template>
    </UeElSettingGroup>
</template>
<script lang="ts" setup>
import { useDefineObjectModel } from "@stone/uemo-editor-element/utils/model-mixin";

const emit = defineEmits<{ (e: "fire", data: { type: "resetCellWidth" }): void }>();
const valueModel = defineModel<UE_TIPTAP_EXTENSION.Table["attrs"]>("value", { required: true });

const { t } = useI18n();

const widthInputProps = computed<UE_EL_COMPONENT.UeElWidthSettingGroupProps>(() => ({
    numberInputProps: {
        limit: { px: [100, Infinity] },
        units: [{ value: "px", text: "px", default: 100 }],
    },
}));

const width = useDefineObjectModel(valueModel, {
    get: (modelValue) => modelValue.minWidth,
    set: (value, modelValue) => {
        modelValue.minWidth = value;
        return modelValue;
    },
});

const borderColor = useDefineObjectModel(valueModel, {
    get: (modelValue) => modelValue.tableBorderColor || "#ced4da",
    set: (value, modelValue) => {
        modelValue.tableBorderColor = value;
        return modelValue;
    },
});

const showBorder = useDefineObjectModel(valueModel, {
    get: (modelValue) => modelValue.tableBorder,
    set: (value, modelValue) => {
        modelValue.tableBorder = value;
        return modelValue;
    },
});
</script>
<style lang="scss" module>
.tiptap-table-content-panel {
    // init
}
</style>
