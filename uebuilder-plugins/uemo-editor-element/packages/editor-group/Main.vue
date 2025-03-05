<!--
 * @Description: 通用编辑器容器
 * @Author: F-Stone
 * @LastEditTime: 2025-03-04 18:29:57
-->
<template>
    <div :class="$style['editor-group']">
        <div :class="$style['group-body']" class="grid">
            <slot></slot>
        </div>
    </div>
</template>
<script lang="ts" setup>
import type { UeElEditorGroupBaseProps } from "./index";

defineOptions({ name: "UeElEditorGroup" });
const _prop = withDefaults(defineProps<UeElEditorGroupBaseProps>(), {});
</script>
<style lang="scss" module>
.editor-group {
    flex: 0 0 auto;

    width: 100%;
    min-width: 0;
    padding: var(--ue-editor-row-space--lv3) var(--ue-editor-row-space--lv2);

    border-bottom: 1px solid color(var(--ue-border-color));
}
.group-body {
    gap: var(--ue-control-col-space);
}
</style>
