<!--
 * @Description: Tiptap计数器编辑面板
 * @Author: F-Stone
 * @LastEditTime: 2025-07-08 02:18:45
-->
<template>
    <UeElEditorPanel :class="$style['tiptap-counter-number']" :title="t('UNIT_CONTENT')">
        <UeElTabCard v-bind="tabCardProps">
            <template #Content>
                <UeElSettingGroup :title="t('UNIT_NUMBER')">
                    <template #body>
                        <UeElControlGroup :colCount="2">
                            <UeElNumberInput
                                v-bind="numberInputParam"
                                :title="{ text: t('UNIT_START') }"
                                v-model:value="startNum"
                            />
                            <UeElNumberInput
                                v-bind="numberInputParam"
                                :title="{ text: t('UNIT_END') }"
                                v-model:value="endNum"
                            />
                            <UeElNumberInput
                                :class="$style['num-pad-input']"
                                v-bind="numberInputParam"
                                :title="{ text: t('COUNTER_NUMBER_PAD') }"
                                v-model:value="numPad"
                            />
                        </UeElControlGroup>
                    </template>
                </UeElSettingGroup>
                <UeElTextSettingGroup :title="t('UNIT_DECORATION')" v-model:value="decoration" defaultValue="K" />
                <UeElTextSettingGroup :title="t('UNIT_DESC')" v-model:value="desc" />
            </template>
        </UeElTabCard>
    </UeElEditorPanel>
</template>
<script lang="ts" setup>
import { useDefineObjectModel } from "@stone/uemo-editor-element/utils/model-mixin";

defineOptions({ name: "UeEditorPanelTiptapCounterNumberContentEditorPanel" });

const valueModel = defineModel<UE_TIPTAP_EXTENSION.CounterNumber["attrs"]["body"][number]>("value", { required: true });

const { t } = useI18n();

const tabCardProps = computed<UE_EL_COMPONENT.UeElTabCardProps>(() => {
    return {
        defaultCard: "Content",
        cards: [{ title: t("UNIT_CONTENT"), name: "Content" }],
    };
});

const numberInputParam = computed<UE_EL_COMPONENT.UeElNumberInputProps>(() => {
    return {
        limit: [0, Infinity],
        required: true,
        hideUnit: true,
    };
});

const startNum = useDefineObjectModel(valueModel, {
    get: (modelValue) => modelValue.numList[0] || 0,
    set: (value, modelValue) => {
        modelValue.numList[0] = value;
        return modelValue;
    },
});

const endNum = useDefineObjectModel(valueModel, {
    get: (modelValue) => modelValue.numList[1] || 0,
    set: (value, modelValue) => {
        modelValue.numList[1] = value;
        return modelValue;
    },
});

const numPad = useDefineObjectModel(valueModel, {
    get: (modelValue) => modelValue.numPad || 0,
    set: (value, modelValue) => {
        modelValue.numPad = value;
        return modelValue;
    },
});

const decoration = useDefineObjectModel(valueModel, {
    get: (modelValue) => modelValue.proxy?.value || "",
    set: (value, modelValue) => {
        modelValue.proxy = { type: "text", value: value || "" };
        return modelValue;
    },
});

const desc = useDefineObjectModel(valueModel, {
    get: (modelValue) => modelValue.desc,
    set: (value, modelValue) => {
        modelValue.desc = value;
        return modelValue;
    },
});
</script>
<style lang="scss" module>
.tiptap-counter-number {
    .num-pad-input {
        grid-column: span 2;
    }
}
</style>
