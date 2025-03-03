import type { Props } from "@stone/uemo-editor-utils/lib/tippy";
import type { TOAST_OPTIONS } from "~/packages/toast-plugin";

declare global {
    namespace UE_EL_UTIL {
        /**
         * @description 输入框校验参数
         */
        type InputRule = { pattern?: RegExp; message?: string } | ((value: string) => boolean | string);

        /**
         * @description 提示框参数
         */
        type LabelOption = Partial<Props> | string | undefined;

        /**
         * @description 选择器选项
         */
        type SelectOption = {
            icon?: string;
            label?: string;
            text: string;
            value: string | number;
            [param: string]: any;
        };

        /**
         * @description 选择器参数
         */
        type SelectValue = number | string | undefined;

        /**
         * @description 开关参数
         */
        type OnOffValue = boolean | string | number;

        /**
         * @description 对齐参数
         */
        type ALIGN_X = `${"left" | "center" | "right"}`;
        type ALIGN_Y = `${"top" | "center" | "bottom"}`;
        type ALIGN = `${ALIGN_X} ${ALIGN_Y}` | ALIGN_X | ALIGN_Y;

        /**
         * @description 数字输入框参数
         */
        type NumInputLimit = number[] | Record<string, number[]>;
        type NumInputUnit = { value: string; text: string; default?: number; step?: number };

        /**
         * @description 拖拽指令参数
         */
        type DraggerDirectiveParam = {
            onStart?: () => void;
            onChange: (moveX: number) => void;
        };

        /**
         * @description 输入框内边距大小
         */
        type InputPaddingSize = "level1" | "level2" | "level3" | "level4";

        /**
         * @description 图标参数
         */
        type IconParam = string | { name: string; size?: number };

        /**
         * @description 颜色类型
         */
        type ColorType = "color" | "linearGradient" | "radialGradient";

        /**
         * @description 边框参数
         */
        type BorderValue = { width: string; color: string; style: string };

        /**
         * @description 上传配置旧版
         */
        type UploadConfigOld = {
            uploadPath: string;
            uploadName: string;
            publicPath: string;
            resourceLink: string;
            uploadFileSize: number;
            withCredentials?: boolean;
            useFullLink?: boolean;
            uploadData?: Record<string, string>;
            imageUploadSize: number;
            imageDataPath: string;

            qiniu?: QiniuUploadConfig | false;
            video?: VideoUploadConfig | false;
            history?: UploadHistoryConfig | false;
        };

        /**
         * @description 上传配置
         */
        type UploadConfig = {
            uploadPath: string;
            uploadName: string;
            publicPath: string;
            resourceLink: string;
            fileLimitSize: number;
            withCredentials?: boolean;
            useFullLink?: boolean;
            uploadData?: Record<string, string>;
            uploadFileQueryPath: string;

            image?: ImageUploadConfig | false;
            qiniu?: QiniuUploadConfig | false;
            video?: VideoUploadConfig | false;
            history?: UploadHistoryConfig | false;
        };

        /**
         * @description 七牛上传配置
         */
        type QiniuUploadConfig = {
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
        };

        /**
         * @description 视频上传配置
         */
        type VideoUploadConfig = {
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

        /**
         * @description 图片上传配置
         */
        type ImageUploadConfig = {
            // 是否允许上传视频，默认：true
            allow: boolean;
            // 上传文件大小限制，默认：2048
            limitSize?: number;
            errorMsg?: {
                // 未开通时的提示信息，默认："未开通图片上传功能，请联系客服询问详情",
                notAllow?: string;
            };
        };

        /**
         * @description 上传历史记录配置
         */
        type UploadHistoryConfig = { type: "MO005" } | { type: "custom"; url: "" };

        /**
         * @description 上传拦截器
         */
        type UploadIntercept = (file: File) => Promise<{ file: File }>;

        /**
         * 上传处理程序
         */
        export type UploadHandler = (config: { uploadConfig?: UploadConfig | UploadConfigOld }) => {
            config?: UploadConfig | UploadConfigOld;
            fire: (
                file: File,
                param: {
                    uploadProgress?: (progress: string) => void;
                    onError: (param: { code: string; msg: string }) => void;
                }
            ) => Promise<string>;
        };
    }

    namespace UE_PLUGIN_OPTIONS {
        type Toast = TOAST_OPTIONS;
        type FileUpload = { uploadHandler: UE_EL_UTIL.UploadHandler };
    }
}

export {};
