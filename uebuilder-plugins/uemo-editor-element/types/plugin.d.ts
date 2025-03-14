import type { ToastInterface } from "@stone/uemo-editor-utils/lib/vue-toastification";
import type { UE_AI_CONFIG, UE_AI_PLUGIN } from "@stone/uemo-editor-element/packages/ai-plugin";

declare module "vue" {
    interface ComponentCustomProperties {
        $ueElToast: ToastInterface;
        $ueElResource: UE_PLUGIN_OPTIONS.Resource;
        $ueElAI?: UE_AI_CONFIG;
        $ueElImageAI?: UE_AI_PLUGIN | false | undefined;
        $ueFileUpload: UE_EL_UTIL.UploadHandler;
        $ueFileUploadHistory?: UE_EL_UTIL.UploadHistoryHandler;
        $ueElError: <T = undefined>(error: Error, callback?: (error: Error) => T) => T;
    }
}

export {};
