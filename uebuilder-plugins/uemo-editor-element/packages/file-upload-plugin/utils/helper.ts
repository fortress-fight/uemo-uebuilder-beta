import { _get } from "@stone/uemo-editor-utils/lib/lodash";
import { getSizeDesc } from "@stone/uemo-editor-utils/lib/utils";
import { UeError } from "@stone/uemo-editor-utils/lib/error";
import { axios } from "@stone/uemo-editor-utils/lib/axios";
import { i18n } from "@/index";

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
            new UeError("0", { message: t("FILE_UPLOADER_TIP_FILE_SIZE_EXCEED") + getSizeDesc(limitSize * 1024) })
        );
    }

    return Promise.resolve();
}

/**
 * 转换上传配置
 * @param oldConfig 旧配置
 * @returns 新配置
 */
export function transferUploadConfig(
    oldConfig: UE_EL_UTIL.UploadConfigOld | UE_EL_UTIL.UploadConfig
): UE_EL_UTIL.UploadConfig {
    if ("imageUploadSize" in oldConfig) {
        return {
            uploadPath: oldConfig.uploadPath,
            uploadName: oldConfig.uploadName,
            publicPath: oldConfig.publicPath,
            resourceLink: oldConfig.resourceLink,
            withCredentials: oldConfig.withCredentials,
            useFullLink: oldConfig.useFullLink,
            uploadData: oldConfig.uploadData,

            fileLimitSize: oldConfig.imageUploadSize,
            uploadFileQueryPath: oldConfig.imageDataPath,

            qiniu: oldConfig.qiniu,

            image: {
                // 是否允许上传视频，默认：true
                allow: true,
                // 上传文件大小限制，默认：2048
                limitSize: oldConfig.imageUploadSize,
            },

            video: oldConfig.video,

            history: oldConfig.history,
        };
    } else {
        return oldConfig;
    }
}
