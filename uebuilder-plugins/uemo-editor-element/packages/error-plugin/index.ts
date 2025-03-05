import type { App } from "vue";
import type { ErrorLevel } from "@stone/uemo-editor-utils/lib/error";

import { UeError } from "@stone/uemo-editor-utils/lib/error";

export function install(app: App) {
    app.config.globalProperties.$ueElError = <T = undefined>(error: Error, callback?: (error: Error) => T): T => {
        if (!(error instanceof UeError)) {
            console.error(error instanceof Error ? error : new Error(String(error)));
            return callback?.(error) as T;
        }

        switch (error.code.toString().split(":")[0] as ErrorLevel) {
            case "WARNING":
                console.warn(error);
                app.config.globalProperties.$ueElToast.warning(error.message);
                break;

            case "ERROR":
                console.error(error);
                app.config.globalProperties.$ueElToast.error(error.message);
                break;

            default:
                console.error("Unhandled error code:", error.code);
                app.config.globalProperties.$ueElToast.error(`Unknown error: ${error.message}`);
                break;
        }
        return callback?.(error) as T;
    };
}
