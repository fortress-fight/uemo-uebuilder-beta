<!--
 * @Description: 网格组编辑面板
 * @Author: F-Stone
 * @LastEditTime: 2025-06-30 01:27:11
-->
<template>
    <UeElEditorPanel :title="t('UNIT_GRID_GROUP')">
        <UeElTabCard v-bind="tabCardProps">
            <template #Layout>
                <LayoutPanel v-model:value="valueModel" @fire="emit('fire', $event)" />
            </template>
            <template #Design>
                <DesignPanel v-model:value="valueModel" />
            </template>
        </UeElTabCard>
    </UeElEditorPanel>
</template>
<script lang="ts" setup>
import type { UeEditorPanelTiptapGridGroupBaseProps } from "./index";

import LayoutPanel from "./sub-components/LayoutPanel.vue";
import DesignPanel from "./sub-components/DesignPanel.vue";

defineOptions({ name: "UeEditorPanelTiptapGridGroup" });
const _props = withDefaults(defineProps<UeEditorPanelTiptapGridGroupBaseProps>(), {});
const emit = defineEmits<{
    (
        e: "fire",
        data: {
            type: "remove";
            param: { grid: string; mdGrid: string; list: number[] };
        }
    ): void;
}>();
const valueModel = defineModel<UE_TIPTAP_EXTENSION.GridGroup["attrs"]>("value", { required: true });

const { t } = useI18n();

const tabCardProps = computed<UE_EL_COMPONENT.UeElTabCardProps>(() => {
    return {
        defaultCard: "Layout",
        cards: [
            { title: t("UNIT_LAYOUT"), name: "Layout" },
            { title: t("UNIT_DESIGN"), name: "Design" },
        ],
    };
});
</script>
<style lang="scss" module>
.tiptap-grid-group {
    //
}
</style>
