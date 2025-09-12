/*
 * @Description: 仓库基础 store 配置
 * @Author: F-Stone
 * @LastEditTime: 2025-08-05 00:25:49
 */
import { defineStore } from "@stone/uemo-editor-utils/lib/pinia";

export const useUeBuilderStorehouseToolsStore = defineStore("uebuilderStorehouseTools", {
    state: () => ({
        loginStatus: false,
    }),
    actions: {
        setLoginStatus(loginStatus: boolean) {
            this.loginStatus = loginStatus;
        },
    },
});
