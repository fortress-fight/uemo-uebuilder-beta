/*
 * @Description: uemo-tools 页面操作相关，需要用户登陆
 * @Author: F-Stone
 * @LastEditTime: 2025-07-31 10:44:21
 */
import { AxiosUemoTools } from "./api.instance";

/**
 * 用户模板相关接口的响应数据类型
 * @template T - 具体的数据类型
 */
type ApiResponse<T extends Record<string, any>> = UEBUILDER_TOOLS_API.Data<T>;

/**
 * 分页列表响应的通用接口
 */
interface PaginatedResponse<T> {
    page: number;
    page_total: number;
    limit: number;
    total: number;
    data: T[];
}

/**
 * 用户模板基础信息
 */
interface UserTemplateBase {
    id: string;
    title: string;
    img: string;
    diff_time: string;
}

/**
 * 用户模板详细信息
 */
interface UserTemplateDetail extends UserTemplateBase {
    json: string;
}

/**
 * 收藏项目信息
 */
export interface CollectItem extends UserTemplateBase {
    version: string;
    cat: string;
    style: string;
    views: number;
    collects: number;
    collected_id: string;
    res_type: "pages" | "utils";
}

/**
 * 编辑用户模板的参数类型
 */
type EditTemplateData = {
    edit: Partial<UEBUILDER_TOOLS_API.UserPageInfo>;
    add: UEBUILDER_TOOLS_API.UserPageInfo;
    delete: undefined;
};

export type EditorUserTemplateParam = {
    [K in keyof EditTemplateData]: {
        id: string;
        type: K;
        data: EditTemplateData[K];
    };
}[keyof EditTemplateData];

/**
 * 编辑用户模板
 * @param param - 编辑参数
 * @returns Promise with response
 */
export function editorUserTemplate(param: EditorUserTemplateParam) {
    const { type: action, id } = param;
    const baseData = { action, version: "v4" };

    const requestData =
        action === "add"
            ? { ...baseData, ...("data" in param ? param.data : {}) }
            : { ...baseData, id, ...("data" in param ? param.data : {}) };

    return AxiosUemoTools.post<{ code: 0; data: { id: string } } | { code: 1; errMsg: "limit" }>(
        "/pages/user/id/action",
        requestData
    );
}

/**
 * 创建分享链接
 * @param data - 分享参数
 */
export function createShareLink(data: { id: string; action: "delete" | "edit" | "add"; content: string }) {
    return AxiosUemoTools.post<{ data: { preview_url: string; id: string } }>("/pages/user/id/share", data);
}

/**
 * 获取用户模板列表
 * @param params - 分页参数
 */
export function getUserPageList(params?: { page: number }) {
    return AxiosUemoTools.get<ApiResponse<{ list: PaginatedResponse<UserTemplateBase> }>>("/pages/user/list", {
        params,
    });
}

/**
 * 获取用户布局列表
 * @param params - 分页参数
 */
export function getUserLayoutList(params?: { page: number; limit?: number; order?: string }) {
    return AxiosUemoTools.get<ApiResponse<{ list: PaginatedResponse<UserTemplateBase> }>>("/units/user/list", {
        params,
    });
}

/**
 * 获取用户模板详情
 * @param data - 请求参数
 */
export function getUserTemplate(data: { id: string }) {
    return AxiosUemoTools.post<ApiResponse<UserTemplateDetail>>("/pages/user/id", data);
}

/**
 * 获取用户布局模板详情
 * @param data - 请求参数
 */
export function getUserLayoutTemplate(data: { id: string }) {
    return AxiosUemoTools.post<ApiResponse<UserTemplateDetail>>("/units/user/id", data);
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
        ApiResponse<{
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

/**
 * 获取收藏列表
 * @param params - 分页参数
 */
export function getBookmarkList(params?: { page: number; limit: number }) {
    return AxiosUemoTools.get<
        ApiResponse<{
            list: PaginatedResponse<CollectItem> & { cat: string };
        }>
    >("/collects/user/list", { params });
}
