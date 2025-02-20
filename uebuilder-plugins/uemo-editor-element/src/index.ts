import type { App } from "vue";

// 组件
import { components } from "./component";
import { plugins } from "./plugin";

export default {
    install: (app: App, options: { plugin: Record<string, any> }) => {
        components.forEach((component) => {
            app.component(component.name, component);
        });

        Object.entries(plugins).forEach(([key, install]) => {
            install(app, options.plugin[key]);
        });
    },
};
