<!--
 * @Description: 单选框
 * @Author: F-Stone
 * @LastEditTime: 2025-02-24 18:21:44
-->
<template>
    <div
        :class="$style['check-box']"
        class="cursor-pointer flex items-center"
        :data-active="value ? '' : undefined"
        :data-disable="disable ? '' : undefined"
        @click="trigger"
    >
        <div :class="$style['box']" class="flex justify-center items-center">
            <div :class="$style['box-inner']">
                <UeElIcon v-if="value" :size="12" :class="$style['select-icon']" name="icon-duigou" />
            </div>
        </div>
        <span v-ue-el-label="label" :class="$style['text']">{{ text }}</span>
    </div>
</template>
<script lang="ts" setup>
import type { UeElCheckBoxBaseProps } from "./index";

defineOptions({ name: "UeElCheckBox" });

const prop = defineProps<UeElCheckBoxBaseProps>();
const valueRef = defineModel("value", { type: Boolean });

const trigger = () => {
    if (prop.disable) return;
    valueRef.value = !valueRef.value;
};
</script>
<style lang="scss" module>
.check-box {
    font-size: 12px;
    line-height: 28px;

    cursor: pointer;

    color: color(var(--ue-font-color));
    &[data-disable] {
        cursor: not-allowed;

        opacity: 0.5;
    }
    &[data-active] {
        color: color(var(--ue-font-color--deeper));
        .box-inner {
            border-color: color(var(--ue-font-color--deeper));
        }
        .select-icon {
            color: #fff;
            background-color: color(var(--ue-font-color--deeper));
        }
    }
    &:hover {
        .tip {
            opacity: 1;
        }
    }
    .box {
        @include square(28px);
    }
    .box-inner {
        @include square(14px);
        position: relative;
        top: -1px;

        overflow: hidden;

        border: 1px solid color(var(--ue-border-color));
        border-radius: var(--ue-border-radius--lv1);
    }
}
</style>
