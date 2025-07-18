/*
 * @Description: uebuilder-creator 到 uebuilder-workbench 消息通道
 * @Author: F-Stone
 * @LastEditTime: 2025-07-18 14:47:24
 */

import type { Connection, Methods, RemoteProxy } from "@stone/uemo-editor-utils/lib/penpal";
import { WindowMessenger, connect, debug } from "@stone/uemo-editor-utils/lib/penpal";

export type { Methods };

interface MessageChannelApi extends Methods {
    _getInfo: () => { from: string; to: string };
}

export class MessageChannel<T extends Methods> {
    private readonly messenger: WindowMessenger;
    private readonly connection: Connection<T & MessageChannelApi>;

    constructor(
        private readonly remoteWindow: Window,
        channelName: string,
        options: {
            from: string;
            to: string;
            origin: string;
            methods: Methods;
            log?: boolean;
        }
    ) {
        if (!remoteWindow) {
            throw new Error("window is null");
        }

        this.messenger = new WindowMessenger({
            remoteWindow: remoteWindow,
            allowedOrigins: [options.origin],
        });

        this.connection = connect<T & MessageChannelApi>({
            channel: channelName,
            messenger: this.messenger,
            log: options.log ? debug(`${options.from} ==> ${options.to}`) : undefined,
            methods: {
                ...options.methods,
                _getInfo: () => ({ from: options.from, to: options.to }),
            },
        });
    }

    get remote(): Promise<RemoteProxy<T & MessageChannelApi>> {
        return this.connection.promise;
    }

    destroy(): void {
        this.connection.destroy();
    }
}
