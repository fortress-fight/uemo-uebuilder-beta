<!--
 * @Description: 控制器组容器
 * @Author: F-Stone
 * @LastEditTime: 2025-03-21 19:38:46
-->
<template>
    <div
        :class="[$style['editor-setting-group'], { [$style['is-first']]: isFirst, [$style['is-last']]: isLast }]"
        class="relative"
        :data-disable="disable"
        :data-active="!!$slots.body"
        :data-header-exists="!!title"
    >
        <div :class="$style['group-head']" class="flex justify-between items-center" v-if="title">
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
.editor-setting-group {
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
    &[data-header-exists="false"] {
        .group-body {
            padding: var(--ue-editor-row-space--lv3) var(--ue-editor-row-space--lv2);
        }
    }
    &.is-first {
        //
    }
    &.is-last {
        .group-body {
            padding-bottom: 0;
        }
        &::after {
            display: none;
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
    font-weight: bold;
    line-height: 28px;

    padding: 0 var(--ue-editor-row-space--lv1);
}
.group-body {
    padding: 0 var(--ue-editor-row-space--lv2) var(--ue-editor-row-space--lv3);

    gap: var(--ue-control-col-space);
}
.oper-btn {
    --ue-el-btn-font-color: color(var(--ue-font-color--deeper));
}
</style>
