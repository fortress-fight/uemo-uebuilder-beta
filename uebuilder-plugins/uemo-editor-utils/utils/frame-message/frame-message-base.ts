/*
 * @Description: FrameMessage 通信 - 基类实现
 * @Author: F-Stone
 * @LastEditTime: 2025-07-17 11:32:14
 */

import type { IChannelInfo, IFrameMessage, ICallbackOptions, ICallbackInfo, MessageEventMap } from "./type";

import mitt from "@stone/uemo-editor-utils/lib/mitt";
import { guid } from "@stone/uemo-editor-utils/lib/guid";

import {
    CommandType,
    ConnectionState,
    ErrorType,
    defaultErrorHandler,
    VERSION,
    RETRY_INTERVAL,
    MAX_RETRY_COUNT,
    MESSAGE_TIMEOUT,
    CALLBACK_TIMEOUT,
} from "./utils";

/**
 * Frame消息通信基类
 * 提供公共的消息处理、回调管理、错误处理等功能
 */
export abstract class FrameMessageBase {
    protected static readonly VERSION = VERSION;
    protected static readonly RETRY_INTERVAL = RETRY_INTERVAL;
    protected static readonly MAX_RETRY_COUNT = MAX_RETRY_COUNT;
    protected static readonly MESSAGE_TIMEOUT = MESSAGE_TIMEOUT;
    protected static readonly CALLBACK_TIMEOUT = CALLBACK_TIMEOUT;

    protected channelMap = new Map<string, IChannelInfo>();
    protected messageTimeoutTimers = new Map<string, number>();
    protected callbackMap = new Map<string, ICallbackInfo<unknown>>();

    public eventBus = mitt<MessageEventMap>();

    protected constructor(readonly name: string) {
        window.name = name;
        this.initMessageListener();

        // 添加默认错误处理
        this.eventBus.on("error", defaultErrorHandler);
    }

    /**
     * 初始化消息监听器
     */
    protected initMessageListener() {
        window.addEventListener("message", (event: MessageEvent<IFrameMessage>) => {
            const message = event.data;
            if (!message?.version) return;

            const source = event.source as WindowProxy;
            if (!source) return;

            this.handleMessage(message, source);
        });
    }

    /**
     * 处理接收到的消息 - 抽象方法，子类实现具体逻辑
     */
    protected abstract handleMessage(message: IFrameMessage, source?: WindowProxy): void;

    /**
     * 处理心跳消息
     */
    protected handleHeartbeat(message: IFrameMessage) {
        const channel = this.channelMap.get(message.from);
        if (channel) {
            channel.lastActiveTime = Date.now();
        }
    }

    /**
     * 处理客户端消息
     */
    protected handleClientMessage(message: IFrameMessage<CommandType.MESSAGE>) {
        const payload = message.payload;
        if (!payload) return;

        // 检查是否需要回调处理
        if (payload.callbackId && payload.needReply) {
            // 创建回复函数
            const reply = (response?: unknown) => {
                this.sendMessageInternal({
                    id: guid(),
                    from: this.name,
                    to: message.from,
                    command: CommandType.CALLBACK_RESPONSE,
                    state: ConnectionState.ESTABLISHED,
                    version: FrameMessageBase.VERSION,
                    timestamp: Date.now(),
                    payload: {
                        callbackId: payload.callbackId!,
                        data: response,
                        isResponse: true,
                    },
                });
            };

            // 触发消息事件，传递回复函数
            this.eventBus.emit("message", {
                ...message,
                reply,
            } as any);
        } else {
            // 普通消息，直接触发事件
            this.eventBus.emit("message", message);
        }
    }

    /**
     * 处理回调响应
     */
    protected handleCallbackResponse(message: IFrameMessage<CommandType.CALLBACK_RESPONSE>) {
        const payload = message.payload;
        if (!payload) return;

        const callbackInfo = this.callbackMap.get(payload.callbackId);
        if (!callbackInfo || callbackInfo.executed) return;

        try {
            // 清除超时定时器
            if (callbackInfo.timer) {
                clearTimeout(callbackInfo.timer);
            }

            // 执行回调
            callbackInfo.callback(payload.data);
            callbackInfo.executed = true;

            // 如果是一次性回调，移除
            if (callbackInfo.options.once) {
                this.callbackMap.delete(payload.callbackId);
            }
        } catch (error) {
            callbackInfo.options.onError?.(error as Error);
        }
    }

    /**
     * 处理回调取消
     */
    protected handleCallbackCancel(message: IFrameMessage<CommandType.CALLBACK_CANCEL>) {
        const payload = message.payload;
        if (!payload) return;

        const callbackInfo = this.callbackMap.get(payload.callbackId);
        if (callbackInfo) {
            if (callbackInfo.timer) {
                clearTimeout(callbackInfo.timer);
            }
            this.callbackMap.delete(payload.callbackId);
        }
    }

    /**
     * 发送消息
     * @param target 目标窗口名称
     * @param data 要发送的数据
     * @param callback 可选的回调函数，如果提供则等待响应
     * @param options 回调选项
     * @returns 如果有回调则返回callbackId，否则返回undefined
     */
    public sendMessage<T = unknown, R = unknown>(
        target: string,
        data: T,
        callback?: (response: R, reply?: (data?: unknown) => void) => void,
        options: ICallbackOptions = {}
    ): string | undefined {
        const needReply = typeof callback === "function";
        let callbackId: string | undefined;

        // 注册回调
        if (needReply && callback) {
            callbackId = guid();

            const defaultOptions: Required<ICallbackOptions> = {
                once: true,
                timeout: FrameMessageBase.CALLBACK_TIMEOUT,
                onTimeout: () => console.warn(`Callback timeout: ${callbackId}`),
                onError: (error) => console.error(`Callback error: ${callbackId}`, error),
                ...options,
            };

            const callbackInfo: ICallbackInfo<unknown> = {
                callback: callback as (data: unknown, reply?: (response?: unknown) => void) => void,
                options: defaultOptions,
                executed: false,
            };

            // 设置超时定时器
            if (defaultOptions.timeout > 0) {
                callbackInfo.timer = window.setTimeout(() => {
                    if (!callbackInfo.executed) {
                        callbackInfo.executed = true;
                        this.callbackMap.delete(callbackId!);
                        defaultOptions.onTimeout();
                    }
                }, defaultOptions.timeout);
            }

            this.callbackMap.set(callbackId, callbackInfo);
        }

        // 发送消息
        this.sendMessageInternal({
            id: guid(),
            from: this.name,
            to: target,
            command: CommandType.MESSAGE,
            state: ConnectionState.ESTABLISHED,
            version: FrameMessageBase.VERSION,
            timestamp: Date.now(),
            payload: {
                data,
                timestamp: Date.now(),
                callbackId,
                needReply,
            },
        });

        return callbackId;
    }

    /**
     * 取消回调
     */
    public cancelCallback(callbackId: string, target?: string) {
        const callbackInfo = this.callbackMap.get(callbackId);
        if (callbackInfo) {
            if (callbackInfo.timer) {
                clearTimeout(callbackInfo.timer);
            }
            this.callbackMap.delete(callbackId);

            // 通知对方取消回调
            if (target) {
                this.sendMessageInternal({
                    id: guid(),
                    from: this.name,
                    to: target,
                    command: CommandType.CALLBACK_CANCEL,
                    state: ConnectionState.ESTABLISHED,
                    version: FrameMessageBase.VERSION,
                    timestamp: Date.now(),
                    payload: { callbackId },
                });
            }
        }
    }

    /**
     * 内部发送消息方法 - 抽象方法，子类实现具体的发送逻辑
     */
    protected abstract sendMessageInternal<T extends CommandType>(message: IFrameMessage<T>): void;

    /**
     * 设置消息超时定时器
     */
    protected setMessageTimeout<T extends CommandType>(message: IFrameMessage<T>) {
        const timerId = window.setTimeout(() => {
            this.handleError(message.to, ErrorType.TIMEOUT, `Message timeout: ${message.id}`);
            this.messageTimeoutTimers.delete(message.id);
        }, FrameMessageBase.MESSAGE_TIMEOUT);

        this.messageTimeoutTimers.set(message.id, timerId);
    }

    /**
     * 清除消息超时定时器
     */
    protected clearMessageTimeout(messageId: string) {
        const timerId = this.messageTimeoutTimers.get(messageId);
        if (timerId) {
            clearTimeout(timerId);
            this.messageTimeoutTimers.delete(messageId);
        }
    }

    /**
     * 处理错误
     */
    protected handleError(clientName: string, type: ErrorType, message: string) {
        const errorMessage: IFrameMessage<CommandType.ERROR> = {
            id: guid(),
            from: this.name,
            to: clientName,
            command: CommandType.ERROR,
            state: ConnectionState.ESTABLISHED,
            version: FrameMessageBase.VERSION,
            timestamp: Date.now(),
            payload: {
                type,
                message,
                timestamp: Date.now(),
            },
        };

        this.eventBus.emit("error", errorMessage);

        // 如果是严重错误，触发断开连接（子类实现具体逻辑）
        if (type === ErrorType.CONNECTION_FAILED || type === ErrorType.TIMEOUT) {
            this.handleCriticalError(clientName);
        }
    }

    /**
     * 处理严重错误 - 抽象方法，子类实现具体的错误处理逻辑
     */
    protected abstract handleCriticalError(clientName: string): void;

    /**
     * 发送队列中的消息
     */
    protected sendQueuedMessages(target: string) {
        const channel = this.channelMap.get(target);
        if (!channel) return;

        while (channel.messageQueue.length > 0) {
            const message = channel.messageQueue.shift();
            if (message) {
                this.sendMessageInternal(message);
            }
        }
    }

    /**
     * 处理消息发送失败
     */
    protected handleSendFailure<T extends CommandType>(message: IFrameMessage<T>) {
        const channel = this.channelMap.get(message.to);
        if (!channel) return;

        // 如果是注册消息且未超过重试次数，则重试
        if (message.command === CommandType.REGISTER && channel.retryCount < FrameMessageBase.MAX_RETRY_COUNT) {
            channel.retryCount++;
            setTimeout(() => {
                this.sendMessageInternal(message);
            }, FrameMessageBase.RETRY_INTERVAL);
        } else if (message.command !== CommandType.HEARTBEAT) {
            // 非心跳消息，加入队列等待重发
            channel.messageQueue.push(message);
        }
    }

    /**
     * 清理资源
     */
    protected cleanup() {
        // 清理所有回调
        this.callbackMap.forEach((callbackInfo) => {
            if (callbackInfo.timer) {
                clearTimeout(callbackInfo.timer);
            }
        });
        this.callbackMap.clear();

        // 移除默认错误处理
        this.eventBus.off("error", defaultErrorHandler);

        // 清理所有定时器
        this.messageTimeoutTimers.forEach((timerId) => clearTimeout(timerId));
        this.messageTimeoutTimers.clear();

        // 清理客户端连接
        this.channelMap.clear();
        this.eventBus.all.clear();
    }

    /**
     * 断开连接 - 抽象方法，子类实现具体的断开逻辑
     */
    public abstract disconnect(): void;
}
