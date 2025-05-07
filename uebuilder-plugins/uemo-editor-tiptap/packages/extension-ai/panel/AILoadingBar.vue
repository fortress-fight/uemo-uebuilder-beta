<!--
 * @Description: AI 加载进度条组件
 * @Author: F-Stone
 * @Module: TipTap AI Extension
 * @Component: AILoadingBar
 * @Features:
 *   - 进度条动画
 *   - 加载状态显示
 *   - 可取消操作
-->

<template>
    <div :class="$style['ai-loading-bar']" class="flex">
        <div :class="$style['progress-bar']">
            <div ref="progressInner" :class="$style['progress-bar--inner']"></div>
        </div>
        <div :class="$style['loading-bar']" class="flex justify-between items-center">
            <div :class="$style['left-area']" class="flex gap-5">
                <UeElIcon :class="$style['ic']" name="icon-editor-ai" />
                <span :class="$style['text']">{{ t("AI_EDITING_TITLE") }}</span>
            </div>
            <div :class="$style['right-area']" class="flex gap-5 items-center">
                <button :class="$style['btn--cancel']" @click="handleCancel">{{ t("AI_EDITING_CANCEL") }}</button>
                <UeElIcon :class="[$style['ic'], $style['loading-ic']]" name="icon-app-loading" />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { gsap } from "@stone/uemo-editor-utils/lib/gsap";

const emit = defineEmits<{ (e: "cancel"): void }>();

const progressInner = useTemplateRef("progressInner");
const progressAnimation = ref<gsap.core.Tween | null>(null);

const { t } = useI18n();

/**
 * 启动进度条动画
 */
const startProgressAnimation = () => {
    if (!progressInner.value) return;
    progressAnimation.value = gsap.to(progressInner.value, {
        width: "98%",
        ease: "power2.out",
        duration: 20,
    });
};

/**
 * 停止进度条动画
 */
const stopProgressAnimation = () => {
    if (progressAnimation.value) {
        progressAnimation.value.kill();
        progressAnimation.value = null;
    }
};

/**
 * 处理取消操作
 */
const handleCancel = () => {
    stopProgressAnimation();
    emit("cancel");
};

// 生命周期钩子
onMounted(() => {
    startProgressAnimation();
});

onBeforeUnmount(() => {
    stopProgressAnimation();
});
</script>

<style lang="scss" module>
@keyframes rotate {
    0% {
        transform: rotate(0deg);
    }
    50% {
        transform: rotate(180deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
.ai-loading-bar {
    font-size: 13px;
    line-height: 1.4;

    position: relative;

    overflow: hidden;

    white-space: nowrap;

    color: color(var(--ue-font-color--deeper));
    border-radius: var(--ue-border-radius--lv1);
    background-color: #fff;
    box-shadow: var(--ue-tiptap-shadow);
    .loading-bar {
        position: relative;
        z-index: 10;

        width: 520px;
        height: 42px;
        padding: 7px 20px;

        color: color(var(--ue-font-color));
        .ic {
            color: color(var(--ue-font-color--deeper));
        }
        .loading-ic {
            animation: rotate 2s infinite linear;
        }
    }
    .progress-bar {
        @include ab-cover;
        .progress-bar--inner {
            width: 0%;
            height: 100%;

            background-color: color(var(--ue-tiptap-background-color));
        }
    }
    .btn--cancel {
        font-size: 12px;
        line-height: 12px;

        padding: 8px 10px;

        transition: 0.26s ease;

        color: color(var(--ue-font-color));
        border: 1px solid color(var(--ue-border-color));
        border-radius: var(--ue-border-radius--lv1);
        &:hover {
            color: #fff;
            border-color: color(var(--ue-background-color--deeper));
            background-color: color(var(--ue-background-color--deeper));
        }
    }
}
</style>
