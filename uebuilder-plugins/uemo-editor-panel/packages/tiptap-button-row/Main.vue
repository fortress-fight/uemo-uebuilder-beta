<!--
 * @Description: tiptap 按钮组编辑面板
 * @Author: F-Stone
 * @LastEditTime: 2025-05-07 18:52:31
-->
<template>
    <div :class="$style['tiptap-button-row']">
        <!--  -->
    </div>
</template>
<script lang="ts" setup>
import type { UeEditorPanelTiptapButtonRowBaseProps } from "./index";

defineOptions({ name: "UeEditorPanelTiptapButtonRow" });
const _props = withDefaults(defineProps<UeEditorPanelTiptapButtonRowBaseProps>(), {});
</script>
<style lang="scss" module>
.tiptap-button-row {
    //
}
</style>
