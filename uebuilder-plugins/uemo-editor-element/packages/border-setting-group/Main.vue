<!--
 * @Description: 边框控制器组
 * @Author: F-Stone
 * @LastEditTime: 2025-03-03 02:30:03
-->
<template>
    <UeElSettingGroup :class="$style['border-setting-group']" v-bind="settingGroup" @trigger="handleTrigger">
        <template v-if="!!valueRef" #body>
            <UeElBorderSetting v-model:value="valueRef" />
        </template>
    </UeElSettingGroup>
</template>
<script lang="ts" setup>
import type { UeElBorderSettingGroupBaseProps } from "./index";

defineOptions({ name: "UeElBorderSettingGroup" });
const prop = withDefaults(defineProps<UeElBorderSettingGroupBaseProps>(), {});
const valueRef = defineModel<UE_EL_UTIL.BorderValue>("value", { required: false });

const { t } = useI18n();

const settingGroup = computed<UE_EL_COMPONENT.UeElSettingGroupProps>(() => {
    return {
        title: prop.title || t("UNIT_BORDER"),
        oper: !valueRef.value ? [{ id: "addBorder", type: "add" }] : [{ id: "removeBorder", type: "remove" }],
    };
});

const handleTrigger = (id: string) => {
    switch (id) {
        case "addBorder":
            valueRef.value = prop.defaultValue || { width: "1px", color: "#000000", style: "solid" };
            break;

        case "removeBorder":
            valueRef.value = undefined;
            break;

        default:
            break;
    }
};
</script>
<style lang="scss" module>
.border-setting-group {
    //
}
</style>
