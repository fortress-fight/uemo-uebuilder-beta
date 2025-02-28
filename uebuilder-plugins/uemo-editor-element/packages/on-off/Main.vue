<!--
 * @Description: 开关
 * @Author: F-Stone
 * @LastEditTime: 2025-03-01 03:32:17
-->
<template>
    <UeElButton
        theme="squareIcon"
        :label="label"
        :class="$style['on-off']"
        :disable="disable"
        :active="activeState"
        :icon="activeIcon"
        @trigger="triggerChange"
    >
        <slot></slot>
    </UeElButton>
</template>
<script lang="ts" setup>
import type { UeElOnOffBaseProps, OnOffValue } from "./index";

defineOptions({ name: "UeElOnOff" });

const props = withDefaults(defineProps<UeElOnOffBaseProps>(), {
    reverse: false,
    disable: false,
    activeValue: true,
    inactiveValue: false,
});

const valueRef = defineModel<OnOffValue>("value", { default: false, required: true });

// computed: 判断当前值是否为激活状态
const isOn = computed(() => valueRef.value === props.activeValue);

// computed: 根据状态选择图标
const activeIcon = computed(() => (isOn.value ? props.activeIcon || props.icon : props.icon));

// computed: 根据 reverse 决定激活状态是否反转
const activeState = computed(() => (props.reverseStyle ? !isOn.value : isOn.value));

// 修改点击函数，直接基于 isOn 切换状态
function triggerChange() {
    valueRef.value = isOn.value ? props.inactiveValue : props.activeValue;
}
</script>
<style lang="scss" module>
.on-off {
    --ue-el-btn-font-color: color(var(--ue-font-color--deeper));
}
</style>
