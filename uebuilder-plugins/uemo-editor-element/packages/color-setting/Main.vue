<!--
 * @Description: 颜色控制器
 * @Author: F-Stone
 * @LastEditTime: 2025-03-02 18:51:13
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
    <UeElPopPanel v-model:open="colorPickerPanelOpen" :panel="popPanelParams" :draggable="true">
        <UeElColorPickerPanel v-model:value="valueRef" :disable-opacity="disableOpacity" />
    </UeElPopPanel>
</template>
<script lang="ts" setup>
import type { UeElColorSettingBaseProps } from "./index";
import type { UeElColorInputInstance } from "../color-input";

defineOptions({ name: "UeElColorSetting" });

const prop = withDefaults(defineProps<UeElColorSettingBaseProps>(), {
    placement: "left-start",
    disableOpacity: false,
});
const valueRef = defineModel<string>("value", { required: true });
const colorPickerPanelOpen = ref<boolean>(false);
const colorInputRef = useTemplateRef<UeElColorInputInstance>("colorInput");

function openColorPickerPanel() {
    colorPickerPanelOpen.value = true;
}

const popPanelParams = computed<UE_EL_COMPONENT.UeElPopPanelProps["panel"]>(() => {
    const domRef = colorInputRef.value?.rootDomRef;

    if (!domRef) return;

    return {
        position: {
            refEl: domRef,
            options: {
                placement: prop.placement,
                middleware: [
                    ["flip", { crossAxis: false }],
                    ["offset", { crossAxis: -100 }],
                    ["shift", { crossAxis: true, padding: 17 }],
                ],
            },
        },
    };
});
</script>
<style lang="scss" module>
.color-setting {
    //
}
</style>
