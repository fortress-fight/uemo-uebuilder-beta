<template>
    <node-view-wrapper
        class="drag-handle"
        data-drag-handle
        draggable="true"
        :class="[$style['node-view'], pageStyle['svg-icon-wrapper'], { 'ProseMirror-selectednode': !!selected }]"
        :contenteditable="contenteditable"
        :style="{ 'text-align': attrs.align }"
        @dragenter="contenteditable = true"
        @drop="contenteditable = false"
    >
        <div v-if="attrs.source" :class="pageStyle['svg-icon-box']" :style="svgIconBoxStyle">
            <iconpark-icon
                :class="pageStyle['svg-icon-viewer']"
                :data-source="attrs.source"
                :name="attrs.name"
                width="100%"
                height="100%"
            />
        </div>
    </node-view-wrapper>
</template>
<script lang="ts" setup>
import type { SvgIconAttrs } from "../src";

import { nodeViewProps, NodeViewWrapper } from "@tiptap/vue-3";

import { getSvgIconBoxStyle } from "../utils/render";

import pageStyle from "../../../src/app.module.scss";

defineOptions({ name: "UeElTiptapSvgIconView" });

const contenteditable = ref(false);

const props = defineProps(nodeViewProps);

const attrs = computed(() => props.node.attrs as SvgIconAttrs);
const svgIconBoxStyle = computed(() => getSvgIconBoxStyle(attrs.value));

// 常量定义
const LOADING_TIMEOUT = 20;

/**
 * 加载图标列表
 * @param source - 图标源文件
 */
const loading = ref(false);
async function getIconList(source: string[]): Promise<void> {
    const timer = setTimeout(() => (loading.value = true), LOADING_TIMEOUT);

    try {
        const { loadSvgIcon } = await import("@stone/uemo-editor-utils/lib/icon");
        await loadSvgIcon(source);
    } finally {
        clearTimeout(timer);
        loading.value = false;
    }
}

watchEffect(() => {
    void (async () => {
        await getIconList([attrs.value.source]);
    })();
});
</script>
<style lang="scss" module>
.node-view {
    cursor: pointer;
}
</style>
