<!--
 * @Description: SVG库面板
 * @Author: F-Stone
 * @LastEditTime: 2025-03-09 02:51:12
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
const select = defineModel<string>("select", { required: false });

const libraryPanelParam = computed<UE_EL_COMPONENT.UeElLibraryPanelProps>(() => ({
    cards: [{ title: t("UNIT_UPLOAD"), name: "SvgUpload" }],
}));

const defaultCardName = ref<string>("SvgUpload");

function useUpload(url: UE_EL_UTIL.FileUploadInfo) {
    select.value = url.url;
}
</script>
<style lang="scss" module>
.svg-library-panel {
    //
}
</style>
