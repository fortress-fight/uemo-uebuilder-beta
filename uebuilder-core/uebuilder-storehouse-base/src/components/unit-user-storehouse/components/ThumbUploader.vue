<template>
    <UeElFileUploader
        :class="$style['btn--upload-img']"
        :data-active="!!valueRef"
        :data-theme="theme"
        :accept="FILE_TYPES_MAP.image.join(',')"
        @submit="handleUploadSuccess"
        @progress="handleUploadProgress"
        @upload-start="isUploading = true"
        @upload-end="isUploading = false"
    >
        <UeElLoading v-if="isUploading" :class="$style['loading-bar']" v-bind="uploadProgressBarProps" />
        <div v-if="!valueRef" class="flex flex-col items-center h-full justify-center" :class="$style['btn-inner']">
            <div :class="$style['icon-box']" class="flex items-center justify-center">
                <UeElIcon name="icon-tianjia" :size="15" />
            </div>
            <span class="text">{{ t("UEBUILDER_TEMPLATE_FORM_THUMB_PLACEHOLDER") }}</span>
            <span :class="$style['tip']">{{ t("UEBUILDER_TEMPLATE_FORM_THUMB_TIP") }}</span>
        </div>
        <div v-else :class="$style['preview-area']" :style="{ 'background-image': `url(${valueRef})` }">
            <div :class="$style['oper-list']">
                <button :class="$style['list-item']">
                    <UeElIcon name="icon-bianji" :size="15" />
                </button>
                <button :class="$style['list-item']" @click.stop="handleClearThumb">
                    <UeElIcon name="icon-shanchu" />
                </button>
            </div>
        </div>
    </UeElFileUploader>
</template>
<script lang="ts" setup>
import { FILE_TYPES_MAP } from "@stone/uemo-editor-utils/lib/utils";

const _props = defineProps<{ theme: "default" | "error" }>();
const valueRef = defineModel<string>("value", { required: false });
const { t } = useI18n();

// 上传相关状态
const isUploading = ref(false);
const progressRef = ref(0);
const className = useCssModule();

/**
 * 上传进度条属性
 */
const uploadProgressBarProps = computed<UE_EL_COMPONENT.UeElLoadingProps>(() => ({
    duration: 3,
    type: "circle",
    bg: "rgba(0,0,0,0.2)",
    color: "#fff",
    bar: {
        message: false,
        fake: false,
        progress: progressRef.value.toString(),
        className: className["loading-bar--inner"],
    },
}));

/**
 * 处理上传成功
 */
function handleUploadSuccess(_imageLink: string) {
    progressRef.value = 0;
}

/**
 * 处理上传进度
 */
function handleUploadProgress(progress: number) {
    progressRef.value = progress;
}

/**
 * 处理清除封面图
 */
function handleClearThumb() {
    valueRef.value = "";
}
</script>
<style lang="scss" module>
.btn--upload-img {
    --ue-component-image-upload-height: 100%;
    position: relative;

    overflow: hidden;

    height: 190px;

    cursor: pointer;

    border: 1px solid #ccc;
    border-radius: 5px;
    background: #fbfbfb;
    .icon-box {
        margin-bottom: 15px;
    }
    &[data-active="true"] {
        img {
            width: 100%;
            height: 100%;

            object-fit: contain;
        }
    }
    &[data-theme="error"] {
        border: 2px solid var(--c-red-40);
    }
    .tip {
        font-size: 12px;
        font-weight: 400;
        line-height: 15px;

        margin-top: 4px;

        color: var(--editor-c-gray);
    }
    .btn-inner {
        background: #fbfbfb;
    }
    .preview-area {
        width: 100%;
        height: 100%;

        background-repeat: no-repeat;
        background-position: center;
        background-size: contain;
    }
    .oper-list {
        position: absolute;
        top: min(7%, 15px);
        right: min(4%, 15px);
        .list-item {
            font-size: 16px;

            display: block;
            display: flex;

            width: 34px;
            height: 34px;
            margin-bottom: 10px;

            color: #333;
            border-radius: 3px;
            background-color: #fff;
            box-shadow: 0 0 10px rgb(0 0 0 / 0.1);

            align-items: center;
            justify-content: center;
            &:last-child {
                margin-bottom: 0;
            }
        }
    }
}
</style>
