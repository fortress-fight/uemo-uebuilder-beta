/*
 * @Description: uemo 接口拦截器
 * @Author: F-Stone
 * @LastEditTime: 2025-03-16 01:13:07
 */
import type { AxiosInstance, AxiosRequestConfig } from "@stone/uemo-editor-utils/lib/axios";

import { UeError } from "@stone/uemo-editor-utils/lib/error";
import { axios } from "@stone/uemo-editor-utils/lib/axios";

interface TYPE_AXIOS_UE_MATERIAL_PUBLIC extends AxiosInstance {
    post<T = any, R = T, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>;
    get<T = any, R = T, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R>;
}

type RAW_FONT_DATA = {
    fontid: number;
    industryids: string;
    p_categoryid: number;
    font_categoryid: number;
    title: string;
    copyright: string;
    intro: string;
    keys: string;
    fonts: { name: string; files: string[] }[];
};

export namespace UeElFontTypes {
    // 获取模块列表

    export type FONT_DATA = {
        group: { zh: FONT_ITEM[]; en: FONT_ITEM[] };
        detail: { [name: string]: string };
    };

    export type FONT_ITEM = {
        label: string;
        lang: string;
        name: string;
        src: string;
        subList: { name: string; shortName: string; src: string }[];
    };
}

/**
 * 创建并返回一个配置了响应拦截器的 Axios 实例。
 * @returns {TYPE_AXIOS_UE_MATERIAL_PUBLIC} configured Axios instance.
 */
function axiosInstance() {
    const AxiosUeMaterial: TYPE_AXIOS_UE_MATERIAL_PUBLIC = axios.create({
        baseURL: process.env.NODE_ENV === "production" ? "https://card.uemox.com:8081" : "",
    });

    // 添加响应拦截器
    AxiosUeMaterial.interceptors.response.use(
        (response) => {
            return response.data;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    return AxiosUeMaterial;
}

const AxiosUeMaterial = axiosInstance();

/**
 * 字体缓存管理器类，用于缓存字体库数据。
 */
class FontCacheManager {
    private static instance: FontCacheManager;
    private cache: UeElFontTypes.FONT_DATA | null = null;

    private constructor() {}

    /**
     * 获取 FontCacheManager 单例实例。
     * @returns {FontCacheManager} 单例实例。
     */
    public static getInstance(): FontCacheManager {
        if (!FontCacheManager.instance) {
            FontCacheManager.instance = new FontCacheManager();
        }
        return FontCacheManager.instance;
    }

    public getCache(): UeElFontTypes.FONT_DATA | null {
        return this.cache;
    }

    public setCache(data: UeElFontTypes.FONT_DATA): void {
        this.cache = data;
    }
}

/**
 * 字体数据处理工具类。
 */
class FontDataProcessor {
    private static processFontList(
        title: string,
        font: { name: string; files: string[] },
        index: number
    ): [string, { shortName: string; link: string; index: number }] {
        const { name, files } = font;
        const shortName = name.replace(title + "-", "");

        return [name.trim(), { index, shortName, link: files[0] }];
    }

    /**
     * 处理原始字体数据，生成包含字体分组和详情的对象。
     * @param {UeElFontTypes.FONT[]} fontData 原始字体数据数组。
     * @returns {UeElFontTypes.FONT_DATA} 处理后的字体库数据。
     */
    public static processData(fontData: RAW_FONT_DATA[]): UeElFontTypes.FONT_DATA {
        const detail: UeElFontTypes.FONT_DATA["detail"] = {};
        const group: UeElFontTypes.FONT_DATA["group"] = { zh: [], en: [] };

        const fontMapData = new Map<
            string,
            { title: string; lang: "zh" | "en"; fonts: { name: string; files: string[] }[] }
        >();

        fontData.forEach(({ title, fonts, p_categoryid }) => {
            fontMapData.set(title.trim(), {
                title: title.trim(),
                lang: p_categoryid === 6 ? "zh" : "en",
                fonts,
            });
        });

        fontMapData.values().forEach(({ title, fonts, lang }) => {
            const fontItem: UeElFontTypes.FONT_ITEM = {
                label: title,
                name: fonts[0].name,
                src: fonts[0].files[0],
                subList: [],
                lang,
            };

            fonts.forEach((font, index) => {
                detail[font.name.trim()] = font.files[0];

                const [name, fontListData] = this.processFontList(title, font, index);

                if (fontListData.shortName.toLowerCase() === "regular") {
                    fontItem.name = name;
                    fontItem.src = fontListData.link;
                }

                fontItem.subList.push({
                    name,
                    shortName: fontListData.shortName,
                    src: fontListData.link,
                });
            });

            group[lang].push(fontItem);
        });

        return { group, detail };
    }
}

/**
 * 导出字体库获取函数，通过接口获取字体数据并缓存。
 * @returns {Promise<UeElFontTypes.FONT_DATA>} 字体库数据的 Promise 对象。
 */
export const getFontLib = async () => {
    const cacheManager = FontCacheManager.getInstance();
    const cachedData = cacheManager.getCache();

    if (cachedData) {
        return Promise.resolve(cachedData);
    }

    try {
        const res = await AxiosUeMaterial.post<{ Data: { list: RAW_FONT_DATA[] } }>(
            "/UeMaterial.Api/api/v1/GetFontList",
            { pagesize: 2000 }
        );

        const processedData = FontDataProcessor.processData(res.Data.list);
        cacheManager.setCache(processedData);

        return processedData;
    } catch (error) {
        throw new UeError("ERROR:GET_FONT_LIB_FAILED", { message: "获取字体库失败", data: error });
    }
};
