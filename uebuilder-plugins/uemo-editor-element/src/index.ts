import type { App } from "vue";

import { createI18n } from "vue-i18n";

import { components } from "./component";
import { plugins } from "./plugin";
import { directive } from "./directive";
import i18nZhCn from "~/i18n/zh-cn.json";
import i18nEn from "~/i18n/en.json";

export default {
    install: (app: App, options: { plugin: Record<string, any> }) => {
        const i18n = createI18n({
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
    },
};
