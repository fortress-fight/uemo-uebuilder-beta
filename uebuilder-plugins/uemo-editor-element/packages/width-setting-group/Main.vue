<!--
 * @Description: 宽度控制器组
 * @Author: F-Stone
 * @LastEditTime: 2025-06-06 15:46:27
-->
<template>
    <UeElSettingGroup :class="$style['width-setting-group']" v-bind="settingGroup" @trigger="handleTrigger">
        <template v-if="!!valueRef" #body>
            <UeElNumberInput v-bind="numberInputProps" v-model:value="valueRef" />
        </template>
    </UeElSettingGroup>
</template>
<script lang="ts" setup>
import type { UeElWidthSettingGroupBaseProps } from "./index";

defineOptions({ name: "UeElWidthSettingGroup" });
const prop = withDefaults(defineProps<UeElWidthSettingGroupBaseProps>(), {
    defaultValue: "100%",
    numberInputProps: () => ({
        limit: { px: [20, Infinity], "%": [5, 100] },
        units: [
            { value: "px", text: "px", default: 200 },
            { value: "%", text: "%", default: 100 },
        ],
    }),
});
const valueRef = defineModel<string>("value", { required: false });

const { t } = useI18n();

const settingGroup = computed<UE_EL_COMPONENT.UeElSettingGroupProps>(() => {
    return {
        title: prop.title || t("UNIT_WIDTH"),
        oper: !valueRef.value ? [{ id: "add", type: "add" }] : [{ id: "remove", type: "remove" }],
    };
});

const handleTrigger = (id: string) => {
    switch (id) {
        case "add":
            valueRef.value = prop.defaultValue;
            break;

        case "remove":
            valueRef.value = undefined;
            break;

        default:
            break;
    }
};
</script>
<style lang="scss" module>
.width-setting-group {
    //
}
</style>
