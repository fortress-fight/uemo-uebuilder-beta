<!--
 * @Description: 对齐方式设置组件
 * @Author: F-Stone
 * @LastEditTime: 2025-03-21 03:13:50
-->
<template>
    <UeElControlGroup :class="$style['align-setting']" oper-type="none" :data-disable="disable ? '' : undefined">
        <div class="inline-grid grid-cols-6" :class="$style['align-group']">
            <!-- 水平对齐选项 -->
            <template v-if="showHorizontalAlign">
                <UeElButton
                    v-for="item in xOptions"
                    :key="'x-' + item.value"
                    theme="squareIcon"
                    :active="alignX === item.value"
                    :icon="item.icon"
                    :label="item.label"
                    :class="$style['button']"
                    @trigger="handleAlignChange('x', item.value)"
                />
            </template>
            <!-- 垂直对齐选项 -->
            <template v-if="showVerticalAlign">
                <UeElButton
                    v-for="item in yOptions"
                    :key="'y-' + item.value"
                    theme="squareIcon"
                    :active="alignY === item.value"
                    :icon="item.icon"
                    :label="item.label"
                    :class="$style['button']"
                    @trigger="handleAlignChange('y', item.value)"
                />
            </template>
        </div>
    </UeElControlGroup>
</template>

<script lang="ts" setup>
import type { UeElAlignSettingBaseProps, UeElAlignSettingOption } from "./index";

defineOptions({ name: "UeElAlignSetting" });

/**
 * 组件属性和事件定义
 */
const props = withDefaults(defineProps<UeElAlignSettingBaseProps>(), {
    type: "xy",
    disable: false,
    disableAlign: false,
});

/**
 * 组件数据模型
 */
const valueRef = defineModel<UE_EL_UTIL.ALIGN>("value", { required: false });

/**
 * 国际化
 */
const { t } = useI18n();

/**
 * 显示控制计算属性
 */
const showHorizontalAlign = computed(() => ["x", "xy"].includes(props.type));
const showVerticalAlign = computed(() => ["y", "xy"].includes(props.type));

/**
 * 对齐选项配置
 * @description 定义水平和垂直对齐的选项
 */
const xOptions = computed<({ value: UE_EL_UTIL.ALIGN_X } & UeElAlignSettingOption)[]>(() => [
    {
        value: "left",
        icon: { name: "icon-zuoduiqi", size: 17 },
        label: t("ALIGN_ITEM_LEFT"),
    },
    {
        value: "center",
        icon: { name: "icon-shuipingjuzhong", size: 17 },
        label: t("ALIGN_ITEM_CENTER"),
    },
    {
        value: "right",
        icon: { name: "icon-youduiqi", size: 17 },
        label: t("ALIGN_ITEM_RIGHT"),
    },
]);

const yOptions = computed<({ value: UE_EL_UTIL.ALIGN_Y } & UeElAlignSettingOption)[]>(() => [
    {
        value: "top",
        icon: { name: "icon-shangduiqi", size: 17 },
        label: t("ALIGN_ITEM_TOP"),
    },
    {
        value: "center",
        icon: { name: "icon-chuizhijuzhong", size: 17 },
        label: t("ALIGN_ITEM_CENTER"),
    },
    {
        value: "bottom",
        icon: { name: "icon-dingbuduiqi", size: 17 },
        label: t("ALIGN_ITEM_BOTTOM"),
    },
]);

/**
 * 当前对齐状态计算属性
 * @description 解析当前的对齐值，避免重复的字符串分割操作
 */
const currentAlign = computed(() => {
    const defaultVal = props.defaultValue ?? (props.type === "xy" ? "left top" : "left");
    const splits = (valueRef.value ?? defaultVal).toString().split(" ") as [UE_EL_UTIL.ALIGN_X, UE_EL_UTIL.ALIGN_Y];

    if (props.type === "x") return [splits[0]] as [UE_EL_UTIL.ALIGN_X];
    if (props.type === "y") return [splits[0]] as [UE_EL_UTIL.ALIGN_Y];
    return splits;
});

/**
 * 对齐状态计算属性
 */
const alignX = computed(() => currentAlign.value[0] as UE_EL_UTIL.ALIGN_X);
const alignY = computed(() => (props.type === "xy" ? currentAlign.value[1] : currentAlign.value[0]));

/**
 * 更新对齐状态
 * @description 根据组件类型更新对齐状态并触发事件
 */
function updateAlign(newX?: UE_EL_UTIL.ALIGN_X, newY?: UE_EL_UTIL.ALIGN_Y) {
    if (props.disable) return;

    const [curX, curY] = currentAlign.value as [UE_EL_UTIL.ALIGN_X, UE_EL_UTIL.ALIGN_Y];

    if (props.type === "xy") {
        valueRef.value = `${newX ?? curX} ${newY ?? curY}`;
    } else if (props.type === "x") {
        valueRef.value = newX ?? curX;
    } else if (props.type === "y") {
        valueRef.value = newY ?? curY;
    }
}

/**
 * 处理对齐变更事件
 */
function handleAlignChange(type: "x" | "y", value: UE_EL_UTIL.ALIGN_X | UE_EL_UTIL.ALIGN_Y) {
    if (type === "x") {
        updateAlign(value as UE_EL_UTIL.ALIGN_X, undefined);
    } else {
        updateAlign(undefined, value as UE_EL_UTIL.ALIGN_Y);
    }
}
</script>

<style lang="scss" module>
.align-setting {
    &[data-disable] {
        .align-group {
            pointer-events: none;

            opacity: 0.5;
        }
        .button {
            color: color(var(--ue-font-color));
        }
    }
    .align-group {
        gap: var(--ue-control-row-space);
    }
    .button {
        color: color(var(--ue-font-color--deeper));
    }
}
</style>
