/*
 * @Description: FrameMessage 通信 - 服务端实现
 * @Author: F-Stone
 * @LastEditTime: 2025-07-17 11:28:20
 */
import type { IFrameMessage } from "./type";

import { guid } from "@stone/uemo-editor-utils/lib/guid";

import { FrameMessageBase } from "./frame-message-base";
import { CommandType, ConnectionState, ErrorType, ROOT_BUS_NAME } from "./utils";

/**
 * Frame消息总线 - 服务端实现
 */
export class FrameMessageBus extends FrameMessageBase {
    private static readonly TIMEOUT = 5000;
    private static readonly HEARTBEAT_INTERVAL = 30000;
    private static instance: FrameMessageBus | null = null;

    private constructor(name: string) {
        super(name);
        this.startHeartbeat();
    }

    /**
     * 获取 FrameMessageBus 实例
     */
    public static getInstance(name = ROOT_BUS_NAME): FrameMessageBus {
        if (!FrameMessageBus.instance) {
            FrameMessageBus.instance = new FrameMessageBus(name);
        }
        return FrameMessageBus.instance;
    }

    /**
     * 处理接收到的消息
     */
    protected handleMessage(message: IFrameMessage, source: WindowProxy) {
        // 清除消息超时定时器
        this.clearMessageTimeout(message.id);

        switch (message.command) {
            case CommandType.REGISTER:
                this.handleRegister(message, source);
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
     * 处理注册请求
     */
    private handleRegister(message: IFrameMessage, source: WindowProxy) {
        const { from: clientName, state } = message;

        switch (state) {
            case ConnectionState.SYN_SENT:
                // 第一次握手
                this.channelMap.set(clientName, {
                    state: ConnectionState.SYN_RECEIVED,
                    name: clientName,
                    source,
                    lastActiveTime: Date.now(),
                    retryCount: 0,
                    messageQueue: [],
                });

                this.sendMessageInternal({
                    id: guid(),
                    from: this.name,
                    to: clientName,
                    command: CommandType.REGISTER,
                    state: ConnectionState.SYN_RECEIVED,
                    version: FrameMessageBase.VERSION,
                    timestamp: Date.now(),
                });
                break;

            case ConnectionState.ESTABLISHED:
                // 第三次握手完成
                const client = this.channelMap.get(clientName);
                if (client) {
                    client.state = ConnectionState.ESTABLISHED;
                    client.lastActiveTime = Date.now();
                    client.retryCount = 0; // 重置重试次数
                    this.eventBus.emit("connected", message);

                    // 连接建立后，发送队列中的消息
                    this.sendQueuedMessages(clientName);
                }
                break;
        }
    }

    /**
     * 内部发送消息方法
     */
    protected sendMessageInternal<T extends CommandType>(message: IFrameMessage<T>) {
        const client = this.channelMap.get(message.to);
        if (!client?.source) {
            this.handleError(message.to, ErrorType.SEND_FAILED, "Client not found");
            return;
        }

        try {
            client.source.postMessage(message, "*");

            // 设置消息超时定时器
            if (message.command !== CommandType.HEARTBEAT) {
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
     * 处理严重错误
     */
    protected handleCriticalError(clientName: string) {
        this.disconnectClient(clientName);
    }

    /**
     * 处理断开连接请求
     */
    private handleDisconnect(message: IFrameMessage) {
        const client = this.channelMap.get(message.from);
        if (!client) return;

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

        // 更新客户端状态
        client.state = ConnectionState.CLOSE_WAIT;
    }

    /**
     * 处理断开连接确认
     */
    private handleDisconnectAck(message: IFrameMessage) {
        const client = this.channelMap.get(message.from);
        if (!client) return;

        // 完成四次挥手，删除客户端信息
        this.channelMap.delete(message.from);
        this.eventBus.emit("disconnected", {
            id: guid(),
            from: this.name,
            to: message.from,
            command: CommandType.DISCONNECT,
            state: ConnectionState.CLOSED,
            version: FrameMessageBase.VERSION,
            timestamp: Date.now(),
            payload: { reason: "normal" },
        });
    }

    /**
     * 断开与指定客户端的连接
     */
    public disconnectClient(clientName: string) {
        const client = this.channelMap.get(clientName);
        if (!client) return;

        // 发起断开连接请求
        this.sendMessageInternal({
            id: guid(),
            from: this.name,
            to: clientName,
            command: CommandType.DISCONNECT,
            state: ConnectionState.FIN_WAIT_1,
            version: FrameMessageBase.VERSION,
            timestamp: Date.now(),
        });

        // 更新客户端状态
        client.state = ConnectionState.FIN_WAIT_1;
    }

    /**
     * 启动心跳检测
     */
    private startHeartbeat() {
        setInterval(() => {
            const now = Date.now();
            this.channelMap.forEach((client, clientName) => {
                if (now - client.lastActiveTime > FrameMessageBus.TIMEOUT) {
                    this.channelMap.delete(clientName);
                    this.eventBus.emit("disconnected", {
                        id: guid(),
                        from: this.name,
                        to: clientName,
                        command: CommandType.ERROR,
                        state: ConnectionState.CLOSED,
                        version: FrameMessageBase.VERSION,
                        timestamp: now,
                        payload: { reason: "timeout" },
                    });
                }
            });
        }, FrameMessageBus.HEARTBEAT_INTERVAL);
    }

    /**
     * 断开所有连接并清理资源
     */
    public disconnect() {
        // 向所有客户端发送断开连接请求
        this.channelMap.forEach((_, clientName) => {
            this.disconnectClient(clientName);
        });

        // 清理资源
        this.cleanup();
        FrameMessageBus.instance = null;
    }
}
