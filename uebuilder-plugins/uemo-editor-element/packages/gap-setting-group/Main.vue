<!--
 * @Description: 间隔控制组
 * @Author: F-Stone
 * @LastEditTime: 2025-06-29 02:54:46
-->
<template>
    <UeElSettingGroup :class="$style['gap-setting-group']" v-bind="settingGroup" @trigger="handleTrigger">
        <template v-if="!!valueRef" #body>
            <UeElGapSetting v-model:value="valueRef" v-bind="gapSettingProps" />
        </template>
    </UeElSettingGroup>
</template>
<script lang="ts" setup>
import type { UeElGapSettingGroupBaseProps } from "./index";

defineOptions({ name: "UeElGapSettingGroup" });

const prop = withDefaults(defineProps<UeElGapSettingGroupBaseProps>(), {
    defaultValue: "10px",
});

const valueRef = defineModel<string>("value", { required: false });

const { t } = useI18n();

const settingGroup = computed<UE_EL_COMPONENT.UeElSettingGroupProps>(() => {
    return {
        title: prop.title || t("UNIT_SPACE"),
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
.gap-setting-group {
    //
}
</style>
