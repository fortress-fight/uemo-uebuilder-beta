<template>
    <UeElLinkSettingPanel ref="rootDom" :value="value" />
</template>
<script lang="ts" setup>
import type { UeElLinkSettingPanelValue } from "@stone/uemo-editor-element/packages/link-setting-panel";

defineOptions({ name: "UeTiptapLinkPanelMain" });

const rootDom = useTemplateRef("rootDom");

const value = ref<UeElLinkSettingPanelValue>({ type: "link", link: "https://www.baidu.com", target: "_blank" });

defineExpose({
    panel: rootDom,
    linkInputFocus: () => {},
});
</script>
<style lang="scss" module>
.link-panel-main {
    // init
}
</style>
