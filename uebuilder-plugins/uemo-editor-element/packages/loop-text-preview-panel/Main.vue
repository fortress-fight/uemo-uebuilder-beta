<!--
 * @Description: 循环文字预览面板
 * @Author: F-Stone
 * @LastEditTime: 2025-07-10 11:07:34
-->
<template>
    <UeElMiniEditorPanel v-model:value="valueRef" @cancel="closePanel" @confirm="closePanel" @update="handleUpdate">
        <template #preview="value">
            <div class="w-full h-full flex justify-center items-center">
                <UeElBrowserMockupPanel :title="t('UNIT_PREVIEW_TITLE')" ref="browserMockupPanel">
                    <div :class="$style['animate-effect-area']" class="flex items-center justify-center h-full">
                        <LoopText :class="$style['animate-dom']" :value="value.value" ref="previewDom" />
                    </div>
                </UeElBrowserMockupPanel>
            </div>
        </template>
        <template #editor="{ className, value, updateCloneValue }">
            <div class="flex flex-col gap-2 w-full whitespace-pre-wrap">
                {{ className }}
                {{ value }}
                {{ updateCloneValue }}
            </div>
        </template>
    </UeElMiniEditorPanel>
</template>
<script lang="ts" setup>
import type { UeElLoopTextPreviewPanelBaseProps } from "./index";

import { _debounce } from "@stone/uemo-editor-utils/lib/lodash";
import LoopText from "./sub-components/LoopText.vue";

defineOptions({ name: "UeElLoopTextPreviewPanel" });
const _props = withDefaults(defineProps<UeElLoopTextPreviewPanelBaseProps>(), {});

const valueRef = defineModel<UE_TIPTAP_EXTENSION.LoopText["attrs"]>("value", { required: true });
const emit = defineEmits<{ (e: "close"): void }>();

const browserMockupPanel = useTemplateRef("browserMockupPanel");
const previewDomRef = useTemplateRef<InstanceType<typeof LoopText>>("previewDom");

const { t } = useI18n();
const instance = getCurrentInstance();

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
</script>
<style lang="scss" module>
.loop-text-preview-panel {
    //
}
</style>
