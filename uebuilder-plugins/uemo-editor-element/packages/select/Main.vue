<!--
 * @Description: 选择器
 * @Author: F-Stone
 * @LastEditTime: 2025-02-24 18:22:10
-->
<template>
    <div
        ref="rootDomRef"
        :class="$style['select-group']"
        class="cursor-pointer inline-block"
        :data-disable="disable"
        :data-theme="theme"
        @click="openOptionPanel"
    >
        <slot :value-text="selectValueInfo?.text || ''">
            <div :class="$style['select-bar']" class="flex-auto flex">
                <div :class="$style['text-box']" class="flex flex-auto">
                    <span v-if="title" :class="$style['title']">
                        {{ title }}
                    </span>
                    <div :class="$style['info']" class="flex-auto flex items-center" :data-text-align="valueAlign">
                        <UeElIcon
                            v-if="selectValueInfo?.icon && showValueIcon"
                            :class="$style['ic']"
                            :name="selectValueInfo.icon"
                            :size="iconSize"
                        />
                        <span v-if="valueModel !== undefined">{{ selectValueInfo?.text || "" }}</span>
                        <span v-else :class="$style['placeholder']">{{ placeholder || "请选择" }}</span>
                    </div>
                </div>
                <div :class="$style['icon-box']" class="flex items-center justify-center">
                    <UeElIcon name="icon-xiajiantou" :size="15" />
                </div>
            </div>
        </slot>
        <UeElPopPanel v-model:open="isOpen" :panel="popPanelParams">
            <UeElSelectOption
                :style="optionPanelStyle"
                :value="valueModel"
                :list="options"
                :hide-icon="hideIcon"
                :pin-value="true"
                @change="changeValue"
            />
        </UeElPopPanel>
    </div>
</template>
<script lang="ts" setup>
import type { UeElSelectBaseProps } from "./index";

defineOptions({ name: "UeElSelect" });

const instance = getCurrentInstance();
const props = withDefaults(defineProps<UeElSelectBaseProps>(), { disable: false });
const valueModel = defineModel<number | string>("value", { default: "" });
const rootDomRef = useTemplateRef("rootDomRef");
const isOpen = ref<boolean>(false);
const optionPanelStyle = ref<{ "--min-width": string; "--icon-size": string } | null>(null);

/**
 * 计算当前选中项的信息
 * @returns {object|undefined} 当前选中项信息
 */
const selectValueInfo = computed(() =>
    props.options.find((item) => item.value === (valueModel.value ?? props.defaultValue))
);

/**
 * 计算弹出面板的参数
 * @returns {UE_EL_COMPONENT.UeElPopPanelProps["panel"]} 弹出面板参数
 */
const popPanelParams = computed<UE_EL_COMPONENT.UeElPopPanelProps["panel"]>(() => ({
    position: {
        refEl: rootDomRef.value!,
        options: {
            middleware: [
                ["shift", { crossAxis: true, padding: 17, rootBoundary: "viewport" }],
                [
                    "offset",
                    () => {
                        const { height } = rootDomRef.value!.getBoundingClientRect();
                        return -height / 2;
                    },
                ],
            ],
        },
    },
}));

/**
 * 打开选项面板，并设置面板样式
 * @returns {void}
 */
function openOptionPanel() {
    if (!instance) return;
    if (props.options.length === 0) {
        instance.proxy?.$ueElToast.error(props.emptyText || "暂无可选项");
        return;
    }
    // 获取 DOM 边界信息，避免重复调用
    const { width } = rootDomRef.value!.getBoundingClientRect();
    optionPanelStyle.value = {
        "--min-width": `${Math.ceil(width)}px`,
        "--icon-size": `${props.iconSize}`,
    };
    isOpen.value = true;
}

/**
 * 更新选中值，并关闭选项面板
 * @param {number|string} value 新的选中值
 * @returns {void}
 */
function changeValue(value: string | number) {
    valueModel.value = value;
    isOpen.value = false;
}
</script>
<style lang="scss" module>
.select-group {
    --ue-component-select-size: 26px;
    display: inline-block;
    &[data-disable="true"] {
        pointer-events: none;
        .select-bar {
            opacity: 0.5;
        }
    }
    &[data-theme="showBorder"] {
        .select-bar {
            --border-color: #{color(var(--ue-border-color), 1)};
            .icon-box {
                opacity: 1;
            }
        }
    }
}
.select-bar {
    --border-color: #{color(var(--ue-border-color), 0)};
    font-size: 12px;
    line-height: var(--ue-component-select-size);

    padding-left: var(--ue-editor-row-space--lv1);

    cursor: pointer;

    border: 1px solid var(--border-color);
    border-radius: var(--ue-border-radius--lv1);
    background-color: #fff;
    // box-shadow: inset 0 0 0 1px var(--border-color);
    &:hover {
        --border-color: #{color(var(--ue-border-color))};
        .icon-box {
            opacity: 1;
        }
    }
    &:focus-within {
        --border-color: color(var(--ue-color--active));
        .icon-box {
            opacity: 1;
        }
    }
    .title {
        margin-right: 10px;

        color: color(var(--ue-font-color));
    }
    .icon-box {
        @include square(var(--ue-component-select-size));
        font-size: 16px;

        opacity: 0;
        color: color(var(--ue-font-color));
    }
    .info {
        &[data-text-align="right"] {
            justify-content: flex-end;
        }
        .ic {
            margin-right: var(--ue-editor-row-space--lv1);
        }
        .placeholder {
            color: color(var(--ue-font-color));
        }
    }
}
</style>
