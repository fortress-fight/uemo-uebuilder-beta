/*
 * @Description: uebuilder-creator 到 uebuilder-workbench 消息通道
 * @Author: F-Stone
 * @LastEditTime: 2025-08-05 00:29:08
 */
import type { STOREHOUSE_WORKBENCH_CHANNEL } from "@stone/uebuilder-storehouse-base/types/channel";
import { StorehouseWorkbenchChannel } from "@stone/uebuilder-storehouse-base/src/utils/frame-channel/storehouse-workbench";
import { pinia, useUeBuilderStorehouseToolsStore } from "@/store";

const ueBuilderStorehouseToolsStore = useUeBuilderStorehouseToolsStore(pinia);

export class StorehouseWorkbenchChannelTools extends StorehouseWorkbenchChannel {
    get localApi(): STOREHOUSE_WORKBENCH_CHANNEL.Api {
        return {
            ...super.localApi,
            userLogin: () => {
                ueBuilderStorehouseToolsStore.setLoginStatus(true);
            },
            userLogout: () => {
                ueBuilderStorehouseToolsStore.setLoginStatus(false);
            },
        };
    }
}
