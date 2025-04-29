<template>
    <UeTiptapFloatingMenu
        type="floatingMenu"
        plugin-key="editorAIPanel"
        :should-show="shouldShow"
        ref="floatingMenuRef"
        :mask="{ color: 'rgba(0, 0, 0, 0)' }"
        @endEdit="handleEndEdit"
    >
        <UeElRichTextLibraryPanel :class="$style['node-placeholder-panel']" @update:select="handleUpdateSelect" />
    </UeTiptapFloatingMenu>
</template>
<script lang="ts" setup>
import { useInjectTiptapEditor } from "../../../utils/mixin-tiptap-editor";

const { editor } = useInjectTiptapEditor();

const shouldShow: UE_TIPTAP_COMPONENT.UeTiptapFloatingMenuProps["shouldShow"] = ({ editor }) => {
    if (!editor) return false;

    const isNodePlaceholder = editor.isActive("nodePlaceholder");

    return isNodePlaceholder;
};

const handleUpdateSelect = (value?: string) => {
    if (!value) return;

    editor?.chain().focus().insertContent(value).run();
};

const handleEndEdit = () => {
    editor?.chain().focus().deleteSelection().run();
};
</script>
<style lang="scss" module>
.node-placeholder-panel {
    // init
}
</style>
