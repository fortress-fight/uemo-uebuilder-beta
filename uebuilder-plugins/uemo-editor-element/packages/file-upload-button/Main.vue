<!--
 * @Description: 图片上传按钮
 * @Author: F-Stone
 * @LastEditTime: 2025-03-13 17:19:08
-->
<template>
    <div class="grid" :class="$style['file-upload-button']">
        <UeElFileUploader
            :accept="FILE_TYPES_MAP[type].join(',')"
            :upload-before-interceptors="interceptor"
            ref="fileUploaderRef"
            @submit="handleSubmit"
        >
            <template #default="{ disable, upload, uploading, uploadProgress }">
                <Button
                    :disable="!!disable"
                    :type="type"
                    :upload="upload"
                    :upload-progress="uploadProgress"
                    :uploading="isDealing || uploading"
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
const emit = defineEmits<{ (e: "submit", value: UE_EL_UTIL.FileUploadInfo): void }>();

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
