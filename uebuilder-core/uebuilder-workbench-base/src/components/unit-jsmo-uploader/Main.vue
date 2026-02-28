<!--
 * @Description: JSMO 上传组件
 * @Author: F-Stone
 * @LastEditTime: 2025-07-27 01:44:46
 * @FileType: Vue3 组件
 * @Props:
 *   - disable: boolean - 是否禁用上传功能
 * @Events:
 *   - success: (fileData: string) => void - 文件上传成功后触发，返回文件内容
-->
<template>
    <button :class="$style['page-file-upload']" @click="handleButtonClick" :disabled="disable">
        <input
            ref="uploadDataInput"
            :class="$style['upload-input']"
            accept=".txt, .jsmo"
            name="pageData"
            type="file"
            @change="handleFileChange"
        />
        <slot :upload="uploadPageData" />
    </button>
</template>

<script lang="ts" setup>
import type { UnitJsmoUploaderBaseProps } from "./index";

defineOptions({ name: "UnitJsmoUploader" });
const props = defineProps<UnitJsmoUploaderBaseProps>();

const uploadDataInput: Ref<HTMLInputElement | null> = ref(null);
const emit = defineEmits<{
    (e: "success", fileData: string): void;
}>();

/**
 * 文件读取器实例
 * @private
 */
const reader = new FileReader();

/**
 * 处理文件读取完成事件
 * @private
 */
const handleFileLoad = (ev: ProgressEvent<FileReader>) => {
    const fileData = ev.target?.result;
    if (typeof fileData === "string") {
        emit("success", fileData);
    }
};

/**
 * 处理文件选择变更事件
 * @private
 */
const handleFileChange = (ev: Event) => {
    const files = (ev.target as HTMLInputElement).files;
    if (files?.[0]) {
        reader.readAsText(files[0]);
    }
    // 重置 input 值，确保同一文件可以重复上传
    if (uploadDataInput.value) {
        uploadDataInput.value.value = "";
    }
};

/**
 * 处理按钮点击事件
 * @private
 */
const handleButtonClick = () => {
    if (!props.disable && uploadDataInput.value) {
        uploadDataInput.value.click();
    }
};

/**
 * 上传页面数据
 * @public
 */
const uploadPageData = () => {
    if (!props.disable && uploadDataInput.value) {
        uploadDataInput.value.click();
    }
};

// 组件卸载时清理事件监听
onUnmounted(() => {
    reader.removeEventListener("load", handleFileLoad);
    reader.abort(); // 终止未完成的读取操作
});

// 添加文件读取事件监听
reader.addEventListener("load", handleFileLoad);
</script>

<style lang="scss" module>
.page-file-upload {
    cursor: pointer;
    &:disabled {
        cursor: not-allowed;

        opacity: 0.6;
    }
    .upload-input {
        @include hide();
    }
}
</style>
