import type { App } from "vue";

export function install(app: App, param: UE_PLUGIN_OPTIONS.Link) {
    app.config.globalProperties.$ueElLink = param;
}
