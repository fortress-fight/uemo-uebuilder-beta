declare global {
    namespace UE_BUILDER {
        /**
         * initial：初始模式
         * editing：编辑模式
         * preview：预览模式
         * template：模板库模式
         * replace： 替换编辑页面模式
         * building： 极速构建模式
         */
        type State = "editing" | "initial" | "preview" | "template" | "replace" | "building";

        /**
         * 上传配置
         */
        type UploadConfig = {
            uploadPath: string;
            uploadName: string;
            publicPath: string;
            resourceLink: string;
            fileLimitSize: number;
            withCredentials?: boolean;
            useFullLink?: boolean;
            uploadData?: { [key: string]: string };
            uploadFileQueryPath: string;
            history?: { type: "MO005" } | { type: "custom"; url: ""; addResourceLink?: true };

            qiniu?:
                | {
                      withCredentials?: boolean;
                      // acceptType?: "*" | ("mp4" | "image" | "other")[];

                      tokenUrl: string;
                      tokenPath: string;
                      tokenRegionPath: string;
                      tokenFolderPath: string;
                      tokenUrlPrefix?: string;

                      uploadRegion: string;
                      uploadFilePath: string;
                      uploadLimitSize?: number;
                      UploadConfig?: Record<string, any>;
                      uploadCustomVars?: Record<string, string>;
                  }
                | false;

            image?: {
                // 是否允许上传视频，默认：true
                allow: boolean;
                // 上传文件大小限制，默认：2048
                limitSize?: number;
                errorMsg?: {
                    // 未开通时的提示信息，默认："未开通图片上传功能，请联系客服询问详情",
                    notAllow?: string;
                };
            };

            video?: {
                // 是否允许上传视频，默认：false
                allow: boolean;
                // 上传文件大小限制，默认：2048
                limitSize?: number;
                useQiniu?: boolean;
                errorMsg?: {
                    // 未开通时的提示信息，默认："未开通视频上传功能，请联系客服询问详情",
                    notAllow?: string;
                };
            };
        };
    }
}

export {};
