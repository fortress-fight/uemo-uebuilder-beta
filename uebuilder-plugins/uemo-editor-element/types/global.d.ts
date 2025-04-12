import type { ResourceSpline as ResourceSplineType } from "@stone/uemo-editor-assets/resource/spline";
import type { ResourceLottie as ResourceLottieType } from "@stone/uemo-editor-assets/resource/lottie";
import type {
    ResourceIcon as ResourceIconType,
    ResourceIconItem as ResourceIconItemType,
} from "@stone/uemo-editor-assets/resource/icon";
import type { ResourceShape as ResourceShapeType } from "@stone/uemo-editor-assets/resource/shape";
import type { ResourceShareIcon as ResourceShareIconType } from "@stone/uemo-editor-assets/resource/share-icon";
import type { ResourceVideo as ResourceVideoType } from "@stone/uemo-editor-assets/resource/video";
import type { ResourceImage as ResourceImageType } from "@stone/uemo-editor-assets/resource/image";
import type {
    ResourceFontFamily as ResourceFontFamilyType,
    ResourceFontFamilyItem as ResourceFontFamilyItemType,
} from "@stone/uemo-editor-assets/resource/font-family";
import type {
    ResourceButton as ResourceButtonType,
    ResourceButtonItem as ResourceButtonItemType,
} from "@stone/uemo-editor-assets/resource/button";

import type { AxiosInstance } from "@stone/uemo-editor-utils/lib/axios";
import type { Props } from "@stone/uemo-editor-utils/lib/tippy";
import type { TOAST_OPTIONS } from "../packages/toast-plugin";
import type { UeElError as UeError } from "../utils/error";
import type { UE_AI_CONFIG } from "../packages/ai-plugin";
import type { UE_EL_BACKGROUND_PARAM_MAP } from "../packages/background-setting-group";

declare global {
    namespace UE_EL {
        type Config = {
            backgroundSetting: {
                defaultImageData: UE_EL_BACKGROUND_PARAM_MAP["image"];
                defaultSvgData: UE_EL_BACKGROUND_PARAM_MAP["svg"];
                defaultVideoData: UE_EL_BACKGROUND_PARAM_MAP["video"];
                defaultSplineData: UE_EL_BACKGROUND_PARAM_MAP["spline"];
            };
        };
    }
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
        type UploadConfigOld = (
            | {
                  uploadFileSize: number;
                  imageUploadSize: number;
                  imageDataPath: string;
              }
            | { fileLimitSize: number; uploadFileQueryPath: string; image?: ImageUploadConfig | false }
        ) & {
            uploadPath: string;
            uploadName: string;
            publicPath: string;
            resourceLink: string;
            withCredentials?: boolean;
            useFullLink?: boolean;
            uploadData?: Record<string, string>;

            qiniu?: QiniuUploadConfig | false;
            video?: VideoUploadConfig | false;
            history?: UploadHistoryConfig | false;
            asset?: AssetUploadConfig | false;
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
            qiniu: QiniuUploadConfig | false;
            history: UploadHistoryConfig | false;

            image: ImageUploadConfig | false;
            video: VideoUploadConfig | false;
            asset: AssetUploadConfig | false;
        };

        /**
         * @description 文件上传配置
         */
        interface FileUploadConfig {
            // 是否允许上传视频，默认：false
            allow: boolean;
            // 上传文件大小限制，默认：2048
            limitSize?: number;
            useQiniu?: boolean;
            errorMsg?: {
                // 未开通时的提示信息，默认："未开通视频上传功能，请联系客服询问详情",
                notAllow?: string;
            };
        }

        type VideoUploadConfig = FileUploadConfig;
        type ImageUploadConfig = FileUploadConfig;

        // 大文件上传
        type AssetUploadConfig = FileUploadConfig;

        /**
         * @description 七牛上传配置
         */
        type QiniuUploadConfig =
            | { allow: false }
            | {
                  // 是否允许上传视频，默认：false
                  allow: true;
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
         * @description 上传历史记录配置
         */
        type UploadHistoryConfig = { type: "MO005" } | { type: "custom"; url: string };

        /**
         * @description 上传拦截器
         */
        type UploadIntercept = (file: File) => Promise<{ file: File }>;

        /**
         * 上传处理程序
         */
        export type UploadHandler = (config: { uploadConfig?: UploadConfig }) => {
            config?: UploadConfig;
            fire: (
                file: File,
                param: {
                    uploadProgress?: (progress: string) => void;
                }
            ) => Promise<string>;
        };

        /**
         * @description 上传历史记录处理程序
         */
        export type UploadHistoryHandler = {
            config: UploadHistoryConfig;
            getUploadFileData: (query: UploadHistoryQueryParams) => Promise<UploadHistoryResponse>;
        };

        /**
         * @description 上传历史记录文件数据
         */
        export interface UploadHistoryFileData {
            id: string;
            filename: string;
            url: string;
            size: string;
            type: string;
            post_date: string;
        }

        /**
         * @description 上传历史记录响应
         */
        export type UploadHistoryResponse = {
            code: number;
            data:
                | {
                      limit: number;
                      page: number;
                      total: number;
                      list: UploadHistoryFileData[];
                  }
                | {
                      // NOTE 用于兼容 uemo 上传历史记录， uemo 接口缺少 total 信息
                      limit: number;
                      page: number;
                      list: UploadHistoryFileData[];
                      next: { url: string; title: string };
                  };
        };

        /**
         * @description 上传历史记录查询参数
         */
        export type UploadHistoryQueryParams = { page?: string; limit?: number; type?: string; filename?: string };

        /**
         * @description 错误类型
         */
        type UeElError = UeError;

        /**
         * @description 图形资源列表
         */
        type ResourceShape = ResourceShapeType;

        /**
         * @description Spline 资源列表
         */
        type ResourceSpline = ResourceSplineType;

        /**
         * @description Lottie 资源列表
         */
        type ResourceLottie = ResourceLottieType;

        /**
         * @description Icon 资源列表
         */
        type ResourceIcon = ResourceIconType;
        type ResourceIconItem = ResourceIconItemType;
        type ResourceIconAttrs = { name: string; source: string };

        /**
         * @description Video 资源列表
         */
        type ResourceVideo = ResourceVideoType;

        /**
         * @description Image 资源列表
         */
        type ResourceImage = ResourceImageType;

        /**
         * @description 社交分享资源列表
         */
        type ResourceShareIcon = ResourceShareIconType;

        /**
         * @description 字体资源列表
         */
        type ResourceFontFamily = ResourceFontFamilyType;
        type ResourceFontFamilyItem = ResourceFontFamilyItemType;

        /**
         * @description 按钮资源列表
         */
        type ResourceButton = ResourceButtonType;
        type ResourceButtonItem = ResourceButtonItemType;

        /**
         * @description SVG 文件上传信息
         */
        type ResourceSvgAttrs = { source: string; data?: SvgFileUploadData };

        /**
         * @description 文件上传信息
         */
        type FileUploadInfo = { url: string; data: SvgFileUploadData };
        type SvgFileUploadData = { w: number; h: number };

        /**
         * @description Lottie 库类型
         */
        type LottieLibraryType = "icon" | "normal";
    }

    namespace UE_PLUGIN_OPTIONS {
        type Toast = TOAST_OPTIONS;
        type FileUpload = {
            uploadConfig: UE_EL_UTIL.UploadConfig | UE_EL_UTIL.UploadConfigOld;
            uploadHandler?: (
                axiosInstance?: AxiosInstance,
                defaultUploadConfig?: UE_EL_UTIL.UploadConfig
            ) => UE_EL_UTIL.UploadHandler;
        };

        type AI = UE_AI_CONFIG;

        type ResourceValue<T> = { enable: boolean; getData: () => Promise<T> };
        type Resource = {
            shapeLibrary: ResourceValue<UE_EL_UTIL.ResourceShape>;
            splineLibrary: ResourceValue<UE_EL_UTIL.ResourceSpline>;
            lottieLibrary: ResourceValue<UE_EL_UTIL.ResourceLottie>;
            iconLibrary: ResourceValue<UE_EL_UTIL.ResourceIcon>;
            videoLibrary: ResourceValue<UE_EL_UTIL.ResourceVideo>;
            imageLibrary: ResourceValue<UE_EL_UTIL.ResourceImage>;
            shareIconLibrary: ResourceValue<UE_EL_UTIL.ResourceShareIcon>;
            fontFamilyLibrary: ResourceValue<UE_EL_UTIL.ResourceFontFamily> & {
                getUsedFontFamily?: () => Promise<{ name: string; src: string }[]>;
            };
            buttonLibrary: ResourceValue<UE_EL_UTIL.ResourceButton>;
        };

        type LinkAnchor = { name: string; src: string };
        type Link = {
            anchor: {
                enable: boolean;
                getData: () => Promise<LinkAnchor[]>;
            };
        };
    }
}

export {};
