export type ResourceLottieItem = { url: string; poster?: string; name?: string };

export type ResourceLottie = Record<
    string,
    { size: "small" | "normal"; default: ResourceLottieItem; list: ResourceLottieItem[] }
>;

const lottieLib: ResourceLottie = {
    figure: {
        size: "normal",
        default: {
            poster: "https://static.jsmo.xin/uebuilder/public-resource/spline/spline-1.png",
            url: "https://static.jsmo.xin/uebuilder/public-resource/lottie/animation-inline-image.lottie",
        },
        list: [
            {
                poster: "https://static.jsmo.xin/uebuilder/public-resource/lottie/lottiefiles001.png",
                url: "https://static.jsmo.xin/uebuilder/public-resource/lottie/lottiefiles001.lottie",
            },
            {
                poster: "https://static.jsmo.xin/uebuilder/public-resource/lottie/lottiefiles002.png",
                url: "https://static.jsmo.xin/uebuilder/public-resource/lottie/lottiefiles002.lottie",
            },
            {
                poster: "https://static.jsmo.xin/uebuilder/public-resource/lottie/lottiefiles003.png",
                url: "https://static.jsmo.xin/uebuilder/public-resource/lottie/lottiefiles003.lottie",
            },
            {
                poster: "https://static.jsmo.xin/uebuilder/public-resource/lottie/lottiefiles004.png",
                url: "https://static.jsmo.xin/uebuilder/public-resource/lottie/lottiefiles004.lottie",
            },
            {
                poster: "https://static.jsmo.xin/uebuilder/public-resource/lottie/lottiefiles005.png",
                url: "https://static.jsmo.xin/uebuilder/public-resource/lottie/lottiefiles005.lottie",
            },
            {
                poster: "https://static.jsmo.xin/uebuilder/public-resource/lottie/lottiefiles006.png",
                url: "https://static.jsmo.xin/uebuilder/public-resource/lottie/lottiefiles006.lottie",
            },
            {
                poster: "https://static.jsmo.xin/uebuilder/public-resource/lottie/lottiefiles007.png",
                url: "https://static.jsmo.xin/uebuilder/public-resource/lottie/lottiefiles007.lottie",
            },
            {
                poster: "https://static.jsmo.xin/uebuilder/public-resource/lottie/lottiefiles008.png",
                url: "https://static.jsmo.xin/uebuilder/public-resource/lottie/lottiefiles008.lottie",
            },
        ],
    },
    icon: {
        size: "small",
        default: {
            url: "https://static.jsmo.xin/uebuilder/public-resource/lottie-icon/system-regular-161-trending-flat.lottie",
            name: "system-regular-161-trending-flat",
        },
        list: [
            {
                url: "https://static.jsmo.xin/uebuilder/public-resource/lottie-icon/system-regular-10-analytics.lottie",
                name: "system-regular-10-analytics",
            },
            {
                url: "https://static.jsmo.xin/uebuilder/public-resource/lottie-icon/system-regular-12-arrow-down.lottie",
                name: "system-regular-12-arrow-down",
            },
            {
                url: "https://static.jsmo.xin/uebuilder/public-resource/lottie-icon/system-regular-26-play.lottie",
                name: "system-regular-26-play",
            },
            {
                url: "https://static.jsmo.xin/uebuilder/public-resource/lottie-icon/system-regular-32-videocam.lottie",
                name: "system-regular-32-videocam",
            },
            {
                url: "https://static.jsmo.xin/uebuilder/public-resource/lottie-icon/system-regular-41-home.lottie",
                name: "system-regular-41-home",
            },
            {
                url: "https://static.jsmo.xin/uebuilder/public-resource/lottie-icon/system-regular-47-chat.lottie",
                name: "system-regular-47-chat",
            },
            {
                url: "https://static.jsmo.xin/uebuilder/public-resource/lottie-icon/system-regular-69-document-scan.lottie",
                name: "system-regular-69-document-scan",
            },
            {
                url: "https://static.jsmo.xin/uebuilder/public-resource/lottie-icon/system-regular-72-photo.lottie",
                name: "system-regular-72-photo",
            },
            {
                url: "https://static.jsmo.xin/uebuilder/public-resource/lottie-icon/system-regular-75-attachment.lottie",
                name: "system-regular-75-attachment",
            },
            {
                url: "https://static.jsmo.xin/uebuilder/public-resource/lottie-icon/system-regular-81-download-save.lottie",
                name: "system-regular-81-download-save",
            },
            {
                url: "https://static.jsmo.xin/uebuilder/public-resource/lottie-icon/system-regular-89-location.lottie",
                name: "system-regular-89-location",
            },
            {
                url: "https://static.jsmo.xin/uebuilder/public-resource/lottie-icon/system-regular-105-smartphone.lottie",
                name: "system-regular-105-smartphone",
            },
            {
                url: "https://static.jsmo.xin/uebuilder/public-resource/lottie-icon/system-regular-122-launch.lottie",
                name: "system-regular-122-launch",
            },
            {
                url: "https://static.jsmo.xin/uebuilder/public-resource/lottie-icon/system-regular-123-camera.lottie",
                name: "system-regular-123-camera",
            },
            {
                url: "https://static.jsmo.xin/uebuilder/public-resource/lottie-icon/system-regular-129-cloud-download.lottie",
                name: "system-regular-129-cloud-download",
            },
            {
                url: "https://static.jsmo.xin/uebuilder/public-resource/lottie-icon/system-regular-106-headphones.lottie",
                name: "system-regular-106-headphones",
            },
            {
                url: "https://static.jsmo.xin/uebuilder/public-resource/lottie-icon/system-regular-116-qr-code-scan.lottie",
                name: "system-regular-116-qr-code-scan",
            },
            {
                url: "https://static.jsmo.xin/uebuilder/public-resource/lottie-icon/system-regular-126-verified.lottie",
                name: "system-regular-126-verified",
            },
            {
                url: "https://static.jsmo.xin/uebuilder/public-resource/lottie-icon/system-regular-134-celebration.lottie",
                name: "system-regular-134-celebration",
            },
            {
                url: "https://static.jsmo.xin/uebuilder/public-resource/lottie-icon/system-regular-160-trending-up.lottie",
                name: "system-regular-160-trending-up",
            },
            {
                url: "https://static.jsmo.xin/uebuilder/public-resource/lottie-icon/system-regular-161-trending-flat.lottie",
                name: "system-regular-161-trending-flat",
            },
        ],
    },
};

export default lottieLib;
