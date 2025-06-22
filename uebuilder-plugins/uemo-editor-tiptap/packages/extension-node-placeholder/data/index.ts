import { operMap } from "../../../utils/tiptap-oper-manage";

export type TYPE_NODE_PLACEHOLDER = keyof typeof placeholderMap;

export const placeholderMap = {
    TextPlaceholder: {
        title: operMap.insertText.tip,
        icon: operMap.insertText.icon,
    },
    ButtonPlaceholder: {
        title: operMap.insertButton.tip,
        icon: operMap.insertButton.icon,
    },
    GridPlaceholder: {
        title: operMap.insertGridGroup.tip,
        icon: operMap.insertGridGroup.icon,
    },
    SplinePlaceholder: {
        title: operMap.insertSpline.tip,
        icon: operMap.insertSpline.icon,
    },
    LottiePlaceholder: {
        title: operMap.insertLottie.tip,
        icon: operMap.insertLottie.icon,
    },
    SvgViewerPlaceholder: {
        title: operMap.insertSvgViewer.tip,
        icon: operMap.insertSvgViewer.icon,
    },
    SvgIconPlaceholder: {
        title: operMap.insertSvgIcon.tip,
        icon: operMap.insertSvgIcon.icon,
    },
    TablePlaceholder: {
        title: operMap.inertTable.tip,
        icon: operMap.inertTable.icon,
    },
    VideoPlaceholder: {
        title: operMap.insertVideoFrame.tip,
        icon: operMap.insertVideoFrame.icon,
    },
    WebPlaceholder: {
        title: operMap.insertWebFrame.tip,
        icon: operMap.insertWebFrame.icon,
    },
    MapPlaceholder: {
        title: operMap.insertMapFrame.tip,
        icon: operMap.insertMapFrame.icon,
    },
    ImagePlaceholder: {
        title: operMap.insertImage.tip,
        icon: operMap.insertImage.icon,
    },
    GridGroupPlaceholder: {
        title: operMap.insertGridGroup.tip,
        icon: operMap.insertGridGroup.icon,
    },
} as const;
