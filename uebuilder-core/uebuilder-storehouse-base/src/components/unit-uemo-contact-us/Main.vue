<!--
 * @Description: Uemo 联系我们
 * @Author: F-Stone
 * @LastEditTime: 2025-07-27 15:44:14
-->
<template>
    <div :class="$style['unit-uemo-contact-us']">
        <div :class="$style['container-box']" class="flex justify-between">
            <div :class="$style['state-pos--left']">
                <div :class="$style['nav-group']" class="inline-grid grid-cols-5">
                    <a :class="$style['nav-item']" href="https://www.uemo.net/page/about.html" target="_blank">
                        <span class="text">{{ t("UEBUILDER_CONTACT_US_TITLE") }}</span>
                    </a>
                    <a :class="$style['nav-item']" href="https://www.uemo.net/page/contact.html" target="_blank">
                        <span class="text">{{ t("UEBUILDER_CONTACT_US_TITLE") }}</span>
                    </a>
                </div>
                <div :class="$style['copyright']">
                    {{ t("UEBUILDER_CONTACT_US_COPYRIGHT") }}
                </div>
                <div :class="$style['beian']">
                    <a rel="nofollow" class="beian" href="http://beian.miit.gov.cn" target="_blank">
                        {{ t("UEBUILDER_CONTACT_US_BEIAN") }}
                    </a>
                    <a href="//resources.jsmo.xin/templates/upload/2/copy-gov.jpg" target="_blank">
                        {{ t("UEBUILDER_CONTACT_US_BEIAN_TEL") }}
                    </a>
                </div>
            </div>
            <div :class="$style['state-pos--right']" class="flex">
                <div :class="$style['share']">
                    <div :class="$style['weixin']" href="javascript:;" @click="openWeixin">
                        <i class="ue-share ue-share-weixin"></i>
                    </div>
                </div>
                <div :class="$style['tel']">
                    <div :class="$style['num']">010-69557550</div>
                    <span :class="$style['msg']">{{ t("UEBUILDER_CONTACT_US_SUBTITLE") }}</span>
                </div>
            </div>
        </div>
    </div>
    <UeElPopPanel v-model:open="popPanelOpen" v-bind="popPanelParams">
        <UnitQrcodePanel />
    </UeElPopPanel>
</template>
<script lang="ts" setup>
import type { UeElPopPanelBaseProps } from "@stone/uemo-editor-element/packages/pop-panel";
import type { UnitUemoContactUsBaseProps } from "./index";

import UnitQrcodePanel from "../unit-qrcode-panel";

defineOptions({ name: "UnitUemoContactUs" });
const _props = withDefaults(defineProps<UnitUemoContactUsBaseProps>(), {});

const { t } = useI18n();

const popPanelOpen = ref<boolean>(false);
const popPanelParams = ref<UeElPopPanelBaseProps>({
    autoClose: true,
    mask: { color: "rgba(0, 0, 0, 0.5)" },
});

function openWeixin() {
    popPanelOpen.value = true;
}
</script>
<style lang="scss" module>
.unit-uemo-contact-us {
    margin-top: 30px;
    padding: 20px 50px;
    .container-box {
        padding: 60px 0;
        padding-bottom: 30px;

        border-top: 1px solid rgb(0 0 0 / 10%);
    }
    .nav-group {
        font-size: 14px;

        position: relative;

        padding: 0 0 50px;

        color: var(--editor-color-text);

        gap: 40px;
        .nav-item {
            @include draw-line("span", $height: 2px, $duration: 1s);
            --bottom-position: 1.07em;

            line-height: 1.2;

            position: relative;
            span {
                display: inline-block;
            }
        }
    }
    .beian,
    .copyright {
        font-size: 12px;
        line-height: 24px;

        color: #aaa;
    }
    .share {
        margin-right: 100px;
    }
    .weixin {
        font-size: 20px;
        line-height: 40px;

        display: inline-block;

        width: 40px;
        height: 40px;

        cursor: pointer;
        transition: all 0.3s ease-out 0s;
        text-align: center;

        color: #666;
        border-radius: 100%;
        background-color: #e9e9e9;
        i {
            font-size: inherit;
        }
        &:hover {
            color: #fff;
            background-color: #34cd8b;
        }
    }
    .tel {
        .num {
            font-family: Techna-Sans-Regular-2;
            font-size: 22px;
            font-weight: 700;
            line-height: 1;

            margin-bottom: 8px;

            color: #333;
        }
        .msg {
            font-size: 12px;
            line-height: 1;

            color: #999;
        }
    }
}
</style>
