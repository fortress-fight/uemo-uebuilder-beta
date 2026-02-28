import type { ToastInterface } from "@stone/uemo-editor-utils/lib/vue-toastification";
import type { UE_AI_CONFIG, UE_AI_PLUGIN } from "@stone/uemo-editor-element/packages/ai-plugin";
import type { useElDialog } from "@stone/uemo-editor-element/packages/pop-panel/utils/mixin";

declare module "vue" {
    interface ComponentCustomProperties {
        // 全局配置
        $ueElGlobalConfig: UE_EL.Config;

        // 全局 toast 实例
        $ueElToast: ToastInterface;

        // 资源
        $ueElResource: UE_PLUGIN_OPTIONS.Resource;

        // AI
        $ueElAI?: UE_AI_CONFIG;

        // 图片 AI
        $ueElImageAI?: UE_AI_PLUGIN | false | undefined;

        // 文本 AI
        $ueElTextAI?: (type: string) => UE_AI_PLUGIN | false | undefined;

        // 链接
        $ueElLink?: UE_PLUGIN_OPTIONS.Link;

        // 文件上传
        $ueFileUploadHistory?: UE_EL_UTIL.UploadHistoryHandler;

        // 文件上传
        $ueFileUpload: UE_EL_UTIL.UploadHandler;

        // 错误
        $ueElError: <T = undefined>(error: Error, callback?: (error: Error) => T) => T;

        // 弹窗
        $ueElDialog: typeof useElDialog;
    }
}

export {};
