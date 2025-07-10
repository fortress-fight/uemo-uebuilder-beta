<template>
    <NodeViewWrapper
        :contenteditable="false"
        ref="previewBox"
        class="drag-handle"
        data-drag-handle
        draggable="true"
        :class="viewClassName"
        :data-editing="isEditing"
        :style="getCounterNumberBlockStyle(attrs)"
        v-bind="getCounterNumberBlockCustomAttr(attrs)"
    >
        <div :class="pageStyle['counter-number-inner']">
            <div :class="pageStyle['counter-number-group']">
                <div
                    v-for="item in attrs.body"
                    :key="item.id"
                    :class="pageStyle['counter-number-item']"
                    :data-id="item.id"
                    :data-nums="JSON.stringify(item.numList)"
                    :data-num-pad="item.numPad"
                >
                    <div :class="pageStyle['counter-number-item-info']">
                        <div :class="pageStyle['counter-number-item-text']">
                            {{ item.numList[1]?.toString().padStart(getNumDecimal(item), "0") || "" }}
                        </div>
                        <div v-if="item.proxy" :class="pageStyle['counter-number-item-proxy']">
                            {{ item.proxy.value }}
                        </div>
                    </div>
                    <div v-if="item.desc" :class="pageStyle['counter-number-item-desc']">
                        {{ item.desc }}
                    </div>
                </div>
            </div>
        </div>
    </NodeViewWrapper>
</template>
<script lang="ts" setup>
import type { CounterNumberAttrs } from "../src";

import { isNodeSelection } from "@tiptap/core";
import { nodeViewProps, NodeViewWrapper } from "@tiptap/vue-3";
import { ueCounterNumber } from "@stone/uemo-editor-element/packages/counter-number-preview-panel/utils/ue-counter-number";

import $ from "@stone/uemo-editor-utils/lib/jquery";
import mitt from "@stone/uemo-editor-utils/lib/mitt";

import { isCounterNumberNode } from "../utils/helper";
import { getCounterNumberBlockStyle, getCounterNumberBlockCustomAttr } from "../utils/render";
import { getEditorPanelExtensionStorage } from "../../extension-editor-panel/utils/helper";

import pageStyle from "../../../src/app.module.scss";

defineOptions({ name: "UeElTiptapEffectText" });

const eventBus = mitt<{ update: undefined; destroy: undefined }>();

const props = defineProps(nodeViewProps);
const attrs = computed(() => props.node.attrs as CounterNumberAttrs);

const className = useCssModule();

const selectedSelf = computed(() => {
    const selection = props.editor.state.selection;

    if (!isNodeSelection(selection)) {
        return false;
    }

    return selection.from === props.getPos() && isCounterNumberNode(selection) && props.selected;
});

const isEditing = computed(() => {
    return selectedSelf.value && getEditorPanelExtensionStorage(props.editor).lastEditorPanelType === "counterNumber";
});

const isPxFontSize = computed(() => {
    return attrs.value.fontSize?.endsWith("px");
});

const viewClassName = computed(() => {
    return [
        className["node-view"],
        pageStyle["counter-number-block"],
        { "ProseMirror-selectednode": !!props.selected },
        { ["text-" + parseInt(attrs.value.fontSize || "")]: isPxFontSize.value },
    ];
});

function getNumDecimal(item: CounterNumberAttrs["body"][number]) {
    return Math.max(item.numPad || 0, item.numList[0]?.toString().length || 0, item.numList[1]?.toString().length || 0);
}

const previewBoxRef = useTemplateRef<any>("previewBox");
const previewBoxDom = computed(() => previewBoxRef.value?.$.vnode.el);

ueCounterNumber.updateDefaultParams({ scroller: window.document.body });

function playAnimate() {
    eventBus.on("update", () => {
        const dom = previewBoxDom.value as HTMLElement;
        if (ueCounterNumber.checkDom(dom)) {
            ueCounterNumber.updateCounterNumber([dom], true);
        } else {
            ueCounterNumber.initCounterNumber([dom], {
                scroller: window.document.body,
            });
        }
    });

    eventBus.on("destroy", () => {
        ueCounterNumber.destroy([previewBoxDom.value as HTMLElement]);
    });
}

onMounted(() => {
    requestAnimationFrame(() => {
        playAnimate();
        $(previewBoxDom.value).on("animate-play", () => {
            eventBus.emit("update");
        });
    });
});

onBeforeUnmount(() => {
    $(previewBoxDom.value).off("animate-play");

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
