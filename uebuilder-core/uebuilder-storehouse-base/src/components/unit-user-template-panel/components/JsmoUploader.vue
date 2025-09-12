<template>
    <UnitJsmoUploader
        :class="$style['jsmo-uploader']"
        :data-active="!!valueRef"
        :data-theme="theme"
        :disable="!!valueRef"
        @success="uploadPageData"
    >
        <div v-if="!valueRef" class="flex justify-center items-center">
            <div :class="$style['icon-box']" class="flex items-center justify-center">
                <UeElIcon name="icon-app-upload" />
            </div>
            <span class="ml-2">{{ t("UNIT_UPLOAD_JSMO_TITLE") }}</span>
        </div>
        <div v-else class="flex justify-between items-center">
            <div :class="[$style['icon-box']]" class="flex items-center justify-center">
                <UeElIcon name="icon-duigou" />
            </div>
            <span class="text">PageText.jsmo</span>
            <div
                :class="[$style['icon-box'], $style['btn--change']]"
                class="flex items-center justify-center"
                @click="valueRef = ''"
            >
                <UeElIcon name="icon-shanchu" />
            </div>
        </div>
    </UnitJsmoUploader>
</template>
<script lang="ts" setup>
import UnitJsmoUploader from "../../unit-jsmo-uploader";

const _props = defineProps<{ theme?: "default" | "error" }>();
const valueRef = defineModel<string>("value", { required: false });
const { t } = useI18n();

/**
 * 上传并使用本地的页面数据
 * @param pageData
 */
function uploadPageData(pageData: string) {
    valueRef.value = pageData;
}
</script>
<style lang="scss" module>
.jsmo-uploader {
    font-size: 12px;
    font-weight: 400;
    line-height: 100%;

    width: 100%;
    height: 40px;
    padding: 0 16px;

    transition: 0.26s ease;
    text-align: center;

    color: var(--editor-color-text);
    border-radius: 5px;
    background: #fff;
    box-shadow: inset 0 0 0 1px color(var(--ue-border-color));
    &[data-theme="error"] {
        box-shadow: inset 0 0 0 1px var(--c-red-40);
    }
    &[data-active="true"] {
        cursor: default;

        color: var(--theme-layout-col);
        box-shadow: inset 0 0 0 1px var(--theme-layout-col);
    }
    .btn--change {
        @include circle(30px);
        cursor: pointer;
        transition: 0.26s ease;

        color: var(--c-red-40);
        &:hover {
            color: #fff;
            background-color: var(--c-red-40);
        }
    }
}
</style>
