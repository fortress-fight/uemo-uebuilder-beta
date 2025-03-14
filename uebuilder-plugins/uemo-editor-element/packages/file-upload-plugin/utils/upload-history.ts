import type { AxiosInstance } from "@stone/uemo-editor-utils/lib/axios";

import { axios } from "@stone/uemo-editor-utils/lib/axios";
import { i18n } from "@/i18n";

import { uemoUploadHistory } from "./uemo-upload-history";

const { t } = i18n.global;

/**
 * 查询参数
 */

function customUploadHistory(
    axiosInstance: AxiosInstance,
    config: { url: string; query: UE_EL_UTIL.UploadHistoryQueryParams }
): Promise<UE_EL_UTIL.UploadHistoryResponse> {
    const { url, query } = config;

    return axiosInstance.get(url, { params: query }).then((res) => {
        return res.data;
    });
}

export function createUploadHistoryHandler(
    axiosInstance: AxiosInstance | undefined,
    config: UE_EL_UTIL.UploadHistoryConfig
): UE_EL_UTIL.UploadHistoryHandler {
    return {
        config: config,
        getUploadFileData: (query: UE_EL_UTIL.UploadHistoryQueryParams): Promise<UE_EL_UTIL.UploadHistoryResponse> => {
            // 创建 axios 实例
            if (config.type === "MO005") {
                return uemoUploadHistory({ query });
            } else if (config.type === "custom") {
                const instance = axiosInstance || axios.create();
                return customUploadHistory(instance, { url: config.url, query });
            }

            return Promise.reject(
                new UeElError(UeElErrorCode.UPLOAD_HISTORY_TYPE_ERROR, {
                    message: t("ERROR_UPLOAD_HISTORY_TYPE_ERROR"),
                })
            );
        },
    };
}
