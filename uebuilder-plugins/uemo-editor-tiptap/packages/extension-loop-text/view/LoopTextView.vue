<template>
    <NodeViewWrapper
        :contenteditable="false"
        ref="previewBox"
        class="drag-handle"
        data-drag-handle
        draggable="true"
        :class="viewClassName"
        :data-editing="isEditing"
        :style="getLoopTextBlockStyle(attrs)"
        v-bind="getLoopTextBlockCustomAttr(attrs)"
    >
        <div :class="pageStyle['loop-text-inner']">
            <!-- 前缀 -->
            <div
                v-if="attrs.prefix"
                :class="pageStyle['loop-text--prefix']"
                :data-type="attrs.prefix.type"
                :data-value="attrs.prefix.value"
            >
                <span :class="pageStyle.text">{{ attrs.prefix.value }}</span>
            </div>
            <!-- 跑马灯文本组 -->
            <div :class="pageStyle['loop-text-group']">
                <div
                    v-for="(item, index) in attrs.body || []"
                    :key="item.id"
                    :class="pageStyle['loop-text-item']"
                    :data-id="item.id"
                    :data-active="index === 0 ? '' : null"
                >
                    <span :class="pageStyle['loop-text-item-text']">{{ item.title }}</span>
                </div>
            </div>
            <!-- 后缀 -->
            <div
                v-if="attrs.suffix"
                :class="pageStyle['loop-text--suffix']"
                :data-type="attrs.suffix.type"
                :data-value="attrs.suffix.value"
            >
                <span :class="pageStyle.text">{{ attrs.suffix.value }}</span>
            </div>
        </div>
    </NodeViewWrapper>
</template>
<script lang="ts" setup>
import type { LoopTextAttrs } from "../src";

import { isNodeSelection } from "@tiptap/core";
import { nodeViewProps, NodeViewWrapper } from "@tiptap/vue-3";

import $ from "@stone/uemo-editor-utils/lib/jquery";
import mitt from "@stone/uemo-editor-utils/lib/mitt";
import { ueLoopText } from "@stone/uemo-editor-element/packages/loop-text-preview-panel/utils/ue-loop-text";

import { isLoopTextNode } from "../utils/helper";
import { getLoopTextBlockStyle, getLoopTextBlockCustomAttr } from "../utils/render";
import { getEditorPanelExtensionStorage } from "../../extension-editor-panel/utils/helper";

import pageStyle from "../../../src/app.module.scss";

defineOptions({ name: "UeElTiptapEffectText" });

const eventBus = mitt<{ update: undefined; destroy: undefined }>();

const props = defineProps(nodeViewProps);
const attrs = computed(() => props.node.attrs as LoopTextAttrs);

const previewBoxRef = useTemplateRef<any>("previewBox");
const previewBoxDom = computed(() => previewBoxRef.value?.$.vnode.el);

const className = useCssModule();

const selectedSelf = computed(() => {
    const selection = props.editor.state.selection;

    if (!isNodeSelection(selection)) {
        return false;
    }

    return selection.from === props.getPos() && isLoopTextNode(selection) && props.selected;
});

const isEditing = computed(() => {
    return selectedSelf.value && getEditorPanelExtensionStorage(props.editor).lastEditorPanelType === "loopText";
});

const isPxFontSize = computed(() => {
    return attrs.value.fontSize?.endsWith("px");
});

const viewClassName = computed(() => {
    return [
        className["node-view"],
        pageStyle["loop-text-block"],
        { "ProseMirror-selectednode": !!props.selected },
        { ["text-" + parseInt(attrs.value.fontSize || "")]: isPxFontSize.value },
    ];
});

function playAnimate() {
    eventBus.on("update", () => {
        const dom = previewBoxDom.value as HTMLElement;
        if (ueLoopText.checkDom(dom)) {
            ueLoopText.updateLoopText([dom], true);
        } else {
            ueLoopText.initLoopText([dom], {
                scroller: window.document.body,
            });
        }
    });

    eventBus.on("destroy", () => {
        const dom = previewBoxDom.value as HTMLElement;
        if (ueLoopText.checkDom(dom)) {
            ueLoopText.destroy([dom]);
        }
    });
}

onMounted(() => {
    requestAnimationFrame(() => {
        playAnimate();
        $(previewBoxDom.value).on("animate-play", () => {
            eventBus.emit("update");
        });
        $(previewBoxDom.value).on("animate-stop", () => {
            eventBus.emit("destroy");
        });
    });
});

onBeforeUnmount(() => {
    $(previewBoxDom.value).off("animate-play");
    $(previewBoxDom.value).off("animate-stop");

    eventBus.off("update");
    eventBus.off("destroy");
    eventBus.all.clear();
});
</script>
<style lang="scss" module>
.node-view {
    cursor: pointer;
}
</style>
