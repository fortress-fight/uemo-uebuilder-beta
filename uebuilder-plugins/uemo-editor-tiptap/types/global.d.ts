declare global {
    namespace UE_TIPTAP_UNIT {
        type DEVICE = "pc" | "mobile";

        type FONT_SCALE_HANDLE = (type: "set" | "get", fontSize?: string, scale?: number) => void;
    }
}

export {};
