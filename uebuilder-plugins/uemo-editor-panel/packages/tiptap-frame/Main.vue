<!--
 * @Description: Frame 编辑面板
 * @Author: F-Stone
 * @LastEditTime: 2025-06-07 17:18:37
-->
<template>
    <UeElEditorPanel :title="panelTitle">
        <UeElTabCard v-bind="tabCardProps">
            <template #Content>
                <VideoContentPanel v-if="valueModel.type === 'video'" v-model:value="valueModel" />
                <WebContentPanel v-if="valueModel.type === 'web'" v-model:value="valueModel" />
                <MapContentPanel v-if="valueModel.type === 'map'" v-model:value="valueModel" />
            </template>
            <template #Design>
                <DesignPanel v-model:value="valueModel" />
            </template>
        </UeElTabCard>
    </UeElEditorPanel>
</template>
<script lang="ts" setup>
import type { UeEditorPanelTiptapFrameBaseProps } from "./index";

import VideoContentPanel from "./sub-components/VideoContentPanel.vue";
import WebContentPanel from "./sub-components/WebContentPanel.vue";
import MapContentPanel from "./sub-components/MapContentPanel.vue";
import DesignPanel from "./sub-components/DesignPanel.vue";

defineOptions({ name: "UeEditorPanelTiptapFrame" });
const _props = withDefaults(defineProps<UeEditorPanelTiptapFrameBaseProps>(), {});
const valueModel = defineModel<UE_TIPTAP_EXTENSION.Frame["attrs"]>("value", { required: true });

const { t } = useI18n();

const panelTitle = computed(() => {
    switch (valueModel.value.type) {
        case "video":
            return t("UNIT_VIDEO");

        case "map":
            return t("UNIT_MAP");

        case "web":
            return t("UNIT_WEB");

        default:
            return t("UNIT_FRAME");
    }
});

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
.tiptap-frame {
    //
}
</style>
