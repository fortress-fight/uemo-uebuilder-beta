<!--
 * @Description: 网格单元编辑面板
 * @Author: F-Stone
 * @LastEditTime: 2025-06-29 03:19:26
-->
<template>
    <UeElEditorPanel :title="t('UNIT_GRID_ITEM')">
        <UeElTabCard v-bind="tabCardProps">
            <template #Layout>
                <LayoutPanel v-model:value="valueModel" />
            </template>
            <template #Design>
                <DesignPanel v-model:value="valueModel" />
            </template>
        </UeElTabCard>
    </UeElEditorPanel>
</template>
<script lang="ts" setup>
import type { UeEditorPanelTiptapGridItemBaseProps } from "./index";

import LayoutPanel from "./sub-components/LayoutPanel.vue";
import DesignPanel from "./sub-components/DesignPanel.vue";

defineOptions({ name: "UeEditorPanelTiptapGridItem" });
const _props = withDefaults(defineProps<UeEditorPanelTiptapGridItemBaseProps>(), {});
const valueModel = defineModel<UE_TIPTAP_EXTENSION.GridItem["attrs"]>("value", { required: true });

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
.tiptap-grid-item {
    //
}
</style>
