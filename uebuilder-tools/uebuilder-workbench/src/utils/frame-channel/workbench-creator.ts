import { WorkbenchCreatorChannel } from "@stone/uebuilder-workbench-base/src/utils/frame-channel/workbench-creator";
import type { WORKBENCH_CREATOR_CHANNEL } from "@stone/uebuilder-workbench-base/types/channel";

export class WorkbenchCreatorChannelTools extends WorkbenchCreatorChannel {
    get localApi(): WORKBENCH_CREATOR_CHANNEL.Api {
        return {
            ...super.localApi,
        };
    }
}
