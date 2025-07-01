<!--
 * @Description: 裁切设置
 * @Author: F-Stone
 * @LastEditTime: 2025-06-29 02:59:49
-->
<template>
    <UeElSettingGroup :title="t('UNIT_OVERFLOW')">
        <template #body>
            <UeElControlGroup>
                <UeElCheckBox v-model:value="valueRef" :text="t('OVERFLOW_MODE_TIP')" />
            </UeElControlGroup>
        </template>
    </UeElSettingGroup>
</template>
<script lang="ts" setup>
import type { UeElOverflowSettingBaseProps } from "./index";

defineOptions({ name: "UeElOverflowSetting" });
const _prop = withDefaults(defineProps<UeElOverflowSettingBaseProps>(), {});

const valueRef = defineModel<boolean>("value", { required: false });

const { t } = useI18n();
</script>
<style lang="scss" module>
.overflow-setting {
    //
}
</style>
