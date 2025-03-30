<!--
 * @Description: 横向排版控制器
 * @Author: F-Stone
 * @LastEditTime: 2025-03-01 17:07:41
-->
<template>
    <div :class="$style['justify-content-setting']" class="w-full" :data-disable="disable">
        <UeElSelect
            v-model:value="alignItem"
            :class="$style['select']"
            class="w-full"
            :title="t('JUSTIFY_CONTENT_TITLE')"
            :options="axiosYOptions"
            value-align="right"
        />
    </div>
</template>
<script lang="ts" setup>
import type { UeElJustifyContentSettingBaseProps } from "./index";

defineOptions({ name: "UeElJustifyContentSetting" });
const prop = withDefaults(defineProps<UeElJustifyContentSettingBaseProps>(), {
    defaultValue: "flex-start",
    disable: false,
});
const valueRef = defineModel<string>("value", { required: false });

const { t } = useI18n();

const axiosYOptions = computed(() => {
    const JUSTIFY_OPTIONS = [
        { value: "flex-start", text: t("JUSTIFY_CONTENT_START"), icon: "icon-app-justify-content-start" },
        { value: "center", text: t("JUSTIFY_CONTENT_CENTER"), icon: "icon-app-justify-content-center" },
        { value: "flex-end", text: t("JUSTIFY_CONTENT_END"), icon: "icon-app-justify-content-end" },
    ];

    return JUSTIFY_OPTIONS.filter((item) => {
        if (prop.enableOptions) {
            return prop.enableOptions.includes(item.value);
        }
        return true;
    });
});

const alignItem = computed({
    get() {
        return valueRef.value || prop.defaultValue;
    },
    set(value) {
        if (prop.disable) return;
        valueRef.value = value;
    },
});
</script>
<style lang="scss" module>
.justify-content-setting {
    &[data-disable="true"] .select {
        pointer-events: none;

        opacity: 0.5;
    }
}
</style>
