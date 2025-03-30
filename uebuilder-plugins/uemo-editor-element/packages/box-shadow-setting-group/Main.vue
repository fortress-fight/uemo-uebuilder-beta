<!--
 * @Description: 投影控制器组
 * @Author: F-Stone
 * @LastEditTime: 2025-03-03 02:52:27
-->
<template>
    <UeElSettingGroup :class="$style['box-shadow-setting-group']" v-bind="settingGroup" @trigger="handleTrigger">
        <template v-if="!!valueRef" #body>
            <UeElBoxShadowSetting v-model:value="valueRef" />
        </template>
    </UeElSettingGroup>
</template>
<script lang="ts" setup>
import type { UeElBoxShadowSettingGroupBaseProps } from "./index";

defineOptions({ name: "UeElBoxShadowSettingGroup" });
const prop = withDefaults(defineProps<UeElBoxShadowSettingGroupBaseProps>(), {});
const valueRef = defineModel<string>("value", { required: false });

const { t } = useI18n();

const settingGroup = computed<UE_EL_COMPONENT.UeElSettingGroupProps>(() => {
    return {
        title: prop.title || t("UNIT_SHADOW"),
        oper: !valueRef.value ? [{ id: "add", type: "add" }] : [{ id: "remove", type: "remove" }],
    };
});

const handleTrigger = (id: string) => {
    switch (id) {
        case "add":
            valueRef.value = prop.defaultValue || "0 4px 4px 0 rgba(0,0,0,25%)";
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
.box-shadow-setting-group {
    //
}
</style>
