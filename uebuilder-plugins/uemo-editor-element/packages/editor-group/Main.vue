<!--
 * @Description: 通用编辑器容器
 * @Author: F-Stone
 * @LastEditTime: 2025-03-01 23:16:37
-->
<template>
    <div :class="$style['editor-group']">
        <div v-if="title" :class="$style['group-head']" class="flex justify-between items-center">
            <span :class="$style['title']">{{ title }}</span>
            <div :class="$style['oper-box']">
                <slot name="oper">
                    <UeElButton
                        v-if="operType === 'add'"
                        theme="squareIcon"
                        :icon="{ name: 'icon-tianjia', size: 15 }"
                        @trigger="emit('add')"
                    />
                    <UeElButton
                        v-else-if="operType === 'remove'"
                        theme="squareIcon"
                        :icon="{ name: 'icon-shanchu', size: 16 }"
                        @trigger="emit('remove')"
                    />
                    <UeElOnOff
                        v-else-if="operType === 'onOff' && onOffParam"
                        v-bind="onOffParam"
                        :class="$style['oper-btn']"
                        @input="emit('onOffChange', $event)"
                    />
                    <UeElSelect
                        v-else-if="operType === 'select' && selectParam?.options?.length"
                        v-bind="selectParam"
                        @input="emit('add', $event)"
                    >
                        <UeElButton theme="squareIcon" :icon="{ name: 'icon-tianjia', size: 15 }" />
                    </UeElSelect>
                </slot>
            </div>
        </div>
        <div :class="$style['group-body']" class="grid">
            <slot></slot>
        </div>
    </div>
</template>
<script lang="ts" setup>
import type { UeElEditorGroupBaseProps } from "./index";

defineOptions({ name: "UeElEditorGroup" });
const _prop = withDefaults(defineProps<UeElEditorGroupBaseProps>(), { operType: "none" });

const emit = defineEmits<{
    (e: "onOffChange", value: UE_EL_UTIL.OnOffValue): void;
    (e: "add" | "remove", value?: string | number): void;
}>();
</script>
<style lang="scss" module>
.editor-group {
    flex: 0 0 auto;

    width: 100%;
    min-width: 0;
    padding: 12px var(--ue-editor-row-space--lv2);

    border-bottom: 1px solid color(var(--ue-border-color));
}
.group-head {
    font-size: 12px;
    font-weight: 600;
    line-height: 28px;

    margin-bottom: 8px;
    padding-left: var(--ue-editor-row-space--lv1);

    color: color(var(--ue-font-color--deeper));
}
.group-body {
    gap: var(--ue-control-col-space);
}
</style>
