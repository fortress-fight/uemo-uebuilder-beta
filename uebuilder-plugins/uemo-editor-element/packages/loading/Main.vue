<!--
 * @Description: 加载Loading
 * @Author: F-Stone
 * @LastEditTime: 2025-05-13 14:33:51
-->
<template>
    <div
        v-if="isShow"
        :class="$style['loading']"
        class="flex justify-center items-center"
        :style="{ '--bg': bg, '--color': color }"
    >
        <div v-if="type === 'bar'" :class="[$style['loading-box--bar'], barInfo.className]">
            <span v-if="barInfo.message !== false" :class="$style['loading-message']">
                {{ barInfo.message || t("LOADING_TIP") }}
            </span>
            <div :class="$style['loading-inner']">
                <div ref="progressInner" :style="{ width: barInfo.progress + '%' }" :class="$style['bar']"></div>
            </div>
        </div>
        <div
            v-else-if="type === 'circle'"
            :class="$style['loading-box--circle']"
            class="flex justify-center items-center"
            :style="{ '--size': circleInfo.size }"
        >
            <i :class="$style['ic']"></i>
        </div>
    </div>
</template>
<script lang="ts" setup>
import type { UeElLoadingBaseProps } from "./index";
import { gsap } from "@stone/uemo-editor-utils/lib/gsap";

defineOptions({ name: "UeElLoading" });

const { t } = useI18n();

const prop = withDefaults(defineProps<UeElLoadingBaseProps>(), {
    delay: 0,
    type: "bar",
    bg: "#fff",
    color: "#000",
    bar: () => ({ fake: true, message: "", progress: "0", duration: 5 }),
    circle: () => ({ size: "50px" }),
});

const progressInner = useTemplateRef("progressInner");

const isShow = ref(false);

const barInfo = computed(() => prop.bar);
const circleInfo = computed(() => prop.circle);

let tweenLoading: GSAPTween | null = null;

/**
 * 动画进度条。
 * @function animateProgress
 * @description 使用 gsap 对 progressInner 元素进行动画处理，从 0% 动画到 98%，持续时间为 prop.duration。
 */
function animateProgress() {
    isShow.value = true;
    clearAnimate();

    requestAnimationFrame(() => {
        if (progressInner.value && barInfo.value.fake) {
            tweenLoading = gsap.fromTo(
                progressInner.value,
                { width: "0%" },
                {
                    width: "98%",
                    ease: "power2.out",
                    duration: barInfo.value.duration,
                }
            );
        }
    });
}

/**
 * 清除动画。
 * @function clearAnimate
 * @description 若存在 tweenLoading，则杀掉 progressInner 元素上的所有动画。
 */
function clearAnimate() {
    if (tweenLoading) {
        void (progressInner.value && gsap.killTweensOf(progressInner.value));
        tweenLoading = null;
    }
}

/**
 * 组件挂载时的回调。
 * @function onMounted
 * @description 挂载时调用 animateProgress 方法，启动加载动画。
 */
const timer = ref<number | undefined>(undefined);
onMounted(() => {
    if (prop.delay > 0) {
        timer.value = setTimeout(() => {
            animateProgress();
        }, prop.delay);
    } else {
        animateProgress();
    }
});

/**
 * 组件卸载前的回调。
 * @function onBeforeUnmount
 * @description 在组件卸载前，若存在 gsap 动画，则杀掉 progressInner 元素上的所有动画。
 */
onBeforeUnmount(() => {
    if (typeof timer.value !== "undefined") {
        clearTimeout(timer.value);
    }
    clearAnimate();
});

defineExpose({
    reset: () => {
        clearAnimate();
        requestAnimationFrame(() => {
            animateProgress();
        });
    },
});
</script>
<style lang="scss" module>
@keyframes loaderRotate {
    100% {
        transform: rotate(360deg);
    }
}
@keyframes prixClipFix {
    0% {
        clip-path: polygon(50% 50%, 0 0, 50% 0, 50% 0, 50% 0, 50% 0);
    }
    25% {
        clip-path: polygon(50% 50%, 0 0, 50% 0, 50% 0, 50% 0, 50% 0);
    }
    30% {
        clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 0, 100% 0, 100% 0);
    }
    35% {
        clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 100% 100%, 100% 100%);
    }
    40% {
        clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 0 100%, 0 100%);
    }
    45% {
        clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 0 100%, 0 50%);
    }
    70% {
        clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 0 100%, 0 50%);
    }
    75% {
        clip-path: polygon(50% 50%, 50% 0, 100% 0, 100% 100%, 0 100%, 0 0%);
    }
    80% {
        clip-path: polygon(50% 50%, 100% 0, 100% 0, 100% 100%, 0 100%, 0 0%);
    }
    85% {
        clip-path: polygon(50% 50%, 100% 100%, 100% 100%, 100% 100%, 0 100%, 0 0%);
    }
    90% {
        clip-path: polygon(50% 50%, 0 100%, 0 100%, 0 100%, 0 100%, 0 0%);
    }
    95% {
        clip-path: polygon(50% 50%, 0 50%, 0 50%, 0 50%, 0 50%, 0 0%);
    }
    100% {
        clip-path: polygon(50% 50%, 0 0, 0 0, 0 0, 0 0, 50% 0);
    }
}
.loading {
    @include ab-cover;
    z-index: 100;

    background: var(--bg);
}
.loading-box--bar {
    position: relative;

    width: 40%;
    min-width: 200px;
    height: 10px;
    padding: 1px;

    border: 2px solid;
    border-radius: 5px;
    .loading-message {
        position: absolute;
        bottom: calc(100% + var(--height));

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
.loading-box--circle {
    @include space-placeholder(100, 100, var(--size, 100px));
    position: relative;

    flex: 0 0 auto;

    cursor: pointer;
    .ic {
        position: absolute;
        top: 0;
        left: 0;

        display: block;

        width: 100%;
        height: 100%;
        margin: auto;

        animation: loaderRotate 1.5s linear infinite;

        border-radius: 50%;
        &::before {
            position: absolute;

            box-sizing: border-box;

            content: "";
            animation: prixClipFix 3s linear infinite;

            border: 2px solid var(--color);
            border-radius: 50%;

            inset: 0;
        }
    }
}
</style>
