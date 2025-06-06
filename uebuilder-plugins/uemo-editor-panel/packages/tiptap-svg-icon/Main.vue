<!--
 * @Description: Tiptap SvgIcon 操作面板
 * @Author: F-Stone
 * @LastEditTime: 2025-06-06 15:18:03
-->
<template>
    <UeElEditorPanel :title="t('UNIT_ICON')">
        <UeElTabCard v-bind="tabCardProps">
            <template #Content>
                <ContentPanel v-model:value="valueModel" />
            </template>
            <template #Design>
                <DesignPanel v-model:value="valueModel" />
            </template>
        </UeElTabCard>
    </UeElEditorPanel>
</template>
<script lang="ts" setup>
import type { UeEditorPanelTiptapSvgIconBaseProps } from "./index";

import ContentPanel from "./sub-components/ContentPanel.vue";
import DesignPanel from "./sub-components/DesignPanel.vue";

defineOptions({ name: "UeEditorPanelTiptapSvgIcon" });

const { t } = useI18n();
const _props = withDefaults(defineProps<UeEditorPanelTiptapSvgIconBaseProps>(), {});

const valueModel = defineModel<UE_TIPTAP_EXTENSION.SvgIcon["attrs"]>("value", { required: true });

const tabCardProps = computed<UE_EL_COMPONENT.UeElTabCardProps>(() => {
    return {
        defaultCard: "Content",
        cards: [
            { title: t("UNIT_CONTENT"), name: "Content" },
            { title: t("UNIT_DESIGN"), name: "Design" },
        ],
    };
});
</script>
<style lang="scss" module>
.tiptap-svg-icon {
    //
}
</style>
