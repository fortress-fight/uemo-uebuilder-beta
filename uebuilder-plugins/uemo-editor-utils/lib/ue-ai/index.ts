/*
 * @Description: uemo 接口拦截器
 * @Author: F-Stone
 * @LastEditTime: 2025-06-05 11:41:12
 */
import type { UEEngineAxiosInstance, AxiosRequestConfig } from "./utils/type";
import type { RequestParams, StreamRequestParams } from "./utils/helper";

import { axios } from "../axios";
import { UeAiError, UeAiErrorCode } from "./utils/error";
import { formatRequestBody } from "./utils/helper";

export class UE_ENGINE {
    private axios: UEEngineAxiosInstance | null = null;
    private readonly baseURL = "/";
    /** 单例模式存储实例映射 */
    private static instances: Record<string, UE_ENGINE> = {};

    /**
     * 创建UE_ENGINE实例，使用单例模式
     * @param {string} key - 实例标识键
     */
    constructor(key = "default") {
        if (UE_ENGINE.instances[key]) return UE_ENGINE.instances[key];
        this.axios = this.initAxios();
        UE_ENGINE.instances[key] = this;
    }

    /**
     * 初始化axios实例并配置拦截器
     * @private
     * @returns {UEEngineAxiosInstance}
     */
    private initAxios() {
        const instance = axios.create({ baseURL: this.baseURL });

        // 添加响应拦截器
        instance.interceptors.response.use((response) => {
            if (response.data.statusCode !== 0) {
                throw new UeAiError(UeAiErrorCode.AI_REQUEST_FAILED, {
                    message: response.data.message || "AI request failed",
                    data: response.data,
                });
            }
            return response.data;
        });

        return instance;
    }

    private createHeaders(appKey: string | undefined, type: string) {
        return {
            "X-Uekey": appKey,
            "X-Api-Type": type,
        };
    }

    /**
     * 删除AI消息API
     * @param {string} url - API端点
     * @param {string} type - API类型
     * @param {string} appKey - 应用密钥
     * @param {{ conversation_ids: string[] }} param - 对话ID列表
     * @returns {{ fire: () => Promise<T>, cancel: () => void }}
     */
    deleteAIMsgApi(url: string, type: string, appKey: string | undefined, param: { conversation_ids: string[] }) {
        const cancelTokenSource = axios.CancelToken.source();
        const options: AxiosRequestConfig<any> = {
            cancelToken: cancelTokenSource.token,
            headers: this.createHeaders(appKey, type),
        };

        return {
            fire: <T = string>() => {
                if (!this.axios) {
                    throw new UeAiError(UeAiErrorCode.AI_AXIOS_NOT_INIT, {
                        message: "AI axios is not initialized",
                    });
                }
                return this.axios?.post<{
                    statusCode: number;
                    message: string;
                    timestamp: string;
                    data: T;
                }>(url, param, options);
            },
            cancel: () => cancelTokenSource?.cancel(),
        };
    }

    /**
     * 提交AI请求API
     * @param {string} url - API端点
     * @param {string} type - API类型
     * @param {string} appKey - 应用密钥
     * @param {RequestParams} param - 请求参数
     * @returns {{ fire: () => Promise<T>, cancel: () => void }}
     */
    submitAiApi(url: string, type: string, appKey: string | undefined, param: RequestParams) {
        const cancelTokenSource = axios.CancelToken.source();
        const options: AxiosRequestConfig<any> = {
            cancelToken: cancelTokenSource.token,
            headers: this.createHeaders(appKey, type),
        };

        return {
            fire: <T = string>() => {
                if (!this.axios) {
                    throw new UeAiError(UeAiErrorCode.AI_AXIOS_NOT_INIT, {
                        message: "AI axios is not initialized",
                    });
                }
                return this.axios?.post<{
                    statusCode: number;
                    message: string;
                    timestamp: string;
                    data: T;
                }>(url, formatRequestBody(param), options);
            },
            cancel: () => cancelTokenSource?.cancel(),
        };
    }

    /**
     * 处理API错误
     *
     * @param {*} err
     * @return {*}  {UeAiError}
     * @memberof UE_ENGINE
     */
    dealApiError(err: any): UeAiError {
        const isAbortError = err instanceof Error && err.name === "AbortError";
        if (isAbortError) {
            return new UeAiError(UeAiErrorCode.AI_REQUEST_ABORT, {
                message: "请求被取消",
            });
        } else if (err instanceof UeAiError) {
            return err;
        } else {
            return new UeAiError(UeAiErrorCode.AI_REQUEST_UNKNOWN_ERROR, {
                message: "未知错误",
            });
        }
    }

    /**
     * 提交流式AI请求API
     * @param {string} url - API端点
     * @param {string} type - API类型
     * @param {string} appKey - 应用密钥
     * @param {StreamRequestParams} param - 流式请求参数
     * @returns {{ fire: () => Promise<void>, cancel: () => void }}
     */
    submitStreamAiApi(url: string, type: string, appKey: string | undefined, param: StreamRequestParams) {
        const decoder = new TextDecoder();
        const requestCtrl = new AbortController();
        const { onError, onFinally, onEnd, onUpdate } = param.callbacks;

        // 超时检测
        const timeoutPromise = (timeout: number) => {
            return new Promise<Response>((_, reject) => {
                setTimeout(() => {
                    reject(
                        new UeAiError(UeAiErrorCode.AI_REQUEST_TIMEOUT, {
                            message: "请求超时，请检查网络是否通畅",
                        })
                    );
                }, timeout);
            });
        };

        // 请求
        const fetchHandler = (url: string) => {
            return fetch(url, {
                method: "POST",
                headers: {
                    ...this.createHeaders(appKey, type),
                    "Content-Type": "application/json",
                } as HeadersInit,
                body: JSON.stringify(formatRequestBody(param)),
                signal: requestCtrl.signal,
            });
        };

        // 处理 Uint8Array
        function dealUint8Array(value: Uint8Array | undefined): Promise<Uint8Array | undefined> {
            const chunk = decoder.decode(value, { stream: true });
            const regex = /data: (\{.*\})/g;

            if (!chunk) {
                return Promise.resolve(value);
            }

            // 验证数据格式
            if (!chunk.startsWith("data:")) {
                throw new UeAiError(UeAiErrorCode.AI_REQUEST_STREAM_OUTPUT_ERROR, {
                    message: "输出数据格式错误",
                });
            }

            try {
                // 使用正则一次性匹配所有数据
                const matches = [...chunk.matchAll(regex)];

                // 批量处理匹配结果
                for (const match of matches) {
                    const rawData = JSON.parse(match[1]);
                    const text = rawData?.Choices?.[0]?.Message?.Content ?? "";
                    onUpdate(text, rawData);
                }

                return Promise.resolve(value);
            } catch (err) {
                if (err instanceof Error) {
                    throw err;
                }
                throw new UeAiError(UeAiErrorCode.AI_REQUEST_STREAM_OUTPUT_ERROR, {
                    message: "输出解析失败，请稍后重试",
                });
            }
        }

        // 读取流
        const readStream = (reader: ReadableStreamDefaultReader<Uint8Array>) => {
            const read = async (): Promise<void> => {
                try {
                    const { done, value } = await reader.read();
                    if (done) {
                        onEnd();
                        return;
                    }
                    return await dealUint8Array(value).then(() => read());
                } catch (err) {
                    onError(this.dealApiError(err));
                }
            };
            return read();
        };

        return {
            fire: async () => {
                const requestUrl = this.baseURL.replace(/\/$/, "") + url;
                try {
                    const response = await Promise.race([fetchHandler(requestUrl), timeoutPromise(20000)]);

                    const body = response.body;
                    if (!body) {
                        throw new UeAiError(UeAiErrorCode.AI_REQUEST_STREAM_ERROR, {
                            message: "缺少输出流",
                        });
                    }

                    return readStream(body.getReader());
                } catch (err) {
                    if (!requestCtrl.signal.aborted) {
                        requestCtrl.abort();
                    }
                    onError(this.dealApiError(err));
                } finally {
                    onFinally();
                }
            },
            cancel: () => {
                try {
                    requestCtrl.abort();
                } catch (err) {
                    console.error("CANCEL STEAM AJAX ERR:", err);
                }
            },
        };
    }
}
