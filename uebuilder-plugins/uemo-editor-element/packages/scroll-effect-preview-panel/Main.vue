<!--
 * @Description: 滚动效果预览面板
 * @Author: F-Stone
 * @LastEditTime: 2025-07-06 13:38:53
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
                        <div
                            :class="$style['preview-body']"
                            class="flex justify-center items-center"
                            ref="previewBody"
                            :data-scroll-effect="JSON.stringify(value.value)"
                        >
                            <div :class="$style['preview-box']" ref="previewBox">
                                <img :src="previewImage" alt="" />
                            </div>
                        </div>
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
import type { UeElBrowserMockupPanelInstance } from "@stone/uemo-editor-element/packages/browser-mockup-panel";

import type { UeElScrollEffectPreviewPanelBaseProps } from "./index";

import mitt from "@stone/uemo-editor-utils/lib/mitt";
import { _debounce } from "@stone/uemo-editor-utils/lib/lodash";

import previewImage from "./assets/image/base-image.jpg";
import { ueScrollEffect } from "./utils/ue-scroll-effect";

defineOptions({ name: "UeElScrollEffectPreviewPanel" });
const _props = withDefaults(defineProps<UeElScrollEffectPreviewPanelBaseProps>(), {});

const { t } = useI18n();
const instance = getCurrentInstance();
const eventBus = mitt<{ update: undefined }>();

const valueRef = defineModel<UeElScrollEffectSettingPanelValue>("value", { required: true });
const emit = defineEmits<{ (e: "close"): void }>();
const browserMockupPanel = useTemplateRef<UeElBrowserMockupPanelInstance>("browserMockupPanel");

const previewBody = useTemplateRef("previewBody");
const previewBox = useTemplateRef("previewBox");

function updateScrollCtrl() {
    browserMockupPanel.value?.scrollTo("top", 0);
    instance?.proxy?.$ueElToast.success(t("UNIT_UPDATE_SUCCESS"));
    eventBus.emit("update");
}

const handleUpdate = _debounce(() => updateScrollCtrl(), 800, { leading: false });

const closePanel = () => {
    emit("close");
};
const scrollToBottom = () => {
    browserMockupPanel.value?.scrollTo("bottom");
};

onMounted(() => {
    if (!browserMockupPanel.value?.scroller) return;

    ueScrollEffect.updateDefaultParams({
        scroller: browserMockupPanel.value.scroller,
    });

    const { kill } = ueScrollEffect.initScrollEffect([previewBox.value as HTMLElement], {
        stage: previewBody.value as HTMLElement,
        debugger: true,
    });

    eventBus.on("update", () => {
        ueScrollEffect.updateScrollEffect([previewBox.value as HTMLElement], true);
    });

    onBeforeUnmount(() => {
        kill();
    });
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
