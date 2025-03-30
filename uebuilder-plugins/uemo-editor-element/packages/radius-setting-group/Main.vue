<!--
 * @Description: 圆角控制器组
 * @Author: F-Stone
 * @LastEditTime: 2025-03-03 02:47:50
-->
<template>
    <UeElSettingGroup :class="$style['border-radius-setting-group']" v-bind="settingGroup" @trigger="handleTrigger">
        <template v-if="!!valueRef" #body>
            <UeElRadiusSetting v-model:value="valueRef" />
        </template>
    </UeElSettingGroup>
</template>
<script lang="ts" setup>
import type { UeElRadiusSettingGroupBaseProps } from "./index";

defineOptions({ name: "UeElRadiusSettingGroup" });
const prop = withDefaults(defineProps<UeElRadiusSettingGroupBaseProps>(), {});
const valueRef = defineModel<string>("value", { required: false });

const { t } = useI18n();

const settingGroup = computed<UE_EL_COMPONENT.UeElSettingGroupProps>(() => {
    return {
        title: prop.title || t("UNIT_RADIUS"),
        oper: !valueRef.value ? [{ id: "add", type: "add" }] : [{ id: "remove", type: "remove" }],
    };
});

const handleTrigger = (id: string) => {
    switch (id) {
        case "add":
            valueRef.value = prop.defaultValue || "10px";
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
.border-radius-setting-group {
    //
}
</style>
