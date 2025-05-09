/// <reference types="./global.d.ts" />
/// <reference types="./component.d.ts" />

import type { App } from "vue";

export interface UE_EDITOR_PANEL_OPTIONS {
    plugin: Record<string, any>;
}

declare const install: (app: App, options: UE_EDITOR_PANEL_OPTIONS) => void;

export default install;
