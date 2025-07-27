<!--
 * @Description: 二维码面板
 * @Author: F-Stone
 * @LastEditTime: 2025-07-27 15:41:01
-->
<template>
    <div :class="$style['unit-qrcode-panel']">
        <div :class="$style['panel-head']">
            <div :class="$style['panel-title']">
                <span class="text">UEbuilder</span>
            </div>
            <div :class="$style['panel-subtitle']">
                <span class="text">{{ t("UEMO_QRCODE_PANEL_SUBTITLE") }}</span>
            </div>
        </div>
        <div :class="$style['panel-body']">
            <img src="https://resources.jsmo.xin/templates/upload/2/photo/uebuilder.png" alt="" />
        </div>
        <div :class="$style['panel-footer']">
            <span class="text">{{ t("UEMO_QRCODE_PANEL_FOOTER") }}</span>
        </div>
    </div>
</template>
<script lang="ts" setup>
import type { UnitQrcodePanelBaseProps } from "./index";

defineOptions({ name: "UnitQrcodePanel" });
const _props = withDefaults(defineProps<UnitQrcodePanelBaseProps>(), {});
const { t } = useI18n();
</script>
<style lang="scss" module>
.unit-qrcode-panel {
    width: 410px;
    padding: 50px;

    border-radius: 20px;
    background: #fff;
    .panel-title {
        font-size: 20px;
        font-weight: 700;
        font-style: normal;
        line-height: 1;

        margin-bottom: 4px;

        text-align: center;

        color: #181818;
    }
    .panel-subtitle {
        font-family: Microsoft YaHei;
        font-size: 30px;
        font-weight: 700;
        font-style: normal;

        margin-bottom: 20px;

        text-align: center;

        color: #181818;
    }
    .panel-body {
        @include image-placeholder(286, 286);
        width: 100%;
        padding: 10px;

        border-radius: 10px;
        background: #fff;
        box-shadow: 0 5px 20px 0 rgb(0 0 0 / 0.15);
    }
    .panel-footer {
        font-family: Microsoft YaHei;
        font-size: 14px;
        font-weight: 400;
        font-style: normal;
        line-height: 17px;

        margin-top: 20px;

        text-align: center;

        color: #999;
    }
}
</style>
