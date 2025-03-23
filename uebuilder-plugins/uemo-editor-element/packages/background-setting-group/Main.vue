<!--
 * @Description: 背景属性控制组
 * @Author: F-Stone
 * @LastEditTime: 2025-03-24 01:05:37
-->
<template>
    <UeElSettingGroup :class="$style['background-setting-group']" v-bind="settingGroupParams">
        <!-- 背景设置组内容 -->
    </UeElSettingGroup>
</template>

<script lang="ts" setup>
import type { UeElBackgroundSettingGroupBaseProps, UeElBackgroundSettingGroupValue, TYPE_BG_TYPE } from "./index";
import { useBackgroundData } from "./utils/helper";

defineOptions({ name: "UeElBackgroundSettingGroup" });

const { t } = useI18n();

/**
 * @description 组件属性定义
 */
const props = withDefaults(defineProps<UeElBackgroundSettingGroupBaseProps>(), {
    enableType: () => ["color", "image", "shape", "video", "blur", "spline", "svg"],
});
const valueRef = defineModel<UeElBackgroundSettingGroupValue>("value", { required: false });

/**
 * @description 背景数据
 */
const { backgroundTypeInfo, backgroundTypeParam } = useBackgroundData();

/**
 * @description 背景图层数量映射
 * @returns {Partial<Record<TYPE_BG_TYPE, number>>} 类型数量映射对象
 */
const bgLayerCountMap = computed(() => {
    return (valueRef.value || []).reduce((acc, item) => {
        const type = item.type;
        acc[type] = (acc[type] || 0) + 1;
        return acc;
    }, {} as Partial<Record<TYPE_BG_TYPE, number>>);
});

/**
 * @description 可用的背景类型选项
 * @returns {Array} 过滤后的背景类型选项
 */
const typeOptions = computed<UE_EL_COMPONENT.UeElSelectProps["options"]>(() => {
    const bgTypeParam = backgroundTypeParam.value;
    const bgTypeInfo = backgroundTypeInfo.value;

    return props.enableType
        .filter((type) => {
            if (!bgTypeParam) return false;
            if (!bgTypeParam[type]) return false;

            const currentTypeCount = bgLayerCountMap.value[type] || 0;
            return bgTypeParam[type].limit > currentTypeCount;
        })
        .map((type) => ({
            value: type,
            text: bgTypeInfo[type].text,
            icon: bgTypeInfo[type].icon,
        }));
});

/**
 * @description 设置组参数
 */
const settingGroupParams = computed<UE_EL_COMPONENT.UeElSettingGroupProps>(() => ({
    title: t("UNIT_BACKGROUND"),
    oper: [
        {
            id: "addBackground",
            type: "addSelect",
            param: { options: typeOptions.value, iconSize: 16 },
        },
    ],
}));
</script>

<style lang="scss" module>
.background-setting-group {
    // 样式定义
}
</style>
