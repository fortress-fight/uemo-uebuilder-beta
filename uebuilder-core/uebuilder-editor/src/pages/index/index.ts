import pk from "~/package.json";

window.name = "UEBUILDER_STARTER";

export const VERSION = "v" + pk.version;
export const pageEditorMap = new Map<string, UEBUILDER_STARTER_BASE>();

export abstract class UEBUILDER_STARTER_BASE {
    constructor(public dom: HTMLElement, public option: UE_BUILDER_STARTER.Config) {
        //
    }

    /**
     * 初始化 app-main 插入 app-main 的 frame
     */
    init() {
        return this;
    }

    /**
     * 销毁 App
     */
    destroy() {
        //
    }
}

export default { UEBUILDER_STARTER: UEBUILDER_STARTER_BASE };
