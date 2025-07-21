/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
/**
 * 转换上传配置
 * @param config 旧配置
 * @returns 新配置
 */

/**
 * @description 上传配置旧版
 */
type UploadConfigOld = (
    | {
          uploadFileSize: number;
          imageUploadSize: number;
          imageDataPath: string;
      }
    | { fileLimitSize: number; uploadFileQueryPath: string; image?: UE_EL_UTIL.ImageUploadConfig | false }
) & {
    uploadPath: string;
    uploadName: string;
    publicPath: string;
    resourceLink: string;
    withCredentials?: boolean;
    useFullLink?: boolean;
    uploadData?: Record<string, string>;

    qiniu?: UE_EL_UTIL.QiniuUploadConfig | false;
    video?: UE_EL_UTIL.VideoUploadConfig | false;
    history?: UE_EL_UTIL.UploadHistoryConfig | false;
    asset?: UE_EL_UTIL.AssetUploadConfig | false;
};

/**
 * 转换旧版本的上传配置到新的版本
 *
 * @export
 * @param {UploadConfigOld} config
 * @return {*}  {UE_EL_UTIL.UploadConfig}
 */
export function transferUploadConfig(config: UploadConfigOld): UE_EL_UTIL.UploadConfig {
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
