<!--
 * @Description: Tiptap表格编辑面板
 * @Author: F-Stone
 * @LastEditTime: 2025-07-04 14:09:49
-->
<template>
    <UeElEditorPanel :title="t('UNIT_TABLE')">
        <UeElTabCard v-bind="tabCardProps">
            <template #Content>
                <ContentPanel v-model:value="valueModel" @fire="emit('fire', $event)" />
            </template>
        </UeElTabCard>
    </UeElEditorPanel>
</template>
<script lang="ts" setup>
import type { UeEditorPanelTiptapTableBaseProps } from "./index";

import ContentPanel from "./sub-components/ContentPanel.vue";

defineOptions({ name: "UeEditorPanelTiptapTable" });
const _props = withDefaults(defineProps<UeEditorPanelTiptapTableBaseProps>(), {});
const { t } = useI18n();

const emit = defineEmits<{ (e: "fire", data: { type: "resetCellWidth" }): void }>();
const valueModel = defineModel<UE_TIPTAP_EXTENSION.Table["attrs"]>("value", { required: true });

const tabCardProps = computed<UE_EL_COMPONENT.UeElTabCardProps>(() => {
    return {
        defaultCard: "Content",
        cards: [{ title: t("UNIT_CONTENT"), name: "Content" }],
    };
});
</script>
<style lang="scss" module>
.tiptap-table {
    //
}
</style>
