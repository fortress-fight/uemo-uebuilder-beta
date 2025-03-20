<!--
 * @Description: 网格布局预览盒子组件
 * @Author: F-Stone
-->
<template>
    <UeElControlGroup :class="$style['grid-layout-preview-box']">
        <div class="box-inner relative">
            <!-- 顶部控制栏 -->
            <div class="grid absolute w-full" :class="$style['top-bar']" :style="gridStyle.rowStyle">
                <button
                    v-for="(item, index) in gridColArr"
                    :key="index"
                    ref="rowButtons"
                    v-ue-el-label="t('GRID_LAYOUT_SETTING_ADJUST_SIZE')"
                    :class="$style['btn--change-size']"
                    :data-is-auto="item === 'auto'"
                    :data-disabled="gridColArr.length === 1"
                    class="flex justify-center items-center"
                    @click="openGridSizeAdjust($event, 'col', index)"
                >
                    <div :class="$style['dot-icon']"></div>
                </button>
            </div>
            <!-- 左侧控制栏 -->
            <div class="grid absolute h-full" :class="$style['left-bar']" :style="gridStyle.colStyle">
                <button
                    v-for="(item, index) in gridRowArr"
                    :key="index"
                    v-ue-el-label="
                        item === 'auto'
                            ? t('GRID_LAYOUT_SETTING_EQUAL_HEIGHT')
                            : t('GRID_LAYOUT_SETTING_CONTENT_HEIGHT')
                    "
                    :class="$style['btn--change-size']"
                    :data-is-auto="item === 'auto'"
                    :data-disabled="gridRowArr.length === 1"
                    class="flex justify-center items-center"
                    @click="openGridSizeAdjust($event, 'row', index)"
                >
                    <div :class="$style['dot-icon']"></div>
                </button>
            </div>
            <UeElGirdLayoutUtil v-bind="layoutUtilParam" @subitem-trigger="handleSubitemTrigger" />
        </div>
    </UeElControlGroup>
    <!-- 弹窗面板 -->
    <UeElPopPanel v-model:open="gridSizePanelOpen" v-bind="popPanelParams">
        <SizeAdjust :size="gridSize" @change="handleGridSizeChange" />
    </UeElPopPanel>
    <UeElPopPanel v-model:open="replaceLayoutPanelOpen" v-bind="popPanelParams">
        <ReplaceLayout
            v-if="props.mode === 'replace'"
            :value="props.data"
            :disableGridItemIndex="[lastTriggerGridItemIndex]"
            @trigger="handleReplaceLayoutTrigger"
        />
    </UeElPopPanel>
</template>

<script lang="ts" setup>
import { getGridInfo, getGridCss } from "@stone/uemo-editor-utils/lib/css-grid";
import { getPopPanelParams } from "../../pop-panel/utils/helper";
import UeElControlGroup from "../../control-group";
import SizeAdjust from "./LayoutSizeControlPanel.vue";
import ReplaceLayout from "./ReplaceLayoutPanel.vue";

/**
 * 组件接口定义
 */
interface Props {
    /** 网格布局数据 */
    data: string;
    /** 操作模式 */
    mode?: "zIndex" | "replace" | "normal";
    /** Z轴层级数据 */
    zIndex?: string;
}

const { t } = useI18n();
const props = withDefaults(defineProps<Props>(), { mode: "normal" });
const emit = defineEmits<{
    (e: "changeZIndex" | "change", value: string): void;
    (e: "swap", value: { origin: number; target: number }): void;
}>();

/**
 * 组件状态管理
 */
const gridSizePanelOpen = ref(false);
const replaceLayoutPanelOpen = ref(false);
const gridSizeAdjustIndex = ref(0);
const lastTriggerGridItemIndex = ref<number>(0);
const popPanelRelateDom = ref<HTMLElement>();

/**
 * 网格信息相关计算属性
 */
const gridInfo = computed(() => getGridInfo(props.data));
const gridColArr = computed(() => gridInfo.value.colTemplate.split(" "));
const gridRowArr = computed(() => gridInfo.value.rowTemplate.split(" "));

/**
 * 网格样式计算属性
 */
const gridStyle = computed(() => ({
    rowStyle: {
        gridTemplateColumns: gridColArr.value.map((v) => `minmax(auto, ${v})`).join(" "),
    },
    colStyle: {
        gridTemplateRows: gridInfo.value.rowTemplate,
    },
}));

/**
 * Z轴层级信息计算属性
 */
const gridItemZIndexArray = computed({
    get() {
        const { subColInfo } = gridInfo.value;
        if (!props.zIndex) {
            return subColInfo.map((_item, index) => index + 1);
        }
        const value = props.zIndex.split("-").map(Number) ?? [];
        return subColInfo.map((_item, index) => value[index] ?? index + 1);
    },
    set(value) {
        emit("changeZIndex", value.join("-"));
    },
});

/**
 * 布局工具参数计算属性
 */
const layoutUtilParam = computed<UE_EL_COMPONENT.UeElGirdLayoutUtilProps>(() => ({
    data: props.data,
    type: props.mode === "zIndex" ? "zIndexMode" : props.mode === "replace" ? "replace" : undefined,
    icon: props.mode === "replace" ? "icon-replace" : undefined,
    gridItemZIndexArray: gridItemZIndexArray.value,
}));

/**
 * 网格大小调整大小计算属性
 */
const gridSize = computed(() => gridColArr.value[gridSizeAdjustIndex.value]);

/**
 * 弹窗位置配置计算属性
 */
const popPanelParams = computed<UE_EL_COMPONENT.UeElPopPanelProps | undefined>(() => {
    if (!popPanelRelateDom.value) return undefined;
    return getPopPanelParams("editorPanel", popPanelRelateDom.value, {
        placement: "right-start",
    });
});

/**
 * 数组元素交换工具函数
 */
function swapArrayElements<T>(array: T[], index1: number, index2: number): T[] {
    if (index1 < 0 || index1 >= array.length || index2 < 0 || index2 >= array.length) {
        return array;
    }
    const newArray = [...array];
    [newArray[index1], newArray[index2]] = [newArray[index2], newArray[index1]];
    return newArray;
}

/**
 * 事件处理函数
 */
function handleSubitemTrigger(data: { ev: MouseEvent; index: number }) {
    const { index } = data;

    if (props.mode === "zIndex") {
        const currentValue = gridItemZIndexArray.value[index];
        gridItemZIndexArray.value = gridItemZIndexArray.value.map((item, i) => {
            if (i === index) return gridItemZIndexArray.value.length;
            return item > currentValue ? item - 1 : item;
        });
        return;
    }

    if (props.mode === "replace") {
        replaceLayoutPanelOpen.value = true;
        popPanelRelateDom.value = data.ev.currentTarget as HTMLElement;
        lastTriggerGridItemIndex.value = index;
    }
}

function handleReplaceLayoutTrigger(data: { ev: MouseEvent; index: number }) {
    const { subColInfo, rowTemplate, colTemplate } = getGridInfo(props.data);

    if (props.mode === "replace") {
        const subGridArr = swapArrayElements(subColInfo, lastTriggerGridItemIndex.value, data.index);
        emit("change", getGridCss({ rowTemplate, colTemplate, subColInfo: subGridArr }));
    }

    emit("swap", {
        origin: lastTriggerGridItemIndex.value,
        target: data.index,
    });
}

/**
 * 网格大小调整相关函数
 */
function openGridSizeAdjust(ev: MouseEvent, type: "row" | "col", index: number) {
    if (type === "col") {
        gridSizeAdjustIndex.value = index;
        popPanelRelateDom.value = ev.currentTarget as HTMLElement;
        gridSizePanelOpen.value = true;
        return;
    }

    const { colTemplate, rowTemplate, subColInfo } = gridInfo.value;
    const currentRowArr = rowTemplate.split(" ");
    currentRowArr[index] = currentRowArr[index] === "auto" ? "1fr" : "auto";

    const row = currentRowArr.map((item) => item.replaceAll("fr", "")).join("-");
    const col = colTemplate.replaceAll("fr", "").split(" ").join("-");
    const sub = subColInfo.join(",").replaceAll(" ", "");

    emit("change", `${row},${col}:${sub}`);
}

function handleGridSizeChange(size: string) {
    const { colTemplate, rowTemplate, subColInfo } = gridInfo.value;
    const index = gridSizeAdjustIndex.value;

    const row = rowTemplate.replaceAll("fr", "").split(" ").join("-");
    const col = colTemplate
        .split(" ")
        .map((item, i) => (index === i ? size : item).replaceAll("fr", ""))
        .join("-");
    const sub = subColInfo.join(",").replaceAll(" ", "");

    emit("change", `${row},${col}:${sub}`);
}
</script>

<style lang="scss" module>
.grid-layout-preview-box {
    --control-size: 26px;
    display: grid;

    padding: calc(0px + var(--control-size)) var(--ue-editor-row-space--lv2) var(--ue-editor-row-space--lv2)
        calc(0px + var(--control-size));

    border: 1px dashed color(var(--ue-border-color), 1);
    border-radius: calc(var(--ue-border-radius--lv1) + 1px);

    align-items: center;
    .top-bar {
        bottom: 100%;

        padding: 0 6px;

        gap: 5px;
        .btn--change-size {
            width: 100%;
            min-width: 20px;
            height: var(--control-size);
        }
    }
    .left-bar {
        right: 100%;

        padding: 6px 0;

        gap: 5px;
        .btn--change-size {
            width: var(--control-size);
            height: 100%;
            min-height: 20px;
        }
    }
    .btn--change-size {
        &:hover {
            .dot-icon::after {
                opacity: 1;
            }
        }
        &[data-disabled="true"] {
            pointer-events: none;
            .dot-icon {
                --theme-btn-color: var(--ue-background-color);
            }
        }
        &[data-is-auto="true"] {
            .dot-icon {
                --theme-btn-color: var(--ue-color--yellow);
            }
        }
    }
    .dot-icon {
        @include circle(6px);
        --theme-btn-color: var(--ue-color--active);
        position: relative;

        background-color: color(var(--theme-btn-color));
        &::after {
            @include circle(14px);
            @include move-center;
            content: "";
            transition: 0.26s ease;

            opacity: 0;
            border: 2px solid color(var(--theme-btn-color));
        }
    }
}
</style>
