/*
 * @Description: uebuilder-creator 到 uebuilder-workbench 消息通道
 * @Author: F-Stone
 * @LastEditTime: 2025-08-04 01:53:09
 */
import type { STOREHOUSE_WORKBENCH_CHANNEL } from "@stone/uebuilder-storehouse-base/types/channel";
import { StorehouseWorkbenchChannel } from "@stone/uebuilder-storehouse-base/src/utils/frame-channel/storehouse-workbench";

export class StorehouseWorkbenchChannelTools extends StorehouseWorkbenchChannel {
    get localApi(): STOREHOUSE_WORKBENCH_CHANNEL.Api {
        return {
            ...super.localApi,
            userLogout: () => {
                // TODO: 退出登录后需要处理相关内容
            },
        };
    }
}
