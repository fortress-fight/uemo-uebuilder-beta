<!--
 * @Description: 文本输入框
 * @Author: F-Stone
 * @LastEditTime: 2025-02-20 15:19:29
-->
<template>
    <div :class="$style['text-input']">文本输入框</div>
</template>
<script lang="ts" setup>
import { UeElTextInputBaseProps } from "./index";

interface Props extends UeElTextInputBaseProps {}

defineOptions({ name: "UeElTextInput" });

const _prop = defineProps<Props>();

const _emit = defineEmits<{
    keydown: [ev: KeyboardEvent];
    blur: [ev: FocusEvent];
    focus: [ev: FocusEvent];
    confirm: [value: string];
}>();
</script>
<style lang="scss" module>
.text-input {
    //
}
</style>
