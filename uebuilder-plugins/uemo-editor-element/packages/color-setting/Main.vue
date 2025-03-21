<!--
 * @Description: 颜色控制器
 * @Author: F-Stone
 * @LastEditTime: 2025-03-21 12:11:36
-->
<template>
    <UeElColorInput
        ref="colorInput"
        v-model:value="valueRef"
        @trigger="openColorPickerPanel()"
        :disable-opacity="disableOpacity"
        :type="type"
        :disable="disable"
        :default-value="defaultValue"
        v-bind="$attrs"
    />
    <UeElPopPanel v-model:open="colorPickerPanelOpen" v-bind="popPanelParams">
        <UeElColorPickerPanel v-model:value="valueRef" :disable-opacity="disableOpacity" />
    </UeElPopPanel>
</template>
<script lang="ts" setup>
import type { UeElColorSettingBaseProps } from "./index";
import type { UeElColorInputInstance } from "../color-input";

import { editorGroupPopPanelPropsKey } from "../editor-group";
import { getPopPanelParams } from "../pop-panel/utils/helper";

defineOptions({ name: "UeElColorSetting" });

const prop = withDefaults(defineProps<UeElColorSettingBaseProps>(), {
    placement: "left-start",
    disableOpacity: false,
    defaultValue: "#000000",
});
const valueRef = defineModel<string>("value", { required: true });
const colorPickerPanelOpen = ref<boolean>(false);
const colorInputRef = useTemplateRef<UeElColorInputInstance>("colorInput");

const injectPopPanelProps = inject(editorGroupPopPanelPropsKey, undefined);

function openColorPickerPanel() {
    colorPickerPanelOpen.value = true;
}

const popPanelParams = computed<UE_EL_COMPONENT.UeElPopPanelProps | undefined>(() => {
    if (injectPopPanelProps?.value) return injectPopPanelProps.value;
    if (!colorInputRef.value?.rootDomRef) return undefined;
    return getPopPanelParams("editorPanel", colorInputRef.value.rootDomRef, {
        placement: prop.placement,
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
