<!--
 * @Description: 拖拽组件
 * @Author: F-Stone
 * @LastEditTime: 2025-03-25 12:20:54
-->
<template>
    <VueDraggable
        v-model="valueRef"
        :class="$style['sort-list']"
        :animation="150"
        :data-disable="value.length <= 1"
        :ghost-class="$style['sort-item--ghost']"
        :drag-class="$style['sort-item--drag']"
        :data-dragging="dragging"
        :disabled="value.length <= 1"
        :fallback-on-body="true"
        :target="target"
        class="grid"
        @start="dragging = true"
        @end="dragging = false"
    >
        <slot :sort-item-class="$style['sort-item']" :dragging="dragging" :dragger-class="$style['dragger-btn']"></slot>
    </VueDraggable>
</template>
<script lang="ts" setup>
import type { UeElDraggableBaseProps } from "./index";

import { VueDraggable } from "vue-draggable-plus";

defineOptions({ name: "UeElDraggable" });
const _prop = withDefaults(defineProps<UeElDraggableBaseProps>(), {});
const valueRef = defineModel<any>("value", { required: false });
const dragging = ref<boolean>(false);
</script>
<style lang="scss" module>
.sort-list {
    gap: var(--ue-control-col-space);
    &[data-disable] {
        .dragger-btn {
            opacity: 0 !important;
        }
    }
    &[data-dragging] {
        .sort-item * {
            pointer-events: none;
        }
        .dragger-btn {
            opacity: 0 !important;
        }
    }
}
.sort-item--ghost {
    opacity: 0.5;
}
.sort-item--drag {
    opacity: 1 !important;
    border-radius: var(--ue-border-radius--lv1);
    background-color: #fff;
    box-shadow: var(--ue-shadow--lv1) !important;
    .dragger-btn {
        opacity: 0 !important;
    }
}
.sort-item {
    position: relative;
    &:hover {
        .dragger-btn {
            opacity: 1;
        }
    }
    .dragger-btn {
        position: absolute;
        z-index: var(--ue-z-index--mini);
        top: -0;
        left: -7px;

        height: 100%;

        cursor: grab;
        transform: scale(0.7);

        opacity: 0;
        color: color(var(--ue-font-color));
        background-color: #fff;
        &:hover {
            color: color(var(--ue-font-color--deeper));
        }
    }
}
</style>
