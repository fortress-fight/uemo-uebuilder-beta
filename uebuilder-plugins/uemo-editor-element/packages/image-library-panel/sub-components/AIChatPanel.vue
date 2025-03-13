<template>
    <div :class="$style['chat-panel']" class="grid gap-5">
        <div
            v-for="(item, index) in chatList"
            :key="index"
            :class="$style['chat-box']"
            class="flex"
            :data-type="item.type"
        >
            <div v-if="item.msg" :class="$style['msg-box']">
                <span class="text">
                    {{ item.msg }}
                </span>
            </div>
            <div v-if="item.imgs" :class="$style['chat-inner']" class="flex flex-col">
                <div :class="$style['msg-box']">
                    <div :class="$style['image-list']" class="grid">
                        <img
                            v-for="(img, i) in item.imgs"
                            :key="i"
                            class="cursor-pointer"
                            :src="img"
                            alt=""
                            @click="emit('submit', img)"
                        />
                    </div>
                </div>
                <div v-if="index === chatList.length - 1" :class="$style['image-footer']">
                    <button
                        :class="[$style['btn--add-more'], $style['btn--oper']]"
                        @click="emit('continue', t('IMAGE_AI_CHAT_CONTINUE'))"
                    >
                        {{ t("IMAGE_AI_CHAT_CONTINUE") }}
                    </button>
                </div>
            </div>
        </div>
        <div v-if="loading" :class="$style['chat-box']" data-type="ai" class="flex">
            <div :class="$style['msg-box']" class="flex items-center">
                <span class="mr-3">{{ t("IMAGE_AI_CHAT_PRODUCING") }}</span>
                <UeElIcon :size="16" :class="[$style['ic'], $style['loading-ic']]" name="icon-app-loading" />
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
const { t } = useI18n();

const _props = withDefaults(defineProps<{ chatList: { type: "user" | "ai"; msg?: string; imgs?: string[] }[] }>(), {
    chatList: () => [],
});
const emit = defineEmits<{ (ev: "continue" | "submit", value: string): void }>();

const loading = ref<boolean>();
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
.chat-panel {
    font-size: 13px;
    line-height: 2em;

    min-height: 50px;
}
.chat-box {
    align-items: flex-start;
    &[data-type="user"] {
        justify-content: flex-end;
        .msg-box {
            word-break: break-all;

            color: #fff;
            background-color: color(var(--ue-color--active));
        }
    }
    &[data-type="ai"] {
        justify-content: flex-start;
        .msg-box {
            word-break: break-all;

            color: #333;
            background-color: #f5f5f5;
        }
    }
    .chat-inner {
        max-width: calc(100% - 50px);

        gap: 10px;
    }
    .msg-box {
        padding: 8px;

        user-select: text;

        border-radius: 5px;
    }
    .image-list {
        gap: 4px;
        grid-template-columns: repeat(2, 1fr);
        img {
            width: 100%;
            height: 100%;

            border-radius: 3px;

            object-fit: cover;
        }
    }
    .image-footer {
        .btn--oper {
            padding: 0 15px;

            cursor: pointer;

            color: color(var(--ue-font-color));
            border: 1px solid color(var(--ue-border-color));
            border-radius: 25px;
            background-color: #fff;
            &:hover {
                color: color(var(--ue-font-color--deeper));
                border-color: color(var(--ue-border-color--deeper));
            }
        }
    }
}
.loading-ic {
    animation: rotate 2s infinite linear;

    color: #a9aab9;
}
</style>
