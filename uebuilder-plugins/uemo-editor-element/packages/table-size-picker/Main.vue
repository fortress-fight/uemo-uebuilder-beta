<!--
 * @Description: Table尺寸选择器
 * @Author: F-Stone
 * @LastEditTime: 2025-07-03 02:28:56
-->
<template>
    <UeElEditorPanel :class="$style['table-size-picker']" :withDragger="false">
        <div></div>
        <UeElSettingGroup>
            <template #body>
                <UeElControlGroup>
                    <div
                        :class="$style['panel-body']"
                        :style="panelStyle"
                        @mousemove="onMouseMove"
                        @click="inputConfirm"
                        @mouseleave="onMouseLeave"
                    >
                        <template v-for="x in tableCell[0]" :key="x">
                            <template v-for="y in tableCell[1]" :key="x + '-' + y">
                                <div
                                    :data-x="x"
                                    :data-y="y"
                                    :class="$style['select-table-cell']"
                                    :data-selected="x <= useSelection[0] && y <= useSelection[1]"
                                ></div>
                            </template>
                        </template>
                    </div>
                    <UeElButton theme="fillText" :text="useSelection[0] + ' x ' + useSelection[1]" />
                </UeElControlGroup>
            </template>
        </UeElSettingGroup>
    </UeElEditorPanel>
</template>
<script lang="ts" setup>
import type { UeElTableSizePickerBaseProps } from "./index";

defineOptions({ name: "UeElTableSizePicker" });
const props = withDefaults(defineProps<UeElTableSizePickerBaseProps>(), {
    selection: () => [0, 0],
    minSize: () => [0, 0],
});
const emit = defineEmits<(e: "submit", value: { rows: number; cols: number; withHeaderRow: boolean }) => void>();

const tableCell = [10, 10];
const localSelection = ref<[number, number] | undefined>(undefined);
const useSelection = computed(() => {
    return localSelection.value || props.selection;
});

const panelStyle = computed(() => {
    return {
        gridTemplateRows: `repeat(${tableCell[1]}, 1fr)`,
        gridTemplateColumns: `repeat(${tableCell[0]}, 1fr)`,
    };
});

function onMouseMove(ev: MouseEvent) {
    const currentTarget = ev.target as HTMLElement;
    const x = Number(currentTarget.dataset.x);
    const y = Number(currentTarget.dataset.y);
    if (x && y) {
        const [tableW, tableH] = props.minSize;
        localSelection.value = [Math.max(x, tableW), Math.max(y, tableH)];
    }
}

function onMouseLeave() {
    localSelection.value = undefined;
}

function inputConfirm() {
    const [rows, cols] = localSelection.value || [0, 0];
    if (rows === 0 || cols === 0) {
        return;
    }
    emit("submit", { rows, cols, withHeaderRow: false });
}
</script>
<style lang="scss" module>
.table-size-picker {
    --ue-panel-width: 210px;
    .panel-body {
        display: grid;

        margin-bottom: 4px;

        cursor: pointer;

        gap: 2px;
    }
    .select-table-cell {
        @include space-placeholder(1, 1);
        width: 100%;

        cursor: pointer;

        border: 1px solid color(var(--ue-border-color));
        border-radius: var(--ue-border-radius--lv1);
        background: #f2f2f2;
        &[data-selected="true"] {
            border-color: #999;
            background: #bfbfbf;
        }
    }
}
</style>
