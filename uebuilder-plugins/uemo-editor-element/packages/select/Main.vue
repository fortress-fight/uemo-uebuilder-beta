<!--
 * @Description: 选择器
 * @Author: F-Stone
 * @LastEditTime: 2025-03-01 17:05:14
-->
<template>
    <UeElSettingBar
        ref="settingBarRef"
        :title="title"
        :label="label"
        :disable="disable"
        :placeholder="placeholder || t('SELECT_PLACEHOLDER')"
        :infoText="infoText"
        :infoIcon="infoIcon"
        :infoAlign="valueAlign"
        @triggerSetting="openOptionPanel"
    >
        <UeElPopPanel v-model:open="optionIsOpen" :panel="popPanelParams">
            <UeElSelectOption
                :style="optionPanelStyle"
                :value="valueModel"
                :list="options"
                :hide-icon="hideOptionIcon"
                :pin-value="true"
                @change="changeValue"
            />
        </UeElPopPanel>
    </UeElSettingBar>
</template>
<script lang="ts" setup>
import type { UeElSelectBaseProps, SelectValue } from "./index";

import UeElSettingBar from "../setting-bar/Main.vue";

defineOptions({ name: "UeElSelect" });

const { t } = useI18n();

const instance = getCurrentInstance();
const props = withDefaults(defineProps<UeElSelectBaseProps>(), { showIcon: true, disable: false });
const valueModel = defineModel<SelectValue>("value", { default: "" });

const settingBarRef = useTemplateRef("settingBarRef");
const rootDomRef = computed(() => settingBarRef.value?.$el);

const optionIsOpen = ref<boolean>(false);
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
        refEl: rootDomRef.value,
        options: {
            middleware: [
                ["shift", { crossAxis: true, padding: 17, rootBoundary: "viewport" }],
                [
                    "offset",
                    () => {
                        const { height } = rootDomRef.value.getBoundingClientRect();
                        return -height / 2;
                    },
                ],
            ],
        },
    },
}));

/**
 * 计算信息文本
 * @returns {string} 信息文本
 */
const infoText = computed(() => {
    return typeof valueModel.value === "undefined" ? "" : selectValueInfo.value?.text;
});

/**
 * 计算信息图标
 * @returns {UE_EL_UTIL.IconParam} 信息图标
 */
const infoIcon = computed(() => {
    const iconName = props.showIcon ? selectValueInfo.value?.icon : undefined;
    if (typeof iconName === "string") {
        return { name: iconName, size: props.iconSize };
    }
    return iconName;
});

/**
 * 打开选项面板，并设置面板样式
 * @returns {void}
 */
function openOptionPanel() {
    if (!instance) return;
    if (props.options.length === 0) {
        instance.proxy?.$ueElToast.error(props.noOptionTip || t("SELECT_NO_OPTION"));
        return;
    }
    // 获取 DOM 边界信息，避免重复调用
    const { width } = rootDomRef.value!.getBoundingClientRect();
    optionPanelStyle.value = {
        "--min-width": `${Math.ceil(width)}px`,
        "--icon-size": `${props.iconSize}`,
    };
    optionIsOpen.value = true;
}

/**
 * 更新选中值，并关闭选项面板
 * @param {number|string} value 新的选中值
 * @returns {void}
 */
function changeValue(value: string | number) {
    valueModel.value = value;
    optionIsOpen.value = false;
}
</script>
<style lang="scss" module>
//
</style>
