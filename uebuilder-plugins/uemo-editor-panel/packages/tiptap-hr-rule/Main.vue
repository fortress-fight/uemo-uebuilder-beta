<!--
 * @Description: 分隔块的编辑面板
 * @Author: F-Stone
 * @LastEditTime: 2025-07-02 02:05:03
-->
<template>
    <UeElEditorPanel :title="t('UNIT_HR_RULE')">
        <UeElTabCard v-bind="tabCardProps" :hide-head="true">
            <template #Layout>
                <LayoutPanel v-model:value="valueModel" />
            </template>
        </UeElTabCard>
    </UeElEditorPanel>
</template>
<script lang="ts" setup>
import type { UeEditorPanelTiptapHrRuleBaseProps } from "./index";

import LayoutPanel from "./sub-components/LayoutPanel.vue";

defineOptions({ name: "UeEditorPanelTiptapHrRule" });
const _props = withDefaults(defineProps<UeEditorPanelTiptapHrRuleBaseProps>(), {});

const valueModel = defineModel<UE_TIPTAP_EXTENSION.HrRule["attrs"]>("value", { required: true });

const { t } = useI18n();

const tabCardProps = computed<UE_EL_COMPONENT.UeElTabCardProps>(() => {
    return {
        defaultCard: "Layout",
        cards: [{ title: t("UNIT_LAYOUT"), name: "Layout" }],
    };
});
</script>
<style lang="scss" module>
.tiptap-hr-rule {
    //
}
</style>
