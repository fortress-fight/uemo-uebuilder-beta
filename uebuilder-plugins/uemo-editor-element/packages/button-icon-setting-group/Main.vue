<!--
 * @Description: 按钮图标属性控制组
 * @Author: F-Stone
 * @LastEditTime: 2025-03-19 14:32:59
-->
<template>
    <UeElSettingGroup :class="$style['calender-setting-group']" v-bind="settingGroup" @trigger="handleTrigger">
        <template v-if="!!valueRef" #body>
            <UeElButtonIconSetting v-model:value="valueRef" />
        </template>
    </UeElSettingGroup>
</template>
<script lang="ts" setup>
import type { UeElButtonIconSettingGroupBaseProps } from "./index";
import type { UeElButtonIconSettingValue } from "../button-icon-setting";

defineOptions({ name: "UeElButtonIconSettingGroup" });
const props = withDefaults(defineProps<UeElButtonIconSettingGroupBaseProps>(), {
    defaultValue: () => ({
        source: "https://static.jsmo.xin/uebuilder/public-resource/svg-icon/icon-park/base/base.js",
        name: "home",
    }),
});
const valueRef = defineModel<UeElButtonIconSettingValue>("value", { required: false });

const { t } = useI18n();

const settingGroup = computed<UE_EL_COMPONENT.UeElSettingGroupProps>(() => {
    return {
        title: t("BUTTON_ICON_TITLE"),
        oper: !valueRef.value ? [{ id: "add", type: "add" }] : [{ id: "remove", type: "remove" }],
    };
});

const handleTrigger = (id: string) => {
    switch (id) {
        case "add":
            valueRef.value = props.defaultValue;
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
.button-icon-setting-group {
    //
}
</style>
