<!--
 * @Description: 提示组
 * @Author: F-Stone
 * @LastEditTime: 2025-02-24 16:58:27
-->
<template>
    <div :class="$style['editor-tip-group']" :data-type="type" class="flex">
        <div :class="$style['editor-group-inner']" class="grid">
            <div v-for="(item, index) in tips" :key="index" :class="$style['editor-tip']" v-html="item"></div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import type { UeElTipGroupBaseProps } from "./index";

interface Props extends UeElTipGroupBaseProps {}

defineOptions({ name: "UeElTipGroup" });
withDefaults(defineProps<Props>(), { type: "normal" });
</script>
<style lang="scss" module>
.editor-tip-group {
    font-size: 12px;

    padding: 0 var(--editor-components-padding);
    .editor-group-inner {
        gap: var(--ue-control-col-space);
    }
    &[data-type="warn"] {
        &::before {
            line-height: inherit;

            margin-right: 0.5em;

            content: "*";

            color: color(var(--ue-color--error));
        }
    }
    [data-ue-tip-color="red"] {
        color: rgba(var(--ue-color--error), 1);
    }
    [data-ue-tip-color="blue"] {
        color: rgba(var(--ue-color--blue), 1);
    }
}
</style>
