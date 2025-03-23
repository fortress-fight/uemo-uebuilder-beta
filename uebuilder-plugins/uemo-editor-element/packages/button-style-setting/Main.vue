<!--
 * @Description: 按钮样式设置控制器
 * @Author: F-Stone
 * @LastEditTime: 2025-03-23 18:30:19
-->
<template>
    <UeElControlGroup :class="$style['button-style-setting']" :col-count="2" ref="controlGroup">
        <UeElButton
            ref="normalBtn"
            theme="hoverStrokeText2"
            :icon="{ name: 'icon-button-normal', size: 16 }"
            :text="t('BUTTON_HOVER_STYLE_NORMAL')"
            :class="$style['oper-btn']"
            @trigger="openButtonStylePanel('normal')"
        />
        <UeElButton
            ref="hoverBtn"
            :disable="theme === 'rotate'"
            theme="hoverStrokeText2"
            :icon="{ name: 'icon-button-hover', size: 16 }"
            :text="t('BUTTON_HOVER_STYLE_HOVER')"
            :class="$style['oper-btn']"
            @trigger="openButtonStylePanel('hover')"
        />
    </UeElControlGroup>
    <UeElPopPanel v-model:open="buttonStyleSettingPanelOpen" v-bind="popPanelParams">
        <UeElButtonStyleSettingPanel
            ref="linkSettingPanelRef"
            :mode="currentEditorType"
            v-model:value="currentEditorValueRef"
        />
    </UeElPopPanel>
</template>
<script lang="ts" setup>
import type { UeElButtonStyleSettingBaseProps } from "./index";
import type { UeElButtonStyleSettingPanelValue } from "../button-style-setting-panel";

import UeElControlGroup from "../control-group";
import { settingGroupPopPanelPropsKey } from "../setting-group";
import { editorGroupPopPanelPropsKey } from "../editor-group";
import { getPopPanelParams } from "../pop-panel/utils/helper";

defineOptions({ name: "UeElButtonStyleSetting" });

const { t } = useI18n();
const _props = withDefaults(defineProps<UeElButtonStyleSettingBaseProps>(), {});

const controlGroupRef = useTemplateRef<InstanceType<typeof UeElControlGroup>>("controlGroup");
const hoverStateRef = defineModel<boolean>("hoverState");
const valueRef = defineModel<{ normal: UeElButtonStyleSettingPanelValue; hover: UeElButtonStyleSettingPanelValue }>(
    "value",
    { required: true }
);

const currentEditorType = ref<"normal" | "hover">("normal");
const currentEditorValueRef = computed({
    get: () => {
        return currentEditorType.value === "normal" ? valueRef.value.normal : valueRef.value.hover;
    },
    set: (value) => {
        if (currentEditorType.value === "normal") {
            valueRef.value.normal = value;
        } else {
            valueRef.value.hover = value;
        }
    },
});
const buttonStyleSettingPanelOpen = ref(false);
function openButtonStylePanel(type: "normal" | "hover") {
    currentEditorType.value = type;
    buttonStyleSettingPanelOpen.value = true;
}

watch([buttonStyleSettingPanelOpen, currentEditorType], ([open, type]) => {
    hoverStateRef.value = open && type === "hover";
});

const injectSettingGroupPopPanelProps = inject(settingGroupPopPanelPropsKey, undefined);
const injectEditorGroupPopPanelProps = inject(editorGroupPopPanelPropsKey, undefined);

/**
 * 弹窗位置配置
 */
const popPanelParams = computed<UE_EL_COMPONENT.UeElPopPanelProps | undefined>(() => {
    if (injectSettingGroupPopPanelProps?.value) return injectSettingGroupPopPanelProps.value;
    if (injectEditorGroupPopPanelProps?.value) return injectEditorGroupPopPanelProps.value;

    if (!controlGroupRef.value?.$el) return undefined;
    return getPopPanelParams("editorPanel", controlGroupRef.value.$el);
});
</script>
<style lang="scss" module>
.button-style-setting {
    width: 100%;
}
</style>
