<template>
    <div
        :class="$style['preview-body']"
        class="flex justify-center items-center"
        ref="previewBody"
        :data-scroll-effect="JSON.stringify(value)"
    >
        <div :class="$style['preview-box']" ref="previewBox">
            <img :src="previewImage" alt="" />
        </div>
    </div>
</template>
<script lang="ts" setup>
import type { UeElScrollEffectSettingPanelValue } from "@stone/uemo-editor-element/packages/scroll-effect-setting-panel";

import mitt from "@stone/uemo-editor-utils/lib/mitt";

import previewImage from "../assets/image/base-image.jpg";
import { ueScrollEffect } from "../utils/ue-scroll-effect";

const _props = defineProps<{ value: UeElScrollEffectSettingPanelValue }>();
const eventBus = mitt<{ update: undefined; destroy: undefined }>();

const previewBody = useTemplateRef("previewBody");
const previewBox = useTemplateRef("previewBox");

defineExpose({
    init(scroller: HTMLElement) {
        if (!scroller) return;

        ueScrollEffect.updateDefaultParams({ scroller });

        const { kill } = ueScrollEffect.initScrollEffect([previewBox.value as HTMLElement], {
            stage: previewBody.value as HTMLElement,
            debugger: true,
        });
        eventBus.on("update", () => {
            ueScrollEffect.updateScrollEffect([previewBox.value as HTMLElement], true);
        });

        eventBus.on("destroy", () => {
            kill();
        });
    },
    update() {
        eventBus.emit("update");
    },
});

onBeforeUnmount(() => {
    eventBus.emit("destroy");
    eventBus.all.clear();
});
</script>
<style lang="scss" module>
.preview-body {
    --parallax-scale: 1;
    padding-top: calc(var(--mock-vh) * 30);
    padding-bottom: calc(var(--mock-vh) * 30);

    border: 1px dashed #000;
    border-width: 1px 0;
    .preview-box {
        --u-height: 790;
        --u-width: 1200;

        position: relative;

        overflow: hidden;

        width: 250px;
        margin: 0 auto;

        border-radius: 10px;
        img {
            position: absolute;
            top: 0;
            left: 0;

            width: 100%;
            height: 100%;

            border-radius: 10px;

            object-fit: cover;
            object-position: center;
        }

        // background-color: #0ae448;
        &::after {
            display: block;

            width: 100%;
            padding-bottom: calc(var(--u-height) / var(--u-width) * 100% / var(--parallax-scale, 1)) !important;

            content: "";
        }
    }
}
</style>
