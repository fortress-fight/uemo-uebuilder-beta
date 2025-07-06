<!--
 * @Description: 计数器预览面板
 * @Author: F-Stone
 * @LastEditTime: 2025-07-07 02:02:30
-->

<template>
    <UeElMiniEditorPanel v-model:value="valueRef" @cancel="closePanel" @confirm="closePanel" @update="handleUpdate">
        <template #preview="value">
            <div class="w-full h-full flex justify-center items-center">
                <UeElBrowserMockupPanel :title="t('UNIT_PREVIEW_TITLE')" ref="browserMockupPanel">
                    <div :class="$style['animate-effect-area']">
                        <div :class="$style['tip-area']" class="flex items-center justify-center">
                            <div
                                :class="$style['btn--play']"
                                class="flex items-center justify-center"
                                @click="playAnimate"
                            >
                                <UeElIcon :size="20" name="icon-app-play-fill" />
                            </div>
                            <CounterNumber :class="$style['animate-dom']" :value="value.value" ref="previewDom" />
                        </div>
                    </div>
                </UeElBrowserMockupPanel>
            </div>
        </template>
        <template #editor="{ className, value, updateCloneValue }">
            {{ className }}
            {{ value }}
            {{ updateCloneValue }}
        </template>
    </UeElMiniEditorPanel>
</template>
<script lang="ts" setup>
import type { UeElCounterNumberPreviewPanelBaseProps } from "./index";

import { _debounce } from "@stone/uemo-editor-utils/lib/lodash";
import CounterNumber from "./sub-components/CounterNumber.vue";

defineOptions({ name: "UeElCounterNumberPreviewPanel" });
const _props = withDefaults(defineProps<UeElCounterNumberPreviewPanelBaseProps>(), {});

const { t } = useI18n();
const instance = getCurrentInstance();

const valueRef = defineModel<UE_TIPTAP_EXTENSION.CounterNumber["attrs"]>("value", { required: true });
const emit = defineEmits<{ (e: "close"): void }>();

const browserMockupPanel = useTemplateRef("browserMockupPanel");
const previewDomRef = useTemplateRef<InstanceType<typeof CounterNumber>>("previewDom");

const playAnimate = () => {
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
.animate-effect-area {
    .tip-area {
        position: relative;

        height: calc(var(--mock-vh) * 100);
        .animate-dom {
            @include ab-cover;
            display: flex;

            padding-bottom: 100px;

            align-items: center;
            justify-content: center;
        }
        .btn--play {
            @include circle(50px);

            position: relative;
            z-index: 10;
            top: 30px;

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
}
</style>
