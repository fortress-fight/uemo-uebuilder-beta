/*
 * @Description: 用户模板操作相关接口
 * @Author: F-Stone
 * @LastEditTime: 2025-09-12 15:53:24
 */
import type { AxiosUemoToolsResponse, AxiosPaginatedResponse } from "./api.instance";

import { AxiosUemoTools } from "./api.instance";

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
export interface UserCollectItem extends UserTemplateBase {
    version: string;
    cat: string;
    style: string;
    views: number;
    collects: number;
    collected_id: string;
    res_type: "pages" | "utils";
}

// #region 获取用户模板信息

/**
 * 获取用户模板详情
 * @param data - 请求参数
 */
export function getUserTemplate(data: { id: string }) {
    return AxiosUemoTools.post<AxiosUemoToolsResponse<UserTemplateDetail>>("/pages/user/id", data);
}

/**
 * 获取用户布局模板详情
 * @param data - 请求参数
 */
export function getUserLayoutTemplate(data: { id: string }) {
    return AxiosUemoTools.post<AxiosUemoToolsResponse<UserTemplateDetail>>("/units/user/id", data);
}

// #endregion

// #region 编辑用户模板

/**
 * 用户模板操作的响应类型
 */
type UserTemplateResponse = { code: 0; data: { id: string } } | { code: 1; errMsg: "limit" } | { code: 998 };

/**
 * 用户模板操作的参数类型定义
 */
interface UserTemplateParams {
    add: { json: string; thumb: string; title: string };
    edit: { id: string; json: string; thumb: string; title: string };
    delete: { id: string };
}

/**
 * 编辑用户模板
 * @param action - 操作类型：add（添加）、edit（编辑）、delete（删除）
 * @param param - 编辑参数
 * @returns Promise with response
 */
export function updateUserTemplate<T extends keyof UserTemplateParams>(
    action: T,
    param: UserTemplateParams[T]
): Promise<UserTemplateResponse> {
    const baseRequestData: { action: T; version: string } = { action, version: "v4" };

    // 根据操作类型构建请求数据
    const requestData = { ...baseRequestData, ...param };

    return AxiosUemoTools.post<UserTemplateResponse>("/pages/user/id/action", requestData);
}

// #endregion

// #region 用户收藏相关

/**
 * 获取收藏列表
 * @param params - 分页参数
 */
export function getBookmarkList(params?: { page: number; limit?: number }) {
    return AxiosUemoTools.get<
        AxiosUemoToolsResponse<{
            list: AxiosPaginatedResponse<UserCollectItem> & { cat: string };
        }>
    >("/collects/user/list", { params });
}

/**
 * 更新收藏列表
 * @param data - 请求参数
 */
export function updateBookmarkList(
    data?: { action: "add"; type: "pages" | "units"; type_id: string } | { action: "delete"; id: string }
) {
    return AxiosUemoTools.get<AxiosUemoToolsResponse<{ id: string }>>("/collects/user/id/action", {
        params: data,
    });
}

// #endregion

// #region 获取用户库列表

/**
 * 获取用户模板列表
 * @param params - 分页参数
 */
export function getUserPageList(params?: { page: number }) {
    return AxiosUemoTools.get<AxiosUemoToolsResponse<{ list: AxiosPaginatedResponse<UserTemplateBase> }>>(
        "/pages/user/list",
        {
            params,
        }
    );
}

/**
 * 获取用户布局列表
 * @param params - 分页参数
 */
export function getUserLayoutList(params?: { page: number; limit?: number; order?: string }) {
    return AxiosUemoTools.get<AxiosUemoToolsResponse<{ list: AxiosPaginatedResponse<UserTemplateBase> }>>(
        "/units/user/list",
        { params }
    );
}

// #endregion
