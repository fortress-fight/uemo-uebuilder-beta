<template>
    <div :class="$style['welcome-layer']" class="flex items-center justify-center">
        <div :class="$style['start-panel']">
            <div :class="$style['panel-head']">
                <h1 :class="$style['panel-title']">{{ t("startPanelTitle") }}</h1>
                <p :class="$style['panel-subtitle']">{{ t("startPanelSubtitle") }}</p>
            </div>
            <div :class="$style['panel-body']" class="flex justify-center">
                <button :class="$style['entry-btn']" @click="emit('submit', 'openPagePanel')">
                    <div :class="$style['img-wrapper']">
                        <img src="./images/entry-1.png" alt="" />
                    </div>
                    <div :class="$style['title']">{{ t("startPanelPageBtnTitle") }}</div>
                    <div :class="$style['subtitle']">{{ t("startPanelPageBtnSubtitle") }}</div>
                </button>
                <button :class="$style['entry-btn']" @click="emit('submit', 'openLayoutPanel')">
                    <div :class="$style['img-wrapper']">
                        <img src="./images/entry-2.png" alt="" />
                    </div>
                    <div :class="$style['title']">{{ t("startPanelLayoutBtnTitle") }}</div>
                    <div :class="$style['subtitle']">{{ t("startPanelLayoutBtnSubtitle") }}</div>
                </button>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
const { t } = useI18n();
const emit = defineEmits<{
    (e: "submit", type: "openPagePanel" | "openLayoutPanel"): void;
}>();
</script>
<style lang="scss" module>
.welcome-layer {
    position: fixed;
    z-index: 10000;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;

    background: rgb(255 255 255 / 0.8);

    backdrop-filter: blur(3px);
    .start-panel {
        padding-bottom: 15px;
    }
    .panel-head {
        margin-bottom: 60px;

        text-align: center;
    }
    .panel-title {
        font-size: 48px;
        font-weight: 700;
        line-height: 120%;

        margin-bottom: 17px;

        color: var(--editor-color-text);
    }
    .panel-subtitle {
        font-size: 16px;
        line-height: 120%;

        color: var(--editor-c-gray);
    }
    .panel-body {
        gap: 60px;
    }
    .entry-btn {
        padding: 60px 55px;

        text-align: center;

        border: 1px solid var(--editor-c-border--lighter);
        border-radius: 10px;
        background-color: #fff;
        .img-wrapper {
            @include image-placeholder(410px, 240px);
            margin-bottom: 30px;
        }
        &:hover {
            border-color: #2c48ff;
        }
        .title {
            font-size: 20px;
            font-weight: 700;
            line-height: 120%;

            margin-bottom: 10px;

            text-align: center;

            color: var(--editor-color-text);
        }
        .subtitle {
            font-size: 14px;
            line-height: 120%;

            margin-top: 10px;

            color: var(--editor-c-gray);
        }
    }
}
@media screen and (max-width: 1920px) {
    .welcome-layer {
        .start-panel {
            padding-bottom: 30px;
        }
        .panel-title {
            font-size: 38px;

            margin-bottom: 17px;
        }
        .panel-subtitle {
            font-size: 14px;
        }
        .entry-btn {
            padding: 40px 35px;
            .img-wrapper {
                width: 360px;
                margin-bottom: 10px;
            }
            .title {
                font-size: 18px;

                margin-bottom: 10px;
            }
            .subtitle {
                font-size: 13px;
                line-height: 120%;
            }
        }
    }
}
</style>
