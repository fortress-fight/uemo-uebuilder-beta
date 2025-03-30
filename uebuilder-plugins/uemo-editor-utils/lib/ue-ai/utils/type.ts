import type { AxiosInstance, AxiosRequestConfig } from "@stone/uemo-editor-utils/lib/axios";

interface UEEngineAxiosInstance extends AxiosInstance {
    post<T = any, R = T, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>;
    get<T = any, R = T, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R>;
}

export type { UEEngineAxiosInstance, AxiosRequestConfig };
