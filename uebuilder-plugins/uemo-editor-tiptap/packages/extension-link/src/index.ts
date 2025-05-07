export type LinkAttrs =
    | {
          type: "link";
          link: string;
          target: "_blank" | "_self";
          triggerArea?: string;
      }
    | {
          type: "function";
          link: string;
          detail: "anchor" | "download";
          triggerArea?: string;
      }
    | {
          type: "frame";
          link: string;
          triggerArea?: string;
          popLayer?: {
              width?: string;
          };
      };

export * from "./link";
