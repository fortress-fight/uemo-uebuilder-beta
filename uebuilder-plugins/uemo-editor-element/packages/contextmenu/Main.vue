<!--
 * @Description: 菜单组件
 * @Author: F-Stone
 * @LastEditTime: 2025-02-27 18:53:49
-->
<template>
    <div ref="rootDom" :class="$style['contextmenu']" @pointerleave="openPopupPanel">
        <div :class="$style['inner-wrapper']">
            <div v-for="(group, groupKey) in list" :key="groupKey" :class="$style['contextmenu-group']">
                <ContextmenuPanel
                    v-for="(item, index) in group"
                    :key="index"
                    ref="contextMenuPanels"
                    :path-id="`${level}-${groupKey}-${index}`"
                    :openId="openPath"
                    :level="level"
                    :data-disable="item.enable ? undefined : ''"
                    :disable="!item.enable"
                    :class="$style['oper-item']"
                    class="flex justify-between items-center"
                    @click="fireTrigger(item)"
                    @setOpenMap="setOpenPath(`${level}-${groupKey}-${index}`)"
                >
                    <div :class="$style['text']">{{ item.text }}</div>
                    <div v-if="item.subList && item.subList.length > 0" :class="$style['icon']">
                        <UeElIcon name="icon-youjiantou" />
                    </div>
                    <div v-else-if="item.hotkey" :class="$style['hotkey']">
                        {{ item.hotkey }}
                    </div>
                    <template v-slot:popPanel="slotProps">
                        <UeElContextmenu
                            v-if="item.subList && item.subList.length > 0"
                            :class="$style['contextmenu-sub-menu']"
                            :list="item.subList"
                            :level="slotProps.level + 1"
                            @trigger="fireTrigger"
                        />
                    </template>
                </ContextmenuPanel>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import type { UeElContextmenuBaseProps, UeElContextmenuItem } from "./index";

import $ from "@stone/uemo-editor-utils/lib/jquery";
import { eventBus } from "./sub-component/event-bus";
import ContextmenuPanel from "./sub-component/ContextmenuPanel.vue";
import UeElContextmenu from "./Main.vue";

defineOptions({ name: "UeElContextmenu" });
const prop = withDefaults(defineProps<UeElContextmenuBaseProps>(), { list: () => [], level: 0 });
const emit = defineEmits<{
    (ev: "trigger", type: { type: string; enable: boolean; text: string; param: any }): void;
}>();
const contextMenuPanels = useTemplateRef("contextMenuPanels");

const openPath = ref<string>("");
function setOpenPath(data: string) {
    openPath.value = data;
}

function fireTrigger(item: UeElContextmenuItem) {
    if (!item.type) return;
    emit("trigger", { type: item.type, enable: item.enable, text: item.text, param: item.param });
}

function openPopupPanel(ev: PointerEvent) {
    // 如果不是顶层菜单,直接返回
    if (prop.level !== 0) return;

    // 检查点击目标是否在浮动面板内部
    const isTargetInFloatingPanel = contextMenuPanels.value?.some((panel) => {
        const currentTarget = ev.relatedTarget as HTMLElement;
        const floatingRef = panel?.floatingRef;

        if (!floatingRef) return false;

        // 检查目标是否是浮动面板本身或其子元素
        return floatingRef === currentTarget || $(floatingRef).find(currentTarget).length > 0;
    });

    // 如果点击目标在面板内部,不做处理
    if (isTargetInFloatingPanel) return;

    // 关闭所有上下文菜单
    eventBus.emit("closeAll");
}

function closePopupPanel() {
    openPath.value = "";
}

onBeforeMount(() => {
    eventBus.on("closeAll", closePopupPanel);
    $(document).on("visibilitychange.floatingPanel", () => {
        if (document.visibilityState !== "visible") {
            eventBus.emit("closeAll");
        }
    });
});

onBeforeUnmount(() => {
    eventBus.off("closeAll", closePopupPanel);
    $(document).off("visibilitychange.floatingPanel");
});
</script>
<style lang="scss" module>
.contextmenu {
    overflow: auto;

    min-width: 200px;
    max-height: 30vh;

    color: #fff;
    border-radius: 5px;
    background: #333;
    box-shadow: 0 4px 8px rgb(0 0 0 / 0.2);
    .inner-wrapper {
        overflow: auto;

        min-height: 0;
        padding: 10px 4px;
    }
    .contextmenu-group {
        margin-bottom: 6px;
        padding-bottom: 6px;

        border-bottom: 1px solid rgba(#fff, 0.1);
        &:last-child {
            margin: 0;
            padding: 0;

            border-bottom-width: 0;
        }
    }
    .oper-item {
        font-size: 12px;
        line-height: 28px;

        position: relative;

        padding: 0 10px;

        cursor: pointer;

        border-radius: 3px;
        &[data-disable] {
            cursor: not-allowed;

            opacity: 0.5;
        }
        &:not([data-disable]):hover {
            background-color: var(--theme-layout-row);
            .icon,
            .hotkey {
                color: #fff;
            }
        }
        .icon,
        .hotkey {
            color: rgba(#fff, 0.5);
        }
    }
}
</style>
