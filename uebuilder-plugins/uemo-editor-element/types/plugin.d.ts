import type { ToastInterface } from "@stone/uemo-editor-utils/lib/vue-toastification";

declare module "vue" {
    interface ComponentCustomProperties {
        $ueElToast: ToastInterface;
        $ueFileUpload: UE_EL_UTIL.UploadHandler;
    }
}

export {};
