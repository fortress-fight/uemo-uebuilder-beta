<!--
 * @Description: 日历控制器组
 * @Author: F-Stone
 * @LastEditTime: 2025-03-03 02:59:04
-->
<template>
    <UeElSettingGroup :class="$style['calender-setting-group']" v-bind="settingGroup" @trigger="handleTrigger">
        <template v-if="!!valueRef" #body>
            <UeElCalenderSetting v-model:value="valueRef" />
        </template>
    </UeElSettingGroup>
</template>
<script lang="ts" setup>
import type { UeElCalenderSettingGroupBaseProps } from "./index";

defineOptions({ name: "UeElCalenderSettingGroup" });
const prop = withDefaults(defineProps<UeElCalenderSettingGroupBaseProps>(), {});
const valueRef = defineModel<number>("value", { required: false });

const { t } = useI18n();

const settingGroup = computed<UE_EL_COMPONENT.UeElSettingGroupProps>(() => {
    return {
        title: prop.title || t("UNIT_CALENDER"),
        oper: !valueRef.value ? [{ id: "add", type: "add" }] : [{ id: "remove", type: "remove" }],
    };
});

const handleTrigger = (id: string) => {
    switch (id) {
        case "add":
            valueRef.value = new Date().getTime();
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
.calender-setting-group {
    //
}
</style>
