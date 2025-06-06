<!--
 * @Description: 内间距控制器组
 * @Author: F-Stone
 * @LastEditTime: 2025-06-06 16:08:01
-->
<template>
    <UeElSettingGroup :class="$style['padding-setting-group']" v-bind="settingGroup" @trigger="handleTrigger">
        <template v-if="!!valueRef" #body>
            <UeElPaddingSetting v-model:value="valueRef" v-bind="paddingSettingProps" />
        </template>
    </UeElSettingGroup>
</template>
<script lang="ts" setup>
import type { UeElPaddingSettingGroupBaseProps } from "./index";

defineOptions({ name: "UeElPaddingSettingGroup" });
const prop = withDefaults(defineProps<UeElPaddingSettingGroupBaseProps>(), {
    defaultValue: "10px",
    paddingSettingProps: () => ({
        units: [{ text: "px", value: "px", default: 0 }],
        limit: { px: [0, 500] },
    }),
});

const valueRef = defineModel<string>("value", { required: false });

const { t } = useI18n();

const settingGroup = computed<UE_EL_COMPONENT.UeElSettingGroupProps>(() => {
    return {
        title: prop.title || t("PADDING_SETTING_TITLE"),
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
.padding-setting-group {
    //
}
</style>
