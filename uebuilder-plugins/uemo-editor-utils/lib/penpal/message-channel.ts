/*
 * @Description: uebuilder-creator 到 uebuilder-workbench 消息通道
 * @Author: F-Stone
 * @LastEditTime: 2025-08-04 01:32:03
 */

import type { Connection, Methods, RemoteProxy } from "@stone/uemo-editor-utils/lib/penpal";
import { WindowMessenger, connect, debug } from "@stone/uemo-editor-utils/lib/penpal";

export type { Methods };

interface MessageChannelApi extends Methods {
    _getInfo: () => { from: string; to: string };
}

export abstract class MessageChannel<REMOTE_API extends Methods, LOCAL_API extends Methods> {
    static channelManager = new WeakMap<Window, MessageChannel<any, any>>();

    private readonly messenger: WindowMessenger;
    private connection: Connection<REMOTE_API & MessageChannelApi> | null = null;

    abstract get localApi(): LOCAL_API;

    constructor(
        readonly remoteWindow: Window,
        private readonly channelName: string,
        private readonly options: {
            from: string;
            to: string;
            origin: string;
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
    }

    connect() {
        if (this.connection) return;

        const options = this.options;

        this.connection = connect<REMOTE_API & MessageChannelApi>({
            channel: this.channelName,
            messenger: this.messenger,
            log: options.log ? debug(`${options.from} ==> ${options.to}`) : undefined,
            methods: {
                ...this.localApi,
                _getInfo: () => ({ from: options.from, to: options.to }),
            },
        });
    }

    get remote(): Promise<RemoteProxy<REMOTE_API & MessageChannelApi>> {
        if (this.connection) {
            return this.connection.promise;
        } else {
            throw new Error("connection is not established");
        }
    }

    destroy(): void {
        this.messenger.destroy();
        this.connection?.destroy();
    }
}
