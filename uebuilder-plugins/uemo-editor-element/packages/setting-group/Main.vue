<!--
 * @Description: 控制器组容器
 * @Author: F-Stone
 * @LastEditTime: 2025-03-03 02:19:50
-->
<template>
    <div :class="$style['editor-collapse-group']" class="relative" :data-disable="disable" :data-active="!!$slots.body">
        <div :class="$style['group-head']" class="flex justify-between items-center">
            <div :class="$style['group-title']">
                <span :class="$style['text']">{{ title }}</span>
            </div>
            <div :class="$style['oper-group']" class="grid grid-flow-col-dense gap-1">
                <slot name="oper">
                    <template v-for="(item, index) in oper" :key="index">
                        <UeElButton
                            v-if="item.type === 'add'"
                            theme="squareIcon"
                            :class="$style['oper-btn']"
                            :icon="{ name: 'icon-tianjia', size: 15 }"
                            @trigger="emit('trigger', item.id, 'add')"
                        />
                        <UeElButton
                            v-if="item.type === 'remove'"
                            theme="squareIcon"
                            :class="$style['oper-btn']"
                            :icon="{ name: 'icon-shanchu', size: 16 }"
                            @trigger="emit('trigger', item.id, 'remove')"
                        />
                        <UeElOnOff
                            v-if="item.type === 'onOff' && item.param"
                            v-bind="item.param"
                            :class="$style['oper-btn']"
                            :value="item.value"
                            @update:value="emit('trigger', item.id, $event)"
                        />
                        <UeElSelect
                            v-if="item.type === 'addSelect' && item.param.options.length > 0"
                            v-bind="item.param"
                            :class="$style['oper-btn']"
                            @update:value="emit('trigger', item.id, $event)"
                        >
                            <template #info>
                                <UeElButton theme="squareIcon" :icon="{ name: 'icon-tianjia', size: 15 }" />
                            </template>
                        </UeElSelect>
                    </template>
                </slot>
            </div>
        </div>
        <div v-if="$slots.body" :class="$style['group-body']" class="grid">
            <slot name="body"></slot>
        </div>
    </div>
</template>
<script lang="ts" setup>
import type { UeElSettingGroupBaseProps } from "./index";

defineOptions({ name: "UeElSettingGroup" });
const _prop = withDefaults(defineProps<UeElSettingGroupBaseProps>(), {
    disable: false,
});
const emit = defineEmits<{ (e: "trigger", id: string, value: any): void }>();
</script>
<style lang="scss" module>
.editor-collapse-group {
    width: 100%;

    background-color: #fff;
    &[data-disable="true"] {
        .group-body {
            pointer-events: none;

            opacity: 0.5;
        }
    }
    &[data-active="true"] {
        .group-head {
            color: color(var(--ue-font-color--deeper));
        }
    }
    &::after {
        position: absolute;
        bottom: 0;
        left: 0;

        width: 100%;

        content: "";

        border-bottom: 1px solid color(var(--ue-border-color));
    }
    // &:hover {
    //     .oper-group {
    //         pointer-events: all;

    //         opacity: 1;
    //     }
    // }
}
.group-head {
    height: 40px;
    padding: 0 var(--ue-editor-row-space--lv2);

    color: color(var(--ue-font-color));
}
.group-title {
    font-size: 12px;
    line-height: 28px;

    padding: 0 var(--ue-editor-row-space--lv1);
}
.group-body {
    padding: 0 var(--ue-editor-row-space--lv2) 12px;

    gap: var(--ue-control-col-space);
}
.oper-btn {
    --ue-el-btn-font-color: color(var(--ue-font-color--deeper));
}
</style>
