<!--
 * @Description: 图片上传按钮
 * @Author: F-Stone
 * @LastEditTime: 2025-03-06 19:35:19
-->
<template>
    <div :class="$style['file-upload-button']" class="grid">
        <UeElFileUploader
            :accept="FILE_TYPES_MAP[type].join(',')"
            @submit="handleSubmit"
            :upload-before-interceptors="interceptor"
        >
            <template #default="{ disable, upload, uploading, uploadProgress }">
                <Button
                    :type="type"
                    :upload="upload"
                    :disable="!!disable"
                    :uploading="isDealing || uploading"
                    :upload-progress="uploadProgress"
                />
            </template>
        </UeElFileUploader>
        <Tip :type="type" />
    </div>
</template>
<script lang="ts" setup>
import type { UeElFileUploadButtonBaseProps } from "./index";

import { FILE_TYPES_MAP } from "@stone/uemo-editor-utils/lib/utils";
import Button from "./sub-components/Button.vue";
import Tip from "./sub-components/Tip.vue";
import { uploadBeforeInterceptors } from "./utils/svg-upload";

defineOptions({ name: "UeElFileUploadButton" });

const prop = withDefaults(defineProps<UeElFileUploadButtonBaseProps>(), {});
const emit = defineEmits<{ (e: "submit", value: { url: string; data: Record<string, string> }): void }>();

const { fileData, isDealing, interceptor } = uploadBeforeInterceptors(toRef(prop, "type"));

function handleSubmit(value: string) {
    emit("submit", { url: value, data: toRaw(fileData.value) });
}
</script>
<style lang="scss" module>
.file-upload-button {
    gap: var(--ue-editor-row-space--lv3);
}
</style>
