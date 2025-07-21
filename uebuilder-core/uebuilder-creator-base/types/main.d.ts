/// <reference types="@stone/uebuilder-type" />
/// <reference types="@stone/uemo-editor-type" />
/// <reference types="@stone/uebuilder-workbench-base" />

type TYPE_CUSTOM_MODULE_ATTRS = Record<
    `c-${string}`,
    | { type: "text"; name: string; default?: string }
    | {
          type: "select";
          name: string;
          options: { value: string; text: string }[];
          default?: string;
          button?: { type: "link"; text: string; value: Record<string, string> }[];
      }
>;

declare global {
    namespace UE_BUILDER_CREATOR {
        type InitParams = {
            // 应用名称
            appName: UE_BUILDER.Name;

            // 应用类型
            appType: UE_BUILDER.Type;

            // 应用主路径
            appPath: string;

            // 应用状态
            appState?: UE_BUILDER.State;

            // 应用背景
            appBackground?: string;

            // 应用插件
            appPlugin?: {
                upload: UE_BUILDER.UploadConfig;
                // 用于编辑时插入 js 和 css 内容
                editor?: { name: string; type: "css" | "js"; link: string }[];
            };

            // 数据预处理
            pageDataPreprocessing?: { type: "replaceString"; rule: string; data: string }[];

            // 保存数据预处理
            savePagePreprocessing?: { type: "replaceString"; rule: string; data: string }[];

            // 自定义模块参数
            customModule?: {
                blockModule?: {
                    modules: (
                        | {
                              title: string;
                              type: string;
                              thumbnail: string;
                              enhance?: boolean;
                              description?: string;
                              attrs?: TYPE_CUSTOM_MODULE_ATTRS;
                          }
                        | {
                              title: string;
                              type: string;
                              enhance?: boolean;
                              description?: string;
                              variants: {
                                  id: string;
                                  name: string;
                                  thumbnail: string;
                                  attrs: TYPE_CUSTOM_MODULE_ATTRS;
                              }[];
                          }
                    )[];
                };
            };

            // 获取页面数据
            getPageData?: () => Promise<string>;
        };
    }
}

export {};
