/*
 * @Description: uemo 接口拦截器
 * @Author: F-Stone
 * @LastEditTime: 2025-08-19 14:11:19
 */
import type { AxiosInstance, AxiosRequestConfig } from "@stone/uemo-editor-utils/lib/axios";

import { axios } from "@stone/uemo-editor-utils/lib/axios";

interface UemoAxiosInstance extends AxiosInstance {
    post<T = any, R = T, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>;
    get<T = any, R = T, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R>;
}

export class UemoAPIError extends Error {
    code: number;

    constructor(code: number, message: string) {
        super(message);
        this.code = code;
    }
}

/**
 * 分页列表响应的通用接口
 */
export interface AxiosPaginatedResponse<T> {
    page: number;
    page_total: number;
    limit: number;
    total: number;
    data: T[];
}

/**
 * uemo 关联的用户接口
 */
export const AxiosUemo: UemoAxiosInstance = axios.create({
    baseURL: process.env.NODE_ENV === "production" ? "https://www.uemo.net" : "/",
});

// 添加响应拦截器
AxiosUemo.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {
        return Promise.reject(error instanceof Error ? error : new Error("Unknown error"));
    }
);

/**
 * tools 关联的操作接口
 */
export const AxiosUemoTools: UemoAxiosInstance = axios.create({
    baseURL: process.env.NODE_ENV === "production" ? "https://www.uemo.net/tools/" : "/tools/",
});

/**
 * 用户模板相关接口的响应数据类型
 * @template T - 具体的数据类型
 */
export type AxiosUemoToolsResponse<T extends Record<string, any>> = UEBUILDER_TOOLS_API.Data<T>;

// 添加响应拦截器
AxiosUemoTools.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error: unknown) => {
        return Promise.reject(error instanceof Error ? error : new Error("Unknown error"));
    }
);
