<!--
 * @Description: 纵向排版控制器
 * @Author: F-Stone
 * @LastEditTime: 2025-03-01 17:05:58
-->
<template>
    <div :class="$style['align-item-setting']" class="w-full" :data-disable="disable">
        <UeElSelect
            v-model:value="alignItem"
            :class="$style['select']"
            class="w-full"
            :title="t('ALIGN_ITEM_TITLE')"
            :options="axiosYOptions"
            value-align="right"
        />
    </div>
</template>
<script lang="ts" setup>
import type { UeElAlignItemSettingBaseProps } from "./index";

defineOptions({ name: "UeElAlignItem" });
const prop = withDefaults(defineProps<UeElAlignItemSettingBaseProps>(), { disable: false, defaultValue: "" });
const valueRef = defineModel<string>("value", { required: false });

const { t } = useI18n();

const axiosYOptions = computed(() => {
    const ALIGN_OPTIONS = [
        { value: "auto", text: t("ALIGN_ITEM_DEFAULT"), icon: "icon-app-flex-auto" },
        { value: "", text: t("ALIGN_ITEM_STRETCH"), icon: "icon-app-flex-initial" },
        { value: "space-between", text: t("ALIGN_ITEM_FILL"), icon: "icon-app-flex-between" },
        { value: "flex-start", text: t("ALIGN_ITEM_TOP"), icon: "icon-app-flex-start" },
        { value: "center", text: t("ALIGN_ITEM_CENTER"), icon: "icon-app-flex-center" },
        { value: "flex-end", text: t("ALIGN_ITEM_BOTTOM"), icon: "icon-app-flex-end" },
    ];
    return ALIGN_OPTIONS.filter((item) => {
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
.align-item-setting {
    &[data-disable="true"] .select {
        pointer-events: none;

        opacity: 0.5;
    }
}
</style>
