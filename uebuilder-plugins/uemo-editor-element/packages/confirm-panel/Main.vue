<!--
 * @Description: 确认面板
 * @Author: F-Stone
 * @LastEditTime: 2025-02-25 00:38:53
-->
<template>
    <div :class="$style['confirm-panel']">
        <div :class="$style['panel-head']">
            <h2 :class="$style['panel-title']">
                {{ title }}
            </h2>
            <button
                v-if="showCloseBtn"
                :class="$style['btn--close']"
                class="flex justify-center items-center"
                @click="emit('close')"
            >
                <UeElIcon name="icon-remove" :size="15" />
            </button>
        </div>
        <div :class="$style['panel-body']" class="text-center">
            <div v-if="!descHTML" :class="$style['desc']">{{ desc }}</div>
            <div v-else :class="$style['desc-html']" v-html="descHTML"></div>
        </div>
        <div :class="[$style['panel-foot'], 'mt-3', footerBtn ? 'grid grid-cols-1' : 'grid grid-cols-2']">
            <button
                v-for="(btn, index) in buttons"
                :key="index"
                :class="btn.event === 'cancel' ? $style['btn--cancel'] : $style['btn--confirm']"
                :data-theme="btn.theme"
                @click.once="emit(btn.event)"
            >
                {{ btn.text }}
            </button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { UeElConfirmPanelBaseProps } from "./index";

defineOptions({ name: "UeElConfirmPanel" });
const { t } = useI18n();

const prop = withDefaults(defineProps<UeElConfirmPanelBaseProps>(), {
    title: "",
    desc: "",
    descHTML: "",
    footerBtn: undefined,
});

const emit = defineEmits<{ (e: "close" | "cancel" | "confirm"): void }>();

const buttons = computed<{ text: string; theme: string; event: "confirm" | "cancel" }[]>(() => {
    const { footerBtn, cancelBtn, confirmBtn } = prop;
    if (footerBtn) {
        return [{ text: footerBtn.text, theme: footerBtn.theme, event: "confirm" }];
    } else {
        return [
            { text: cancelBtn?.text || t("CANCEL"), theme: cancelBtn?.theme || "red", event: "cancel" },
            { text: confirmBtn?.text || t("CONFIRM"), theme: confirmBtn?.theme || "white", event: "confirm" },
        ];
    }
});
</script>
<style lang="scss" module>
.confirm-panel {
    position: relative;

    overflow: hidden;

    width: 300px;
    padding-top: 30px;

    border-radius: var(--ue-border-radius--panel);
    background-color: #fff;
    box-shadow: var(--ue-shadow--lv2);
    .panel-body {
        font-size: 13px;
        line-height: 18px;

        color: color(var(--ue-font-color));
        .desc {
            padding: 12px;
            padding-bottom: 25px;
        }
    }
    .panel-head {
        // margin-bottom: 12px;
    }
    .btn--close {
        @include square(36px);
        position: absolute;
        top: 7px;
        right: 7px;

        color: color(var(--ue-font-color));
        &:hover {
            color: color(var(--ue-font-color--deeper));
        }
    }
    .panel-title {
        font-size: 16px;
        line-height: 24px;

        padding: 12px 12px 0;

        text-align: center;
    }
    .panel-foot {
        button {
            font-size: 12px;
            line-height: 14px;

            padding: 13px 8px;

            transition: 0.36s ease;

            // border-radius: 4px;
            &[data-theme="red"] {
                color: #fff;
                background-color: color(var(--ue-color--error));
            }
            &[data-theme="white"] {
                color: color(var(--ue-font-color--deeper));
                background-color: #fff;
            }
            &[data-theme="yellow"] {
                color: #fff;
                background-color: color(var(--ue-color--yellow));
            }
        }
    }
}
</style>
