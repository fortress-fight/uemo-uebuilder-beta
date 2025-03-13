<template>
    <div :class="$style['welcome-box']">
        <div :class="$style['tip-message']">
            {{ t("IMAGE_AI_WELCOME_TIP") }}
        </div>
        <div :class="$style['tip-box']">
            <div :class="$style['tip-head']">{{ t("IMAGE_AI_TIP_HEAD") }}</div>
            <div :class="$style['tip-list']" class="flex flex-wrap gap-2">
                <div v-for="(item, index) in tipItem" :key="index" :class="$style['tip-item']" @click="submitMsg(item)">
                    {{ item }}
                </div>
            </div>
        </div>
    </div>
    <AIChatPanel :chat-list="chatList" @continue="submitMsg" @submit="emit('submit', $event)" />
    <div class="relative grid items-center" :class="$style['panel-footer--inner']">
        <button v-ue-el-label="t('IMAGE_AI_CHAT_CLEAR')" :class="$style['btn--clear']" @click="resetChat">
            <UeElIcon :class="$style['ic']" name="icon-shanchu" :size="16" />
        </button>
        <UeElTextInput
            :value="inputText"
            theme="enterText"
            :disable="loading"
            :class="$style['chat-input']"
            padding-size="level4"
            :placeholder="t('IMAGE_AI_CHAT_PLACEHOLDER')"
            @confirm="submitMsg"
        >
            <template #after="{ confirm }">
                <button
                    :class="$style['btn--submit']"
                    class="flex-shrink-0 h-full flex items-center justify-center"
                    @click="confirm"
                >
                    <UeElIcon
                        :size="16"
                        :class="$style['ic']"
                        class="justify-center cursor-pointer"
                        name="icon-app-air-plane"
                    />
                </button>
            </template>
        </UeElTextInput>
        <div v-if="loading" :class="$style['loading-box']" class="flex justify-center items-center" @click="cancelApi">
            <span :class="$style['btn--cancel']">{{ t("IMAGE_AI_CHAT_CANCEL") }}</span>
        </div>
    </div>
</template>
<script lang="ts" setup>
import type { UeAIPluginParams } from "../index";

import mitt from "@stone/uemo-editor-utils/lib/mitt";
import { guid } from "@stone/uemo-editor-utils/lib/guid";
import { UE_ENGINE } from "@stone/uemo-editor-utils/lib/ue-ai";

import AIChatPanel from "./AIChatPanel.vue";

const { t } = useI18n();
const instance = getCurrentInstance();
const prop = withDefaults(defineProps<{ config: UeAIPluginParams }>(), {});
const emit = defineEmits<{ (ev: "submit", data: string): void; (ev: "scrollTo", pos: "top" | "bottom"): void }>();

const axiosMitt = mitt<{ cancelAxios: undefined }>();
const loading = ref<boolean>();
const tipItem = computed(() => [t("IMAGE_AI_TIP_1"), t("IMAGE_AI_TIP_2"), t("IMAGE_AI_TIP_3")]);

// #region 对话框逻辑
/**
 * @example
 * [
 *  { type: "user", msg: "帮我找下深色背景的苹果手机图片" },
 *  { type: "ai", msg: "好的，你需要有图片尺寸的要求吗？" },
 *  { type: "user", msg: "越大越好，多来几张" },
 *  { type: "ai", msg: "好的，稍等我正在为您查找！" },
 * ]
 */
const chatList = ref<{ type: "user" | "ai"; msg?: string; imgs?: string[] }[]>([]);

watch(
    () => chatList.value.length,
    () => {
        requestAnimationFrame(() => {
            emit("scrollTo", "bottom");
        });
    }
);

let sessionId = guid(21);
const ueEngin = new UE_ENGINE();
const inputText = ref<string>("");
async function submitMsg(text: string) {
    if (loading.value || !text) return;
    loading.value = true;
    chatList.value.push({ type: "user", msg: text });
    inputText.value = "";

    const { fire, cancel } = ueEngin.submitAiApi(prop.config.url, prop.config.type, prop.config.key, {
        session_id: sessionId,
        text,
    });

    try {
        const res = await fire<string | { imgs: string[] }>();
        if (typeof res.data === "string") {
            if (res.data) {
                chatList.value.push({ type: "ai", msg: res.data });
            } else {
                chatList.value.push({ type: "ai", msg: t("IMAGE_AI_NOT_FOUND") });
            }
        } else if (typeof res.data === "object") {
            if (res.data.imgs && res.data.imgs.length > 0) {
                chatList.value.push({
                    type: "ai",
                    imgs: res.data.imgs,
                });
            } else {
                chatList.value.push({ type: "ai", msg: t("IMAGE_AI_NOT_FOUND") });
            }
        }
    } catch (error) {
        instance?.proxy?.$ueElError(error as Error);
    } finally {
        loading.value = false;
    }

    axiosMitt.on("cancelAxios", cancel);
}

function cancelApi() {
    axiosMitt.emit("cancelAxios");
    loading.value = false;
}

function resetChat() {
    cancelApi();
    chatList.value = [];
    sessionId = guid(21);
}

onBeforeUnmount(() => {
    cancelApi();
    axiosMitt.all.clear();
});
// #endregion
</script>
<style lang="scss" module>
.welcome-box,
.panel-footer--inner {
    font-size: 13px;
    line-height: 2em;
}
.welcome-box {
    .tip-message {
        padding: 8px;

        border-radius: 5px;
        background-color: rgb(44 72 255 / 15%);
    }
    .tip-box {
        margin: 10px 0;

        color: color(var(--ue-font-color));
    }
    .tip-list {
        margin: 10px 0;
    }
    .tip-item {
        padding: 5px 15px;

        cursor: pointer;

        color: color(var(--ue-font-color--deeper));
        border: 1px solid color(var(--ue-border-color));
        border-radius: 50px;
        background-color: #fff;
        &:hover {
            color: #fff;
            border-color: color(var(--ue-border-color--deeper));
            background-color: color(var(--ue-background-color--deeper));
        }
    }
}

// #region 对话面板
// #endregion
.panel-footer {
    //
}
.panel-footer--inner {
    gap: 10px;

    grid-template-columns: 26px 1fr;
    .btn--submit {
        width: 36px;

        transition: 0.2s ease;

        color: #a9aab9;
        &:hover {
            color: color(var(--ue-font-color--deeper));
        }
    }
    .btn--clear {
        @include square(26px);
        display: flex;

        transition: 0.2s ease;

        color: #a9aab9;

        align-items: center;
        justify-content: center;
        &:hover {
            color: color(var(--ue-font-color--deeper));
        }
    }
    .chat-input {
        &:focus-within {
            .btn--submit {
                color: color(var(--ue-font-color--deeper));
            }
        }
    }
    .loading-box {
        @include ab-cover;
        z-index: 100;

        cursor: pointer;

        color: color(var(--ue-font-color--deeper));
        border: 1px solid color(var(--ue-border-color));
        border-radius: 3px;
        background-color: #fff;
        .btn--cancel {
            font-size: 13px;
            line-height: 1em;

            position: relative;
            z-index: 10;
        }
        .loading {
            @include ab-cover;
            padding: 0 10px;
        }
        &:hover {
            color: #fff;
            border-color: color(var(--ue-border-color--deeper));
            background-color: color(var(--ue-background-color--deeper));
        }
    }
}
</style>
