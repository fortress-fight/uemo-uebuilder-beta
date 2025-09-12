<template>
    <div :class="$style['user-panel']">
        <div :class="$style['panel-row']" class="flex justify-between">
            <div :class="$style['panel-col']">
                <div :class="$style['user-name']" :title="userInfo.ainfo.name">
                    <span class="text">{{ userInfo.ainfo.name }}</span>
                </div>
                <div class="user-lever">
                    <span>等级：{{ getLevelInfo(userInfo.level) }}</span>
                </div>
            </div>

            <div :class="$style['panel-col']">
                <div :class="[$style['btn--logout'], $style['btn']]" @click="emit('logout')">
                    <span class="text">{{ t("UNIT_LOGOUT") }}</span>
                </div>
            </div>
        </div>
        <div :class="$style['panel-row']">
            <div :class="$style['panel-col']" class="flex gap-14">
                <div :class="$style['btn']">
                    <a href="https://www.uemo.net/user/index.html#/personal-center" target="_blank">
                        <span class="text">个人中心</span>
                    </a>
                </div>
                <div :class="$style['btn']">
                    <a href="https://www.uemo.net/user/index.html#/personal-center" target="_blank">
                        <span class="text">账户设置</span>
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
const _props = defineProps<{ userInfo: UE_BUILDER_WORKBENCH_TOOLS.UserInfo }>();
const emit = defineEmits<{ (e: "logout"): void }>();
const { t } = useI18n();

function getLevelInfo(value: string) {
    let result = "";
    switch (String(value)) {
        case "0":
            result = "普通";
            break;
        case "1":
            result = "初级代理";
            break;
        case "2":
            result = "中级代理";
            break;
        case "3":
            result = "高级代理";
            break;
        case "4":
            result = "钻石代理";
            break;

        default:
            break;
    }
    return result;
}
</script>
<style lang="scss" module>
.user-panel {
    font-size: 13px;

    width: 340px;

    transition: 0.2s ease;

    color: var(--editor-color-text);
    border-radius: 4px;
    background-color: #fff;
    box-shadow: 0 10px 12px rgb(0 0 0 / 0.05);
    &::after {
        position: absolute;
        bottom: 100%;
        left: 0;

        width: 100%;
        height: 17px;

        content: "";
    }
    .btn {
        @include draw-line("a", $height: 2px, $duration: 1s);
        --bottom-position: 1.07em;
        position: relative;

        cursor: pointer;
    }
    .btn--logout {
        @include draw-line("span", $height: 2px, $duration: 1s);
        --bottom-position: 1.07em;
        line-height: 30px;
    }
    .user-name {
        font-size: 16px;
        line-height: 30px;

        color: var(--editor-color-text);
    }
    .user-lever {
        font-size: 13px;
        line-height: 23px;

        color: #999;
    }
    .panel-row {
        box-sizing: border-box;
        padding: 25px 38px;

        border-bottom: 1px solid #f0f0f0;
        &:last-child {
            border-width: 0;
        }
    }
}
</style>
