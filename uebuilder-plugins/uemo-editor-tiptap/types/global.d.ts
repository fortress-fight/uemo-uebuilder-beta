import type { UeTiptapOperItem } from "../utils/tiptap-oper-manage";

declare global {
    namespace UE_TIPTAP_UNIT {
        type Device = "pc" | "mobile";

        type FontScaleHandle = (type: "set" | "get", fontSize?: string, scale?: number) => void;

        type OperItem = UeTiptapOperItem;

        type PositionRect = {
            width: number;
            height: number;
            x: number;
            y: number;
            left: number;
            right: number;
            top: number;
            bottom: number;
        };
    }
}

export {};
