<!--
 * @Description: 文本输入框
 * @Author: F-Stone
 * @LastEditTime: 2025-02-27 11:26:44
-->
<template>
    <div
        ref="rootDom"
        v-ue-el-label="labelParam"
        :class="$style['input-box']"
        :data-padding-size="paddingSize"
        :data-disable="disable"
        :data-has-slot="hasSlotComponent"
        :data-theme="theme"
    >
        <div :class="$style['before-group']" class="flex">
            <slot name="before"></slot>
        </div>

        <component
            :is="type === 'textarea' ? 'textarea' : 'input'"
            ref="inputDom"
            :value="value"
            :type="type"
            :disabled="disable"
            :class="$style['text-input']"
            :autocomplete="autocomplete"
            :placeholder="placeholder"
            @mouseup="createSelection"
            @blur="inputBlurEvent"
            @keydown="inputKeydownEvent"
            @focus="emit('focus', $event)"
        ></component>

        <div :class="$style['after-group']" class="flex">
            <slot name="after" :confirm="confirm"></slot>
        </div>
    </div>
</template>
<script lang="ts" setup>
import type { UeElTextInputBaseProps } from "./index";

defineOptions({ name: "UeElTextInput" });

const instance = getCurrentInstance();
const prop = withDefaults(defineProps<UeElTextInputBaseProps>(), { type: "text", singleLine: true });
const emit = defineEmits<{
    keydown: [ev: KeyboardEvent];
    blur: [ev: FocusEvent];
    focus: [ev: FocusEvent];
    confirm: [value: string];
}>();

const { t } = useI18n();
const slots: any = useSlots();
const hasSlotComponent = computed<boolean>(() => {
    return !!(slots.before || slots.after);
});

const inputDom = ref<HTMLInputElement>();

const labelParam = computed<UE_EL_UTIL.LabelOption>(() => {
    return prop.label ? { content: prop.label, delay: [1000, null], offset: [0, 10] } : undefined;
});

function inputKeydownEvent(ev: KeyboardEvent) {
    if (prop.singleLine && ev.key === "Enter") {
        inputDom.value?.blur();
        ev.preventDefault();
    }
    emit("keydown", ev);
}

/**
 * @description: 创建选区
 */
function createSelection(ev?: MouseEvent) {
    const txt = window.getSelection()?.toString();
    if (txt) return;

    ev?.stopPropagation();
    ev?.preventDefault();

    inputDom.value?.select();
}

/**
 * @description: 失焦事件
 */
function inputBlurEvent(ev: FocusEvent) {
    window.getSelection()?.removeAllRanges();
    emit("blur", ev);
    confirm();

    // TODO: 修复失焦后输入框内容不更新的问题 (vue3 后应该不会出现这个问题，待验证)
    requestAnimationFrame(() => {
        const inputEl = inputDom.value;
        if (inputEl && inputEl.value != prop.value) {
            inputEl.value = prop.value;
        }
    });
}

function clearInput() {
    if (inputDom.value) {
        inputDom.value.value = "";
    }
}

function focus() {
    inputDom.value?.focus();
}

/**
 * @description: 确认
 */
const isValid = ref<boolean>(true);
function confirm() {
    const inputValue = inputDom.value?.value || "";
    // 初步处理输入值（autoTrim 选项）
    let processedValue = prop.autoTrim ? inputValue.trim() : inputValue;

    // 如果 singleLine 选项开启，则去除所有换行及制表符
    if (prop.singleLine) {
        processedValue = processedValue.replace(/(\r\n|\n|\r|\t)/gm, " ");
    }

    // 重置验证状态
    isValid.value = true;

    // 必填校验
    if (prop.required && !processedValue) {
        instance?.proxy?.$ueElToast.error(t("INPUT_TIP_NOT_EMPTY"));
        isValid.value = false;
        return;
    }
    // 非必填且为空时直接返回
    if (!prop.required && !processedValue) {
        emit("confirm", processedValue);
        return;
    }

    // 校验规则
    prop.rules?.forEach((rule) => {
        if (typeof rule === "function") {
            const result = rule(processedValue);
            if (typeof result === "string") {
                instance?.proxy?.$ueElToast.error(t("INPUT_TIP_FORMAT_ERROR"));
                isValid.value = false;
                return;
            }
            if (!result) {
                isValid.value = false;
                return;
            }
        } else if (rule.pattern && !rule.pattern.test(processedValue)) {
            instance?.proxy?.$ueElToast.error(t("INPUT_TIP_FORMAT_ERROR"));
            isValid.value = false;
            return;
        }
    });

    emit("confirm", processedValue);
}

defineExpose({
    isValid,
    inputDom: inputDom,
    select: () => {
        requestAnimationFrame(() => createSelection());
    },
    confirm: () => {
        requestAnimationFrame(() => confirm());
    },
    clear: () => {
        requestAnimationFrame(() => clearInput());
    },
    focus: () => {
        requestAnimationFrame(() => focus());
    },
});
</script>
<style lang="scss" module>
.input-box {
    --text-input-padding: 0 var(--ue-editor-row-space--lv1);
    --text-border-color: transparent;
    position: relative;
    z-index: 10;

    display: grid;
    overflow: hidden;

    border: 1px solid var(--text-border-color);
    border-radius: var(--ue-border-radius--lv1);

    grid-template-columns: auto minmax(0, 1fr) auto;
    &[data-theme="enterText"] {
        --text-border-color: #{color(var(--ue-border-color))};
        .text-input {
            font-size: 12px;
            line-height: 30px;
        }
    }
    &[data-padding-size="level2"] {
        --text-input-padding: 0 var(--ue-editor-row-space--lv1) 0 2px;
    }
    &[data-padding-size="level3"] {
        --text-input-padding: 0 2px;
    }
    &[data-padding-size="level4"] {
        --text-input-padding: 3px var(--ue-editor-row-space--lv1);
    }
    &[data-disable="true"] {
        pointer-events: none;

        opacity: 0.5;
    }
    &:hover {
        --text-border-color: #{color(var(--ue-border-color))};
    }
    &:focus-within {
        --text-border-color: #{color(var(--ue-color--active))};
    }
}
.text-input {
    font-size: 12px;
    line-height: 26px;

    width: auto;
    min-width: 0;
    padding: var(--text-input-padding);

    cursor: default;

    color: color(var(--ue-font-color--deeper));
    border-width: 0;
    &[type="textarea"] {
        //
    }
}
</style>
