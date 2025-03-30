<!--
 * @Description: 滚动效果属性控制组
 * @Author: F-Stone
 * @LastEditTime: 2025-03-31 01:34:15
-->
<template>
    <UeElSettingGroup
        :class="$style['scroll-effect-setting-group']"
        v-bind="settingGroup"
        @trigger="handleTrigger"
        ref="rootComponentRef"
    >
        <template v-if="!!valueRef && valueRef.type" #body>
            <UeElSelect v-model:value="effectType" :title="t('UNIT_MODE')" :options="enableEffectOptions" />
            <UeElControlGroup :col-count="2">
                <UeElButton
                    v-if="effectType"
                    theme="strokeText"
                    :text="t('SCROLL_SETTING_TITLE')"
                    @trigger="openLinkSettingPanel"
                />
                <UeElButton
                    v-if="effectType"
                    theme="strokeText"
                    :text="t('SCROLL_SETTING_PREVIEW_TITLE')"
                    @trigger="openPreviewSettingPanel"
                />
            </UeElControlGroup>
        </template>
    </UeElSettingGroup>
    <UeElPopPanel v-model:open="settingPanelOpen" v-bind="settingPanelParams">
        <UeElScrollEffectSettingPanel ref="scrollEffectSettingPanelRef" v-if="valueRef" v-model:value="valueRef" />
    </UeElPopPanel>
    <UeElPopPanel v-model:open="previewPanelOpen" v-bind="previewPanelParams">
        <UeElScrollEffectPreviewPanel v-if="valueRef" v-model:value="valueRef" @close="previewPanelOpen = false" />
    </UeElPopPanel>
</template>
<script lang="ts" setup>
import type { UeElScrollEffectSettingGroupBaseProps } from "./index";
import type { UeElScrollEffectSettingPanelValue } from "../scroll-effect-setting-panel";

import UeElSettingGroup from "../setting-group";
import { getPopPanelParams } from "../pop-panel/utils/helper";
import UeElScrollEffectSettingPanel from "../scroll-effect-setting-panel";
import UeElScrollEffectPreviewPanel from "./sub-components/PreviewPanel.vue";

import { usePopPanelParam } from "../../utils/pop-panel-mixin";

defineOptions({ name: "UeElScrollEffectSettingGroup" });

const { t } = useI18n();

const props = withDefaults(defineProps<UeElScrollEffectSettingGroupBaseProps>(), {
    defaultValue: () => ({ type: "opacity", options: {} }),
    allowRemove: true,
});
const valueRef = defineModel<UeElScrollEffectSettingPanelValue>("value", { required: false });
const rootComponentRef = useTemplateRef<InstanceType<typeof UeElSettingGroup>>("rootComponentRef");
const scrollEffectSettingPanelRef =
    useTemplateRef<InstanceType<typeof UeElScrollEffectSettingPanel>>("scrollEffectSettingPanelRef");

/**
 * 设置组的配置属性，包含标题和操作按钮
 * @returns {UE_EL_COMPONENT.UeElSettingGroupProps} 设置组的配置对象
 */
const settingGroup = computed<UE_EL_COMPONENT.UeElSettingGroupProps>(() => {
    return {
        title: t("SCROLL_EFFECT_SETTING_TITLE"),
        oper: props.allowRemove
            ? !valueRef.value
                ? [{ id: "add", type: "add" }]
                : [{ id: "remove", type: "remove" }]
            : undefined,
    };
});

/**
 * 处理设置组的触发事件
 * @param {string} id - 触发事件的ID，用于识别不同的操作类型
 */
const handleTrigger = (id: string) => {
    switch (id) {
        case "add":
            valueRef.value = props.defaultValue;
            break;

        case "remove":
            valueRef.value = undefined;
            break;

        default:
            break;
    }
};

/**
 * 效果类型的计算属性，用于双向绑定滚动效果的类型
 * @returns {ComputedRef<string | undefined>} 当前选中的效果类型
 */
const effectType = computed({
    get() {
        return valueRef.value?.type;
    },
    set(v) {
        if (!v || v === valueRef.value?.type) return;
        valueRef.value = { type: v, options: {} };
    },
});

/**
 * 可用的效果选项列表
 * @returns {UE_EL_COMPONENT.UeElSelectProps["options"]} 过滤后的效果选项数组
 */
const enableEffectOptions = computed<UE_EL_COMPONENT.UeElSelectProps["options"]>(() => {
    const effectOptions = [
        { text: t("SCROLL_EFFECT_SETTING_OPTION_TITLE"), value: "opacity" },
        { text: t("SCROLL_EFFECT_SETTING_ROTATE_TITLE"), value: "rotate" },
        { text: t("SCROLL_EFFECT_SETTING_PARALLAX_TITLE"), value: "parallax" },
        { text: t("SCROLL_EFFECT_SETTING_FIXED_TITLE"), value: "fixed" },
        { text: t("SCROLL_EFFECT_SETTING_STICKY_TITLE"), value: "sticky" },
        { text: t("SCROLL_EFFECT_SETTING_SCALE_TITLE"), value: "scale" },
        { text: t("SCROLL_EFFECT_SETTING_TRANSLATE_TITLE"), value: "translate" },
        { text: t("SCROLL_EFFECT_SETTING_IMAGE_PARALLAX_TITLE"), value: "image-parallax" },
    ];

    return effectOptions.filter((item) => {
        if (props.enableType) {
            return props.enableType.includes(item.value);
        }
        return true;
    });
});

const settingPanelOpen = ref(false);
function openLinkSettingPanel() {
    settingPanelOpen.value = true;
}
const previewPanelOpen = ref(false);
function openPreviewSettingPanel() {
    previewPanelOpen.value = true;
}

/**
 * 弹窗位置配置的计算属性
 * @returns {UE_EL_COMPONENT.UeElPopPanelProps | undefined} 弹窗的位置和样式配置
 */
const settingPanelParams = usePopPanelParam(computed(() => rootComponentRef.value?.$el));
const previewPanelParams = computed(() => {
    return getPopPanelParams("centerPanel", rootComponentRef.value?.$el);
});
</script>
<style lang="scss" module>
.scroll-effect-setting-group {
    //
}
</style>
