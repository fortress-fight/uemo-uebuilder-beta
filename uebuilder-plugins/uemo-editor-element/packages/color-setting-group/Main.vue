<!--
 * @Description: 颜色控制器组
 * @Author: F-Stone
 * @LastEditTime: 2025-03-03 02:21:57
-->
<template>
    <UeElSettingGroup :class="$style['color-setting-group']" v-bind="settingGroup" @trigger="handleTrigger">
        <template v-if="!!valueRef" #body>
            <UeElColorSetting v-model:value="valueRef" :type="type" />
        </template>
    </UeElSettingGroup>
</template>
<script lang="ts" setup>
import type { UeElColorSettingGroupBaseProps } from "./index";

defineOptions({ name: "UeElColorSettingGroup" });
const prop = withDefaults(defineProps<UeElColorSettingGroupBaseProps>(), { type: "color" });
const valueRef = defineModel<string>("value", { required: false });

const { t } = useI18n();

const settingGroup = computed<UE_EL_COMPONENT.UeElSettingGroupProps>(() => {
    return {
        title: prop.title || t("UNIT_COLOR"),
        oper: !valueRef.value ? [{ id: "addColor", type: "add" }] : [{ id: "removeColor", type: "remove" }],
    };
});

const handleTrigger = (id: string) => {
    switch (id) {
        case "addColor":
            valueRef.value = prop.defaultValue || "#000000";
            break;

        case "removeColor":
            valueRef.value = undefined;
            break;

        default:
            break;
    }
};
</script>
<style lang="scss" module>
.color-setting-group {
    //
}
</style>
