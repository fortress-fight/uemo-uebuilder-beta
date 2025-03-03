import type { AxiosInstance } from "@stone/uemo-editor-utils/lib/axios";

import { UeError } from "@stone/uemo-editor-utils/lib/error";
import { i18n } from "@/index";

import { normalUpload } from "./normal-upload";
import { checkFileSize } from "./helper";

const { t } = i18n.global;

/**
 * 图片上传
 * @param file 文件
 * @param axiosInstance axios实例
 * @param uploadConfig 上传配置
 * @param param 参数
 */
export function imageUpload(
    file: File,
    axiosInstance: AxiosInstance | undefined,
    uploadConfig: UE_EL_UTIL.UploadConfig,
    param: {
        onProgress?: (progress: string) => void;
    }
) {
    const { image, fileLimitSize } = uploadConfig;

    if (!image || !image.allow) {
        return Promise.reject(new UeError("0", { message: t("FILE_UPLOADER_TIP_NOT_ALLOW_IMAGE") }));
    }

    return checkFileSize(file, image.limitSize || fileLimitSize).then(() => {
        return normalUpload(file, axiosInstance, uploadConfig, param);
    });
}
