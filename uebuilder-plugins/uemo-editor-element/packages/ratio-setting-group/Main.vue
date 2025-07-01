<!--
 * @Description: 比例调节组
 * @Author: F-Stone
 * @LastEditTime: 2025-06-07 14:50:20
-->
<template>
    <UeElSettingGroup :class="$style['width-setting-group']" v-bind="settingGroup" @trigger="handleTrigger">
        <template v-if="!!valueRef" #body>
            <UeElSelect v-bind="ratioOptions" v-model:value="valueRef" />
        </template>
    </UeElSettingGroup>
</template>
<script lang="ts" setup>
import type { UeElRatioSettingGroupBaseProps } from "./index";

defineOptions({ name: "UeElRatioSettingGroup" });
const prop = withDefaults(defineProps<UeElRatioSettingGroupBaseProps>(), {
    defaultValue: "1-1",
});
const valueRef = defineModel<string>("value", { required: false });

const { t } = useI18n();

const settingGroup = computed<UE_EL_COMPONENT.UeElSettingGroupProps>(() => {
    return {
        title: t("UNIT_RATIO"),
        oper: !valueRef.value ? [{ id: "add", type: "add" }] : [{ id: "remove", type: "remove" }],
    };
});

const ratioOptions = computed<UE_EL_COMPONENT.UeElSelectProps>(() => {
    return {
        options: [
            { value: "1-1", text: "1:1" },
            { value: "3-4", text: "3:4" },
            { value: "4-3", text: "4:3" },
            { value: "9-16", text: "9:16" },
            { value: "16-9", text: "16:9" },
        ],
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
.ratio-setting-group {
    //
}
</style>
