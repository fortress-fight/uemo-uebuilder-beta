/*
 * @Description: uemo 接口拦截器
 * @Author: F-Stone
 * @LastEditTime: 2025-07-26 23:06:10
 */
import type { AxiosInstance, AxiosRequestConfig } from "@stone/uemo-editor-utils/lib/axios";

import { axios, axiosCacheInterceptor } from "@stone/uemo-editor-utils/lib/axios";

interface TYPE_AXIOS_UEMO_PUBLIC extends AxiosInstance {
    post<T = any, R = T, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>;
    get<T = any, R = T, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R>;
}

export const UemoApiAxiosInstance: TYPE_AXIOS_UEMO_PUBLIC = axiosCacheInterceptor.setupCache(
    axios.create({ baseURL: "https://moue5.jsmo.xin/api" }),
    {
        cacheTakeover: false,
        storage: axiosCacheInterceptor.buildMemoryStorage(
            /* cloneData default=*/ true,
            /* cleanupInterval default=*/ false,
            /* maxEntries default=*/ false
        ),
    }
);

// 添加响应拦截器
UemoApiAxiosInstance.interceptors.response.use((response) => {
    return response.data;
});
