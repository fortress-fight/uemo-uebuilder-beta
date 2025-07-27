<template>
    <button class="flex items-center" :class="$style['oper-btn']" :data-theme="theme" @click="emit('trigger')">
        <div :class="$style['icon-box']" class="flex items-center justify-center flex-shrink-0" data-theme="yellow">
            <UeElIcon v-bind="icon" />
        </div>
        <div :class="$style['btn-info']">
            <div :class="$style['btn-title']">
                <span class="text">{{ title }}</span>
            </div>
            <div :class="$style['btn-desc']">
                <span class="text">{{ subtitle }}</span>
            </div>
        </div>
    </button>
</template>
<script lang="ts" setup>
import type { UeElIconBaseProps } from "@stone/uemo-editor-element/packages/icon";

defineOptions({ name: "AppMainOperButton" });

const _props = defineProps<{
    title: string;
    subtitle: string;
    icon: UeElIconBaseProps;
    theme: "yellow" | "blue" | "green";
}>();
const emit = defineEmits<{ (ev: "trigger"): void }>();
</script>
<style lang="scss" module>
.oper-btn {
    --theme-color: #{color(var(--ue-color--yellow))};
    width: 100%;
    padding: 20px 30px;

    border: 1px solid #e6e6e6;
    border-radius: 14px;
    &[data-theme="yellow"] {
        --theme-color: #{color(var(--ue-color--yellow))};
    }
    &[data-theme="blue"] {
        --theme-color: var(--c-blue-60);
    }
    &[data-theme="green"] {
        --theme-color: var(--theme-layout-col);
    }
    &:hover {
        border-color: var(--theme-color);
    }
    .btn-info {
        text-align: left;
    }
    .icon-box {
        @include circle(36px);
        margin-right: 20px;

        color: #fff;
        background-color: var(--theme-color);
    }
    .btn-title {
        font-size: 14px;
        font-weight: 700;
        line-height: 24px;

        color: var(--editor-color-text);
    }
    .btn-desc {
        font-size: 12px;
        font-weight: 400;
        line-height: 15px;

        margin-top: 2px;

        color: var(--editor-c-gray);
    }
}
</style>
