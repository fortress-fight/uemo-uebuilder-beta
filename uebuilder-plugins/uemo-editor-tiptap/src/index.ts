import type { App } from "vue";

import { components } from "./component";
import { i18n } from "./i18n";

export default {
    install: (app: App) => {
        // @ts-expect-error
        if (!app.__VUE_I18N__) {
            app.use(i18n);
        }

        components.forEach((component) => {
            if (!component.name) return;
            app.component(component.name, component);
        });
    },
};
