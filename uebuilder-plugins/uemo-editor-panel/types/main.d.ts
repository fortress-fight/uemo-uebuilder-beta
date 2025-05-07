/// <reference types="./global.d.ts" />
/// <reference types="./component.d.ts" />
/// <reference types="./plugin.d.ts" />

import type { App } from "vue";

export interface UE_EDITOR_PANEL_OPTIONS {
    config: UE_EDITOR_PANEL.Config;
    plugin: Record<string, any>;
}

declare const install: (app: App, options: UE_EDITOR_PANEL_OPTIONS) => void;

export default install;
