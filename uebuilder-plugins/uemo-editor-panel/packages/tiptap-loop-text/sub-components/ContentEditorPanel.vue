<!--
 * @Description: Tiptap计数器编辑面板
 * @Author: F-Stone
 * @LastEditTime: 2025-07-09 17:47:28
-->
<template>
    <UeElEditorPanel :class="$style['tiptap-counter-number']" :title="t('UNIT_CONTENT')">
        <UeElTabCard v-bind="tabCardProps">
            <template #Content>
                <UeElTextSettingGroup :title="t('UNIT_TEXT')" v-model:value="title" :disableOper="true" />
            </template>
        </UeElTabCard>
    </UeElEditorPanel>
</template>
<script lang="ts" setup>
import { useDefineObjectModel } from "@stone/uemo-editor-element/utils/model-mixin";

defineOptions({ name: "UeEditorPanelTiptapCounterNumberContentEditorPanel" });

const valueModel = defineModel<UE_TIPTAP_EXTENSION.LoopText["attrs"]["body"][number]>("value", { required: true });

const { t } = useI18n();

const tabCardProps = computed<UE_EL_COMPONENT.UeElTabCardProps>(() => {
    return {
        defaultCard: "Content",
        cards: [{ title: t("UNIT_CONTENT"), name: "Content" }],
    };
});

const title = useDefineObjectModel(valueModel, {
    get: (modelValue) => modelValue.title,
    set: (value, modelValue) => {
        modelValue.title = value;
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
