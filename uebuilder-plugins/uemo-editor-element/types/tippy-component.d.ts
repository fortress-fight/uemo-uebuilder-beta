import type { Tippy } from "vue-tippy";

declare module "vue" {
    export interface GlobalComponents {
        UeElLabel: typeof Tippy;
    }
}
