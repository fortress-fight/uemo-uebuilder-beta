<!--
 * @Description: 按钮hover效果属性控制
 * @Author: F-Stone
 * @LastEditTime: 2025-05-15 11:09:40
-->
<template>
    <UeElSettingGroup :class="$style['calender-setting-group']" v-bind="settingGroup" @trigger="handleTrigger">
        <UeElResourceSetting v-if="!!valueRef" type="buttonHoverEffect" v-model:value="valueRef" />
    </UeElSettingGroup>
</template>
<script lang="ts" setup>
import type { UeElButtonHoverEffectSettingBaseProps } from "./index";

const { t } = useI18n();

defineOptions({ name: "UeElButtonHoverEffectSetting" });
const _prop = withDefaults(defineProps<UeElButtonHoverEffectSettingBaseProps>(), {});
const valueRef = defineModel<string>("value", { required: false });

const settingGroup = computed<UE_EL_COMPONENT.UeElSettingGroupProps>(() => {
    return {
        title: t("UNIT_INTERACTION_EFFECT"),
        oper: !valueRef.value ? [{ id: "add", type: "add" }] : [{ id: "remove", type: "remove" }],
    };
});

const handleTrigger = (id: string) => {
    switch (id) {
        case "add":
            valueRef.value = "moveUp";
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
.button-hover-effect-setting {
    //
}
</style>
