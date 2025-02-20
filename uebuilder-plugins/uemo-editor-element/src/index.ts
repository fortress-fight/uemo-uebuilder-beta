import type { App } from "vue";

// 组件
import { plugins } from "./plugin";

export default {
    install: (app: App, options: { plugin: Record<string, any> }) => {
        Object.entries(plugins).forEach(([key, install]) => {
            install(app, options.plugin[key]);
        });
    },
};
