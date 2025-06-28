<!--
 * @Description: 网格布局属性控制器组件
 * @Author: F-Stone
 * @LastEditTime: 2025-06-29 02:46:36
-->
<template>
    <UeElSettingGroup :class="$style['grid-layout-setting']" ref="rootComponent" is-first is-last>
        <template #body>
            <PreviewBox
                :data="valueModel"
                :mode="previewBoxMode"
                :z-index="zIndexData"
                @change="handleChange"
                @changeZIndex="handleChangeZIndex"
                @swap="handleSwap"
            />
            <!-- 底部控制按钮组 -->
            <UeElControlGroup :col-count="enableZIndexMode ? 2 : 1">
                <UeElButton v-bind="layoutButtonParam" @trigger="openGridLibraryPanel" />
                <UeElButton v-if="enableZIndexMode" v-bind="zIndexButtonParam" @trigger="toggleZIndexMode" />
            </UeElControlGroup>
            <!-- 布局库弹窗面板 -->
            <UeElPopPanel v-model:open="popPanelOpen" v-bind="popPanelParams">
                <UeElGridLayoutLibraryPanel v-model:select="gridLayout" />
            </UeElPopPanel>
            <UeElPopPanel v-model:open="layoutSelectPanelOpen" v-bind="popPanelParams">
                <SelectLayoutPanel
                    :value="valueModel"
                    :select-count="selectCount"
                    @cancel="closeLayoutSelectPanel"
                    @confirm="handleLayoutSelectConfirm"
                />
            </UeElPopPanel>
        </template>
    </UeElSettingGroup>
</template>

<script lang="ts" setup>
import type { UeElGridLayoutSettingBaseProps } from "./index";

import { getGridInfo } from "@stone/uemo-editor-utils/lib/css-grid";

import UeElSettingGroup from "../setting-group";
import { usePopPanelParam } from "../../utils/pop-panel-mixin";
import PreviewBox from "./sub-components/PreviewLayoutBox.vue";
import SelectLayoutPanel from "./sub-components/SelectLayoutPanel.vue";

defineOptions({ name: "UeElGridLayoutSetting" });

const instance = getCurrentInstance();

/**
 * 组件接口定义
 */
interface EmitEvents {
    (e: "input", value: string): void;
    (e: "swap", value: { origin: number; target: number }): void;
    (
        e: "change",
        value: {
            grid: string;
            reset: boolean;
            lengthChange: boolean;
            removeIndexList?: number[];
        }
    ): void;
}

/**
 * 组件属性和事件定义
 */
const { t } = useI18n();
const props = withDefaults(defineProps<UeElGridLayoutSettingBaseProps>(), {});
const emit = defineEmits<EmitEvents>();

/**
 * 组件数据模型
 */
const valueModel = defineModel<string>("value", { required: true });
const zIndexData = defineModel<string>("zIndex", { required: false });

const gridLayout = computed({
    get: () => {
        return valueModel.value;
    },
    set: (value) => {
        const newGridLen = getGridInfo(value).subColInfo.length;
        const currentGridLen = getGridInfo(valueModel.value).subColInfo.length;

        if (newGridLen < currentGridLen) {
            openLayoutSelectPanel(value, newGridLen, currentGridLen);
        } else {
            valueModel.value = value;
            emit("change", { grid: value, reset: true, lengthChange: newGridLen !== currentGridLen });
        }
    },
});

const selectCount = ref<number>(0);
const newGridLayout = ref<string>("");
function openLayoutSelectPanel(value: string, newGridLen: number, localGridLen: number) {
    newGridLayout.value = value;
    selectCount.value = localGridLen - newGridLen;
    popPanelOpen.value = false;
    layoutSelectPanelOpen.value = true;
}
function closeLayoutSelectPanel() {
    layoutSelectPanelOpen.value = false;
    popPanelOpen.value = true;
}
function handleLayoutSelectConfirm(value: number[]) {
    if (value.length != selectCount.value) {
        instance?.proxy?.$ueElToast.error(`请选择需要移除的结构，还差 ${selectCount.value - value.length} 个`);
    } else {
        emit("change", {
            grid: newGridLayout.value,
            reset: true,
            lengthChange: true,
            removeIndexList: value,
        });
        closeLayoutSelectPanel();
    }
}

/**
 * 组件引用
 */
const rootComponentRef = useTemplateRef<InstanceType<typeof UeElSettingGroup>>("rootComponent");

/**
 * 组件状态管理
 * @description 控制Z轴层级模式和弹窗面板的显示状态
 */
const isZIndexMode = ref(false);
const popPanelOpen = ref(false);
const layoutSelectPanelOpen = ref(false);

/**
 * 布局按钮参数计算属性
 * @returns {UeElButtonProps} 按钮配置对象
 */
const layoutButtonParam = computed<UE_EL_COMPONENT.UeElButtonProps>(() => ({
    theme: "strokeText",
    text: t("GRID_LAYOUT_SETTING_REPLACE"),
    disable: isZIndexMode.value,
}));

/**
 * Z轴层级按钮参数计算属性
 * @returns {UeElButtonProps} 按钮配置对象
 */
const zIndexButtonParam = computed<UE_EL_COMPONENT.UeElButtonProps>(() => ({
    theme: isZIndexMode.value ? "fillText" : "strokeText",
    text: isZIndexMode.value ? t("GRID_LAYOUT_SETTING_COMPLETE") : t("GRID_LAYOUT_SETTING_ADJUST_Z_INDEX"),
}));

/**
 * 预览框模式计算属性
 * @returns {"zIndex" | "replace" | "normal"} 预览框模式
 */
const previewBoxMode = computed(() => {
    if (isZIndexMode.value) return "zIndex";
    if (props.withReplace) return "replace";
    return "normal";
});

/**
 * 弹窗位置配置计算属性
 * @returns {UE_EL_COMPONENT.UeElPopPanelProps} 弹窗配置对象
 */
const popPanelParams = usePopPanelParam(computed(() => rootComponentRef.value?.$el));

/**
 * 事件处理函数
 */
const handleChange = (value: string) => {
    valueModel.value = value;
};

const handleChangeZIndex = (value: string) => {
    zIndexData.value = value;
};

const handleSwap = (value: { origin: number; target: number }) => {
    emit("swap", value);
};

/**
 * 面板操作函数
 */
const openGridLibraryPanel = () => {
    popPanelOpen.value = true;
};

const toggleZIndexMode = () => {
    isZIndexMode.value = !isZIndexMode.value;
};
</script>

<style lang="scss" module>
.grid-layout-setting {
    //
}
</style>
