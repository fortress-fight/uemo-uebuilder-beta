<template>
    <UebuilderWorkbenchBrowsingLayout :class="$style['workbench-browsing-layout']" ref="workbenchBrowsingLayout">
        <template #headLeft>
            <div :class="$style['site-logo']">
                <UeElIcon name="icon-uemo-logo" :size="24" />
            </div>
            <div :class="$style['project-list-panel']">
                <button :class="$style['btn--open-panel']">
                    <span class="text">UEbuilder</span>
                    <UeElIcon name="icon-xiajiantou" :size="16" />
                </button>
                <div :class="$style['project-group']">
                    <a
                        v-for="(item, index) in projectList"
                        :key="index"
                        :class="$style['project-item']"
                        class="flex items-center justify-between"
                        target="_blank"
                        :href="item.link"
                    >
                        <div :class="$style['item-info']">
                            <div :class="$style['item-title']">
                                {{ item.title }}
                            </div>
                            <div :class="$style['item-subtitle']">
                                {{ item.subtitle }}
                            </div>
                        </div>
                        <UeElIcon :class="$style['icon']" name="icon-app-youjiantou" :size="15" />
                    </a>
                </div>
            </div>
        </template>
        <template #headRight>
            <div v-if="!userInfo" :class="$style['oper-group']" class="inline-grid grid-cols-2 gap-2">
                <button :class="$style['btn--login']" @click="triggerLogin('login')">
                    <span class="text">{{ t("UNIT_LOGIN") }}</span>
                </button>
                <a
                    :class="$style['btn--register']"
                    href="https://www.uemo.net/user/login.html#/register"
                    target="_blank"
                >
                    <span class="text">{{ t("UNIT_REGISTER") }}</span>
                </a>
            </div>
            <UserAvatar v-else :user-info="userInfo" @logout="workbench?.userLogout()" />
        </template>
    </UebuilderWorkbenchBrowsingLayout>
</template>
<script lang="ts" setup>
import UebuilderWorkbenchBrowsingLayout from "@stone/uebuilder-workbench-base/src/components/WorkbenchBrowsingLayout.vue";

import UserAvatar from "./UserAvatar.vue";
import { UeBuilderWorkbenchKey } from "../plugin/injection-key";
import { useUeBuilderWorkbenchToolsStore } from "../store/store-workbench--tools";

const workbench = inject(UeBuilderWorkbenchKey);
const workbenchToolsStore = useUeBuilderWorkbenchToolsStore();
const workbenchBrowsingLayout = useTemplateRef("workbenchBrowsingLayout");

const userInfo = computed(() => workbenchToolsStore.userInfo);
watch(
    [() => workbenchToolsStore.userLoginState, () => workbenchBrowsingLayout.value?.workbenchStorehouseChannel],
    async ([isLogin, workbenchStorehouseChannel]) => {
        if (!workbenchStorehouseChannel) return;

        try {
            const remote = await workbenchStorehouseChannel.remote;
            if (isLogin) {
                remote.userLogin();
            } else {
                remote.userLogout();
            }
        } catch (error) {
            console.error("Failed to logout:", error);
        }
    },
    { immediate: true }
);

const { t } = useI18n();

const projectList = [
    { title: "UElike", subtitle: "品牌官网定制服务", link: "https://www.uelike.com/" },
    { title: "UEmo", subtitle: "高品质网站模板", link: "https://www.uemo.net/" },
    { title: "小程序", subtitle: "商务社交利器", link: "https://uemox.com/" },
];

function triggerLogin(type: "login" | "register") {
    workbench?.userLogin(type);
}
</script>
<style lang="scss" module>
.workbench-browsing-layout {
    .site-logo {
        margin-right: 20px;

        color: var(--editor-color-text);
    }
    .project-list-panel {
        position: relative;

        color: var(--editor-color-text);
        &:hover {
            .project-group {
                visibility: visible;

                opacity: 1;
            }
        }
        .btn--open-panel {
            font-size: 13px;
            line-height: 18px;

            display: flex;

            width: 137px;
            height: 30px;
            padding: 6px 10px;

            border: 1px solid #f0f0f0;
            border-radius: 5px;

            justify-content: space-between;
        }
        .project-group {
            position: absolute;
            top: calc(100% + 4px);
            right: 0;

            visibility: hidden;

            width: 192px;
            padding: 30px 20px;

            opacity: 0;
            border: 1px solid #f0f0f0;
            border-radius: 5px;
            background: #fff;
            box-shadow: 0 5px 10px rgb(0 0 0 / 0.1);
            &::after {
                position: absolute;
                top: -4px;
                left: 0;

                width: 100%;
                height: 4px;

                content: "";
            }
        }
        .project-item {
            margin-bottom: 18px;
            padding-bottom: 18px;

            border-bottom: 1px solid var(--editor-c-border--lighter);
            &:last-child {
                margin-bottom: 0;
                padding-bottom: 0;

                border-bottom-width: 0;
            }
            .item-title {
                font-size: 14px;
                font-weight: 700;
                line-height: 18px;
            }
            .item-subtitle {
                font-size: 12px;
                line-height: 16px;

                margin-top: 3px;

                color: var(--c-gray-40);
            }
            &:hover {
                .icon {
                    transform: translateX(0);

                    opacity: 1;
                }
            }
            .icon {
                transition: 0.26s ease;
                transform: translateX(-3px);

                opacity: 0;
            }
        }
    }
    .oper-group {
        font-size: 12px;
        .btn--register,
        .btn--login {
            line-height: 18px;

            padding: 5px 14px;

            color: var(--editor-color-text);
            border-radius: 5px;
        }
        .btn--register {
            color: #fff;
            background: #2c48ff;
        }
    }
}
</style>
