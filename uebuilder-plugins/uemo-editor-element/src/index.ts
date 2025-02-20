import type { App } from "vue";

// 组件
import { components } from "./component";
import { plugins } from "./plugin";
import { directive } from "./directive";

export default {
    install: (app: App, options: { plugin: Record<string, any> }) => {
        components.forEach((component) => {
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
