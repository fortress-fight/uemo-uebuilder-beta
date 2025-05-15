<!--
 * @Description: Tiptap 图片编辑面板
 * @Author: F-Stone
 * @LastEditTime: 2025-05-15 11:03:49
-->
<template>
    <UeElEditorPanel :title="t('UNIT_IMAGE')">
        <UeElTabCard v-bind="tabCardProps">
            <template #Content>
                <UeElSettingGroup>
                    <template #body>
                        <UeElControlGroup>
                            <UeElResourceSetting type="image" v-model:value="src" />
                        </UeElControlGroup>
                    </template>
                </UeElSettingGroup>
                <UeElSettingGroup>
                    <template #body>
                        <UeElControlGroup>
                            <UeElAlignSetting v-model:value="align" type="x" />
                        </UeElControlGroup>
                    </template>
                </UeElSettingGroup>
                <UeElLinkSettingGroup v-model:value="link" />
                <UeElColorSettingGroup title="遮罩" v-model:value="maskColor" type="color" />
                <UeElSettingGroup title="SEO">
                    <template #body>
                        <UeElControlGroup>
                            <UeElTextInput
                                autoTrim
                                :value="alt"
                                @confirm="alt = $event"
                                :placeholder="t('IMAGE_ALT_PLACEHOLDER')"
                            />
                        </UeElControlGroup>
                    </template>
                </UeElSettingGroup>
            </template>
            <template #Design>
                <div :class="$style['tab-2']"></div>
            </template>
            <template #Effect>
                <div :class="$style['tab-3']"></div>
            </template>
        </UeElTabCard>
    </UeElEditorPanel>
</template>
<script lang="ts" setup>
import type { UeEditorPanelTiptapImageBaseProps } from "./index";

import { useDefineObjectModel } from "@stone/uemo-editor-element/utils/model-mixin";

defineOptions({ name: "UeEditorPanelTiptapImage" });

const { t } = useI18n();
const _props = withDefaults(defineProps<UeEditorPanelTiptapImageBaseProps>(), {});

const valueModel = defineModel<UE_TIPTAP_EXTENSION.Image["attrs"]>("value", { required: true });

const tabCardProps = computed<UE_EL_COMPONENT.UeElTabCardProps>(() => {
    return {
        defaultCard: "Content",
        cards: [
            { title: "内容", name: "Content" },
            { title: "设计", name: "Design" },
            { title: "效果", name: "Effect" },
        ],
    };
});

const src = useDefineObjectModel(valueModel, {
    get: (modelValue) => modelValue.src || "",
    set: (value, modelValue) => {
        modelValue.src = value;
        return modelValue;
    },
});

const align = useDefineObjectModel(valueModel, {
    get: (modelValue) => modelValue.align || "left",
    set: (value, modelValue) => {
        modelValue.align = value;
        return modelValue;
    },
});

const link = useDefineObjectModel(valueModel, {
    get: (modelValue) => modelValue.imageLink,
    set: (value, modelValue) => {
        modelValue.imageLink = value || undefined;
        return modelValue;
    },
});

const alt = useDefineObjectModel(valueModel, {
    get: (modelValue) => modelValue.alt || "",
    set: (value, modelValue) => {
        modelValue.alt = value;
        return modelValue;
    },
});

const maskColor = useDefineObjectModel(valueModel, {
    get: (modelValue) => modelValue.imageMask || undefined,
    set: (value, modelValue) => {
        modelValue.imageMask = value;
        return modelValue;
    },
});
</script>
<style lang="scss" module>
.tiptap-image {
    //
}
</style>
