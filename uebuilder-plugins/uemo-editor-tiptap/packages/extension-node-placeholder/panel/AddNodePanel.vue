<template>
    <UeTiptapFloatingMenu
        type="floatingMenu"
        plugin-key="editorAIPanel"
        :should-show="shouldShow"
        ref="floatingMenuRef"
        :mask="{ color: 'rgba(0, 0, 0, 0)' }"
        @endEdit="handleEndEdit"
    >
        <UeElRichTextLibraryPanel
            v-if="nodeName === 'TextPlaceholder'"
            :class="$style['node-placeholder-panel']"
            @update:select="insertTextContent"
        />
        <UeElButtonLibraryPanel
            v-if="nodeName === 'ButtonPlaceholder'"
            @update:select="insertButtonContent"
            :class="$style['node-placeholder-panel']"
        />
        <UeElImageLibraryPanel
            v-if="nodeName === 'ImagePlaceholder'"
            @update:select="insertImageContent"
            :class="$style['node-placeholder-panel']"
        />
        <UeElIconLibraryPanel
            v-if="nodeName === 'SvgIconPlaceholder'"
            @update:select="insertSvgIconContent"
            :class="$style['node-placeholder-panel']"
        />
        <UeElVideoLibraryPanel
            v-if="nodeName === 'VideoPlaceholder'"
            @update:select="insertVideoContent"
            :class="$style['node-placeholder-panel']"
        />
        <UeElMapSettingPanel
            v-if="nodeName === 'MapPlaceholder'"
            :class="$style['node-placeholder-panel']"
            @confirm="insertMapContent"
            @cancel="handleEndEdit"
        />
        <UeElWebSettingPanel
            v-if="nodeName === 'WebPlaceholder'"
            :class="$style['node-placeholder-panel']"
            @confirm="insertWebContent"
            @cancel="handleEndEdit"
        />
        <UeElSvgLibraryPanel
            v-if="nodeName === 'SvgViewerPlaceholder'"
            :class="$style['node-placeholder-panel']"
            @update:select="insertSvgViewerContent"
        />
        <UeElSplineLibraryPanel
            v-if="nodeName === 'SplinePlaceholder'"
            :class="$style['node-placeholder-panel']"
            @update:select="insertSplineContent"
        />
    </UeTiptapFloatingMenu>
</template>
<script lang="ts" setup>
import type { ButtonItemAttrs } from "@stone/uemo-editor-tiptap/packages/extension-button/src";

import { isNodeSelection } from "@tiptap/core";

import { useInjectTiptapEditor } from "../../../utils/mixin-tiptap-editor";

const { editor } = useInjectTiptapEditor();

const shouldShow: UE_TIPTAP_COMPONENT.UeTiptapFloatingMenuProps["shouldShow"] = ({ editor }) => {
    if (!editor) return false;

    const isNodePlaceholder = editor.isActive("nodePlaceholder");

    return isNodePlaceholder && !nodeLoading.value;
};

const nodeName = computed(() => {
    return editor?.getAttributes("nodePlaceholder").nodeName;
});

const nodeLoading = computed(() => {
    return editor?.getAttributes("nodePlaceholder").nodeLoading;
});

const insertTextContent = (value?: string) => {
    if (!value) return;

    editor?.chain().focus().insertContent(value).run();
};

const insertButtonContent = (value?: ButtonItemAttrs) => {
    if (!value) return;

    editor?.chain().focus().insertButton(value).run();
};

const insertImageContent = (value?: string) => {
    if (!value) return;

    editor?.chain().focus().insertImage(value).run();
};

const insertSvgIconContent = (value?: { name: string; source: string }) => {
    if (!value) return;

    editor?.chain().focus().insertSvgIcon(value).run();
};

const insertVideoContent = (value?: string) => {
    if (!value) return;

    editor?.chain().focus().insertVideoFrame(value).run();
};

const insertMapContent = (value?: string) => {
    if (!value) return;

    editor?.chain().focus().insertMapFrame(value).run();
};

const insertWebContent = (value?: string) => {
    if (!value) return;

    editor?.chain().focus().insertWebFrame(value).run();
};

const insertSvgViewerContent = (value?: UE_EL_UTIL.ResourceSvgAttrs) => {
    if (!value) return;

    editor?.chain().focus().insertSvgViewer(value).run();
};

const insertSplineContent = (value?: string) => {
    if (!value) return;

    editor?.chain().focus().insertSpline(value).run();
};

const handleEndEdit = () => {
    const selection = editor?.state.selection;
    if (isNodeSelection(selection)) {
        if (selection.node.type.name === "nodePlaceholder") {
            editor?.chain().focus().deleteSelection().run();
        }
    }
};
</script>
<style lang="scss" module>
.node-placeholder-panel {
    // init
}
</style>
