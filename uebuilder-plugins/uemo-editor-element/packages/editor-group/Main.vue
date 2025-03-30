<!--
 * @Description: 通用编辑器容器
 * @Author: F-Stone
 * @LastEditTime: 2025-03-21 12:10:29
-->
<template>
    <div
        :class="[$style['editor-group'], { [$style['is-first']]: isFirst, [$style['is-last']]: isLast }]"
        ref="rootDomRef"
    >
        <div :class="$style['group-body']" class="grid">
            <slot></slot>
        </div>
    </div>
</template>
<script lang="ts" setup>
import type { UeElEditorGroupBaseProps } from "./index";

import { getPopPanelParams } from "../pop-panel/utils/helper";
import { editorGroupPopPanelPropsKey } from "./index";

defineOptions({ name: "UeElEditorGroup" });
const _prop = withDefaults(defineProps<UeElEditorGroupBaseProps>(), {});

/**
 * 组件引用
 */
const rootDomRef = useTemplateRef("rootDomRef");

/**
 * 弹窗面板配置
 * @description 配置资源选择弹窗的位置和行为
 */
const popPanelProps = computed<UE_EL_COMPONENT.UeElPopPanelProps | undefined>(() => {
    if (!rootDomRef.value) return undefined;

    return getPopPanelParams("editorPanel", rootDomRef.value);
});

provide(editorGroupPopPanelPropsKey, popPanelProps);
</script>
<style lang="scss" module>
.editor-group {
    flex: 0 0 auto;

    width: 100%;
    min-width: 0;
    padding: var(--ue-editor-row-space--lv3) var(--ue-editor-row-space--lv2);

    border-bottom: 1px solid color(var(--ue-border-color));
    &.is-first {
        padding-top: 0;
    }
    &.is-last {
        padding-bottom: 0;

        border-bottom: 0;
    }
}
.group-body {
    gap: var(--ue-control-col-space);
}
</style>
