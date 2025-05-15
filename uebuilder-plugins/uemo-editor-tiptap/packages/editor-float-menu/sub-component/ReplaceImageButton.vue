<template>
    <UeElFileUploader
        :accept="FILE_TYPES_MAP.image.join(',')"
        @submit="uploadSuccess"
        @progress="uploadProgress"
        @upload-start="isUploading = true"
        @upload-end="isUploading = false"
    >
        <UeTiptapMenuButton type="replaceImage" :disable="isUploading">
            <UeElLoading
                v-if="isUploading"
                :class="$style['loading-bar']"
                :bar="uploadProgressBarProps.bar"
                bg="transparent"
            />
        </UeTiptapMenuButton>
    </UeElFileUploader>
</template>
<script lang="ts" setup>
import { FILE_TYPES_MAP } from "@stone/uemo-editor-utils/lib/utils";
import { isImageNode } from "../../extension-image/utils/helper";
import { useInjectTiptapEditor } from "../../../utils/mixin-tiptap-editor";

const { editor } = useInjectTiptapEditor();

const isUploading = ref(false);
const progressRef = ref(0);
const className = useCssModule();

function uploadSuccess(imageLink: string) {
    progressRef.value = 0;
    const selection = editor?.state.selection;

    if (isImageNode(selection)) {
        editor?.chain().updateImageAttrs({ src: imageLink }).focus().run();
    }
}

const uploadProgressBarProps = computed<UE_EL_COMPONENT.UeElLoadingProps>(() => ({
    bar: {
        message: false,
        fake: false,
        progress: progressRef.value.toString(),
        className: className["loading-bar--inner"],
    },
}));

function uploadProgress(progress: number) {
    progressRef.value = progress;
}
</script>
<style lang="scss" module>
.editor-button {
    //
}
.loading-bar {
    width: 100%;

    transform: translateY(-4px);

    align-items: flex-end;
    .loading-bar--inner {
        width: 80%;
        min-width: 0;
        height: 5px;
        padding: 0;
    }
}
</style>
