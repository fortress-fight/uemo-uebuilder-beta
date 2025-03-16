<!--
 * @Description: 选项面板组件
 * @Author: F-Stone
 * @LastEditTime: 2025-03-17 02:28:22
 * @FileOverview: 提供可选择的选项列表，支持图标显示和主题切换
 * @Events: change - 选项改变时触发
 * @Props:
 *   - list: 选项列表
 *   - value: 当前选中值
 *   - theme: 主题，支持 'dark'|'light'
 *   - hideIcon: 是否隐藏图标
 *   - pinValue: 是否固定选中值位置
-->
<template>
    <div ref="rootDomRef" :class="$style['select-option']" :data-theme="theme">
        <div :class="$style['option-group']">
            <div class="h-full" :class="$style['scroll-box']">
                <div
                    v-for="(item, index) in list"
                    :key="item.value || index"
                    ref="optionDomsRef"
                    :class="$style['option-item']"
                    :data-select="value === item.value"
                    class="flex items-center justify-between"
                    @click="handleOptionClick(item)"
                >
                    <template v-if="!hideIcon">
                        <UeElIcon v-if="item.icon" :class="$style['ic']" :name="item.icon" />
                        <UeElIcon v-else :class="[$style['ic'], $style['select-ic']]" name="icon-duigou" />
                    </template>
                    <div v-if="item.text" :class="$style['text']" :title="item.label || item.text">
                        {{ item.text }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { UeElSelectOptionBaseProps } from "./index";

import { UeElProvideDialogCalcPosHandler } from "../pop-panel";

defineOptions({ name: "UeElSelectOption" });

const props = defineProps<UeElSelectOptionBaseProps>();
const emit = defineEmits<{
    (e: "change", value: string | number): void;
}>();

// DOM 引用
const rootDomRef = useTemplateRef("rootDomRef");
const optionDomsRef = useTemplateRef("optionDomsRef");

// 注入弹窗位置处理器
const dialogCalcPosHandler = inject(UeElProvideDialogCalcPosHandler, undefined);

/**
 * 处理选项点击事件
 * @param item - 选项数据
 */
function handleOptionClick(item: UE_EL_UTIL.SelectOption): void {
    emit("change", item.value);
}

/**
 * 设置弹窗位置更新处理器
 * 用于固定选中项位置
 */
function setDialogUpdatePosHandler(): void {
    if (!props.pinValue) return;

    dialogCalcPosHandler?.((res) => {
        if (!res.middleware) return res;

        res.middleware.unshift([
            "custom",
            {
                name: "dialogDistance",
                fn: (param) => {
                    const rootEl = rootDomRef.value;
                    if (!rootEl) return param;

                    const { x, y } = param;
                    const options = optionDomsRef.value || [];

                    // 查找选中项或默认第一项
                    const activeOption = options.find((item) => item.dataset.select === "true") || options[0];

                    if (!activeOption) return param;

                    // 计算位置偏移
                    const rootRect = rootEl.getBoundingClientRect();
                    const optionRect = activeOption.getBoundingClientRect();
                    const offsetY = optionRect.top - rootRect.top + optionRect.height / 2;

                    return { x, y: y - offsetY };
                },
            },
        ]);
        return res;
    });
}

// 生命周期钩子
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
}
.text {
    @include ellipse(1);
    min-width: 0;
    margin: 0 11px;
}
.ic {
    font-size: var(--icon-size, 16px);
    &.select-ic {
        transition: opacity 0.2s ease;

        opacity: 0;
    }
}
</style>
