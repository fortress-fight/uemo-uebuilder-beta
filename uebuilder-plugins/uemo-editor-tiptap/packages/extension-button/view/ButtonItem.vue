<template>
    <NodeViewWrapper
        :class="[pageStyle['button-view']]"
        class="drag-handle"
        contenteditable="false"
        draggable="true"
        data-drag-handle
    >
        <component ref="button" :class="$style['button']" :data="attrs" :is="componentName" />
    </NodeViewWrapper>
</template>
<script lang="ts" setup>
import type { ButtonItemAttrs } from "../src";

import { nodeViewProps, NodeViewWrapper } from "@tiptap/vue-3";

import ButtonNormal from "@stone/uemo-editor-element/packages/button-library-panel/sub-components/ButtonNormal.vue";
import ButtonRotate from "@stone/uemo-editor-element/packages/button-library-panel/sub-components/ButtonRotate.vue";
import { ueElButton } from "@stone/uemo-editor-element/packages/button-library-panel/utils/ue-button";

import pageStyle from "../../../src/app.module.scss";

defineOptions({ name: "UeElButtonItem", components: { ButtonNormal, ButtonRotate } });

const props = defineProps(nodeViewProps);

const attrs = computed(() => props.node.attrs as ButtonItemAttrs);
const buttonRef = useTemplateRef<InstanceType<typeof ButtonNormal>>("button");

const componentName = computed(() => {
    switch ((attrs.value.theme || "").split("-")[0]) {
        case "rotate": {
            return "ButtonRotate";
        }

        default:
            return "ButtonNormal";
    }
});

onMounted(() => {
    if (!(buttonRef.value?.$el instanceof HTMLElement)) return;

    const { kill } = ueElButton.initButton([buttonRef.value.$el]);

    onBeforeUnmount(() => {
        kill();
    });
});
</script>
<style lang="scss" module>
.button-item {
    // init
}
</style>
