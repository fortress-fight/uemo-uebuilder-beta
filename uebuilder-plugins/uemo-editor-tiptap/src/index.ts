import type { App } from "vue";

import { components } from "./component";

export default {
    install: (app: App) => {
        components.forEach((component) => {
            if (!component.name) return;
            app.component(component.name, component);
        });
    },
};
