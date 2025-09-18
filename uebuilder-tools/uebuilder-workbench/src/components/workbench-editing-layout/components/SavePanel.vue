<!--
 * @description 保存面板组件
 * @component SavePanel
 * @example
 * ```vue
 * <SavePanel :save-btn="saveButtonElement" />
 * ```
 -->
<template>
    <UeElLabel
        to="parent"
        content-tag="div"
        theme="ue-el-panel"
        placement="bottom-end"
        content-class="content-wrapper"
        :trigger-target="trigger"
        :arrow="false"
        :delay="[0, 0]"
        :offset="[-25, 5]"
        :animation="false"
        :interactive="true"
        :hide-on-click="false"
        :plugins="plugins"
    >
        <UebuilderWorkbenchSavePanel @save="saveHandle">
            <template #panelFooter>
                <div :class="$style['ad-group']">
                    <div :class="$style['group--inner']">
                        <div :class="$style['title']">所有编辑的页面都可复用到UEMO上使用</div>
                        <img src="../images/uemo-ad.png" alt="" />
                        <a href="https://www.uemo.net/template/" :class="$style['btn-link']" target="_blank">
                            创建品牌官网
                        </a>
                    </div>
                </div>
            </template>
        </UebuilderWorkbenchSavePanel>
    </UeElLabel>
</template>

<script lang="ts" setup>
import type { Props } from "@stone/uemo-editor-utils/lib/tippy";

import { saveAs } from "@stone/uemo-editor-utils/lib/file-saver";

import UebuilderWorkbenchSavePanel from "@stone/uebuilder-workbench-base/src/components/unit-save-panel";

const _props = defineProps<{ trigger: HTMLElement }>();

function saveHandle(type: UE_BUILDER.SaveType) {
    switch (type) {
        case "saveOnline":
            break;

        case "saveLocal":
            saveAs(new Blob(["csv"], { type: "text/txt,charset=UTF-8" }), "PageText.jsmo");
            break;

        case "saveFile":
            break;

        default:
            break;
    }
}

/**
 * 创建一个插件，用于在鼠标移出窗口时隐藏面板
 * @description 这个插件会监听 pointerout 事件，当鼠标移出面板和触发器区域时自动隐藏面板
 * @returns Tippy 插件配置对象
 */
const createHideOnOutWindowPlugin = (): Props["plugins"][number] => ({
    name: "hideOnOutWindow",
    fn(param) {
        /**
         * 检查鼠标移出事件的状态并决定是否隐藏面板
         * @param event - 鼠标移出事件对象
         */
        const checkState = (event: MouseEvent) => {
            const panelDom = param.popper;
            const triggerDom = param.reference;
            const target = event.relatedTarget as HTMLElement;

            // 如果鼠标仍在面板或触发器区域内，不做任何操作
            if (
                target === panelDom ||
                panelDom.contains(target) ||
                target === triggerDom ||
                triggerDom.contains(target)
            ) {
                return;
            }

            // 隐藏面板
            param.hide();
        };

        return {
            onShow() {
                window.addEventListener("pointerout", checkState);
            },
            onHide() {
                window.removeEventListener("pointerout", checkState);
            },
        };
    },
});

// 配置面板插件
const plugins: Props["plugins"] = [createHideOnOutWindowPlugin()];
</script>

<style lang="scss" module>
.ad-group {
    margin-top: 20px;

    border-top: 1px dashed #f4f4f4;
    .group--inner {
        margin-top: 20px;
        padding: 20px;

        border-radius: 5px;
        background: #f4f4f4;
    }
    .title {
        font-size: 14px;
        font-weight: 400;
        line-height: 100%;

        margin-bottom: 25px;

        color: #999;
    }
    .btn-link {
        font-size: 14px;
        font-weight: 400;
        line-height: 100%;

        display: block;

        margin-top: 25px;
        padding: 12px;

        text-align: center;

        color: #fff;
        border-radius: 1000px;
        background: #2c48ff;
    }
}
</style>
