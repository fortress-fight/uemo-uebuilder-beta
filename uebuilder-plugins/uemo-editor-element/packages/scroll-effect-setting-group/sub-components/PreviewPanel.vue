<template>
    <UeElMiniEditorPanel v-model:value="valueRef" @cancel="closePanel" @confirm="closePanel" @update="handleUpdate">
        <template #preview>
            <div class="w-full h-full flex justify-center items-center">
                <UeElBrowserMockupPanel :title="t('UNIT_PREVIEW_TITLE')" ref="browserMockupPanel">
                    <div :class="$style['scroll-effect-area']">
                        <div :class="$style['tip-area']" class="flex items-center justify-center">
                            <div :class="$style['btn--scroll']" class="flex items-center justify-center">
                                <UeElIcon :size="20" name="icon-app-play-fill" @click="scrollToBottom" />
                            </div>
                        </div>
                        <div :class="$style['preview-body']" class="flex justify-center items-center">
                            <div :class="$style['preview-box']"></div>
                        </div>
                    </div>
                </UeElBrowserMockupPanel>
            </div>
        </template>
        <template #editor="{ className, value, updateCloneValue }">
            <UeElScrollEffectSettingPanel
                v-if="value"
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

import { _debounce } from "@stone/uemo-editor-utils/lib/lodash";

const instance = getCurrentInstance();
const { t } = useI18n();

const valueRef = defineModel<UeElScrollEffectSettingPanelValue>("value", { required: true });
const emit = defineEmits<{ (e: "close"): void }>();
const browserMockupPanel = useTemplateRef<UeElBrowserMockupPanelInstance>("browserMockupPanel");

function updateScrollCtrl() {
    browserMockupPanel.value?.scrollTo("top", 0);
    instance?.proxy?.$ueElToast.success("更新成功");
}

const handleUpdate = _debounce(() => updateScrollCtrl(), 800, { leading: false });

const closePanel = () => {
    emit("close");
};
const scrollToBottom = () => {
    browserMockupPanel.value?.scrollTo("bottom");
};
</script>
<style lang="scss" module>
.scroll-effect-area {
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
        padding-top: calc(var(--mock-vh) * 30);
        padding-bottom: calc(var(--mock-vh) * 130);
        .preview-box {
            width: 150px;
            height: 100px;
            margin: 0 auto;

            border-radius: 10px;
            background-color: #0ae448;
        }
    }
}
</style>
