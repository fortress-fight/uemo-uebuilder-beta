<!--
 * @Description: 标签输入框
 * @Author: F-Stone
 * @LastEditTime: 2025-02-27 11:27:06
-->
<template>
    <div :class="$style['tag-input']" class="grid">
        <UeElTextInput
            ref="inputDom"
            :value="tagText"
            :placeholder="placeholder || t('TAG_INPUT_PLACEHOLDER')"
            theme="enterText"
            :required="true"
            @confirm="addTag($event)"
        />
        <div v-if="valueRef.length > 0" :class="$style['tag-group']" class="flex flex-wrap justify-start">
            <div
                v-for="(item, index) in valueRef"
                :key="index"
                :class="$style['tag-item']"
                :title="item"
                class="flex items-center justify-center"
            >
                <span :class="$style['text']">{{ item }}</span>
                <div
                    :class="$style['btn--remove-tag']"
                    class="flex cursor-pointer items-center justify-center"
                    @click="removeTag(index)"
                >
                    <UeElIcon name="icon-remove" :size="10" />
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import type { UeElTagInputBaseProps } from "./index";

const { t } = useI18n();

defineOptions({ name: "UeElTagInput" });
withDefaults(defineProps<UeElTagInputBaseProps>(), { placeholder: "" });

const valueRef = defineModel<string[]>("value", { required: false, default: () => [] });

const tagText = ref<string>("");
const inputDom = useTemplateRef("inputDom");

function removeTag(index: number) {
    valueRef.value = valueRef.value.filter((_, i) => i !== index);
}

function addTag(value: string) {
    if (!value) return;
    valueRef.value = [...valueRef.value, value];
    inputDom.value?.focus();
}
</script>
<style lang="scss" module>
.tag-input {
    gap: var(--ue-control-col-space);
}
.tag-group {
    color: #fff;

    gap: var(--ue-control-row-space);
    .tag-item {
        font-size: 12px;
        line-height: 17px;

        position: relative;

        padding: 5px;

        border-radius: var(--ue-border-radius--lv1);
        background: color(var(--ue-color--active));
    }
    .text {
        @include ellipse(1);
        display: inline-block;

        max-width: 10em;
    }
    .btn--remove-tag {
        @include circle(16px);
        margin-left: 4px;
    }
}
</style>
