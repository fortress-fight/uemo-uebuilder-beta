<!--
 * @Description: 社交分享项编辑面板
 * @Author: F-Stone
 * @LastEditTime: 2025-07-03 02:39:39
-->
<template>
    <UeElEditorPanel :class="$style['tiptap-share-item']" :title="t('UNIT_SHARE_ITEM')">
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
import type { UeEditorPanelTiptapShareItemBaseProps } from "./index";

import ContentPanel from "./sub-components/ContentPanel.vue";
import DesignPanel from "./sub-components/DesignPanel.vue";

defineOptions({ name: "UeEditorPanelTiptapShareItem" });

const { t } = useI18n();
const _props = withDefaults(defineProps<UeEditorPanelTiptapShareItemBaseProps>(), {});

const valueModel = defineModel<UE_TIPTAP_EXTENSION.ShareItem["attrs"]>("value", { required: true });

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
.tiptap-share-item {
    //
}
</style>
