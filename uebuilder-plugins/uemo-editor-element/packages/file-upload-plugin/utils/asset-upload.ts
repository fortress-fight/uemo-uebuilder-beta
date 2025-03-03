import type { AxiosInstance } from "@stone/uemo-editor-utils/lib/axios";

import { normalUpload } from "./normal-upload";
import { checkFileSize } from "./helper";

/**
 * 上传资源
 * @param file 文件
 * @param axiosInstance axios实例
 * @param uploadConfig 上传配置
 * @param param 参数
 */
export function assetUpload(
    file: File,
    axiosInstance: AxiosInstance | undefined,
    uploadConfig: UE_EL_UTIL.UploadConfig,
    param: {
        onProgress?: (progress: string) => void;
    }
) {
    const { fileLimitSize } = uploadConfig;

    return checkFileSize(file, fileLimitSize).then(() => {
        return normalUpload(file, axiosInstance, uploadConfig, param);
    });
}
