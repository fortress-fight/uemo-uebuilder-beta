<!--
 * @Description: 选项面板
 * @Author: F-Stone
 * @LastEditTime: 2025-02-24 18:22:16
-->
<template>
    <div ref="rootDomRef" :class="$style['select-option']" :data-theme="theme">
        <div :class="$style['option-group']">
            <div class="h-full" :class="$style['scroll-box']">
                <div
                    v-for="(item, index) in list"
                    ref="optionDomsRef"
                    :key="index"
                    class="flex items-center justify-between"
                    :class="$style['option-item']"
                    :data-select="value === item.value"
                    @click="emit('change', item.value)"
                >
                    <template v-if="!hideIcon">
                        <UeElIcon v-if="item.icon" :class="$style['ic']" :name="item.icon" />
                        <UeElIcon v-else :class="[$style['ic'], $style['select-ic']]" name="icon-duigou" />
                    </template>
                    <div v-if="item.text" :class="$style['text']" :label="item.label">
                        {{ item.text }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import type { UeElSelectOptionBaseProps } from "./index";
import type { DialogUpdatePosHandler } from "../pop-panel";

defineOptions({ name: "UeElSelectOption" });
const prop = defineProps<UeElSelectOptionBaseProps>();
const emit = defineEmits<{ (e: "change", value: string | number): void }>();

const rootDomRef = useTemplateRef("rootDomRef");
const optionDomsRef = useTemplateRef<HTMLElement[]>("optionDomsRef");

const UeElDialogCalcPosHandler = inject<((fn: DialogUpdatePosHandler) => void) | undefined>(
    "UeElDialogCalcPosHandler",
    undefined
);

/**
 * 设置 UeDialog 方法中的更新位置的处理函数
 */
function setDialogUpdatePosHandler() {
    if (!prop.pinValue) return;

    UeElDialogCalcPosHandler?.((res) => {
        if (!res.middleware) {
            return res;
        }
        res.middleware.unshift([
            "custom",
            {
                name: "dialogDistance",
                fn: (param) => {
                    if (!rootDomRef.value) return param;

                    const { x, y } = param;

                    const options = optionDomsRef.value;
                    const activeOption = options?.find((item) => item.dataset.select === "true");
                    const targetOption = activeOption || options?.[0];

                    if (!targetOption) return param;

                    const rootRect = rootDomRef.value.getBoundingClientRect();
                    const optionRect = targetOption.getBoundingClientRect();
                    const disY = optionRect.top - rootRect.top + optionRect.height / 2;

                    return { x, y: y - disY };
                },
            },
        ]);
        return res;
    });
}

onBeforeMount(setDialogUpdatePosHandler);
</script>
<style lang="scss" module>
.select-option {
    overflow: auto;

    min-width: var(--min-width);
    max-height: 40vh;

    border-radius: calc(var(--ue-border-radius--lv1) + 2px);
    background: color(var(--ue-color--dark));
    box-shadow: var(--ue-shadow--lv1);
    &[data-theme="light"] {
        background-color: #fff;
        .option-group {
            color: var(--ue-font-color);
        }
        .option-item {
            &:hover,
            &[data-select="true"] {
                background-color: color(var(--ue-background-color));
            }
        }
    }
}
.option-group {
    font-size: 13px;
    line-height: 28px;

    overflow: auto;

    min-height: 0;
    padding: 10px 4px;

    color: #fff;
}
.option-item {
    @include space-between(10px, "y");

    width: 100%;
    height: 28px;
    padding: 0 9px;

    cursor: pointer;

    border-radius: var(--ue-border-radius--lv1);
    &:hover,
    &[data-select="true"] {
        background-color: color(var(--ue-color--active));
    }
    &[data-select="true"] {
        .select-ic {
            opacity: 1;
        }
    }
    .text {
        @include ellipse(1);
        min-width: 0;
        margin-right: 11px;
        margin-left: 11px;
    }
    .ic {
        font-size: var(--icon-size, 16px);
    }
    .select-ic {
        opacity: 0;
    }
}
</style>
