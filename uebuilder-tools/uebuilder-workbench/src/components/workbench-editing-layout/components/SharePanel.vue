<!--
 * @Description: 分享面板
 * @Author: F-Stone
 * @LastEditTime: 2025-09-18 12:49:44
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
        :plugins="plugins"
    >
        <div :class="$style['share-panel']">
            <template v-if="allowShare">
                <div :class="$style['row']">
                    <div :class="$style['row-head']" class="flex justify-between items-center">
                        <div :class="$style['name']">{{ t("UNIT_SHARE_PAGE") }}</div>
                        <button v-if="shareLink" :class="$style['btn--refresh-link']" @click="updateShareLink">
                            {{ t("UNIT_LINK_UPDATE") }}
                        </button>
                    </div>
                    <div v-if="shareLink" :class="$style['value']" class="relative">
                        <input type="text" :value="shareLink" :class="$style['input-link']" disabled="true" />
                        <button :class="$style['copy-btn']" @click="copyShareLink">{{ t("UNIT_LINK_COPY") }}</button>
                    </div>
                    <div v-else :class="$style['value']">
                        <div :class="$style['tip--save']">{{ t("SHARE_TIP_CREATE_LINK") }}</div>
                    </div>
                </div>
                <button v-if="!shareLink" :class="$style['btn--create-link']" @click="updateShareLink">
                    {{ t("SHARE_LINK_TITLE") }}
                </button>
                <div v-else :class="$style['tip']" v-html="t('SHARE_TIP_EXPIRE')"></div>
                <div v-if="loading" :class="$style['loading-wrapper']" class="flex justify-center items-center">
                    <UeElIcon name="icon-app-loading" :size="32" />
                </div>
            </template>
            <template v-else>
                <div :class="$style['row']">
                    <div :class="$style['row-head']">
                        <div :class="$style['name']">{{ t("UNIT_SHARE_PAGE") }}</div>
                    </div>
                    <div :class="$style['value']">
                        <div :class="$style['tip--save']">{{ t("SHARE_TIP_SAVE") }}</div>
                    </div>
                    <button :class="$style['btn--save']" @click="handleSave">{{ t("SHARE_SAVE_TIP") }}</button>
                </div>
            </template>
        </div>
    </UeElLabel>
</template>
<script lang="ts" setup>
import type { Props } from "@stone/uemo-editor-utils/lib/tippy";

import copy from "@stone/uemo-editor-utils/lib/copy";

const instance = getCurrentInstance();
const _props = defineProps<{ trigger: HTMLElement }>();
const emit = defineEmits<{ (e: "save"): void }>();
const { t } = useI18n();

const allowShare = ref(false);
const shareLink = ref("");
const loading = ref(false);

const updateShareLink = () => {
    // eslint-disable-next-line
    console.log(`更新分享链接`);
};

function copyShareLink() {
    const isSuc = copy(shareLink.value);
    if (isSuc) {
        instance?.proxy?.$ueElToast.success(t("UNIT_COPY_SUCCESS"));
    } else {
        instance?.proxy?.$ueElToast.error(t("UNIT_COPY_FAILED"));
    }
}

function handleSave() {
    emit("save");
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
@keyframes rotate {
    0% {
        transform: rotate(0deg);
    }
    50% {
        transform: rotate(180deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
.share-panel {
    font-size: 12px;
    line-height: 1.5;

    position: relative;

    width: 370px;
    padding: 30px 20px;

    cursor: default;
    pointer-events: all;

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
    .loading-wrapper {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;

        color: #333;
        background-color: #fff;
        :global(.ic) {
            font-size: 30px;

            animation: rotate 2s infinite linear;
        }
    }
    .btn--save,
    .btn--create-link {
        font-size: 13px;
        line-height: 36px;

        width: 100%;
        margin-top: 16px;

        color: #fff;
        border-radius: 4px;
        background-color: var(--theme-layout-col);
    }
    .btn--refresh-link {
        font-size: 12px;

        position: relative;

        color: var(--editor-c-gray);
        &::after {
            position: absolute;
            top: 100%;
            left: 0;

            width: 100%;
            height: 2px;

            content: "";
        }
        &:hover {
            color: var(--editor-color-text);
        }
    }
    .row-head {
        margin-bottom: 20px;
    }
    .name {
        font-family: "微软雅黑";
        font-size: 16px;
        font-weight: 700;
        line-height: 24px;

        color: #181818;
    }
    .input-link {
        line-height: 40px;

        overflow: hidden;

        width: 100%;
        padding: 0 18px;
        padding-right: 105px;

        text-overflow: ellipsis;

        color: #181818;
        border-width: 0;
        border-radius: 5px;
        background: #f6f6f6;
    }
    .row {
        position: relative;

        margin-bottom: 16px;
        &:last-child {
            margin-bottom: 0;
        }
    }
    .copy-btn {
        line-height: 18px;

        position: absolute;
        top: 0;
        right: 3px;
        bottom: 0;

        height: 34px;
        margin: auto;
        padding: 8px 15px;

        white-space: nowrap;

        color: #fff;
        border-radius: 4px;
        background-color: #2c48ff;
    }
    .tip {
        font-family: "Arial";
        font-size: 12px;
        font-weight: 400;
        line-height: 16px;

        margin-top: 12px;

        color: #999;
        &::before {
            margin-right: 4px;

            content: "*";

            color: var(--c-red-40);
        }
        a {
            color: var(--c-red-40);
        }
    }
    .tip--save {
        font-size: 13px;

        padding: 20px;

        text-align: center;

        color: #181818;
        border: 1px dashed #181818;
        border-radius: 4px;
    }
}
</style>
