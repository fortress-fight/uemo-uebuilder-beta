<!--
 * @Description: 加载Loading
 * @Author: F-Stone
 * @LastEditTime: 2025-02-24 16:33:34
-->
<template>
    <div :class="$style['loading']">
        <div :class="$style['loading-box']">
            <span v-if="message !== false" :class="$style['loading-message']">
                {{ message || i18n.t("LOADING_TIP") }}
            </span>
            <div :class="$style['loading-inner']">
                <div ref="progressInner" :style="{ width: progress + '%' }" :class="$style['bar']"></div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import type { UeElLoadingBaseProps } from "./index";
import { gsap } from "@stone/uemo-editor-utils/lib/gsap";

interface Props extends UeElLoadingBaseProps {}

defineOptions({ name: "UeElLoading" });

const i18n = useI18n();

const prop = withDefaults(defineProps<Props>(), {
    fake: true,
    message: "",
    progress: "0",
    duration: 5,
});

const progressInner = useTemplateRef("progressInner");

let tweenLoading: GSAPTween | null = null;

/**
 * 动画进度条。
 * @function animateProgress
 * @description 使用 gsap 对 progressInner 元素进行动画处理，从 0% 动画到 98%，持续时间为 prop.duration。
 */
function animateProgress() {
    if (progressInner.value && prop.fake) {
        tweenLoading = gsap.fromTo(
            progressInner.value,
            { width: "0%" },
            {
                width: "98%",
                ease: "power2.out",
                duration: prop.duration,
            }
        );
    }
}

/**
 * 组件挂载时的回调。
 * @function onMounted
 * @description 挂载时调用 animateProgress 方法，启动加载动画。
 */
onMounted(() => {
    animateProgress();
});

/**
 * 组件卸载前的回调。
 * @function onBeforeUnmount
 * @description 在组件卸载前，若存在 gsap 动画，则杀掉 progressInner 元素上的所有动画。
 */
onBeforeUnmount(() => {
    if (tweenLoading && progressInner.value && prop.fake) {
        gsap.killTweensOf(progressInner.value);
    }
});

defineExpose({
    reset: () => {
        if (tweenLoading && progressInner.value && prop.fake) {
            gsap.killTweensOf(progressInner.value);
            tweenLoading = null;
            animateProgress();
        }
    },
});
</script>
<style lang="scss" module>
.loading {
    @include ab-cover;
    display: flex;

    background: #fff;

    align-items: center;
    justify-content: center;
}
.loading-box {
    position: relative;

    width: 40%;
    min-width: 200px;
    height: 10px;
    padding: 1px;

    border: 2px solid;
    border-radius: 5px;
    .loading-message {
        position: absolute;
        bottom: calc(100% + 10px);

        width: 100%;

        text-align: left;
    }
    .loading-inner {
        position: relative;

        overflow: hidden;

        width: 100%;
        height: 100%;

        border-radius: 5px;
    }
    .bar {
        z-index: 1031;

        width: 0%;
        height: 100%;

        background: #000;
    }
}
</style>
