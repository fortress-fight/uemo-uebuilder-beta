<!--
 * @Description: 按钮样式设置控制器
 * @Author: F-Stone
 * @LastEditTime: 2025-05-09 17:41:44
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

import { useDefineObjectModel } from "../../utils/model-mixin";
import { usePopPanelParam } from "../../utils/pop-panel-mixin";
import UeElControlGroup from "../control-group";

defineOptions({ name: "UeElButtonStyleSetting" });

const { t } = useI18n();
const _props = withDefaults(defineProps<UeElButtonStyleSettingBaseProps>(), {});
const emit = defineEmits<{ (e: "changeHoverState", value: boolean): void }>();

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
            normalStyle.value = value;
        } else {
            hoverStyle.value = value;
        }
    },
});

const normalStyle = useDefineObjectModel(valueRef, {
    get: (modelValue) => modelValue.normal || {},
    set: (value, modelValue) => {
        modelValue.normal = value;
        return modelValue;
    },
});

const hoverStyle = useDefineObjectModel(valueRef, {
    get: (modelValue) => modelValue.hover || {},
    set: (value, modelValue) => {
        modelValue.hover = value;
        return modelValue;
    },
});

const buttonStyleSettingPanelOpen = ref(false);
function openButtonStylePanel(type: "normal" | "hover") {
    currentEditorType.value = type;
    buttonStyleSettingPanelOpen.value = true;
}

watch(
    () => {
        return buttonStyleSettingPanelOpen.value && currentEditorType.value === "hover";
    },
    (isHover) => {
        hoverStateRef.value = isHover;
        emit("changeHoverState", isHover);
    }
);

/**
 * 弹窗位置配置
 */
const popPanelParams = usePopPanelParam(computed(() => controlGroupRef.value?.$el));
</script>
<style lang="scss" module>
.button-style-setting {
    width: 100%;
}
</style>
