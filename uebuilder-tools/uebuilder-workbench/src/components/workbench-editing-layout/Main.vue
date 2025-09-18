<!--
 * FILE Workbench 编辑布局
 * @Description: Workbench 编辑布局
 * @Author: F-Stone
 * @LastEditTime: 2025-09-17 14:40:35
-->
<template>
    <UebuilderWorkbenchEditingLayout :class="$style['workbench-editing-layout']" class="grid h-full" @trigger="trigger">
        <template #siteLogo>
            <div :class="$style['site-logo']">
                <UeElIcon name="icon-uemo-logo" :size="24" />
            </div>
        </template>
        <template #siteSaveOper>
            <button ref="shareBtnRef" :class="$style['oper-btn--save']" data-theme="green">分享</button>
            <button ref="saveBtnRef" :class="$style['oper-btn--save']" data-theme="blue">保存</button>
        </template>
        <template #siteOperPanel>
            <SavePanel v-if="saveBtnRef" :trigger="saveBtnRef" />
            <SharePanel v-if="shareBtnRef" :trigger="shareBtnRef" />
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

import SavePanel from "./components/SavePanel.vue";
import SharePanel from "./components/SharePanel.vue";
import { UeBuilderWorkbenchKey } from "../../plugin/injection-key";

const UeBuilderWorkbench = inject(UeBuilderWorkbenchKey);

const popPanelOpen = ref(false);
const saveBtnRef = ref<HTMLElement>();
const shareBtnRef = ref<HTMLElement>();
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

function trigger(type: "tabWorkbenchStateToBrowsing" | "tabWorkbenchStateToPreview") {
    switch (type) {
        case "tabWorkbenchStateToBrowsing":
            // TASK 需要校验是否可以切换到 Browsing 状态
            UeBuilderWorkbench!.changeWorkbenchState("browsing");
            break;

        case "tabWorkbenchStateToPreview":
            // TASK 需要校验是否可以切换到 Preview 状态
            UeBuilderWorkbench!.changeWorkbenchState("preview", {
                data: UeBuilderWorkbench?.store.currentEditorPageData.data || "",
            });
            break;

        default:
            break;
    }
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
