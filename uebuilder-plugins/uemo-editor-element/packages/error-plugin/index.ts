import type { App } from "vue";
import type { ErrorLevel } from "@stone/uemo-editor-utils/lib/error";

import { UeError } from "@stone/uemo-editor-utils/lib/error";
import { i18n } from "../../src/i18n";

export function install(app: App) {
    app.config.globalProperties.$ueElError = <T = undefined>(error: Error, callback?: (error: Error) => T): T => {
        if (!error) {
            return callback?.(error) as T;
        }
        if (!(error instanceof UeError)) {
            if (error instanceof Error) {
                console.error(error);
                app.config.globalProperties.$ueElToast.error(error.message);
            } else if (typeof error === "string") {
                console.error(new Error(error));
                app.config.globalProperties.$ueElToast.error(error);
            } else {
                console.error(new Error(String(error)));
                app.config.globalProperties.$ueElToast.error(i18n.global.t("UNIT_UNKNOWN_ERROR"));
            }
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
