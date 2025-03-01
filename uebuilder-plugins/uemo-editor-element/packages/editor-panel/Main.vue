<!--
 * @Description: 通用编辑面板
 * @Author: F-Stone
 * @LastEditTime: 2025-03-02 00:53:10
-->
<template>
    <div :class="$style['editor-panel']" class="relative">
        <div :class="$style['panel-wrapper']" class="grid" :style="{ '--ue-el-editor-panel-max-height': maxHeight }">
            <div :class="$style['panel-head']" class="flex" :data-dragger-target="withDragger">
                <div :class="$style['head-inner']" class="relative w-full flex justify-center items-center">
                    <slot name="title">
                        <div class="flex items-center justify-center">
                            <span>{{ title }}</span>
                            <div v-if="tag" :class="$style['tag']">
                                <span>{{ tag }}</span>
                            </div>
                        </div>
                    </slot>
                    <button
                        v-if="withClose"
                        :class="$style['btn--close']"
                        class="absolute z-10"
                        :data-dragger-disable="withDragger"
                        @click="emit('close')"
                    >
                        <UeElIcon class="relative z-10" :size="16" name="icon-remove" />
                    </button>
                </div>
            </div>
            <div :class="$style['panel-body']" class="overflow-auto">
                <slot></slot>
            </div>
            <div v-if="withOperate" :class="$style['panel-footer']">
                <slot name="panelFooter">
                    <div
                        v-if="operateName === 'confirmWithCancel'"
                        :class="$style['operate-group']"
                        class="grid grid-cols-2"
                    >
                        <button data-theme="cancel" :class="$style['operate-btn']" @click="emit('cancel')">
                            {{ t("CANCEL") }}
                        </button>
                        <button data-theme="confirm" :class="$style['operate-btn']" @click="emit('confirm')">
                            {{ t("CONFIRM") }}
                        </button>
                    </div>
                    <div v-if="operateName === 'confirm'" :class="$style['operate-group']">
                        <button
                            data-theme="confirm"
                            :class="$style['operate-btn']"
                            class="w-full"
                            @click="emit('confirm')"
                        >
                            {{ confirm.text }}
                        </button>
                    </div>
                </slot>
            </div>
        </div>
        <slot name="panelCover"></slot>
    </div>
</template>
<script lang="ts" setup>
import type { UeElEditorPanelBaseProps } from "./index";

defineOptions({ name: "UeElEditorPanel" });

const { t } = useI18n();
const _prop = withDefaults(defineProps<UeElEditorPanelBaseProps>(), {
    title: "",
    withClose: false,
    withDragger: true,
    maxHeight: "80vh",
    confirm: () => ({ text: "确认" }),
});
const emit = defineEmits<{ (e: "close" | "confirm" | "cancel"): void }>();
</script>

<style lang="scss" module>
.editor-panel {
    font-size: 14px;
    line-height: em(20px, 14px);

    overflow: hidden;

    width: var(--ue-panel-width);
    min-width: var(--ue-panel-width);

    border-radius: var(--ue-border-radius--panel);
    background-color: #fff;
    box-shadow: var(--ue-shadow--lv2);
}
.panel-wrapper {
    --ue-el-tab-panel-max-height: calc(var(--ue-el-editor-panel-max-height) - 110px);
    height: 100%;
    max-height: var(--ue-el-editor-panel-max-height);

    grid-template-rows: auto 1fr auto;
}
.panel-head {
    line-height: 28px;

    min-height: 49px;
    padding: 0 16px;
    padding-top: 3px;

    color: color(var(--ue-font-color--deeper));
    &[data-dragger-target] {
        @include dragger-cursor;
    }
    .head-inner {
        // min-height: 49px;
    }
    .tag {
        margin-left: 2px;
        padding: 0 10px;

        transform: scale(0.8);

        border-radius: var(--ue-border-radius--lv1);
        background-color: color(var(--ue-background-color));
    }
    .btn--close {
        font-size: 16px;

        top: 0;
        right: 0;
        bottom: 0;

        margin: auto;

        color: color(var(--ue-font-color));
        &::after {
            @include square(28px);
            @include move-center;
            content: "";

            border-radius: var(--ue-border-radius--lv1);
        }
        &:hover {
            color: color(var(--ue-font-color--deeper));
            &::after {
                background: color(var(--ue-color--gray));
            }
        }
    }
}
.panel-body {
    padding-bottom: 20px;
}
.panel-footer {
    .operate-btn {
        font-size: 12px;
        line-height: 40px;
        &[data-theme="confirm"] {
            color: #fff;
            background-color: color(var(--ue-color--blue));
        }
        &[data-theme="cancel"] {
            background-color: color(var(--ue-color--gray));
        }
    }
}
</style>
