<!--
 * @Description: Align设置
 * @Author: F-Stone
 * @LastEditTime: 2025-02-27 04:23:22
-->
<template>
    <UeElControlGroup :class="$style['align-setting']" oper-type="none" :data-disable="disable ? '' : undefined">
        <div class="inline-grid grid-cols-6" :class="$style['align-group']">
            <template v-if="type === 'x' || type === 'xy'">
                <UeElButton
                    v-for="item in xOptions"
                    :key="'x-' + item.value"
                    theme="squareIcon"
                    :active="alignX === item.value"
                    :icon="item.icon"
                    :label="item.label"
                    :class="$style['button']"
                    @trigger="alignX = item.value"
                />
            </template>
            <template v-if="type === 'y' || type === 'xy'">
                <UeElButton
                    v-for="item in yOptions"
                    :key="'y-' + item.value"
                    theme="squareIcon"
                    :active="alignY === item.value"
                    :icon="item.icon"
                    :label="item.label"
                    :class="$style['button']"
                    @trigger="alignY = item.value"
                />
            </template>
        </div>
    </UeElControlGroup>
</template>
<script lang="ts" setup>
import type { UeElAlignSettingBaseProps, UeElAlignSettingOption } from "./index";

defineOptions({ name: "UeElAlignSetting" });
const prop = withDefaults(defineProps<UeElAlignSettingBaseProps>(), {
    type: "xy",
    disable: false,
    disableAlign: false,
});

const emit = defineEmits<{
    (e: "change", value: { x?: UE_EL_UTIL.ALIGN_X; y?: UE_EL_UTIL.ALIGN_Y }): void;
}>();

const valueRef = defineModel<UE_EL_UTIL.ALIGN>("value", { required: false });

const xOptions: ({ value: UE_EL_UTIL.ALIGN_X } & UeElAlignSettingOption)[] = [
    { value: "left", icon: { name: "icon-zuoduiqi", size: 17 }, label: "居左" },
    { value: "center", icon: { name: "icon-shuipingjuzhong", size: 17 }, label: "横向居中" },
    { value: "right", icon: { name: "icon-youduiqi", size: 17 }, label: "居右" },
];
const yOptions: ({ value: UE_EL_UTIL.ALIGN_Y } & UeElAlignSettingOption)[] = [
    { value: "top", icon: { name: "icon-shangduiqi", size: 17 }, label: "居上" },
    { value: "center", icon: { name: "icon-chuizhijuzhong", size: 17 }, label: "纵向居中" },
    { value: "bottom", icon: { name: "icon-dingbuduiqi", size: 17 }, label: "居下" },
];

// 提取当前对齐方式，减少重复 split 操作
const currentAlign = computed(() => {
    const defaultVal = prop.defaultValue ?? (prop.type === "xy" ? "left top" : "left");
    const splits = (valueRef.value ?? defaultVal).toString().split(" ") as [UE_EL_UTIL.ALIGN_X, UE_EL_UTIL.ALIGN_Y];
    if (prop.type === "x") {
        return [splits[0]] as [UE_EL_UTIL.ALIGN_X];
    }
    if (prop.type === "y") {
        return [splits[0]] as [UE_EL_UTIL.ALIGN_Y];
    }
    return splits;
});

// 抽取更新对齐状态的函数
function updateAlign(newX?: UE_EL_UTIL.ALIGN_X, newY?: UE_EL_UTIL.ALIGN_Y) {
    if (prop.disable) return;

    if (prop.type === "xy") {
        const [curX, curY] = currentAlign.value as [UE_EL_UTIL.ALIGN_X, UE_EL_UTIL.ALIGN_Y];
        valueRef.value = `${newX ?? curX} ${newY ?? curY}`;
        emit("change", { x: newX ?? curX, y: newY ?? curY });
    } else if (prop.type === "x") {
        const [curX] = currentAlign.value as [UE_EL_UTIL.ALIGN_X];
        valueRef.value = newX ?? curX;
        emit("change", { x: newX ?? curX });
    } else if (prop.type === "y") {
        const [curY] = currentAlign.value as [UE_EL_UTIL.ALIGN_Y];
        valueRef.value = newY ?? curY;
        emit("change", { y: newY ?? curY });
    }
}

const alignX = computed({
    get() {
        return currentAlign.value[0] as UE_EL_UTIL.ALIGN_X;
    },
    set(val: UE_EL_UTIL.ALIGN_X) {
        updateAlign(val, undefined);
    },
});

const alignY = computed({
    get() {
        return prop.type === "xy" ? currentAlign.value[1] : currentAlign.value[0];
    },
    set(val: UE_EL_UTIL.ALIGN_Y) {
        updateAlign(undefined, val);
    },
});
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
    .button {
        color: color(var(--ue-font-color--deeper));
    }
    .align-group {
        gap: var(--ue-control-row-space);
    }
}
</style>
