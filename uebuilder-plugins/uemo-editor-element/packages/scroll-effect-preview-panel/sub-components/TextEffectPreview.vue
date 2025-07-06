<template>
    <div
        :class="$style['preview-body']"
        class="flex justify-center items-center"
        ref="previewBody"
        :data-scroll-effect="value ? JSON.stringify(value) : undefined"
    >
        <div :key="value.type" :class="[$style['effect-dom'], $style['preview-box']]" ref="previewBox">
            这里是一段预览文字，用于模拟特效文字在实际页面中的效果。 UEbuilder
            是一款专业的可视化编辑器，支持多种效果模块的编辑和调试。 希望能够帮助到您。
        </div>
    </div>
</template>
<script lang="ts" setup>
import type { UeElScrollEffectSettingPanelValue } from "@stone/uemo-editor-element/packages/scroll-effect-setting-panel";

import mitt from "@stone/uemo-editor-utils/lib/mitt";

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
        font-size: 20px;

        max-width: 300px;

        text-align: center;
    }
}
</style>
