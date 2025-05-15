<!--
 * @Description: 链接属性控制组
 * @Author: F-Stone
 * @LastEditTime: 2025-05-15 11:11:27
-->
<template>
    <UeElSettingGroup :class="$style['link-setting-group']" v-bind="settingGroup" @trigger="handleTrigger">
        <UeElLinkSetting v-if="!!valueRef" v-model:value="valueRef" />
    </UeElSettingGroup>
</template>
<script lang="ts" setup>
import type { UeElLinkSettingGroupBaseProps } from "./index";
import type { UeElLinkSettingPanelValue } from "../link-setting-panel";
defineOptions({ name: "UeElLinkSettingGroup" });

const props = withDefaults(defineProps<UeElLinkSettingGroupBaseProps>(), {
    defaultValue: () => ({
        link: "https://www.baidu.com/",
        type: "link",
        target: "_blank",
    }),
});
const valueRef = defineModel<UeElLinkSettingPanelValue>("value", { required: false });

const { t } = useI18n();

const settingGroup = computed<UE_EL_COMPONENT.UeElSettingGroupProps>(() => {
    return {
        title: t("UNIT_LINK"),
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
.link-setting-group {
    //
}
</style>
