import { defineStore } from "@stone/uemo-editor-utils/lib/pinia";

export type UeBuilderWorkbenchStoreToolsState = {
    userInfo: UE_BUILDER_WORKBENCH_TOOLS.UserInfo | null;
};

export const useUeBuilderWorkbenchToolsStore = defineStore("uebuilderToolsWorkbench", {
    state: (): UeBuilderWorkbenchStoreToolsState => ({
        userInfo: null,
    }),

    actions: {
        /**
         * 设置用户信息
         * @param {UE_BUILDER_WORKBENCH_TOOLS.UserInfo} userInfo
         */
        setUserInfo(userInfo: UE_BUILDER_WORKBENCH_TOOLS.UserInfo) {
            this.userInfo = userInfo;
        },
    },
});
