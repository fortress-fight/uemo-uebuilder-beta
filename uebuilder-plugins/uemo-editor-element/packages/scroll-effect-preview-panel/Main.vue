<!--
 * @Description: 滚动效果预览面板
 * @Author: F-Stone
 * @LastEditTime: 2025-07-06 14:33:25
-->
<template>
    <UeElMiniEditorPanel v-model:value="valueRef" @cancel="closePanel" @confirm="closePanel" @update="handleUpdate">
        <template #preview="value">
            <div class="w-full h-full flex justify-center items-center">
                <UeElBrowserMockupPanel :title="t('UNIT_PREVIEW_TITLE')" ref="browserMockupPanel">
                    <div :class="$style['scroll-effect-area']">
                        <div :class="$style['tip-area']" class="flex items-center justify-center">
                            <div
                                :class="$style['btn--scroll']"
                                class="flex items-center justify-center"
                                @click="scrollToBottom"
                            >
                                <UeElIcon :size="20" name="icon-app-play-fill" />
                            </div>
                        </div>
                        <component :is="previewComponentName" :value="value.value" ref="previewDom" />
                    </div>
                </UeElBrowserMockupPanel>
            </div>
        </template>
        <template #editor="{ className, value, updateCloneValue }">
            <UeElScrollEffectSettingPanel
                v-if="value"
                mode="preview"
                :value="value"
                :class="className"
                @update:value="updateCloneValue"
            />
        </template>
    </UeElMiniEditorPanel>
</template>
<script lang="ts" setup>
import type { UeElScrollEffectSettingPanelValue } from "@stone/uemo-editor-element/packages/scroll-effect-setting-panel";

import type { UeElScrollEffectPreviewPanelBaseProps } from "./index";

import { _debounce } from "@stone/uemo-editor-utils/lib/lodash";

import NormalPreview from "./sub-components/NormalPreview.vue";
import TextEffectPreview from "./sub-components/TextEffectPreview.vue";

defineOptions({ name: "UeElScrollEffectPreviewPanel", components: { NormalPreview, TextEffectPreview } });
const _props = withDefaults(defineProps<UeElScrollEffectPreviewPanelBaseProps>(), {});

const { t } = useI18n();
const instance = getCurrentInstance();

const valueRef = defineModel<UeElScrollEffectSettingPanelValue>("value", { required: true });
const emit = defineEmits<{ (e: "close"): void }>();

const browserMockupPanel = useTemplateRef("browserMockupPanel");
const previewDomRef = useTemplateRef("previewDom");

const previewComponentName = computed(() => {
    switch (valueRef.value?.type) {
        case "text-effect":
            return TextEffectPreview;

        default:
            return NormalPreview;
    }
});

const scrollToBottom = () => {
    browserMockupPanel.value?.scrollTo("bottom");
};

// 更新滚动效果
const handleUpdate = _debounce(
    () => {
        browserMockupPanel.value?.scrollTo("top", 0);
        instance?.proxy?.$ueElToast.success(t("UNIT_UPDATE_SUCCESS"));
        previewDomRef.value?.update();
    },
    800,
    { leading: false }
);

const closePanel = () => {
    emit("close");
};

onMounted(() => {
    if (!browserMockupPanel.value?.scroller) return;

    previewDomRef.value?.init(browserMockupPanel.value?.scroller);
});
</script>
<style lang="scss" module>
.scroll-effect-area {
    padding-bottom: calc(var(--mock-vh) * 100);
    .tip-area {
        height: calc(var(--mock-vh) * 100);
        .btn--scroll {
            @include circle(50px);

            position: relative;
            z-index: 10;

            cursor: pointer;

            color: #fff;
            background-color: color(var(--ue-color--blue));
            box-shadow: 5px 10px 20px 0 rgb(0 0 0 / 0.1);
            &:hover {
                color: #fff;
                background-color: color(var(--ue-color--blue));
            }
        }
    }
    .preview-body {
        --parallax-scale: 1;
        padding-top: calc(var(--mock-vh) * 30);
        padding-bottom: calc(var(--mock-vh) * 30);

        border: 1px dashed #000;
        border-width: 1px 0;
        .preview-box {
            --u-height: 790;
            --u-width: 1200;

            position: relative;

            overflow: hidden;

            width: 250px;
            margin: 0 auto;

            border-radius: 10px;
            img {
                position: absolute;
                top: 0;
                left: 0;

                width: 100%;
                height: 100%;

                border-radius: 10px;

                object-fit: cover;
                object-position: center;
            }

            // background-color: #0ae448;
            &::after {
                display: block;

                width: 100%;
                padding-bottom: calc(var(--u-height) / var(--u-width) * 100% / var(--parallax-scale, 1)) !important;

                content: "";
            }
        }
    }
}
</style>
