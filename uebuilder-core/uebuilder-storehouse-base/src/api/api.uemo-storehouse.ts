import { UemoApiAxiosInstance } from "./api.instance";

/**
 * @description 定义主题样式类型
 * @typedef {'dark' | 'tint' | ''} ThemeStyle
 */
export type ThemeStyle = "dark" | "tint" | "";

/**
 * @description 模板查询条件接口
 * @interface TemplateSearchParams
 */
export interface TemplateSearchParams {
    /** 模板样式 */
    style: ThemeStyle;
    /** 分类 */
    cat: string;
    /** 类型: 0-普通, 1-特殊 */
    type: 0 | 1;
    /** 页码 */
    page: number;
    /** 每页条数 */
    limit?: number;
    /** 排序方式 */
    order?: "update" | "hot" | "create";
}

/**
 * @description 模板列表数据结构
 * @interface TemplateListResponse
 */
export interface TemplateListResponse {
    /** 样式选项 */
    style: { lable: string; value: ThemeStyle }[];
    /** 分类选项 */
    cat: { lable: string; value: string; total: number }[];
    /** 列表数据 */
    list: {
        style: ThemeStyle;
        cat: string;
        page: number;
        page_total: number;
        limit: number;
        total: number;
        data: {
            id: string;
            cat: string;
            style: ThemeStyle;
            img: string;
        }[];
    };
}

/**
 * @description 模板详情数据结构
 * @interface TemplateDetailResponse
 */
interface TemplateDetailResponse {
    post: {
        id: number;
        cat: string;
        style: string;
        img: string;
        content: string;
        json: string;
    };
}

/**
 * @description 页面查询参数接口
 * @interface PageSearchParams
 */
interface PageSearchParams {
    /** 版本 */
    version: "v4" | "v3";
    /** 样式 */
    style: ThemeStyle;
    /** 分类 */
    cat: string;
    /** 类型 */
    type?: 0 | 1;
    /** 编辑器工具 */
    tools_editor?: 0 | 1;
    /** 页码 */
    page: number;
    /** 排序方式 */
    order?: "update" | "hot" | "create";
}

/**
 * @description 页面数据结构
 * @interface PageData
 */
interface PageData {
    link?: string;
    id: string;
    cat: string;
    style: ThemeStyle;
    img: string;
    type: string;
    title: string;
    content: string;
    json: string;
}

/**
 * @description 页面列表响应数据结构
 * @interface PageListResponse
 */
interface PageListResponse {
    style: { lable: string; value: ThemeStyle }[];
    cat: { lable: string; value: string; total: number }[];
    list: {
        style: ThemeStyle;
        cat: string;
        page: number;
        page_total: number;
        limit: number;
        total: number;
        data: PageData[];
    };
}

/**
 * @description 页面分类数据结构
 * @interface PageCategoryResponse
 */
interface PageCategoryResponse {
    style: { lable: string; value: ThemeStyle }[];
    cat: { lable: string; value: string; total: number }[];
}

/**
 * @description API响应格式
 * @template T 响应数据类型
 */
interface ApiResponse<T> {
    code: number;
    data: T;
}

/**
 * @description 模板相关API
 */
export const templateApi = {
    /**
     * @description 获取模板列表
     * @param {TemplateSearchParams} params - 查询参数
     * @returns {Promise<ApiResponse<TemplateListResponse>>}
     */
    getList: (params: TemplateSearchParams) => {
        return UemoApiAxiosInstance.get<ApiResponse<TemplateListResponse>>("/units/list.php", {
            params,
        });
    },

    /**
     * @description 获取模板详情
     * @param {string} id - 模板ID
     * @returns {Promise<ApiResponse<TemplateDetailResponse>>}
     */
    getDetail: (id: string) => {
        return UemoApiAxiosInstance.get<ApiResponse<TemplateDetailResponse>>("/units/post.php", {
            params: { id },
        });
    },
};

/**
 * @description 页面相关API
 */
export const pageApi = {
    /**
     * @description 获取页面列表
     * @param {Partial<PageSearchParams>} params - 查询参数
     * @returns {Promise<ApiResponse<PageListResponse>>}
     */
    getList: (params?: Partial<PageSearchParams>) => {
        return UemoApiAxiosInstance.get<ApiResponse<PageListResponse>>("/pages/list.php", {
            params,
        });
    },

    /**
     * @description 获取页面详情
     * @param {string} id - 页面ID
     * @returns {Promise<ApiResponse<{ post: PageData }>>}
     */
    getDetail: (id: string) => {
        return UemoApiAxiosInstance.get<ApiResponse<{ post: PageData }>>("/pages/post.php", {
            params: { id },
        });
    },

    /**
     * @description 获取页面分类信息
     * @returns {Promise<ApiResponse<PageCategoryResponse>>}
     */
    getCategory: () => {
        return UemoApiAxiosInstance.get<ApiResponse<PageCategoryResponse>>("/pages/category.php");
    },
};
