/*
 * @Description: 仓库基础 store 配置
 * @Author: F-Stone
 * @LastEditTime: 2025-07-22 10:48:41
 */
import { defineStore } from "pinia";

export const useUeBuilderStorehouseStore = defineStore("uebuilderStorehouse", {
    state: () => ({
        storehouseConfig: {} as UE_BUILDER_STOREHOUSE.Config,
    }),
    actions: {
        setStorehouseConfig(storehouseConfig: UE_BUILDER_STOREHOUSE.Config) {
            this.storehouseConfig = storehouseConfig;
        },
    },
});
