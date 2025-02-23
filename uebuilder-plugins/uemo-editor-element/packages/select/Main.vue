<!--
 * @Description: 选择器
 * @Author: F-Stone
 * @LastEditTime: 2025-02-23 22:59:34
-->
<template>
    <div
        ref="rootDom"
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

interface Props extends UeElSelectBaseProps {}

defineOptions({ name: "UeElSelect" });

const instance = getCurrentInstance();
const prop = withDefaults(defineProps<Props>(), { disable: false });
const valueModel = defineModel<number | string>("value", { default: "" });
const rootDom = ref<HTMLElement>();

const selectValueInfo = computed(() => {
    return prop.options.find((item) => item.value === (valueModel.value ?? prop.defaultValue));
});

const optionPanelStyle = ref<{ "--min-width": string; "--icon-size": string } | null>(null);

/**
 * @description: 打开选项面板
 */
const isOpen = ref<boolean>(false);
const popPanelParams = computed<UE_EL_COMPONENT.UeElPopPanelProps["panel"]>(() => ({
    position: {
        refEl: rootDom.value!,
        options: {
            middleware: [
                ["shift", { crossAxis: true, padding: 17, rootBoundary: "viewport" }],
                [
                    "offset",
                    () => {
                        const { height } = rootDom.value!.getBoundingClientRect();
                        return -height / 2;
                    },
                ],
            ],
        },
    },
}));

function openOptionPanel() {
    if (!instance) return;
    if (prop.options.length === 0) {
        instance.proxy?.$ueElToast.error(prop.emptyText || "暂无可选项");
        return;
    }
    isOpen.value = true;

    const { width } = rootDom.value!.getBoundingClientRect();
    optionPanelStyle.value = {
        "--min-width": `${Math.ceil(width)}px`,
        "--icon-size": `${prop.iconSize}`,
    };
}

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
