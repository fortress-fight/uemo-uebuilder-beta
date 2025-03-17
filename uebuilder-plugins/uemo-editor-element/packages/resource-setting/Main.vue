<!--
 * @Description: 资源设置组件
 * @Author: F-Stone
 * @LastEditTime: 2025-03-18 03:49:01
-->
<template>
    <div :class="$style['resource-setting-panel']" ref="rootDom" class="w-full grid">
        <template v-if="isResourcePreviewAttrs(valueRef)">
            <UeElResourcePreview v-if="isResourcePreviewType(type)" :type="type" :attrs="valueRef" />
        </template>
        <div class="flex gap-2 w-full" :class="$style['resource-setting']">
            <UeElButton
                class="w-full"
                v-bind="resourceButtonConfig[type]"
                size="normal"
                theme="strokeText"
                :class="$style['oper-btn']"
                @trigger="openPopPanel"
            />
            <UeElButton
                v-if="valueRef && removable"
                class="w-full"
                size="normal"
                :text="t('UNIT_REMOVE')"
                theme="strokeText"
                :class="$style['oper-btn']"
                :icon="{ name: 'icon-shanchu', size: 16 }"
                @trigger="handleRemove"
            />
        </div>
        <UeElPopPanel v-model:open="popPanelOpen" :panel="popPanelParams" :draggable="true">
            <component
                :is="resourceComponents[type]"
                v-if="type && resourceComponents[type]"
                @update:select="handleResourceSelect"
            />
        </UeElPopPanel>
    </div>
</template>

<script lang="ts" setup>
import type { UeElResourceSettingBaseProps, ResourceValue } from "./index";

import { isResourcePreviewType, isResourcePreviewAttrs } from "../resource-preview";

const { t } = useI18n();
defineOptions({ name: "UeElResourceSetting" });

/**
 * 组件属性定义
 */
const _props = withDefaults(defineProps<UeElResourceSettingBaseProps>(), { removable: true });

const rootDomRef = useTemplateRef("rootDom");

/**
 * 资源值的双向绑定
 */
const valueRef = defineModel<ResourceValue>("value", { required: false });

/**
 * 资源类型对应的按钮配置
 */
const resourceButtonConfig = computed(() => {
    const hasAttr = !!valueRef.value;
    return {
        button: {
            icon: { name: "icon-button-normal", size: 16 },
            text: hasAttr ? t("UNIT_SELECT", { text: t("UNIT_BUTTON") }) : t("UNIT_ADD", { text: t("UNIT_BUTTON") }),
        },
        video: {
            icon: { name: "icon-app-video", size: 16 },
            text: hasAttr ? t("UNIT_REPLACE", { text: t("UNIT_VIDEO") }) : t("UNIT_ADD", { text: t("UNIT_VIDEO") }),
        },
        spline: {
            icon: { name: "icon-app-spline", size: 16 },
            text: hasAttr ? t("UNIT_REPLACE", { text: "Spline" }) : t("UNIT_ADD", { text: "Spline" }),
        },
        image: {
            icon: { name: "icon-shangchuantupian", size: 16 },
            text: hasAttr ? t("UNIT_REPLACE", { text: t("UNIT_IMAGE") }) : t("UNIT_ADD", { text: t("UNIT_IMAGE") }),
        },
        icon: {
            icon: { name: "icon-app-icon", size: 16 },
            text: hasAttr ? t("UNIT_REPLACE", { text: t("UNIT_ICON") }) : t("UNIT_ADD", { text: t("UNIT_ICON") }),
        },
        lottie: {
            icon: { name: "icon-app-lottie", size: 16 },
            text: hasAttr ? t("UNIT_REPLACE", { text: "Lottie" }) : t("UNIT_ADD", { text: "Lottie" }),
        },
        svg: {
            icon: { name: "icon-app-svg", size: 16 },
            text: hasAttr ? t("UNIT_REPLACE", { text: "SVG" }) : t("UNIT_ADD", { text: "SVG" }),
        },
        shareIcon: {
            icon: { name: "icon-app-share", size: 16 },
            text: hasAttr
                ? t("UNIT_REPLACE", { text: t("UNIT_SHARE_ICON") })
                : t("UNIT_ADD", { text: t("UNIT_SHARE_ICON") }),
        },
        textDecoration: {
            icon: { name: "icon-app-svg-line", size: 16 },
            text: hasAttr ? t("UNIT_REPLACE", { text: t("UNIT_EFFECT") }) : t("UNIT_ADD", { text: t("UNIT_EFFECT") }),
        },
        buttonHoverEffect: {
            icon: { name: "icon-app-animation", size: 16 },
            text: hasAttr ? t("UNIT_REPLACE", { text: t("UNIT_EFFECT") }) : t("UNIT_ADD", { text: t("UNIT_EFFECT") }),
        },
    } as const;
});

/**
 * 资源类型对应的组件映射
 */
const resourceComponents = {
    button: "UeElButtonLibraryPanel",
    image: "UeElImageLibraryPanel",
    video: "UeElVideoLibraryPanel",
    spline: "UeElSplineLibraryPanel",
    icon: "UeElIconLibraryPanel",
    lottie: "UeElLottieLibraryPanel",
    svg: "UeElSvgLibraryPanel",
    shareIcon: "UeElShareIconLibraryPanel",
    textDecoration: "UeElTextDecorationLibraryPanel",
    buttonHoverEffect: "UeElButtonHoverEffectLibraryPanel",
} as const;

const popPanelOpen = ref<boolean>(false);

/**
 * 打开资源选择面板
 */
function openPopPanel(): void {
    popPanelOpen.value = true;
}

/**
 * 处理资源移除
 */
function handleRemove(): void {
    valueRef.value = undefined;
}

/**
 * 统一处理资源选择
 * @param value - 选中的资源值
 */
function handleResourceSelect(value?: ResourceValue): void {
    valueRef.value = value;
}

/**
 * 弹窗位置配置
 */
const popPanelParams = computed<UE_EL_COMPONENT.UeElPopPanelProps["panel"]>(() => {
    const domRef = rootDomRef.value;
    if (!domRef) return;

    return {
        position: {
            refEl: domRef,
            options: {
                placement: "left-start",
                middleware: [
                    ["flip", { crossAxis: false }],
                    ["offset", { mainAxis: 10 }],
                    ["shift", { crossAxis: true, padding: 17 }],
                ],
            },
        },
    };
});
</script>

<style lang="scss" module>
.resource-setting-panel {
    gap: var(--ue-control-col-space);
}
.resource-setting {
    // 资源设置组件样式
}
</style>
