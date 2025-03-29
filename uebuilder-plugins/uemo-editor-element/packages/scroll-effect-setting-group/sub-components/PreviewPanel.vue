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
                            <div :class="$style['preview-box']" ref="previewBox"></div>
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

import mitt from "@stone/uemo-editor-utils/lib/mitt";
import { _debounce } from "@stone/uemo-editor-utils/lib/lodash";
import { UeScrollEffectFactory } from "../utils/ue-scroll-effect";

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
    instance?.proxy?.$ueElToast.success("更新成功");
    eventBus.emit("update");
}

const handleUpdate = _debounce(() => updateScrollCtrl(), 800, { leading: false });

const closePanel = () => {
    emit("close");
};
const scrollToBottom = () => {
    browserMockupPanel.value?.scrollTo("bottom");
};

function createScrollEffect() {
    if (!browserMockupPanel.value?.scroller) return;
    const ueScrollEffectFactory = new UeScrollEffectFactory({
        scroller: browserMockupPanel.value.scroller,
    });

    ueScrollEffectFactory.initScrollEffect([previewBox.value as HTMLElement], {
        stage: previewBody.value as HTMLElement,
        debugger: true,
    });

    eventBus.on("update", () => {
        ueScrollEffectFactory.updateScrollEffect([previewBox.value as HTMLElement], true);
    });

    return {
        destroy: () => {
            ueScrollEffectFactory.destroy();
        },
    };
}

onMounted(() => {
    const ctrl = createScrollEffect();
    onBeforeUnmount(() => {
        ctrl?.destroy?.();
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
        padding-top: calc(var(--mock-vh) * 30);
        padding-bottom: calc(var(--mock-vh) * 30);

        border: 1px dashed #000;
        border-width: 1px 0;
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
