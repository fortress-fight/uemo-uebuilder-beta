<!--
 * @Description: 设置工具条
 * @Author: F-Stone
 * @LastEditTime: 2025-03-01 17:10:53
-->
<template>
    <div
        ref="rootDom"
        :class="$style['setting-group-bar']"
        class="cursor-pointer inline-block min-w-0"
        :data-disable="disable"
        :data-theme="theme"
        v-ue-el-label="label"
        @click="triggerSetting"
    >
        <slot name="info" :infoText="infoText">
            <div :class="$style['select-bar']" class="flex-auto flex">
                <div :class="$style['text-box']" class="flex flex-auto min-w-0">
                    <span v-if="title" :class="$style['title']" class="whitespace-nowrap">
                        {{ title }}
                    </span>
                    <div
                        :class="$style['info']"
                        class="flex-auto flex items-center min-w-0"
                        :data-text-align="infoAlign"
                    >
                        <UeElIcon v-if="iconParam" :class="$style['ic']" v-bind="iconParam" />
                        <span v-if="typeof infoText === 'string'">{{ infoText }}</span>
                        <span v-else :class="$style['placeholder']">{{ placeholder || label }}</span>
                    </div>
                </div>
                <div :class="$style['icon-box']" class="flex items-center justify-center">
                    <UeElIcon name="icon-xiajiantou" :size="15" />
                </div>
            </div>
        </slot>
        <slot />
    </div>
</template>
<script lang="ts" setup>
import type { UeElSettingBarBaseProps } from "./index";

defineOptions({ name: "UeElSettingBar" });
const prop = withDefaults(defineProps<UeElSettingBarBaseProps>(), {});
const emit = defineEmits<{ (e: "triggerSetting"): void }>();

const iconParam = computed(() => {
    if (typeof prop.infoIcon === "string") {
        return { name: prop.infoIcon };
    }
    return prop.infoIcon;
});

function triggerSetting() {
    if (prop.disable) return;
    emit("triggerSetting");
}
</script>
<style lang="scss" module>
.setting-group-bar {
    --ue-component-select-size: 26px;
    display: inline-block;
    &[data-disable="true"] {
        pointer-events: none;
        .select-bar {
            opacity: 0.5;
        }
    }
    &[data-theme="showBorder"] {
        .select-bar {
            --border-color: #{color(var(--ue-border-color), 1)};
            .icon-box {
                opacity: 1;
            }
        }
    }
}
.select-bar {
    --border-color: #{color(var(--ue-border-color), 0)};
    font-size: 12px;
    line-height: 26px;

    padding-left: var(--ue-editor-row-space--lv1);

    cursor: pointer;

    border: 1px solid var(--border-color);
    border-radius: var(--ue-border-radius--lv1);
    background-color: #fff;
    // box-shadow: inset 0 0 0 1px var(--border-color);
    &:hover {
        --border-color: #{color(var(--ue-border-color))};
        .icon-box {
            opacity: 1;
        }
    }
    &:focus-within {
        --border-color: color(var(--ue-color--active));
        .icon-box {
            opacity: 1;
        }
    }
    .title {
        margin-right: 10px;

        color: color(var(--ue-font-color));
    }
    .icon-box {
        @include square(var(--ue-component-select-size));
        font-size: 16px;

        opacity: 0;
        color: color(var(--ue-font-color));
    }
    .info {
        &[data-text-align="right"] {
            justify-content: flex-end;
        }
        .ic {
            margin-right: var(--ue-editor-row-space--lv1);
        }
        .placeholder {
            @include ellipse(1);
            color: color(var(--ue-font-color));
        }
    }
}
</style>
