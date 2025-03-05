import type { ToastInterface } from "@stone/uemo-editor-utils/lib/vue-toastification";

declare module "vue" {
    interface ComponentCustomProperties {
        $ueElToast: ToastInterface;
        $ueFileUpload: UE_EL_UTIL.UploadHandler;
        $ueElError: <T = undefined>(error: Error, callback?: (error: Error) => T) => T;
    }
}

export {};
