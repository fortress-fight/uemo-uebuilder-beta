<!--
 * @Description: 分隔块的编辑面板
 * @Author: F-Stone
 * @LastEditTime: 2025-07-02 02:17:52
-->
<template>
    <UeElEditorPanel :title="t('UNIT_DIVIDER_BLOCK')">
        <UeElTabCard v-bind="tabCardProps">
            <template #Layout>
                <LayoutPanel v-model:value="valueModel" />
            </template>
        </UeElTabCard>
    </UeElEditorPanel>
</template>
<script lang="ts" setup>
import type { UeEditorPanelTiptapDividerBlockBaseProps } from "./index";

import LayoutPanel from "./sub-components/LayoutPanel.vue";

defineOptions({ name: "UeEditorPanelTiptapDividerBlock" });
const _props = withDefaults(defineProps<UeEditorPanelTiptapDividerBlockBaseProps>(), {});

const valueModel = defineModel<UE_TIPTAP_EXTENSION.DividerBlock["attrs"]>("value", { required: true });

const { t } = useI18n();

const tabCardProps = computed<UE_EL_COMPONENT.UeElTabCardProps>(() => {
    return {
        defaultCard: "Layout",
        cards: [{ title: t("UNIT_LAYOUT"), name: "Layout" }],
    };
});
</script>
<style lang="scss" module>
.tiptap-divider-block {
    //
}
</style>
