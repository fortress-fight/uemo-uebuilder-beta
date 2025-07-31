<template>
    <a ref="userAvatarRef" :class="$style['user-avatar']" href="https://www.uemo.net/user/index.html" target="_blank">
        <img :src="userInfo.avatar" alt="" />
    </a>
</template>
<script lang="ts" setup>
import { useTippy } from "@stone/uemo-editor-utils/lib/tippy";
import UserInfoPanel from "./UserInfoPanel.vue";

const props = defineProps<{ userInfo: UE_BUILDER_WORKBENCH_TOOLS.UserInfo }>();
const emit = defineEmits<{ (e: "logout"): void }>();

const userAvatarRef = useTemplateRef("userAvatarRef");

useTippy(userAvatarRef, {
    content: h(UserInfoPanel, {
        userInfo: props.userInfo,
        onLogout: () => {
            emit("logout");
        },
    }),
    theme: "ue-el-panel",
    offset: [-15, 15],
    delay: [0, 0],
    zIndex: 999999,
    arrow: false,
    interactive: true,
    animation: false,
    hideOnClick: false,
    plugins: [
        {
            name: "hideOnOutWindow",
            fn({ hide, popper }: { hide: () => void; popper: HTMLElement }) {
                function checkState(event: MouseEvent) {
                    const target = event.relatedTarget as HTMLElement;
                    const triggerDom = userAvatarRef.value!;
                    const isInPanel = popper.contains(target) || target === popper;
                    const isInTrigger = triggerDom.contains(target) || target === triggerDom;
                    if (isInPanel || isInTrigger) return;

                    hide();
                }
                return {
                    onShow() {
                        window.addEventListener("pointerout", checkState);
                    },
                    onHide() {
                        window.removeEventListener("pointerout", checkState);
                    },
                };
            },
        },
    ],
});
</script>
<style lang="scss" module>
.user-avatar {
    @include image-placeholder(28, 28);
    display: block;
    overflow: hidden;

    width: 28px;

    border-radius: 50%;
}
</style>
