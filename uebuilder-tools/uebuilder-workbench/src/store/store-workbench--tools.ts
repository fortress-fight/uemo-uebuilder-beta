import { defineStore } from "@stone/uemo-editor-utils/lib/pinia";

export type UeBuilderWorkbenchStoreToolsState = {
    userLoginState: boolean;
    userInfo: UE_BUILDER_WORKBENCH_TOOLS.UserInfo | null;
};

export const useUeBuilderWorkbenchToolsStore = defineStore("uebuilderWorkbenchTools", {
    state: (): UeBuilderWorkbenchStoreToolsState => ({
        userLoginState: false,
        userInfo: null,
    }),

    actions: {
        /**
         * 用户登录
         */
        userLogin() {
            this.userLoginState = true;
        },

        /**
         * 设置用户信息
         * @param {UE_BUILDER_WORKBENCH_TOOLS.UserInfo} userInfo
         */
        setUserInfo(userInfo: UE_BUILDER_WORKBENCH_TOOLS.UserInfo) {
            this.userInfo = userInfo;
        },

        /**
         * 用户退出登录
         */
        userLogout() {
            this.userLoginState = false;
            this.userInfo = null;
        },
    },
});
