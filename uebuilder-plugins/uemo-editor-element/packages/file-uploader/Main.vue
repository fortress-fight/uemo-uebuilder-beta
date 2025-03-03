<!--
 * @Description: 文件上传
 * @Author: F-Stone
 * @LastEditTime: 2025-03-03 13:24:16
-->
<template>
    <div :class="$style['file-uploader']" class="cursor-pointer" @click="fireUpload">
        <input ref="fileInput" type="file" :accept="accept" :class="$style['file-input']" @change="triggerUpload" />
        <slot
            :upload="selectUploadFile"
            :disable="disable"
            :upload-progress="uploadPercent"
            :upload-config="uploadHandler?.config"
            :uploading="uploading"
        ></slot>
    </div>
</template>
<script lang="ts" setup>
import type { UeElFileUploaderBaseProps } from "./index";
import $ from "@stone/uemo-editor-utils/lib/jquery";

const instance = getCurrentInstance();

const { t } = useI18n();
defineOptions({ name: "UeElFileUploader" });

const prop = withDefaults(defineProps<UeElFileUploaderBaseProps>(), {});
const emit = defineEmits<{
    (ev: "uploadStart" | "uploadEnd"): void;
    (ev: "submit", value: string): void;
    (ev: "progress", value: number): void;
    (ev: "error", value: { code: string; msg: string }): void;
}>();

const fileInput = ref<HTMLInputElement>();

function fireUpload(ev: MouseEvent) {
    if (ev.target === fileInput.value) {
        return;
    }
    selectUploadFile(prop.interceptSelectUploadFile);
}

function selectUploadFile(interceptSelectUploadFile?: () => void) {
    if (prop.disable) {
        return;
    }

    if (interceptSelectUploadFile) {
        interceptSelectUploadFile();
    } else {
        $(fileInput.value!).trigger("click");
    }
}

function checkFileType(fileType: string) {
    if (!fileType) return false;

    const acceptTypeList = prop.accept.split(",");
    return acceptTypeList.some((type) => {
        if (type === "*") {
            return true;
        }
        if (type.includes("/")) {
            const [type1, type2] = type.split("/");
            if (type2 === "*") {
                return fileType.startsWith(type1);
            }
            return fileType === type;
        }
        if (type.startsWith(".")) {
            return fileType.endsWith(type);
        }
        return fileType === type;
    });
}

function triggerUpload() {
    if (prop.disable) return;

    if (uploading.value) {
        instance?.proxy?.$ueElToast.warning(t("FILE_UPLOADER_TIP_UPLOADING"));
        return;
    }

    const input = fileInput.value;
    if (!input) return;

    const updateFile = fileInput.value?.files?.[0];
    if (!updateFile) return;

    if (!checkFileType(updateFile.type || updateFile.name.slice(updateFile.name.lastIndexOf(".")))) {
        instance?.proxy?.$ueElToast.warning(t("FILE_UPLOADER_TIP_FILE_TYPE_NOT_ALLOWED"));
        return;
    }

    input.value = "";

    uploadFile(updateFile);
}

const uploading = ref(false);
const uploadPercent = ref<number>(0);
const uploadHandler = instance?.proxy?.$ueFileUpload?.({ uploadConfig: prop.uploadConfig });

function uploadFileHand(file: File) {
    if (prop.interceptFileUpload) {
        prop.interceptFileUpload(file);
        return;
    }

    if (!uploadHandler) {
        instance?.proxy?.$ueElToast.error(t("FILE_UPLOADER_TIP_MISSING_EXECUTE_METHOD"));
        return;
    }

    if (uploading.value) {
        instance?.proxy?.$ueElToast.warning(t("FILE_UPLOADER_TIP_UPLOADING"));
        return;
    }

    uploading.value = true;
    emit("uploadStart");
    emit("progress", 0);

    uploadHandler
        .fire?.(file, {
            uploadProgress: (percent: string) => {
                uploadPercent.value = parseFloat(percent);
                emit("progress", parseFloat(percent));
            },
            onError(param: { code: string; msg: string }) {
                instance?.proxy?.$ueElToast.warning(param.msg);
                emit("error", param);
            },
        })
        .then((path: string) => {
            emit("submit", path);
        })
        .finally(() => {
            uploading.value = false;
            emit("uploadEnd");
            emit("progress", 100);
            uploadPercent.value = 0;
        })
        .catch((error: Error | string) => {
            console.error(error instanceof Error ? error : new Error(String(error)));
        });
}

function uploadFile(file: File) {
    const interceptors = prop.uploadBeforeInterceptors;
    if (interceptors) {
        interceptors.forEach((interceptor) => {
            interceptor(file).then(
                (res) => {
                    uploadFileHand(res.file);
                },
                (err) => {
                    instance?.proxy?.$ueElToast.error(err.msg || t("FILE_UPLOADER_TIP_UNKNOWN_ERROR"));
                }
            );
        });
        return;
    } else {
        uploadFileHand(file);
    }
}

defineExpose({
    uploadFile,
    selectUploadFile,
    triggerUploadInput: () => {
        $(fileInput.value!).trigger("click");
    },
});
</script>
<style lang="scss" module>
.file-uploader {
    //
}
</style>
