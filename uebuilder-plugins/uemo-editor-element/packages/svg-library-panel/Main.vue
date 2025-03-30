<!--
 * @Description: SVG库面板
 * @Author: F-Stone
 * @LastEditTime: 2025-03-18 10:52:59
-->
<template>
    <UeElLibraryPanel :cards="libraryPanelParam.cards" :default-card="defaultCardName">
        <template #SvgUpload>
            <UeElFileUploadButton type="svg" @submit="useUpload" />
        </template>
    </UeElLibraryPanel>
</template>
<script lang="ts" setup>
import type { UeElSvgLibraryPanelBaseProps } from "./index";

defineOptions({ name: "UeElSvgLibraryPanel" });

const { t } = useI18n();
const _prop = withDefaults(defineProps<UeElSvgLibraryPanelBaseProps>(), {});
const select = defineModel<UE_EL_UTIL.ResourceSvgAttrs>("select", { required: false });

const libraryPanelParam = computed<UE_EL_COMPONENT.UeElLibraryPanelProps>(() => ({
    cards: [{ title: t("UNIT_UPLOAD"), name: "SvgUpload" }],
}));

const defaultCardName = ref<string>("SvgUpload");

function useUpload(uploadFileInfo: UE_EL_UTIL.FileUploadInfo) {
    select.value = { data: uploadFileInfo.data, source: uploadFileInfo.url };
}
</script>
<style lang="scss" module>
.svg-library-panel {
    //
}
</style>
