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
        <div v-else :class="$style['preview-area']">
            <div
                :class="$style['preview-image']"
                v-if="valueRef"
                :style="{ 'background-image': `url(${valueRef})` }"
            ></div>
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
function handleUploadSuccess(imageLink: string) {
    valueRef.value = imageLink;
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
    z-index: 1;

    overflow: hidden;

    height: 190px;

    cursor: pointer;

    border-radius: 5px;
    .icon-box {
        margin-bottom: 15px;
    }
    &::before {
        @include ab-cover;
        z-index: 100;

        content: "";
        pointer-events: none;

        border-radius: inherit;
        box-shadow: inset 0 0 0 1px color(var(--ue-border-color));
    }
    &[data-active="true"] {
        img {
            width: 100%;
            height: 100%;

            object-fit: contain;
        }
    }
    &[data-theme="error"] {
        &::before {
            box-shadow: inset 0 0 0 1px var(--c-red-40);
        }
    }
    .tip {
        font-size: 12px;
        font-weight: 400;
        line-height: 15px;

        margin-top: 4px;

        color: var(--editor-c-gray);
    }
    .btn-inner {
        background: color(var(--ue-background-color));
    }
    .preview-area {
        width: 100%;
        height: 100%;

        background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RTUyOUU2MTAwNjczMTFFOEE1MEQ5RTI4RUQzQzJBNTUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RTUyOUU2MTEwNjczMTFFOEE1MEQ5RTI4RUQzQzJBNTUiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpFNTI5RTYwRTA2NzMxMUU4QTUwRDlFMjhFRDNDMkE1NSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpFNTI5RTYwRjA2NzMxMUU4QTUwRDlFMjhFRDNDMkE1NSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PuLRCmkAAAAqSURBVHjaYvz//z8DNnD27Fms4kwMJIJRDcQAFlzhbWxsPBpK9NMAEGAA+cQIhpHCLJEAAAAASUVORK5CYII=");
        background-size: 12px 12px;
        .preview-image {
            @include ab-cover;
            background-repeat: no-repeat;
            background-position: center;
            background-size: contain;
        }
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
