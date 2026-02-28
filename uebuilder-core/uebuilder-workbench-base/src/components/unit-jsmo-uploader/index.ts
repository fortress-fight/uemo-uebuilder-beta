/*
 * @Description: JSMO 上传组件
 * @Author: F-Stone
 * @LastEditTime: 2025-07-26 17:18:43
 */
import type { App } from "vue";

import UnitJsmoUploader from "./Main.vue";

UnitJsmoUploader.install = (app: App) => {
    if (!UnitJsmoUploader.name) return;
    app.component(UnitJsmoUploader.name, UnitJsmoUploader);
};

export interface UnitJsmoUploaderBaseProps {
    disable?: boolean;
}
export type UnitJsmoUploaderInstance = InstanceType<typeof UnitJsmoUploader>;

export default UnitJsmoUploader;
