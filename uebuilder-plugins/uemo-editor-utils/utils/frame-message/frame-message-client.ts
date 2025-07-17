/*
 * @Description: FrameMessage 通信 - 客户端实现
 * @Author: F-Stone
 * @LastEditTime: 2025-07-17 11:28:32
 */

import type { IFrameMessage } from "./type";

import { guid } from "@stone/uemo-editor-utils/lib/guid";

import { FrameMessageBase } from "./frame-message-base";
import { CommandType, ConnectionState, ErrorType, ROOT_BUS_NAME } from "./utils";

/**
 * Frame消息客户端
 */
export class FrameMessageClient extends FrameMessageBase {
    private static instance: FrameMessageClient | null = null;

    private retryCount = 0;
    private heartbeatTimer?: number;

    private constructor(name: string) {
        super(name);
    }

    /**
     * 获取 FrameMessageClient 实例
     */
    public static getInstance(name = "client-1"): FrameMessageClient {
        if (!FrameMessageClient.instance) {
            FrameMessageClient.instance = new FrameMessageClient(name);
        }
        return FrameMessageClient.instance;
    }

    /**
     * 处理接收到的消息
     */
    protected handleMessage(message: IFrameMessage) {
        // 清除消息超时定时器
        this.clearMessageTimeout(message.id);

        switch (message.command) {
            case CommandType.REGISTER:
                this.handleRegister(message);
                break;
            case CommandType.HEARTBEAT:
                this.handleHeartbeat(message);
                break;
            case CommandType.MESSAGE:
                this.handleClientMessage(message as IFrameMessage<CommandType.MESSAGE>);
                break;
            case CommandType.ERROR:
                this.eventBus.emit("error", message);
                break;
            case CommandType.DISCONNECT:
                this.handleDisconnect(message);
                break;
            case CommandType.DISCONNECT_ACK:
                this.handleDisconnectAck(message);
                break;
            case CommandType.CALLBACK_RESPONSE:
                this.handleCallbackResponse(message as IFrameMessage<CommandType.CALLBACK_RESPONSE>);
                break;
            case CommandType.CALLBACK_CANCEL:
                this.handleCallbackCancel(message as IFrameMessage<CommandType.CALLBACK_CANCEL>);
                break;
        }
    }

    /**
     * 查找目标窗口
     */
    private findTarget(target: string): Window | null {
        if (!target || window.parent === window) return null;

        let parent: Window | null = window.parent;
        while (parent && window !== parent) {
            if (parent.name === target) {
                return parent;
            }
            parent = parent.parent;
        }

        return null;
    }

    /**
     * 发送注册命令
     */
    public async connect(target = ROOT_BUS_NAME): Promise<boolean> {
        const targetWindow = this.findTarget(target);
        if (!targetWindow) {
            throw new Error(`Target window not found: ${target}`);
        }

        this.channelMap.set(target, {
            state: ConnectionState.INITIAL,
            name: target,
            source: targetWindow,
            lastActiveTime: Date.now(),
            retryCount: 0,
            messageQueue: [],
        });

        return new Promise((resolve, reject) => {
            const tryConnect = () => {
                if (this.retryCount >= FrameMessageBase.MAX_RETRY_COUNT) {
                    reject(new Error("Connection failed after max retries"));
                    return;
                }

                this.sendMessageInternal({
                    id: guid(),
                    from: this.name,
                    to: target,
                    command: CommandType.REGISTER,
                    state: ConnectionState.SYN_SENT,
                    version: FrameMessageBase.VERSION,
                    timestamp: Date.now(),
                });

                this.retryCount++;
                setTimeout(tryConnect, FrameMessageBase.RETRY_INTERVAL);
            };

            this.eventBus.on("connected", () => {
                resolve(true);
            });

            tryConnect();
        });
    }

    /**
     * 处理注册响应
     */
    private handleRegister(message: IFrameMessage) {
        const channel = this.channelMap.get(message.from);
        if (!channel) return;

        if (message.state === ConnectionState.SYN_RECEIVED) {
            // 收到第二次握手响应，发送第三次握手
            channel.state = ConnectionState.ESTABLISHED;
            this.sendMessageInternal({
                id: guid(),
                from: this.name,
                to: message.from,
                command: CommandType.REGISTER,
                state: ConnectionState.ESTABLISHED,
                version: FrameMessageBase.VERSION,
                timestamp: Date.now(),
            });

            // 启动心跳
            this.startHeartbeat(message.from);
            this.eventBus.emit("connected", message);

            // 连接建立后，发送队列中的消息
            this.sendQueuedMessages(message.from);
        }
    }

    /**
     * 处理断开连接请求
     */
    private handleDisconnect(message: IFrameMessage) {
        const channel = this.channelMap.get(message.from);
        if (!channel) return;

        // 发送断开确认
        this.sendMessageInternal({
            id: guid(),
            from: this.name,
            to: message.from,
            command: CommandType.DISCONNECT_ACK,
            state: ConnectionState.LAST_ACK,
            version: FrameMessageBase.VERSION,
            timestamp: Date.now(),
        });

        // 更新通道状态
        channel.state = ConnectionState.CLOSE_WAIT;
    }

    /**
     * 处理断开连接确认
     */
    private handleDisconnectAck(message: IFrameMessage) {
        const channel = this.channelMap.get(message.from);
        if (!channel) return;

        // 完成四次挥手，清理资源
        this.channelMap.delete(message.from);
        if (this.heartbeatTimer) {
            clearInterval(this.heartbeatTimer);
            this.heartbeatTimer = undefined;
        }
        this.eventBus.emit("disconnected", message);
    }

    /**
     * 处理严重错误
     */
    protected handleCriticalError(_clientName: string) {
        this.disconnect();
    }

    /**
     * 内部发送消息方法
     */
    protected sendMessageInternal<T extends CommandType>(message: IFrameMessage<T>) {
        const channel = this.channelMap.get(message.to);
        if (!channel?.source) {
            this.handleError(message.to, ErrorType.SEND_FAILED, "Channel not found");
            return;
        }

        try {
            channel.source.postMessage(message, "*");

            // 设置消息超时定时器（排除心跳和注册消息）
            if (message.command !== CommandType.HEARTBEAT && message.command !== CommandType.REGISTER) {
                this.setMessageTimeout(message);
            }
        } catch (error) {
            this.handleError(
                message.to,
                ErrorType.SEND_FAILED,
                error instanceof Error ? error.message : "Unknown error"
            );
            this.handleSendFailure(message);
        }
    }

    /**
     * 启动心跳检测
     */
    private startHeartbeat(target: string) {
        if (this.heartbeatTimer) {
            clearInterval(this.heartbeatTimer);
        }

        this.heartbeatTimer = window.setInterval(() => {
            this.sendMessageInternal({
                id: guid(),
                from: this.name,
                to: target,
                command: CommandType.HEARTBEAT,
                state: ConnectionState.ESTABLISHED,
                version: FrameMessageBase.VERSION,
                timestamp: Date.now(),
            });
        }, FrameMessageBase.RETRY_INTERVAL);
    }

    /**
     * 主动断开连接
     */
    public disconnect() {
        this.channelMap.forEach((channel, target) => {
            // 发起断开连接请求
            this.sendMessageInternal({
                id: guid(),
                from: this.name,
                to: target,
                command: CommandType.DISCONNECT,
                state: ConnectionState.FIN_WAIT_1,
                version: FrameMessageBase.VERSION,
                timestamp: Date.now(),
            });

            // 更新通道状态
            channel.state = ConnectionState.FIN_WAIT_1;
        });

        // 清理资源
        if (this.heartbeatTimer) {
            clearInterval(this.heartbeatTimer);
        }
        this.cleanup();
        FrameMessageClient.instance = null;
    }
}
