<!--
 * FILE Workbench 编辑布局
 * @Description: Workbench 编辑布局
 * @Author: F-Stone
 * @LastEditTime: 2025-09-13 18:42:01
-->
<template>
    <UebuilderWorkbenchEditingLayout :class="$style['workbench-editing-layout']" class="grid h-full">
        <template #siteLogo>
            <div :class="$style['site-logo']">
                <UeElIcon name="icon-uemo-logo" :size="24" />
            </div>
        </template>
        <template #siteSaveOper>
            <button ref="shareBtn" :class="$style['oper-btn--save']" data-theme="green">分享</button>
            <button ref="saveBtn" :class="$style['oper-btn--save']" data-theme="blue">保存</button>
        </template>
        <template #helpCenter>
            <div
                ref="openHelperPanelBtn"
                :class="$style['oper-btn--help-center']"
                class="flex justify-center items-center"
                @click="showHelperPanel"
            >
                <UeElIcon name="icon-app-question" :size="15" />
            </div>
        </template>
    </UebuilderWorkbenchEditingLayout>
    <UeElPopPanel v-model:open="popPanelOpen" v-bind="popPanelParams">
        <UebuilderWorkbenchUnitHelperPanel />
    </UeElPopPanel>
</template>
<script lang="ts" setup>
import UebuilderWorkbenchEditingLayout from "@stone/uebuilder-workbench-base/src/components/workbench-editing-layout";
import UebuilderWorkbenchUnitHelperPanel from "@stone/uebuilder-workbench-base/src/components/unit-helper-panel";

const popPanelOpen = ref(false);
const openHelperPanelBtn = ref<HTMLElement>();
const popPanelParams = computed<UE_EL_COMPONENT.UeElPopPanelProps>(() => ({
    panel: {
        position: {
            refEl: openHelperPanelBtn.value!,
            options: {
                placement: "right-end",
                middleware: [
                    ["offset", { mainAxis: 20 }],
                    ["shift", { crossAxis: true, padding: 17 }],
                ],
            },
        },
    },
}));

function showHelperPanel() {
    popPanelOpen.value = true;
}
</script>
<style lang="scss" module>
.workbench-editing-layout {
    .site-logo {
        margin-right: 20px;

        color: var(--editor-color-text);
    }
    .oper-btn--help-center {
        @include circle(24px);
        margin: 0 auto;

        cursor: pointer;

        color: #fff;
        background-color: var(--editor-color-text);
    }
    .oper-btn--save {
        padding: 4px 14px;

        color: var(--editor-color-text);
        border-radius: 5px;
        &[data-theme="blue"] {
            color: #fff;
            background-color: var(--theme-layout-row);
        }
        &[data-theme="green"] {
            color: #fff;
            background-color: var(--theme-layout-col);
        }
    }
}
</style>
