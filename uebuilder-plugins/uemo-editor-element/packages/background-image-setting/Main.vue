<!--
 * @Description: 背景图片控制器组件
 * @Author: F-Stone
 * @LastEditTime: 2025-03-21 04:14:25
-->
<template>
    <UeElEditorPanel
        :class="$style['background-image-setting']"
        :title="t('BACKGROUND_SPLINE_SETTING_TITLE', { type: t('UNIT_IMAGE') })"
        ref="rootComponent"
    >
        <!-- 图片资源设置 -->
        <UeElEditorGroup is-first ref="resourceSettingRef">
            <UeElResourceSetting
                type="image"
                :removable="false"
                v-model:value="valueRef.image"
                :pop-panel-props="popPanelProps"
            >
                <template v-if="valueRef.image" #operGroup="{ openPopPanel }">
                    <div :class="$style['oper-bar']" class="w-full grid grid-cols-3">
                        <template v-for="item in operList" :key="item.type">
                            <UeElButton
                                v-if="item.type === 'replace'"
                                v-bind="item.buttonProps"
                                @trigger="openPopPanel"
                            />
                            <UeElSelect v-else-if="item.type === 'size'" v-model:value="size" :options="sizeOptions">
                                <template #info>
                                    <UeElButton v-bind="item.buttonProps" />
                                </template>
                            </UeElSelect>
                            <UeElSelect v-else v-model:value="adjust" :options="adjustOptions">
                                <template #info>
                                    <UeElButton v-bind="item.buttonProps" />
                                </template>
                            </UeElSelect>
                        </template>
                    </div>
                </template>
            </UeElResourceSetting>
        </UeElEditorGroup>

        <!-- 对齐方式设置 -->
        <UeElEditorGroup>
            <UeElAlignSetting v-model:value="valueRef.align" />
        </UeElEditorGroup>

        <!-- 偏移设置 -->
        <UeElEditorGroup is-last>
            <UeElTranslateSetting v-model:value="valueRef.translate" />
        </UeElEditorGroup>
    </UeElEditorPanel>
</template>

<script lang="ts" setup>
import type { UeElBackgroundImageSettingBaseProps, UeElBackgroundImageSettingValue } from "./index";

import { getPopPanelParams } from "../pop-panel/utils/helper";
import UeElEditorPanel from "../editor-panel";
import UeElEditorGroup from "../editor-group";

defineOptions({ name: "UeElBackgroundImageSetting" });

/**
 * 组件属性和事件定义
 */
const { t } = useI18n();
const _props = withDefaults(defineProps<UeElBackgroundImageSettingBaseProps>(), {});

/**
 * 组件数据模型
 */
const valueRef = defineModel<UeElBackgroundImageSettingValue>("value", {
    default: () => ({}),
});

/**
 * 组件引用
 */
const resourceSettingRef = useTemplateRef<InstanceType<typeof UeElEditorGroup>>("resourceSettingRef");

/**
 * 弹窗面板配置
 */
const popPanelProps = computed<UE_EL_COMPONENT.UeElPopPanelProps>(() =>
    getPopPanelParams("editorPanel", resourceSettingRef.value?.$el)
);

/**
 * 操作列表配置
 * @description 根据当前状态生成操作按钮配置
 */
interface OperItem {
    type: "replace" | "size" | "adjust";
    buttonProps: UE_EL_COMPONENT.UeElButtonProps;
}
const operList = computed<OperItem[]>(() => {
    const SIZE_ICON_MAP = {
        normal: { icon: "icon-yuanshibeijing", text: t("BACKGROUND_REPEAT_NORMAL") },
        cover: { icon: "icon-tianchongbeijing", text: t("BACKGROUND_REPEAT_COVER") },
        contain: { icon: "icon-shiyingbeijing", text: t("BACKGROUND_REPEAT_CONTAIN") },
        repeat: { icon: "icon-chongfubeijing", text: t("BACKGROUND_REPEAT_REPEAT") },
    } as const;

    const EFFECT_TEXT_MAP = {
        normal: t("UNIT_NORMAL"),
        fixed: t("UNIT_FIXED"),
        parallax: t("UNIT_PARALLAX"),
        scroll: t("UNIT_SCROLL"),
    } as const;

    const { size: currentSize = "normal", effect = "normal" } = valueRef.value;
    const sizeConfig = SIZE_ICON_MAP[currentSize] || SIZE_ICON_MAP.normal;

    return [
        {
            type: "replace",
            buttonProps: {
                icon: { name: "icon-shangchuantupian", size: 16 },
                text: t("UNIT_REPLACE", { text: "" }),
                size: "normal",
                theme: "hoverStrokeText",
            },
        },
        {
            type: "size",
            buttonProps: {
                icon: { name: sizeConfig.icon, size: 16 },
                text: sizeConfig.text,
                size: "normal",
                theme: "hoverStrokeText",
            },
        },
        {
            type: "adjust",
            buttonProps: {
                icon: { name: "icon-tiaojie", size: 16 },
                text: EFFECT_TEXT_MAP[effect] || EFFECT_TEXT_MAP.normal,
                size: "normal",
                theme: "hoverStrokeText",
            },
        },
    ];
});

/**
 * 尺寸和效果选项
 */
const sizeOptions = computed(() => [
    { value: "normal", text: t("BACKGROUND_REPEAT_NORMAL"), icon: "icon-yuanshibeijing" },
    { value: "contain", text: t("BACKGROUND_REPEAT_CONTAIN"), icon: "icon-shiyingbeijing" },
    { value: "repeat", text: t("BACKGROUND_REPEAT_REPEAT"), icon: "icon-chongfubeijing" },
    { value: "cover", text: t("BACKGROUND_REPEAT_COVER"), icon: "icon-tianchongbeijing" },
]);
const adjustOptions = computed(() => [
    { value: "normal", text: t("UNIT_NORMAL") },
    { value: "parallax", text: t("UNIT_PARALLAX") },
    { value: "fixed", text: t("UNIT_FIXED") },
    { value: "scroll", text: t("UNIT_SCROLL") },
]);

/**
 * 尺寸和效果状态计算属性
 */
const size = computed({
    get() {
        return valueRef.value.size || "normal";
    },
    set(value) {
        valueRef.value.size = value;
    },
});

const adjust = computed({
    get() {
        return valueRef.value.effect || "normal";
    },
    set(value) {
        valueRef.value.effect = value;
    },
});
</script>

<style lang="scss" module>
.background-image-setting {
    .oper-btn {
        width: 100%;
    }
}
.oper-bar {
    gap: var(--ue-control-row-space);
}
</style>
