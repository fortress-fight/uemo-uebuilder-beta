<template>
    <node-view-wrapper
        class="drag-handle"
        :data-drag-handle="isEditing ? undefined : true"
        :draggable="isEditing ? false : true"
        :class="[pageStyle['spline-wrapper'], { 'ProseMirror-selectednode': !!selected }]"
        :style="{ textAlign: attrs.align }"
        :contenteditable="contenteditable"
        @dragenter="contenteditable = true"
        @drop="contenteditable = false"
        :data-ratio="attrs.ratio || false"
    >
        <div :style="boxStyle" :class="pageStyle['spline-box']">
            <spline-viewer
                v-if="isEditing && attrs.url"
                ref="splineView"
                :class="pageStyle['spline-viewer']"
                loading="auto"
                :style="splineViewerStyle"
                :url="attrs.url"
                @load-start="onLoadStart"
                @load-complete="onLoadComplete"
            />
            <div v-else :class="$style['spline-viewer-placeholder']"></div>
            <UeElLoading v-if="loading" />
        </div>
    </node-view-wrapper>
</template>
<script lang="ts" setup>
import type { SplineAttrs } from "../src";

import { nodeViewProps, NodeViewWrapper } from "@tiptap/vue-3";
import { getEditorPanelExtensionStorage } from "../../extension-editor-panel/utils/helper";

import pageStyle from "../../../src/app.module.scss";
import { getSplineStyle } from "../utils/render";

defineOptions({ name: "UeElTiptapSplineView" });

const contenteditable = ref(false);

const props = defineProps(nodeViewProps);

const attrs = computed(() => {
    return props.node.attrs as SplineAttrs;
});

const splineView = useTemplateRef("splineView");
const splineViewerStyle = computed(() => {
    return {
        background: "none",
    };
});

function unloadSpineViewer() {
    const splineDom = splineView.value;
    // @ts-expect-error
    splineDom?._spline?.stop();
}

const boxStyle = computed(() => {
    return getSplineStyle(attrs.value);
});

function onLoadStart() {
    loading.value = true;
}
function onLoadComplete() {
    loading.value = false;
}

const loading = ref<boolean>();
watch(
    () => attrs.value.url,
    (url) => {
        loading.value = true;
        const splineDom = splineView.value;

        // @ts-expect-error
        splineDom?._spline?.stop();
        // @ts-expect-error
        splineDom?._spline?.load(url);

        loading.value = false;
    }
);

const isEditing = computed(() => {
    return getEditorPanelExtensionStorage(props.editor).lastEditorPanelType === "spline";
});

watch(isEditing, (isEditing) => {
    if (!isEditing) {
        unloadSpineViewer();
    }
});

onBeforeMount(() => {
    import("@stone/uemo-editor-utils/lib/spline")
        .then(() => {
            //
        })
        .catch((err) => {
            console.error(err);
        });
});

onBeforeUnmount(() => {
    unloadSpineViewer();
});
</script>
<style lang="scss" module>
.spline-viewer-placeholder {
    position: absolute;

    width: 100%;
    height: 100%;

    background-color: rgba(#999, 0.2);
    background-image: url("./spline-placeholder.png");
    background-repeat: no-repeat;
    background-position: center;
    background-size: 120px 26px;

    object-fit: cover;
}
</style>
