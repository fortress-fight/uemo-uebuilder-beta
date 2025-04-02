declare global {
    namespace UE_TIPTAP_UNIT {
        type Device = "pc" | "mobile";

        type FontScaleHandle = (type: "set" | "get", fontSize?: string, scale?: number) => void;
    }
}

export {};
