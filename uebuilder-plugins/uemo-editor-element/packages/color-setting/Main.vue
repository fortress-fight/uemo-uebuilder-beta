<!--
 * @Description: 颜色控制器
 * @Author: F-Stone
 * @LastEditTime: 2025-03-25 12:29:49
-->
<template>
    <UeElColorInput
        ref="colorInput"
        v-model:value="valueRef"
        @trigger="openColorPickerPanel()"
        :type="type"
        :disable="disable"
        :default-value="defaultValue"
        v-bind="$attrs"
        :independent-opacity-control="independentOpacityControl"
        :pure-color="pureColor"
    />
    <UeElPopPanel v-model:open="colorPickerPanelOpen" v-bind="popPanelParams">
        <UeElColorPickerPanel v-model:value="valueRef" :pure-color="colorPickerPanelPureColor" :type="type" />
    </UeElPopPanel>
</template>
<script lang="ts" setup>
import type { UeElColorSettingBaseProps } from "./index";
import type { UeElColorInputInstance } from "../color-input";

import { settingGroupPopPanelPropsKey } from "../setting-group";
import { editorGroupPopPanelPropsKey } from "../editor-group";
import { getPopPanelParams } from "../pop-panel/utils/helper";

defineOptions({ name: "UeElColorSetting" });

const props = withDefaults(defineProps<UeElColorSettingBaseProps>(), {
    placement: "left-start",
    defaultValue: "#000000",
    pureColor: false,
    independentOpacityControl: false,
});
const valueRef = defineModel<string>("value", { required: true });
const colorPickerPanelOpen = ref<boolean>(false);
const colorInputRef = useTemplateRef<UeElColorInputInstance>("colorInput");
const colorPickerPanelPureColor = computed<boolean | UE_EL_UTIL.ColorType[]>(() => {
    if (props.pureColor) {
        return true;
    }

    if (props.independentOpacityControl) {
        return ["color"] as const;
    }

    return false;
});

const injectSettingGroupPopPanelProps = inject(settingGroupPopPanelPropsKey, undefined);
const injectEditorGroupPopPanelProps = inject(editorGroupPopPanelPropsKey, undefined);

function openColorPickerPanel() {
    colorPickerPanelOpen.value = true;
}

const popPanelParams = computed<UE_EL_COMPONENT.UeElPopPanelProps | undefined>(() => {
    if (injectSettingGroupPopPanelProps?.value) return injectSettingGroupPopPanelProps.value;
    if (injectEditorGroupPopPanelProps?.value) return injectEditorGroupPopPanelProps.value;

    if (!colorInputRef.value?.rootDomRef) return undefined;
    return getPopPanelParams("editorPanel", colorInputRef.value.rootDomRef, {
        placement: props.placement,
        middleware: [
            ["flip", { crossAxis: false }],
            ["offset", { crossAxis: -100, mainAxis: 10 }],
            ["shift", { crossAxis: true, padding: 17 }],
        ],
    });
});
</script>
<style lang="scss" module>
.color-setting {
    //
}
</style>
