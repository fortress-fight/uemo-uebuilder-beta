<!--
 * @Description: 提示组
 * @Author: F-Stone
 * @LastEditTime: 2025-03-13 17:37:22
-->
<template>
    <div>
        <div v-if="title" :class="$style['editor-tip-group-title']">
            <span class="text">{{ title }}</span>
        </div>
        <div class="flex" :class="$style['editor-tip-group']" :data-type="type">
            <div class="grid" :class="$style['editor-group-inner']">
                <div v-for="(item, index) in tips" v-html="item" :class="$style['editor-tip']" :key="index"></div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import type { UeElTipGroupBaseProps } from "./index";

defineOptions({ name: "UeElTipGroup" });
withDefaults(defineProps<UeElTipGroupBaseProps>(), { type: "normal" });
</script>
<style lang="scss" module>
.editor-tip-group-title {
    font-size: 12px;
    font-weight: 600;
    line-height: 28px;

    margin-bottom: 8px;
    padding-left: var(--ue-editor-row-space--lv1);

    color: color(var(--ue-font-color--deeper));
}
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
    a {
        margin: 0 0.5em;

        text-decoration: underline;
    }
    a[data-link-type="tip"] {
        color: color(var(--ue-color--blue), 1);
    }
}
</style>
