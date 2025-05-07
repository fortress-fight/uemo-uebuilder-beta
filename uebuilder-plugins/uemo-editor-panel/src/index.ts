import type { App } from "vue";

import { components } from "./component";
import { i18n } from "./i18n";

export default {
    install: (app: App) => {
        if (!app.config.globalProperties.$i18n) {
            app.use(i18n);
        }

        components.forEach((component) => {
            if (!component.name) return;
            app.component(component.name, component);
        });

        return {
            //
        };
    },
};
