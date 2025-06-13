<template>
    <div :class="$style['lottie-box']" class="flex justify-center items-center" @pointerenter="pointerenter">
        <dotlottie-player
            ref="dotlottieRef"
            :class="$style['dotlottie-player']"
            :src="url"
            :style="lottieStyle"
            :lottietype="lottieType"
            mode="normal"
            @ready="domReady"
            @complete="lottieComplete"
        />
        <UeElLoading v-if="isLoading" type="circle" bg="transparent" :circle="{ size: '40%' }" />
    </div>
</template>
<script lang="ts" setup>
import type { DotLottiePlayer } from "@stone/uemo-editor-utils/lib/lottie";

import $ from "@stone/uemo-editor-utils/lib/jquery";

defineOptions({ name: "UeElLottiePreview" });

const prop = withDefaults(defineProps<{ url: string; size?: "small" | "normal" }>(), { size: "normal" });
const dotlottieRef = useTemplateRef<DotLottiePlayer>("dotlottieRef");

const isLoading = ref<boolean>(true);
const lottieStyle = computed(() => {
    return prop.size === "small"
        ? "width: 60%; --lottie-player-path-fill: currentColor; --lottie-player-path-stroke: currentColor"
        : "width: 100%";
});
const lottieType = computed(() => {
    return prop.size === "small" ? "btnIcon" : undefined;
});

function domReady() {
    isLoading.value = false;
    const lottieDom = dotlottieRef.value;
    const lottieItem = lottieDom?.getLottie();
    if (lottieItem) {
        lottieItem.autoplay = true;
        lottieItem.loop = false;
        lottieItem.play();
    }
}

function pointerenter() {
    const lottieDom = dotlottieRef.value;
    if (!lottieDom) return;
    $(lottieDom).data("playerDir", 1);
    const lottieItem = lottieDom?.getLottie?.();
    if (lottieItem) {
        lottieItem.setDirection(1);
        lottieItem.play();
    }
}

function lottieComplete() {
    const lottieDom = dotlottieRef.value;
    if (!lottieDom) return;
    const lottieItem = lottieDom.getLottie();
    if (lottieItem) {
        lottieItem.goToAndStop($(lottieDom).data("playerDir") == -1 ? lottieItem.totalFrames - 1 : 0, true);
    }
}

onBeforeMount(() => {
    import("@stone/uemo-editor-utils/lib/lottie").catch((err) => {
        console.error(err);
    });
});
</script>
<style lang="scss" module>
.lottie-box {
    @include ab-cover;
}
</style>
