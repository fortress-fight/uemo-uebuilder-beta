import type { Directive } from "vue";

declare module "vue" {
    export interface ComponentCustomProperties {
        vUeElLabel: Directive<HTMLElement, UE_EL_UTIL.LabelOption | UE_EL_UTIL.LabelOption[]>;
        vUeElDragging: Directive<HTMLElement, UE_EL_UTIL.DraggerDirectiveParam>;
        vUeElDragger: Directive<HTMLElement, boolean>;
    }
}
