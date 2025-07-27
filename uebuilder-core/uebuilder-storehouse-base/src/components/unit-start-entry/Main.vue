<!--
 * @Description: 页面库
 * @Author: F-Stone
 * @LastEditTime: 2025-07-27 15:42:11
-->
<template>
    <div :class="$style['oper-btn-group']" class="flex">
        <OperButton
            :class="$style['oper-btn']"
            theme="yellow"
            :title="t('UEBUILDER_ENTER_TITLE')"
            :icon="{ name: 'icon-xiangmu', size: 16 }"
            :subtitle="t('UEBUILDER_ENTER_SUBTITLE')"
            @trigger="triggerAppStart?.()"
        />
        <OperButton
            :class="$style['oper-btn']"
            theme="blue"
            :title="t('UEBUILDER_CREATE_TITLE')"
            :icon="{ name: 'icon-tianjia', size: 15 }"
            :subtitle="t('UEBUILDER_CREATE_SUBTITLE')"
            @trigger="createEmptyPage"
        />
        <UnitJsmoUploader :class="$style['oper-btn']" @success="uploadPageData">
            <OperButton
                theme="green"
                :title="t('UEBUILDER_UPLOAD_TITLE')"
                :icon="{ name: 'icon-app-upload', size: 15 }"
                :subtitle="t('UEBUILDER_UPLOAD_SUBTITLE')"
            />
        </UnitJsmoUploader>
    </div>
</template>
<script lang="ts" setup>
import OperButton from "./components/Button.vue";
import UnitJsmoUploader from "../unit-jsmo-uploader";

const { t } = useI18n();

defineOptions({
    name: "UnitStartEntry",
});

function triggerAppStart() {
    //
}

/**
 * 创建空白页面
 */
function createEmptyPage() {
    //
}

/**
 * 上传并使用本地的页面数据
 * @param pageData
 */
function uploadPageData(_pageData: string) {
    //
}
</script>
<style lang="scss" module>
.oper-btn-group {
    position: sticky;
    z-index: 1000;
    top: 0;

    width: 100%;
    padding: 20px 50px;

    background-color: #fff;

    gap: 24px;
    .oper-btn {
        width: 336px;
    }
}
</style>
