import { install as ToastInstall } from "~/packages/toast-plugin";
import { install as FileUploadInstall } from "~/packages/file-upload-plugin";
import { install as ErrorInstall } from "~/packages/error-plugin";

export const plugins = { toast: ToastInstall, fileUpload: FileUploadInstall, error: ErrorInstall };
