import { _get } from "@stone/uemo-editor-utils/lib/lodash";
import { getSizeDesc } from "@stone/uemo-editor-utils/lib/utils";
import { axios } from "@stone/uemo-editor-utils/lib/axios";
import { i18n } from "@/i18n";

const DEFAULT_LIMIT_SIZE = 2048;

const { t } = i18n.global;

/**
 * 创建 axios 实例
 * @returns axios 实例
 */
export function createAxios() {
    const result = axios.create();

    // 添加响应拦截器
    result.interceptors.response.use(
        (response) => response.data,
        (error) => {
            return Promise.reject(error instanceof Error ? error : new Error(String(error)));
        }
    );

    return result;
}

/**
 * 检查文件大小
 * @param file 文件
 * @param limitSize 限制大小
 */
export function checkFileSize(file: File, limitSize: number): Promise<void> {
    const useLimitSize = limitSize || DEFAULT_LIMIT_SIZE;

    if (file.size > useLimitSize * 1024) {
        return Promise.reject(
            new UeElError(UeElErrorCode.UPLOAD_FILE_SIZE_EXCEED, {
                message: t("ERROR_UPLOAD_FILE_SIZE_EXCEED") + getSizeDesc(limitSize),
            })
        );
    }

    return Promise.resolve();
}

/**
 * 转换上传配置
 * @param config 旧配置
 * @returns 新配置
 */
export function transferUploadConfig(config: UE_EL_UTIL.UploadConfigOld): UE_EL_UTIL.UploadConfig {
    const baseParam = {
        uploadPath: config.uploadPath,
        uploadName: config.uploadName,
        publicPath: config.publicPath,
        resourceLink: config.resourceLink,
        withCredentials: config.withCredentials,
        useFullLink: config.useFullLink,
        uploadData: config.uploadData,
        qiniu: config.qiniu || false,
        history: config.history || false,

        video: config.video || false,
        asset: config.asset || false,
    } as const;

    if ("imageUploadSize" in config) {
        return {
            ...baseParam,

            fileLimitSize: config.imageUploadSize,
            uploadFileQueryPath: config.imageDataPath,

            image: { allow: true, limitSize: config.imageUploadSize },
        };
    }

    return {
        ...baseParam,

        fileLimitSize: config.fileLimitSize,
        uploadFileQueryPath: config.uploadFileQueryPath,

        image: config.image || false,
    };
}
