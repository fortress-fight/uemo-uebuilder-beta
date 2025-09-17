<!--
 * @Description: UEBuilder 保存面板
 * @Author: F-Stone
 * @LastEditTime: 2025-09-17 12:21:24
-->
<template>
    <div :class="$style['unit-save-panel']">
        <div :class="$style['inner']">
            <div :class="$style['btn-group']" class="flex flex-col">
                <button
                    v-for="(item, index) in btns"
                    :key="index"
                    :class="$style['oper-btn']"
                    class="flex"
                    @click="savePage(item.type)"
                >
                    <UeElIcon :class="$style['ic']" :name="item.icon" :size="21" />
                    <div>
                        <div :class="$style['title']">{{ item.title }}</div>
                        <div :class="$style['subtitle']">{{ item.subtitle }}</div>
                    </div>
                </button>
            </div>
            <slot name="panelFooter" />
        </div>
    </div>
</template>
<script lang="ts" setup>
import type { UnitSavePanelBaseProps } from "./index";

import { _throttle } from "@stone/uemo-editor-utils/lib/lodash";

const _props = withDefaults(defineProps<UnitSavePanelBaseProps>(), {});
defineOptions({ name: "UnitSavePanel" });

const btns: { icon: string; title: string; subtitle: string; type: UE_BUILDER.SaveType }[] = [
    {
        icon: "icon-app-save-21",
        title: "保存到我的页面库",
        subtitle: "下次登录后可直接使用，继续编辑",
        type: "saveOnline",
    },
    {
        icon: "icon-app-code-21 ",
        title: "下载制作文件",
        subtitle: "保存到本地后，下次直接上传即可继续使用",
        type: "saveLocal",
    },
    {
        icon: "icon-app-download-21",
        title: "下载源文件",
        subtitle: "打包下载整个页面的HTML / 图片 / CSS / JS / 等",
        type: "saveFile",
    },
];

const emit = defineEmits<{
    (e: "save", type: UE_BUILDER.SaveType): void;
}>();

const savePage = _throttle((type: UE_BUILDER.SaveType) => emit("save", type), 1000, { trailing: false });
</script>
<style lang="scss" module>
.unit-save-panel {
    font-size: 12px;
    line-height: 1.5;

    position: relative;

    width: 370px;
    padding: 30px 20px;

    cursor: default;

    border-radius: 10px;
    background: #fff;
    box-shadow: 0 20px 40px rgb(0 0 0 / 0.1);
    &::after {
        position: absolute;
        bottom: 100%;
        left: 0;

        width: 100%;
        height: 17px;

        content: "";
    }
    .btn-group {
        gap: 20px;
    }
    .oper-btn {
        padding: 18px;

        text-align: left;

        border: 1px solid #f4f4f4;
        border-radius: 5px;
        background: #fff;
        &:hover {
            border: 1px solid #2c48ff;
            background: #f5f8ff;
            .title {
                color: #2c48ff;
            }
        }
        .ic {
            font-size: 20px;

            margin-right: 12px;

            color: #2c48ff;
        }
        .title {
            font-size: 15px;
            font-weight: 600;
            line-height: 1.2;

            margin-bottom: 6px;

            color: #181818;
        }
        .subtitle {
            font-size: 12px;
            font-weight: 400;

            color: #666;
        }
    }
}
</style>
