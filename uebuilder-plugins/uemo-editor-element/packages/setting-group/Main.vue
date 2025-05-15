<!--
 * @Description: 控制器组容器
 * @Author: F-Stone
 * @LastEditTime: 2025-05-15 11:39:01
-->
<template>
    <div
        :class="[
            $style['editor-setting-group'],
            { [$style['is-first']]: isFirst, [$style['is-last']]: isLast, [$style['is-sub']]: isSub },
        ]"
        class="relative"
        :data-disable="disable"
        :data-active="!!slots.default"
        :data-header-exists="!!title"
        ref="rootDomRef"
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
                            @trigger="emit('trigger', item.id, $event)"
                        >
                            <template #info>
                                <UeElButton theme="squareIcon" :icon="{ name: 'icon-tianjia', size: 15 }" />
                            </template>
                        </UeElSelect>
                    </template>
                </slot>
            </div>
        </div>
        <div v-if="slots.default" :class="$style['group-body']" class="grid">
            <slot />
        </div>
    </div>
</template>
<script lang="ts" setup>
import type { UeElSettingGroupBaseProps } from "./index";

import { getPopPanelParams } from "../pop-panel/utils/helper";
import { settingGroupPopPanelPropsKey } from "./index";

defineOptions({ name: "UeElSettingGroup" });
const props = withDefaults(defineProps<UeElSettingGroupBaseProps>(), {
    disable: false,
});
const emit = defineEmits<{ (e: "trigger", id: string, value: any): void }>();

/**
 * 组件引用
 */
const rootDomRef = useTemplateRef("rootDomRef");

const slots = defineSlots<{ default?(): any; oper?(): any }>();

/**
 * 弹窗面板配置
 * @description 配置资源选择弹窗的位置和行为
 */
const popPanelProps = computed<UE_EL_COMPONENT.UeElPopPanelProps | undefined>(() => {
    if (!rootDomRef.value) return undefined;

    return getPopPanelParams("editorPanel", rootDomRef.value);
});

const injectSettingGroupPopPanelProps = inject(settingGroupPopPanelPropsKey, undefined);

provide(settingGroupPopPanelPropsKey, props.isSub ? injectSettingGroupPopPanelProps : popPanelProps);
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
            padding-bottom: var(--ue-control-col-space);

            color: color(var(--ue-font-color--deeper));
        }
    }
    &[data-header-exists="false"] {
        .group-body {
            padding: var(--ue-editor-row-space--lv3) var(--ue-editor-row-space--lv2);
        }
    }
    &:nth-of-type(1) {
        .group-head {
            padding-top: 0;
        }
        &[data-header-exists="false"] {
            .group-body {
                padding-top: 0;
            }
        }
    }
    &:nth-last-of-type(1) {
        .group-body {
            // padding-bottom: 0;
        }
        &::after {
            // display: none;
        }
    }
    // &.is-first {
    //     .group-head {
    //         padding-top: 0;
    //     }
    //     &[data-header-exists="false"] {
    //         .group-body {
    //             padding-top: 0;
    //         }
    //     }
    // }
    // &.is-last {
    //     .group-body {
    //         // padding-bottom: 0;
    //     }
    //     &::after {
    //         // display: none;
    //     }
    // }
    &.is-sub {
        .group-body {
            padding: 0;
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
    padding: var(--ue-editor-row-space--lv1) var(--ue-editor-row-space--lv1);

    color: color(var(--ue-font-color));
}
.group-title {
    font-size: 12px;
    font-weight: bold;
    line-height: 28px;

    padding: 0 var(--ue-editor-row-space--lv1);
}
.group-body {
    padding: 0 var(--ue-editor-row-space--lv1) var(--ue-editor-row-space--lv3);

    gap: var(--ue-control-col-space);
}
.oper-btn {
    --ue-el-btn-font-color: color(var(--ue-font-color--deeper));
}
</style>
