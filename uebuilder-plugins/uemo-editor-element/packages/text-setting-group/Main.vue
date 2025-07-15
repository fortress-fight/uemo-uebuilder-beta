<!--
 * @Description: 文字设置组
 * @Author: F-Stone
 * @LastEditTime: 2025-07-09 17:48:39
-->
<template>
    <UeElSettingGroup :class="$style['width-setting-group']" v-bind="settingGroup" @trigger="handleTrigger">
        <template v-if="!!valueRef" #body>
            <UeElTextInput :value="valueRef" ref="inputDomRef" @confirm="valueRef = $event" :required="true" />
        </template>
    </UeElSettingGroup>
</template>
<script lang="ts" setup>
import type { UeElTextSettingGroupBaseProps } from "./index";

defineOptions({ name: "UeElTextSettingGroup" });
const { t } = useI18n();

const props = withDefaults(defineProps<UeElTextSettingGroupBaseProps>(), {});

const valueRef = defineModel<string>("value", { required: false });
const inputDomRef = useTemplateRef("inputDomRef");

const settingGroup = computed<UE_EL_COMPONENT.UeElSettingGroupProps>(() => {
    const operBtns: UE_EL_COMPONENT.UeElSettingGroupProps["oper"] = !valueRef.value
        ? [{ id: "add", type: "add" }]
        : [{ id: "remove", type: "remove" }];

    return {
        title: props.title || t("UNIT_TEXT"),
        oper: props.disableOper ? undefined : operBtns,
    };
});

const handleTrigger = (id: string) => {
    switch (id) {
        case "add":
            valueRef.value = props.defaultValue || t("UNIT_TEXT");
            requestAnimationFrame(() => {
                inputDomRef.value?.focus();
                inputDomRef.value?.select();
            });
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
.text-setting-group {
    //
}
</style>
