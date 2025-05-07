import { UeError } from "@stone/uemo-editor-utils/lib/error";

export enum UeTipTapErrorCode {
    AI_EDITING_NO_CONFIG_ERROR = "WARNING:AI_EDITING_NO_CONFIG_ERROR",
    AI_EDITING_NO_TEXT_ERROR = "WARNING:AI_EDITING_NO_TEXT_ERROR",
    AI_EDITING_REQUEST_ERROR = "ERROR:AI_EDITING_REQUEST_ERROR",
}

export class UeTipTapError extends UeError<UeTipTapErrorCode> {}
