import { install as ToastInstall } from "~/packages/toast-plugin";
import { install as FileUploadInstall } from "~/packages/file-upload-plugin";
import { install as ErrorInstall } from "~/packages/error-plugin";
import { install as ResourceInstall } from "~/packages/resource-plugin";
import { install as AiPluginInstall } from "~/packages/ai-plugin";
import { install as LinkPluginInstall } from "~/packages/link-plugin";

export const plugins = {
    toast: ToastInstall,
    fileUpload: FileUploadInstall,
    error: ErrorInstall,
    resource: ResourceInstall,
    ai: AiPluginInstall,
    link: LinkPluginInstall,
};
