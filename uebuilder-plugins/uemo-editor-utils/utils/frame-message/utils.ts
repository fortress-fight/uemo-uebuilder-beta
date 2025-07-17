import type { IFrameMessage, MessageEventHandler } from "./type";

export const VERSION = "4.0.1";
export const ROOT_BUS_NAME = "root-bus";
export const RETRY_INTERVAL = 3000;
export const MAX_RETRY_COUNT = 3;
export const MESSAGE_TIMEOUT = 10000;
export const CALLBACK_TIMEOUT = 30000;

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
 * 通信命令类型
 */
export enum CommandType {
    /** 注册命令 */
    REGISTER = "REGISTER",
    /** 心跳检测 */
    HEARTBEAT = "HEARTBEAT",
    /** 普通消息（包含回调功能） */
    MESSAGE = "MESSAGE",
    /** 错误消息 */
    ERROR = "ERROR",
    /** 断开连接 */
    DISCONNECT = "DISCONNECT",
    /** 确认断开 */
    DISCONNECT_ACK = "DISCONNECT_ACK",
    /** 回调响应 */
    CALLBACK_RESPONSE = "CALLBACK_RESPONSE",
    /** 取消回调 */
    CALLBACK_CANCEL = "CALLBACK_CANCEL",
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
 * 默认错误处理器
 */
export const defaultErrorHandler: MessageEventHandler = (message: IFrameMessage) => {
    if (message.command === CommandType.ERROR) {
        const error = message as IFrameMessage<CommandType.ERROR>;
        const { type, message: errorMessage } = error.payload || {};
        console.error(`[Frame Message Error] ${type}: ${errorMessage}`);
    }
};
