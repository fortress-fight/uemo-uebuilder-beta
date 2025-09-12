/*
 * @Description: uemo-tools 页面操作相关，需要用户登陆
 * @Author: F-Stone
 * @LastEditTime: 2025-08-19 11:31:48
 */
import type { AxiosUemoToolsResponse } from "./api.instance";

import { AxiosUemoTools } from "./api.instance";
export * from "./api.uemo-tools.user-template";

/**
 * 创建分享链接
 * @param data - 分享参数
 */
export function createShareLink(data: { id: string; action: "delete" | "edit" | "add"; content: string }) {
    return AxiosUemoTools.post<{ data: { preview_url: string; id: string } }>("/pages/user/id/share", data);
}

/**
 * 设置用户行业信息
 * @param data - 用户行业信息
 */
export function setUserIndustry(data: { tools_industry: string }) {
    return AxiosUemoTools.post("/user/info", data);
}

/**
 * 检查文件下载权限
 * @returns Promise with download check result
 */
export function checkDownloadPermission() {
    if (process.env.BUILD_TARGET === "test") {
        return Promise.resolve({ code: 0, data: { allow: true } });
    }

    return AxiosUemoTools.post<
        AxiosUemoToolsResponse<{
            current: number;
            limit: number;
            allow: boolean;
        }>
    >("/pages/download/check", {});
}

/**
 * 记录下载信息
 * @param data - 下载记录信息
 */
export function recordDownloadInfo(data: { pages_id?: string }) {
    return AxiosUemoTools.post("/pages/download/id/add", data);
}

/**
 * 更新用户信息
 * @param data - 用户信息
 */
export function updateUserInfo(data: { tools_guide: string }) {
    return AxiosUemoTools.post("/user/info", data);
}
