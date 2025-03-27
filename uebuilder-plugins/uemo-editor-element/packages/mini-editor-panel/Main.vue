<!--
 * @Description: Mini 编辑面板
 * @Author: F-Stone
 * @LastEditTime: 2025-03-27 12:01:44
-->
<template>
    <div :class="$style['mini-editor-panel']">
        <div :class="$style['preview-area']" class="min-h-0 relative">
            <slot name="preview" :value="cloneValue"> cloneValue: {{ cloneValue }} </slot>
        </div>
        <div :class="$style['editor-area']" class="min-h-0">
            <div :class="$style['editor-panel-wrapper']">
                <slot
                    name="editor"
                    :className="$style['editor-panel']"
                    :value="cloneValue"
                    :updateCloneValue="updateCloneValue"
                ></slot>
            </div>
            <div v-if="isOperationEnabled" :class="$style['panel-footer']">
                <slot name="panelFooter">
                    <div
                        v-if="actionMode === 'confirmWithCancel'"
                        :class="$style['operate-group']"
                        class="grid grid-cols-2"
                    >
                        <button data-theme="cancel" :class="$style['operate-btn']" @click="triggerHandler('cancel')">
                            {{ t("CANCEL") }}
                        </button>
                        <button data-theme="confirm" :class="$style['operate-btn']" @click="triggerHandler('confirm')">
                            {{ t("CONFIRM") }}
                        </button>
                    </div>
                    <div v-if="actionMode === 'confirm'" :class="$style['operate-group']">
                        <button
                            data-theme="confirm"
                            :class="$style['operate-btn']"
                            class="w-full"
                            @click="triggerHandler('confirm')"
                        >
                            {{ t("CONFIRM") }}
                        </button>
                    </div>
                </slot>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup generic="T">
import type { UeElMiniEditorPanelBaseProps } from "./index";

import { _isEqual, _cloneDeep } from "@stone/uemo-editor-utils/lib/lodash";

defineOptions({ name: "UeElMiniEditorPanel" });

const { t } = useI18n();
const _prop = withDefaults(defineProps<UeElMiniEditorPanelBaseProps>(), {
    isOperationEnabled: true,
    actionMode: "confirmWithCancel",
});
const emit = defineEmits<{ (e: "cancel" | "confirm"): void; (e: "update", value: T): void }>();
const valueRef = defineModel<T>("value", { required: true });

const cloneValue = shallowRef<T>(_cloneDeep(valueRef.value));
const _slots = defineSlots<{
    preview(props: { value: T }): any;
    editor(props: { className: string; value: T; updateCloneValue: (newValue: T) => void }): any;
    panelFooter(): any;
}>();

watch(
    () => valueRef.value,
    (newValue) => {
        if (!_isEqual(newValue, cloneValue.value)) {
            cloneValue.value = _cloneDeep(newValue);
            emit("update", cloneValue.value);
        }
    },
    { deep: true }
);

function updateCloneValue(newValue: T) {
    cloneValue.value = _cloneDeep(newValue);
    emit("update", cloneValue.value);
}

function triggerHandler(type: "cancel" | "confirm") {
    if (type === "confirm") {
        valueRef.value = cloneValue.value;
    }
    emit(type);
}
</script>
<style lang="scss" module>
.mini-editor-panel {
    position: relative;

    display: grid;
    overflow: hidden;

    height: 700px;

    border-radius: var(--ue-border-radius--panel);
    background-color: #fff;
    box-shadow: var(--ue-shadow--lv2);

    grid-template-columns: 1fr auto;
    &[data-theme="lighter"] {
        //
    }
    &[data-theme="dark"] {
        .preview-area {
            background-color: #1b1b1b;
        }
        .editor-area {
            border-left-color: #1b1b1b;
        }
    }
    .preview-area {
        width: 1000px;
    }
    .editor-area {
        position: relative;

        display: flex;
        flex-direction: column;
        &::after {
            position: absolute;
            top: 0;
            left: -1px;

            width: 1px;
            height: 100%;

            content: "";

            background-color: rgba(#000, 0.1);
        }
        .editor-panel-wrapper {
            flex: 1;
        }
        .editor-panel {
            height: 100%;

            border-width: 0;
            border-radius: 0;
            box-shadow: none;
        }
    }
    .panel-footer {
        .operate-btn {
            font-size: 12px;
            line-height: 40px;
            &[data-theme="confirm"] {
                color: #fff;
                background-color: color(var(--ue-color--blue));
            }
            &[data-theme="cancel"] {
                background-color: color(var(--ue-color--gray));
            }
        }
    }
}
</style>
