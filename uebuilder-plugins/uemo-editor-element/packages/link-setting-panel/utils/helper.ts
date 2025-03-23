import { checkSiteLink, isImageReg, isVideoReg, isDownloadFileReg } from "@stone/uemo-editor-utils/lib/utils";
import { i18n } from "@/i18n";

export function checkLink(
    type: "link" | "frame" | "function",
    param: { detail?: "anchor" | "download"; link: string }
): true | string {
    const t = i18n.global.t;

    const link = param.link?.trim();

    if (type === "link") {
        if (!link || !checkSiteLink(link)) {
            return t("LINK_ERROR_TIP_LINK");
        }
    }

    if (type === "frame") {
        const mediaLink = isImageReg.test(link) || isVideoReg.test(link);
        if (!link || (!checkSiteLink(link) && !mediaLink)) {
            return t("LINK_ERROR_TIP_FRAME");
        }
    }

    if (type === "function") {
        const detail = param.detail;
        if (detail === "download") {
            if (!link || !isDownloadFileReg.test(link.toLowerCase())) {
                return t("LINK_ERROR_TIP_FILE");
            }
        }
        if (detail === "anchor") {
            if (!link) {
                return t("LINK_ERROR_TIP_ANCHOR");
            }
        }
    }

    return true;
}
