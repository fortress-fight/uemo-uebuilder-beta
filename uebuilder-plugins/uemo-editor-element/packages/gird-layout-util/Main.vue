<!--
 * @Description: 网格结构工具
 * @Author: F-Stone
 * @LastEditTime: 2025-04-02 23:13:59
-->
<template>
    <div
        :class="$style['gird-layout-util']"
        class="grid gap-1"
        :data-active="active"
        :data-type="type"
        :style="gridStyle"
        @click="emit('trigger', data)"
    >
        <div
            v-for="(item, index) in gridSubs"
            :key="index"
            v-ue-el-label="subLabel"
            class="flex justify-center items-center"
            :class="$style['subitem']"
            :data-select="selectList?.includes(index)"
            :data-disable="!!item.disable"
            :style="gridSubItemStyle(item.data)"
            @click="subitemTrigger($event, index)"
        >
            <UeElIcon v-if="item.disable" :class="$style['ic']" :size="22" name="icon-disable" />
            <div v-else-if="type === 'zIndexMode' && gridItemZIndexArray" :class="$style['z-index-control']">
                <span :class="$style['text']">
                    {{ gridItemZIndexArray.length - gridItemZIndexArray[index] + 1 }}
                </span>
                <UeElIcon :class="$style['ic']" name="icon-app-to-top" />
            </div>
            <UeElIcon v-else-if="icon" :class="$style['ic']" :size="15" :name="icon" />
        </div>
    </div>
</template>
<script lang="ts" setup>
import type { UeElGirdLayoutUtilBaseProps } from "./index";
import { getGridInfo } from "@stone/uemo-editor-utils/lib/css-grid";

defineOptions({ name: "UeElGirdLayoutUtil" });

const { t } = useI18n();
const prop = withDefaults(defineProps<UeElGirdLayoutUtilBaseProps>(), {});
const emit = defineEmits<{
    (e: "trigger", value: string): void;
    (e: "subitemTrigger", data: { ev: MouseEvent; index: number }): void;
}>();

const gridInfo = computed(() => getGridInfo(prop.data));
const gridSubs = computed(() =>
    gridInfo.value.subColInfo.map((item, index) => ({
        disable: prop.disableGridItemIndex?.includes(index),
        data: item,
    }))
);

const subLabel = computed(() => {
    if (prop.type === "replace") return t("GRID_LAYOUT_REPLACE");
    if (prop.type === "zIndexMode") return t("GRID_LAYOUT_SETTING_TOP");
    return undefined;
});

/**
 * 网格样式
 * @returns
 */
const gridStyle = computed(() => {
    const { colTemplate, rowTemplate } = gridInfo.value;
    const rowLength = rowTemplate.split(" ").length;
    const gridTemplateColumns = colTemplate
        .split(" ")
        .map((v) => `minmax(auto, ${v})`)
        .join(" ");

    return {
        "--row": rowLength,
        "--row-height": rowLength > 4 ? "25px" : "35px",
        gridTemplateColumns,
        gridTemplateRows: rowTemplate,
    };
});

/**
 * 网格子项样式
 * @param gridArea
 * @returns
 */
function gridSubItemStyle(gridArea?: string) {
    if (!gridArea) return {};
    const gridNumbers = gridArea.split("/").map((item) => parseInt(item));
    const startRow = gridNumbers[1];
    const endRow = gridNumbers[3];
    return { "--col-size": endRow - startRow, gridArea };
}

/**
 * 网格子项触发
 * @param ev
 * @param index
 */
function subitemTrigger(ev: MouseEvent, index: number) {
    if (prop.disableGridItemIndex?.includes(index)) return;
    emit("subitemTrigger", { ev, index });
}
</script>
<style lang="scss" module>
.gird-layout-util {
    --row: 1;
    --min-col-width: 20px;
    position: relative;

    height: calc(var(--row) * var(--row-height) + 12px + (var(--row) - 1) * 5px);
    padding: 5px;

    border: 1px solid color(var(--ue-border-color), 1);
    border-radius: calc(var(--ue-border-radius--lv1) + 1px);

    gap: 5px;
    &[data-error="true"] {
        border-color: color(var(--ue-color--error), 1) !important;
    }
    &[data-active="true"] {
        color: #fff;
        border-color: color(var(--ue-color--active), 1);
        .subitem {
            border: 1px solid transparent;
            background: color(var(--ue-color--active), 1);
        }
    }
    &[data-type="select"],
    &[data-type="replace"] {
        .subitem {
            cursor: pointer;
            .ic {
                position: relative;

                opacity: 0;
            }
            &[data-select],
            &:hover {
                border-color: color(var(--ue-color--active));
                background-color: color(var(--ue-color--active));
                .ic {
                    opacity: 1;
                    color: #fff;
                }
            }
        }
    }
    &[data-type="delete"] {
        .subitem {
            cursor: pointer;
            .ic {
                position: relative;

                opacity: 0;
            }
            &:hover {
                border-color: color(var(--ue-color--error));
                .ic {
                    opacity: 1;
                    color: color(var(--ue-color--error));
                }
            }
            &[data-select] {
                border-color: color(var(--ue-color--error));
                background-color: color(var(--ue-color--error));
                .ic {
                    opacity: 1;
                    color: #fff;
                }
            }
        }
    }
    &[data-type="option"] {
        cursor: pointer;
        &:hover {
            color: color(var(--ue-font-color--deeper));
            border-color: color(var(--ue-border-color--deeper));
            .order {
                color: color(var(--ue-font-color--deeper));
            }
        }
        &[data-active] {
            .order {
                color: #fff !important;
            }
        }
        .order {
            color: rgba(#000, 0.25);
        }
    }
    &[data-type="zIndexMode"] {
        .z-index-control {
            @include ab-cover;
            display: flex;

            align-items: center;
            justify-content: center;
            .ic {
                display: none;
            }
        }
        .subitem {
            cursor: pointer;
            .z-index-control .ic {
                display: none;
            }
            &:hover {
                color: #fff;
                border-color: color(var(--ue-color--active));
                background-color: color(var(--ue-color--active));
                .z-index-control .text {
                    display: none;
                }
                .z-index-control .ic {
                    display: block;
                }
            }
        }
    }
    .subitem {
        position: relative;

        min-width: calc(var(--min-col-width) * var(--col-size) + (var(--col-size) - 1) * 5px);
        min-height: 20px;

        border: 1px solid color(var(--ue-border-color));
        border-radius: var(--ue-border-radius--lv1);
        background: color(var(--ue-background-color));
        &[data-disable="true"] {
            cursor: not-allowed;

            border: 1px solid color(var(--ue-border-color)) !important;
            background: color(var(--ue-background-color)) !important;
            .ic {
                opacity: 1;
                color: color(var(--ue-font-color)) !important;
            }
        }
    }
}
</style>
