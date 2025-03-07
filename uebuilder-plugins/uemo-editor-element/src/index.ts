import type { App } from "vue";

import { components } from "./component";
import { plugins } from "./plugin";
import { directive } from "./directive";
import { i18n } from "./i18n";

export interface UE_EL_OPTIONS {
    plugin: {
        resource: UE_PLUGIN_OPTIONS.Resource;
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
