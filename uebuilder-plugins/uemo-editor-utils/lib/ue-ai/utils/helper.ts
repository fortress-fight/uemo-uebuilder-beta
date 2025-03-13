import { guid } from "../../guid";
import { UeAiError } from "./error";

/**
 * AI 流式响应的回调函数集合
 * @interface StreamCallbacks
 * @property {() => void} onEnd - 流式响应结束时的回调
 * @property {(err: UeAiError) => void} onError - 发生错误时的回调
 * @property {() => void} onFinally - 流式响应完成时的回调（无论成功或失败）
 * @property {(text: string, rawData: any) => void} onUpdate - 接收到新的流式数据时的回调
 */
export type StreamCallbacks = {
    onEnd: () => void;
    onError: (err: UeAiError) => void;
    onFinally: () => void;
    onUpdate: (text: string, rawData: any) => void;
};

/**
 * AI 请求的基础参数接口
 * @interface RequestParams
 * @property {string} [uid] - 可选的请求唯一标识
 * @property {string} text - 发送给 AI 的文本内容
 * @property {string} [prompt] - 可选的系统提示词
 * @property {string} [session_id] - 可选的会话 ID
 * @property {string} [conversation_id] - 可选的对话 ID
 * @property {Record<string, any>} [inputs] - 可选的额外输入参数
 */
export interface RequestParams {
    uid?: string;
    text: string;
    prompt?: string;
    session_id?: string;
    conversation_id?: string;
    inputs?: Record<string, any>;
}

/**
 * 流式请求参数接口，继承自基础请求参数
 * @interface StreamRequestParams
 * @extends {RequestParams}
 * @property {StreamCallbacks} callbacks - 流式响应的回调函数集合
 */
export interface StreamRequestParams extends RequestParams {
    callbacks: StreamCallbacks;
}

/**
 * 创建标准化的请求负载
 * @function createRequestPayload
 * @param {RequestParams} params - 请求参数
 * @returns {Object} 返回标准化的请求负载对象，包含所有必要的 ID 和消息内容
 */
export const formatRequestBody = (params: RequestParams) => ({
    outId: params.uid || "",
    session_id: params.session_id || guid(21),
    conversation_id: params.conversation_id || guid(21),
    pre_prompt: params.prompt,
    message: params.text,
    inputs: params.inputs,
});
