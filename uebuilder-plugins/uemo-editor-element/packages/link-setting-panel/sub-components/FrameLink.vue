<!--
 * @Description: 弹窗链接设置组件
 * @Author: F-Stone
 * @LastEditTime: 2025-03-23 01:08:39
-->
<template>
    <UeElSettingGroup :class="$style['frame-link']" :title="t('LINK_FRAME_CONTENT_TITLE')">
        <template #body>
            <UeElControlGroup :col-count="3">
                <UeElButton
                    v-for="(item, index) in linkTypeOptions"
                    :key="index"
                    :theme="linkType === item.value ? 'fillText' : 'strokeText'"
                    :icon="{ name: item.icon, size: 16 }"
                    :text="item.text"
                    :class="$style['oper-btn']"
                    @trigger="handleLinkTypeChange(item.value)"
                />
            </UeElControlGroup>
            <UeElTextInput
                v-if="linkType === 'link'"
                :auto-trim="true"
                theme="enterText"
                :value="normalLink"
                :placeholder="t('LINK_VIDEO_INPUT_TIP')"
                @confirm="handleNormalLinkChange"
            />
            <UeElResourceSetting type="image" v-if="linkType === 'image'" v-model:value="imageLink" />
            <UeElResourceSetting type="video" v-if="linkType === 'video'" v-model:value="videoLink" />
        </template>
    </UeElSettingGroup>

    <!-- 弹窗设置 -->
    <UeElSettingGroup :title="t('LINK_FRAME_SETTING_TITLE')">
        <template #body>
            <UeElNumberInput v-bind="widthInputProps" v-model:value="popLayerWidth" />
        </template>
    </UeElSettingGroup>

    <slot />

    <!-- 提示信息 -->
    <UeElSettingGroup :title="t('UNIT_TIP')">
        <template #body>
            <UeElTipGroup v-bind="tipMessage" />
        </template>
    </UeElSettingGroup>
</template>

<script lang="ts" setup>
import type { UeElLinkSettingPanelValue } from "../index";
import { isImageReg, isVideoReg } from "@stone/uemo-editor-utils/lib/utils";

import { useDefineObjectModel } from "@stone/uemo-editor-element/utils/model-mixin";

defineOptions({ name: "UeElFrameLink" });

/**
 * 组件配置常量
 */
const DEFAULT_WIDTH = "500px";

/**
 * 类型定义
 */
type LinkType = "link" | "image" | "video";

interface LinkTypeOption {
    text: string;
    value: LinkType;
    icon: string;
}

/**
 * 组件状态和工具函数
 */
const { t } = useI18n();
const valueRef = defineModel<UeElLinkSettingPanelValue>("value", { required: true });

/**
 * 响应式状态
 */
const linkType = ref<LinkType>("link");
const normalLink = useDefineObjectModel(valueRef, {
    get(modelValue) {
        if (linkType.value !== "link") return "";
        return modelValue.link;
    },
    set(value, modelValue) {
        modelValue.link = value;
        return modelValue;
    },
});
const imageLink = useDefineObjectModel(valueRef, {
    get(modelValue) {
        if (linkType.value !== "image") return "";
        return modelValue.link;
    },
    set(value, modelValue) {
        modelValue.link = value;
        return modelValue;
    },
});
const videoLink = useDefineObjectModel(valueRef, {
    get(modelValue) {
        if (linkType.value !== "video") return "";
        return modelValue.link;
    },
    set(value, modelValue) {
        modelValue.link = value;
        return modelValue;
    },
});

/**
 * 链接类型选项
 */
const linkTypeOptions = computed<LinkTypeOption[]>(() => [
    { text: t("LINK_WEBSITE"), value: "link", icon: "icon-app-link-14" },
    { text: t("LINK_IMAGE"), value: "image", icon: "icon-app-image-14" },
    { text: t("LINK_VIDEO"), value: "video", icon: "icon-app-video-14" },
]);

/**
 * 宽度输入配置
 */
const widthInputProps = computed<UE_EL_COMPONENT.UeElNumberInputProps>(() => ({
    limit: { px: [20, Infinity], vw: [5, 100] },
    units: [
        { value: "px", text: "px", default: 500 },
        { value: "vw", text: "vw", default: 50 },
    ],
    title: { text: t("UNIT_WIDTH") },
}));

/**
 * 弹窗宽度
 */
const popLayerWidth = useDefineObjectModel(valueRef, {
    get(modelValue) {
        if (modelValue.type !== "frame") return;
        return modelValue.popLayer?.width || DEFAULT_WIDTH;
    },
    set(value, modelValue) {
        if (modelValue.type !== "frame") return;
        modelValue.popLayer = { ...modelValue.popLayer, width: value };
        return modelValue;
    },
});

/**
 * 提示信息配置
 */
const tipMessage = computed<UE_EL_COMPONENT.UeElTipGroupProps>(() => ({
    tips: [`${t("LINK_FRAME_TIP")}`],
}));

/**
 * 方法
 */
function handleLinkTypeChange(type: LinkType) {
    linkType.value = type;
}

function handleNormalLinkChange(event: string) {
    normalLink.value = event;
}

/**
 * 更新link面板
 */
function updateLinkPanel() {
    const link = valueRef.value.link;
    if (isImageReg.test(link)) {
        linkType.value = "image";
        imageLink.value = link;
    } else if (isVideoReg.test(link)) {
        linkType.value = "video";
        videoLink.value = link;
    } else {
        linkType.value = "link";
        normalLink.value = link;
    }
}

/**
/**
 * 生命周期钩子
 */
onBeforeMount(() => {
    updateLinkPanel();
});
</script>

<style lang="scss" module>
.frame-link {
    //
}
</style>
