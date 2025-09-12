import { CommandType, ConnectionState, ErrorType } from "./utils";

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
 * 回调消息负载
 */
export interface ICallbackPayload<T = unknown> {
    /** 回调 ID */
    callbackId: string;
    /** 消息数据 */
    data: T;
    /** 是否为回调响应 */
    isResponse?: boolean;
    /** 是否需要回复 */
    needReply?: boolean;
    /** 错误信息 */
    error?: string;
}

/**
 * 断开连接原因
 */
export interface IDisconnectPayload {
    reason: "normal" | "timeout" | "error";
    message?: string;
}

/**
 * 普通消息接口（扩展支持回调功能）
 */
export interface IMessagePayload<T = unknown> {
    /** 消息数据 */
    data: T;
    /** 时间戳 */
    timestamp: number;
    /** 回调 ID（可选，仅当需要回调时设置） */
    callbackId?: string;
    /** 是否需要回复（可选，仅当需要回调时设置） */
    needReply?: boolean;
}

/**
 * 消息负载类型映射
 */
export interface IMessagePayloadMap {
    [CommandType.ERROR]: IErrorPayload;
    [CommandType.HEARTBEAT]: IHeartbeatPayload;
    [CommandType.DISCONNECT]: IDisconnectPayload;
    [CommandType.MESSAGE]: IMessagePayload;
    [CommandType.CALLBACK_RESPONSE]: ICallbackPayload;
    [CommandType.CALLBACK_CANCEL]: { callbackId: string };
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
    /** 回复函数（仅在接收消息时存在，支持链式回调） */
    reply?: (response?: unknown) => void;
}

/**
 * 客户端连接信息
 */
export interface IChannelInfo {
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
 * 回调配置接口
 */
export interface ICallbackOptions {
    /** 是否为一次性回调，默认 true */
    once?: boolean;
    /** 超时时间（毫秒），默认 30000ms */
    timeout?: number;
    /** 超时回调 */
    onTimeout?: () => void;
    /** 错误回调 */
    onError?: (error: Error) => void;
}

/**
 * 回调信息接口
 */
export interface ICallbackInfo<T = unknown> {
    /** 回调函数 */
    callback: (data: T, reply?: (response?: unknown) => void) => void;
    /** 配置选项 */
    options: Required<ICallbackOptions>;
    /** 超时定时器 */
    timer?: number;
    /** 是否已执行 */
    executed: boolean;
}

/**
 * 事件类型定义
 */
export type MessageEventType = "connected" | "disconnected" | "message" | "error";

/**
 * 事件映射类型
 */
export type MessageEventMap = Record<MessageEventType, IFrameMessage> & Record<string, unknown>;

/**
 * 事件处理器类型
 */
export type MessageEventHandler<T = IFrameMessage> = (message: T) => void;
