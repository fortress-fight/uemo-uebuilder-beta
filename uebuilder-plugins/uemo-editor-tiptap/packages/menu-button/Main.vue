<!--
 * @Description: 菜单按钮
 * @Author: F-Stone
 * @LastEditTime: 2025-07-07 01:11:39
-->
<template>
    <button
        ref="rootDom"
        data-name="menuBtn"
        v-ue-el-label="labelParam"
        tabindex="-1"
        :class="$style['menu-button']"
        :data-active="active"
        :data-disable="disable || false"
        @click="clickEvent"
    >
        <div :class="$style['inner']" class="flex items-center justify-center">
            <UeElIcon v-if="menuInfo.buttonType === 'iconButton'" :name="icon || menuInfo.icon" />
            <span v-else-if="menuInfo.buttonType === 'textButton'" :class="$style['text-button']">
                {{ text }}
            </span>
            <div v-else-if="menuInfo.buttonType === 'colorButton'" :class="$style['color-button']">
                <div :class="$style['color-button--inner']" :style="{ background: color || '' }"></div>
            </div>
        </div>
        <slot></slot>
    </button>
</template>
<script lang="ts" setup>
import type { UeTiptapMenuButtonBaseProps } from "./index";

import { operMap } from "../../utils/tiptap-oper-manage";
import { formatKeyboardShortcut } from "../../utils/tiptap-helper";

defineOptions({ name: "UeTiptapMenuButton" });

const prop = withDefaults(defineProps<UeTiptapMenuButtonBaseProps>(), {});
const emit = defineEmits<{ (e: "trigger", ev: MouseEvent): void }>();

const rootDomRef = useTemplateRef("rootDom");
const className = useCssModule();

const tipMessage = computed(() => {
    return prop.tip ?? menuInfo.value?.title;
});

const menuInfo = computed(() => {
    const defaultInfo = { title: "", shortcut: "", icon: "", buttonType: "" };

    if (!prop.type) return defaultInfo;

    return Object.assign(defaultInfo, operMap[prop.type]);
});

const labelParam = computed<UE_EL_UTIL.LabelOption>(() => {
    if (!tipMessage.value && !menuInfo.value.shortcut) return;

    // 提示信息
    const tipMessageDom = tipMessage.value ? `<span :class="${className["main-tip"]}">${tipMessage.value}</span>` : "";

    // 快捷键
    const shortcutDom = menuInfo.value.shortcut
        ? `<span :class="${className["shortcut-tip"]}">${formatKeyboardShortcut(menuInfo.value.shortcut)}</span>`
        : "";

    return {
        content: `
            <div class="${className["btn-tip"]}" class="text-left">
                ${tipMessageDom}
                ${shortcutDom}
            </div>
        `,
        animation: false,
        offset: [0, 5],
        theme: "editor-tip-tap",
        arrow: false,
    };
});

function clickEvent(ev: MouseEvent) {
    if (!prop.disable) {
        emit("trigger", ev);
    }
}

defineExpose({
    getButtonRect: () => {
        return rootDomRef.value?.getBoundingClientRect();
    },
});
</script>
<style lang="scss" module>
.menu-button {
    --max-width: 70px;
    font-size: 13px;
    line-height: 15px;

    position: relative;

    padding: 5px;

    color: color(var(--ue-font-color--deeper));
    // tabindex: -1;
    &:hover,
    &[data-active="true"] {
        .inner {
            background: color(var(--ue-background-color));
        }
    }
    &[data-disable="true"] {
        cursor: not-allowed;
        .inner {
            opacity: 0.3;
        }
    }
    .inner {
        position: relative;

        overflow: hidden;

        min-width: 26px;
        max-width: var(--max-width, 70px);
        padding: 5px;

        text-align: left;

        border: 1px solid color(var(--ue-border-color), 0);
        border-radius: var(--ue-border-radius--lv1);
        &:hover {
            background: color(var(--ue-background-color));
        }
        &:hover,
        &:last-child {
            margin-right: 0;
        }
    }

    // #region 文字按钮
    .text-button {
        line-height: 15px;

        overflow: hidden;

        white-space: nowrap;
        text-overflow: ellipsis;
    }

    // #endregion

    // #region 颜色按钮
    .color-button {
        width: 16px;
        height: 16px;
        padding: 1px;

        border: 1px solid color(var(--ue-border-color));
        border-radius: var(--ue-border-radius--lv1);
    }
    .color-button--inner {
        width: 100%;
        height: 100%;

        border-radius: var(--ue-border-radius--lv1);
        background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RTUyOUU2MTAwNjczMTFFOEE1MEQ5RTI4RUQzQzJBNTUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RTUyOUU2MTEwNjczMTFFOEE1MEQ5RTI4RUQzQzJBNTUiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpFNTI5RTYwRTA2NzMxMUU4QTUwRDlFMjhFRDNDMkE1NSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpFNTI5RTYwRjA2NzMxMUU4QTUwRDlFMjhFRDNDMkE1NSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PuLRCmkAAAAqSURBVHjaYvz//z8DNnD27Fms4kwMJIJRDcQAFlzhbWxsPBpK9NMAEGAA+cQIhpHCLJEAAAAASUVORK5CYII=");
        background-size: 5px;
    }

    // #endregion
}
.btn-tip {
    font-size: 12px;

    transform: scale(0.9);
    transform-origin: center;

    color: #fff;
    .shortcut-tip {
        margin-left: 4px;

        color: color(var(--ue-font-color));
    }
}
</style>
