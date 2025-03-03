import type { App } from "vue";

import { createI18n } from "vue-i18n";

import { components } from "./component";
import { plugins } from "./plugin";
import { directive } from "./directive";
import i18nZhCn from "~/i18n/zh-cn.json";
import i18nEn from "~/i18n/en.json";

export const i18n = createI18n({
    locale: "zh-cn",
    fallbackLocale: "zh-cn",
    messages: { en: i18nEn, "zh-cn": i18nZhCn },
    // datetimeFormats: {
    //     "zh-cn": {
    //         year: {},
    //         month: { year: "numeric" },
    //         day: { year: "numeric", month: "short" },
    //     },
    //     en: {
    //         year: {},
    //         month: { year: "numeric" },
    //         day: { year: "numeric", month: "short" },
    //     },
    // },
});

export interface UE_EL_OPTIONS {
    plugin: {
        fileUpload: UE_PLUGIN_OPTIONS.FileUpload;
        toast?: UE_PLUGIN_OPTIONS.Toast;
        [key: string]: any;
    };
}

export default {
    install: (app: App, options: UE_EL_OPTIONS) => {
        app.use(i18n);

        components.forEach((component) => {
            if (!component.name) return;
            app.component(component.name, component);
        });

        Object.entries(plugins).forEach(([key, install]) => {
            install(app, options.plugin[key]);
        });

        Object.entries(directive).forEach(([_key, install]) => {
            install(app);
        });

        return {
            updateFileUploadPlugin: (config: UE_PLUGIN_OPTIONS.FileUpload) => {
                plugins.fileUpload(app, config);
            },
        };
    },
};
