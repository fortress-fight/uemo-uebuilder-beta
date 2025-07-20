/// <reference types="@stone/uemo-editor-type" />
/// <reference types="@stone/uemo-editor-tiptap" />
/// <reference types="./global.d.ts" />
/// <reference types="./component.d.ts" />
/// <reference types="./directive.d.ts" />
/// <reference types="./plugin.d.ts" />

import type { App } from "vue";

export interface UE_EL_OPTIONS {
    config: UE_EL.Config;
    plugin: {
        resource: UE_PLUGIN_OPTIONS.Resource;
        fileUpload: UE_PLUGIN_OPTIONS.FileUpload;
        toast?: UE_PLUGIN_OPTIONS.Toast;
        ai?: UE_PLUGIN_OPTIONS.AI;
        link?: UE_PLUGIN_OPTIONS.Link;

        [key: string]: any;
    };
}

declare const install: (
    app: App,
    options: UE_EL_OPTIONS
) => {
    updateFileUploadPlugin: (config: UE_PLUGIN_OPTIONS.FileUpload) => void;
};

export default install;
