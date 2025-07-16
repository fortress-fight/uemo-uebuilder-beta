import mitt from "@stone/uemo-editor-utils/lib/mitt";
import { guid } from "@stone/uemo-editor-utils/lib/guid";

/**
 * 错误类型枚举
 */
export enum ErrorType {
    /** 连接超时 */
    TIMEOUT = "TIMEOUT",
    /** 连接失败 */
    CONNECTION_FAILED = "CONNECTION_FAILED",
    /** 消息发送失败 */
    SEND_FAILED = "SEND_FAILED",
    /** 无效消息 */
    INVALID_MESSAGE = "INVALID_MESSAGE",
}

/**
 * 错误信息接口
 */
export interface IErrorPayload {
    type: ErrorType;
    message: string;
    timestamp: number;
}

/**
 * 心跳消息接口
 */
export interface IHeartbeatPayload {
    timestamp: number;
}

/**
 * 断开连接原因
 */
export interface IDisconnectPayload {
    reason: "normal" | "timeout" | "error";
    message?: string;
}

/**
 * 普通消息接口
 */
export interface IMessagePayload<T = unknown> {
    data: T;
    timestamp: number;
}

/**
 * 消息负载类型映射
 */
export interface IMessagePayloadMap {
    [CommandType.ERROR]: IErrorPayload;
    [CommandType.HEARTBEAT]: IHeartbeatPayload;
    [CommandType.DISCONNECT]: IDisconnectPayload;
    [CommandType.MESSAGE]: IMessagePayload;
    [CommandType.REGISTER]: never;
    [CommandType.DISCONNECT_ACK]: never;
}

/**
 * 消息接口定义
 */
export interface IFrameMessage<T extends CommandType = CommandType> {
    /** 消息ID */
    id: string;
    /** 发送方名称 */
    from: string;
    /** 接收方名称 */
    to: string;
    /** 消息命令类型 */
    command: T;
    /** 连接状态 */
    state: ConnectionState;
    /** 消息内容 */
    payload?: IMessagePayloadMap[T];
    /** 时间戳 */
    timestamp: number;
    /** 协议版本 */
    version: string;
}

/**
 * 通信连接状态枚举
 */
export enum ConnectionState {
    /** 初始状态 */
    INITIAL = "INITIAL",
    /** 第一次握手 */
    SYN_SENT = "SYN_SENT",
    /** 第二次握手 */
    SYN_RECEIVED = "SYN_RECEIVED",
    /** 连接建立 */
    ESTABLISHED = "ESTABLISHED",
    /** 开始断开连接 */
    FIN_WAIT_1 = "FIN_WAIT_1",
    /** 等待对方确认断开 */
    FIN_WAIT_2 = "FIN_WAIT_2",
    /** 对方请求断开 */
    CLOSE_WAIT = "CLOSE_WAIT",
    /** 最后确认 */
    LAST_ACK = "LAST_ACK",
    /** 连接关闭 */
    CLOSED = "CLOSED",
}

/**
 * 通信命令类型
 */
export enum CommandType {
    /** 注册命令 */
    REGISTER = "REGISTER",
    /** 心跳检测 */
    HEARTBEAT = "HEARTBEAT",
    /** 普通消息 */
    MESSAGE = "MESSAGE",
    /** 错误消息 */
    ERROR = "ERROR",
    /** 断开连接 */
    DISCONNECT = "DISCONNECT",
    /** 确认断开 */
    DISCONNECT_ACK = "DISCONNECT_ACK",
}

/**
 * 客户端连接信息
 */
interface IClientInfo {
    /** 连接状态 */
    state: ConnectionState;
    /** 客户端名称 */
    name: string;
    /** 窗口引用 */
    source: WindowProxy;
    /** 最后活跃时间 */
    lastActiveTime: number;
    /** 重连次数 */
    retryCount: number;
    /** 待发送消息队列 */
    messageQueue: IFrameMessage[];
}

/**
 * 事件类型定义
 */
export type MessageEventType = "connected" | "disconnected" | "message" | "error";

/**
 * 事件处理器类型
 */
export type MessageEventHandler<T = IFrameMessage> = (message: T) => void;

/**
 * 事件映射类型
 */
export type MessageEventMap = Record<MessageEventType, IFrameMessage> & Record<string, unknown>;

/**
 * 默认错误处理器
 */
const defaultErrorHandler: MessageEventHandler = (message: IFrameMessage) => {
    if (message.command === CommandType.ERROR) {
        const error = message as IFrameMessage<CommandType.ERROR>;
        const { type, message: errorMessage } = error.payload || {};
        console.error(`[Frame Message Error] ${type}: ${errorMessage}`);
    }
};

/**
 * Frame消息总线 - 服务端实现
 */
export class FrameMessageBus {
    private static readonly VERSION = "4.0.1";
    private static readonly TIMEOUT = 5000;
    private static readonly HEARTBEAT_INTERVAL = 30000;
    private static readonly MAX_RETRY_COUNT = 3;
    private static readonly MESSAGE_TIMEOUT = 10000;
    private static readonly RETRY_INTERVAL = 3000;
    private static instance: FrameMessageBus | null = null;

    private clientMap = new Map<string, IClientInfo>();
    private eventBus = mitt<MessageEventMap>();
    private messageTimeoutTimers = new Map<string, number>();

    private constructor(readonly name: string) {
        window.name = name;
        this.initMessageListener();
        this.startHeartbeat();

        // 添加默认错误处理
        this.eventBus.on("error", defaultErrorHandler);
    }

    /**
     * 获取 FrameMessageBus 实例
     */
    public static getInstance(name = "root-bus"): FrameMessageBus {
        if (!FrameMessageBus.instance) {
            FrameMessageBus.instance = new FrameMessageBus(name);
        }
        return FrameMessageBus.instance;
    }

    /**
     * 初始化消息监听器
     */
    private initMessageListener() {
        window.addEventListener("message", (event: MessageEvent<IFrameMessage>) => {
            const message = event.data;
            if (!message?.version) return;

            const source = event.source as WindowProxy;
            if (!source) return;

            this.handleMessage(message, source);
        });
    }

    /**
     * 处理消息接收
     */
    private handleMessage(message: IFrameMessage, source: WindowProxy) {
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
                this.handleClientMessage(message);
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
                this.clientMap.set(clientName, {
                    state: ConnectionState.SYN_RECEIVED,
                    name: clientName,
                    source,
                    lastActiveTime: Date.now(),
                    retryCount: 0,
                    messageQueue: [],
                });

                this.sendMessage({
                    id: guid(),
                    from: this.name,
                    to: clientName,
                    command: CommandType.REGISTER,
                    state: ConnectionState.SYN_RECEIVED,
                    version: FrameMessageBus.VERSION,
                    timestamp: Date.now(),
                });
                break;

            case ConnectionState.ESTABLISHED:
                // 第三次握手完成
                const client = this.clientMap.get(clientName);
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
     * 发送队列中的消息
     */
    private sendQueuedMessages(clientName: string) {
        const client = this.clientMap.get(clientName);
        if (!client) return;

        while (client.messageQueue.length > 0) {
            const message = client.messageQueue.shift();
            if (message) {
                this.sendMessage(message);
            }
        }
    }

    /**
     * 处理消息发送失败
     */
    private handleSendFailure<T extends CommandType>(message: IFrameMessage<T>) {
        const client = this.clientMap.get(message.to);
        if (!client) return;

        // 如果是注册消息且未超过重试次数，则重试
        if (message.command === CommandType.REGISTER && client.retryCount < FrameMessageBus.MAX_RETRY_COUNT) {
            client.retryCount++;
            setTimeout(() => {
                this.sendMessage(message);
            }, FrameMessageBus.RETRY_INTERVAL);
        } else if (message.command !== CommandType.HEARTBEAT) {
            // 非心跳消息，加入队列等待重发
            client.messageQueue.push(message);
        }
    }

    /**
     * 处理心跳消息
     */
    private handleHeartbeat(message: IFrameMessage) {
        const client = this.clientMap.get(message.from);
        if (client) {
            client.lastActiveTime = Date.now();
        }
    }

    /**
     * 处理客户端消息
     */
    private handleClientMessage(message: IFrameMessage) {
        this.eventBus.emit("message", message);
    }

    /**
     * 发送消息
     */
    private sendMessage<T extends CommandType>(message: IFrameMessage<T>) {
        const client = this.clientMap.get(message.to);
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
     * 设置消息超时定时器
     */
    private setMessageTimeout<T extends CommandType>(message: IFrameMessage<T>) {
        const timerId = window.setTimeout(() => {
            this.handleError(message.to, ErrorType.TIMEOUT, `Message timeout: ${message.id}`);
            this.messageTimeoutTimers.delete(message.id);
        }, FrameMessageBus.MESSAGE_TIMEOUT);

        this.messageTimeoutTimers.set(message.id, timerId);
    }

    /**
     * 清除消息超时定时器
     */
    private clearMessageTimeout(messageId: string) {
        const timerId = this.messageTimeoutTimers.get(messageId);
        if (timerId) {
            clearTimeout(timerId);
            this.messageTimeoutTimers.delete(messageId);
        }
    }

    /**
     * 处理错误
     */
    private handleError(clientName: string, type: ErrorType, message: string) {
        const errorMessage: IFrameMessage<CommandType.ERROR> = {
            id: guid(),
            from: this.name,
            to: clientName,
            command: CommandType.ERROR,
            state: ConnectionState.ESTABLISHED,
            version: FrameMessageBus.VERSION,
            timestamp: Date.now(),
            payload: {
                type,
                message,
                timestamp: Date.now(),
            },
        };

        this.eventBus.emit("error", errorMessage);

        // 如果是严重错误，断开连接
        if (type === ErrorType.CONNECTION_FAILED || type === ErrorType.TIMEOUT) {
            this.disconnectClient(clientName);
        }
    }

    /**
     * 处理断开连接请求
     */
    private handleDisconnect(message: IFrameMessage) {
        const client = this.clientMap.get(message.from);
        if (!client) return;

        // 发送断开确认
        this.sendMessage({
            id: guid(),
            from: this.name,
            to: message.from,
            command: CommandType.DISCONNECT_ACK,
            state: ConnectionState.LAST_ACK,
            version: FrameMessageBus.VERSION,
            timestamp: Date.now(),
        });

        // 更新客户端状态
        client.state = ConnectionState.CLOSE_WAIT;
    }

    /**
     * 处理断开连接确认
     */
    private handleDisconnectAck(message: IFrameMessage) {
        const client = this.clientMap.get(message.from);
        if (!client) return;

        // 完成四次挥手，删除客户端信息
        this.clientMap.delete(message.from);
        this.eventBus.emit("disconnected", {
            id: guid(),
            from: this.name,
            to: message.from,
            command: CommandType.DISCONNECT,
            state: ConnectionState.CLOSED,
            version: FrameMessageBus.VERSION,
            timestamp: Date.now(),
            payload: { reason: "normal" },
        });
    }

    /**
     * 断开与指定客户端的连接
     */
    public disconnectClient(clientName: string) {
        const client = this.clientMap.get(clientName);
        if (!client) return;

        // 发起断开连接请求
        this.sendMessage({
            id: guid(),
            from: this.name,
            to: clientName,
            command: CommandType.DISCONNECT,
            state: ConnectionState.FIN_WAIT_1,
            version: FrameMessageBus.VERSION,
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
            this.clientMap.forEach((client, clientName) => {
                if (now - client.lastActiveTime > FrameMessageBus.TIMEOUT) {
                    this.clientMap.delete(clientName);
                    this.eventBus.emit("disconnected", {
                        id: guid(),
                        from: this.name,
                        to: clientName,
                        command: CommandType.ERROR,
                        state: ConnectionState.CLOSED,
                        version: FrameMessageBus.VERSION,
                        timestamp: now,
                        payload: { reason: "timeout" },
                    });
                }
            });
        }, FrameMessageBus.HEARTBEAT_INTERVAL);
    }

    /**
     * 清理资源
     */
    private cleanup() {
        // 移除默认错误处理
        this.eventBus.off("error", defaultErrorHandler);

        // 清理所有定时器
        this.messageTimeoutTimers.forEach((timerId) => clearTimeout(timerId));
        this.messageTimeoutTimers.clear();

        // 清理客户端连接
        this.clientMap.clear();
        this.eventBus.all.clear();
        FrameMessageBus.instance = null;
    }

    /**
     * 断开所有连接并清理资源
     */
    public disconnect() {
        // 向所有客户端发送断开连接请求
        this.clientMap.forEach((_, clientName) => {
            this.disconnectClient(clientName);
        });

        // 清理资源
        this.cleanup();
    }
}

/**
 * Frame消息客户端
 */
export class FrameMessageClient {
    private static readonly VERSION = "4.0.1";
    private static readonly RETRY_INTERVAL = 3000;
    private static readonly MAX_RETRY_COUNT = 3;
    private static readonly MESSAGE_TIMEOUT = 10000;
    private static instance: FrameMessageClient | null = null;

    private channelMap = new Map<string, IClientInfo>();
    private eventBus = mitt<MessageEventMap>();
    private retryCount = 0;
    private heartbeatTimer?: number;
    private messageTimeoutTimers = new Map<string, number>();

    private constructor(readonly name: string) {
        window.name = name;
        this.initMessageListener();

        // 添加默认错误处理
        this.eventBus.on("error", defaultErrorHandler);
    }

    /**
     * 获取 FrameMessageClient 实例
     */
    public static getInstance(name = "root-bus"): FrameMessageClient {
        if (!FrameMessageClient.instance) {
            FrameMessageClient.instance = new FrameMessageClient(name);
        }
        return FrameMessageClient.instance;
    }

    /**
     * 初始化消息监听器
     */
    private initMessageListener() {
        window.addEventListener("message", (event: MessageEvent<IFrameMessage>) => {
            const message = event.data;
            if (!message?.version) return;

            this.handleMessage(message);
        });
    }

    /**
     * 处理消息接收
     */
    private handleMessage(message: IFrameMessage) {
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
                this.eventBus.emit("message", message);
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
        }
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
            this.sendMessage({
                id: guid(),
                from: this.name,
                to: message.from,
                command: CommandType.REGISTER,
                state: ConnectionState.ESTABLISHED,
                version: FrameMessageClient.VERSION,
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
     * 处理心跳响应
     */
    private handleHeartbeat(message: IFrameMessage) {
        const channel = this.channelMap.get(message.from);
        if (channel) {
            channel.lastActiveTime = Date.now();
        }
    }

    /**
     * 处理断开连接请求
     */
    private handleDisconnect(message: IFrameMessage) {
        const channel = this.channelMap.get(message.from);
        if (!channel) return;

        // 发送断开确认
        this.sendMessage({
            id: guid(),
            from: this.name,
            to: message.from,
            command: CommandType.DISCONNECT_ACK,
            state: ConnectionState.LAST_ACK,
            version: FrameMessageClient.VERSION,
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
    public async connect(target = "root-bus"): Promise<boolean> {
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
                if (this.retryCount >= FrameMessageClient.MAX_RETRY_COUNT) {
                    reject(new Error("Connection failed after max retries"));
                    return;
                }

                this.sendMessage({
                    id: guid(),
                    from: this.name,
                    to: target,
                    command: CommandType.REGISTER,
                    state: ConnectionState.SYN_SENT,
                    version: FrameMessageClient.VERSION,
                    timestamp: Date.now(),
                });

                this.retryCount++;
                setTimeout(tryConnect, FrameMessageClient.RETRY_INTERVAL);
            };

            this.eventBus.on("connected", () => {
                resolve(true);
            });

            tryConnect();
        });
    }

    /**
     * 发送消息
     */
    private sendMessage<T extends CommandType>(message: IFrameMessage<T>) {
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
     * 处理消息发送失败
     */
    private handleSendFailure<T extends CommandType>(message: IFrameMessage<T>) {
        const channel = this.channelMap.get(message.to);
        if (!channel) return;

        // 如果是注册消息且未超过重试次数，则重试
        if (message.command === CommandType.REGISTER && this.retryCount < FrameMessageClient.MAX_RETRY_COUNT) {
            this.retryCount++;
            setTimeout(() => {
                this.sendMessage(message);
            }, FrameMessageClient.RETRY_INTERVAL);
        } else if (message.command !== CommandType.HEARTBEAT) {
            // 非心跳消息，加入队列等待重发
            channel.messageQueue.push(message);
        }
    }

    /**
     * 发送普通消息
     */
    public send<T = unknown>(target: string, data: T) {
        const message: IFrameMessage<CommandType.MESSAGE> = {
            id: guid(),
            from: this.name,
            to: target,
            command: CommandType.MESSAGE,
            state: ConnectionState.ESTABLISHED,
            version: FrameMessageClient.VERSION,
            timestamp: Date.now(),
            payload: {
                data,
                timestamp: Date.now(),
            },
        };

        this.sendMessage(message);
    }

    /**
     * 发送队列中的消息
     */
    private sendQueuedMessages(target: string) {
        const channel = this.channelMap.get(target);
        if (!channel) return;

        while (channel.messageQueue.length > 0) {
            const message = channel.messageQueue.shift();
            if (message) {
                this.sendMessage(message);
            }
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
            this.sendMessage({
                id: guid(),
                from: this.name,
                to: target,
                command: CommandType.HEARTBEAT,
                state: ConnectionState.ESTABLISHED,
                version: FrameMessageClient.VERSION,
                timestamp: Date.now(),
            });
        }, FrameMessageClient.RETRY_INTERVAL);
    }

    /**
     * 主动断开连接
     */
    public disconnect() {
        this.channelMap.forEach((channel, target) => {
            // 发起断开连接请求
            this.sendMessage({
                id: guid(),
                from: this.name,
                to: target,
                command: CommandType.DISCONNECT,
                state: ConnectionState.FIN_WAIT_1,
                version: FrameMessageClient.VERSION,
                timestamp: Date.now(),
            });

            // 更新通道状态
            channel.state = ConnectionState.FIN_WAIT_1;
        });

        // 清理资源
        if (this.heartbeatTimer) {
            clearInterval(this.heartbeatTimer);
        }
        this.channelMap.clear();
        this.eventBus.all.clear();
        FrameMessageClient.instance = null;
    }

    /**
     * 清除消息超时定时器
     */
    private clearMessageTimeout(messageId: string) {
        const timerId = this.messageTimeoutTimers.get(messageId);
        if (timerId) {
            clearTimeout(timerId);
            this.messageTimeoutTimers.delete(messageId);
        }
    }

    /**
     * 设置消息超时定时器
     */
    private setMessageTimeout<T extends CommandType>(message: IFrameMessage<T>) {
        const timerId = window.setTimeout(() => {
            this.handleError(message.to, ErrorType.TIMEOUT, `Message timeout: ${message.id}`);
            this.messageTimeoutTimers.delete(message.id);
        }, FrameMessageClient.MESSAGE_TIMEOUT);

        this.messageTimeoutTimers.set(message.id, timerId);
    }

    /**
     * 处理错误
     */
    private handleError(clientName: string, type: ErrorType, message: string) {
        const errorMessage: IFrameMessage<CommandType.ERROR> = {
            id: guid(),
            from: this.name,
            to: clientName,
            command: CommandType.ERROR,
            state: ConnectionState.ESTABLISHED,
            version: FrameMessageClient.VERSION,
            timestamp: Date.now(),
            payload: {
                type,
                message,
                timestamp: Date.now(),
            },
        };

        this.eventBus.emit("error", errorMessage);

        // 如果是严重错误，断开连接
        if (type === ErrorType.CONNECTION_FAILED || type === ErrorType.TIMEOUT) {
            this.disconnect();
        }
    }
}
