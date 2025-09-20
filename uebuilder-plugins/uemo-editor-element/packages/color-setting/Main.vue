<!--
 * @Description: 颜色控制器
 * @Author: F-Stone
 * @LastEditTime: 2025-03-31 01:33:12
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

import { usePopPanelParam } from "../../utils/pop-panel-mixin";

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

function openColorPickerPanel() {
    colorPickerPanelOpen.value = true;
}

const popPanelParams = usePopPanelParam(
    computed(() => colorInputRef.value?.rootDomRef),
    {
        process(result) {
            if (typeof result.panel?.position !== "object") return result;
            if (result.panel?.position?.options) {
                result.panel.position.options.placement = props.placement;
                result.panel.position.options.middleware = [
                    ["flip", { crossAxis: false }],
                    ["offset", { crossAxis: -100, mainAxis: 10 }],
                    ["shift", { crossAxis: true, padding: 17 }],
                ];
            }
            return result;
        },
    }
);
</script>
<style lang="scss" module>
.color-setting {
    //
}
</style>
