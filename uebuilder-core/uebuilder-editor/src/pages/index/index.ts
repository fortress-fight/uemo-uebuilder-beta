/*
 * @Description: UEBuilder 编辑层 -- 实时预览页面
 * @Author: F-Stone
 * @LastEditTime: 2025-09-14 00:38:46
 */
window.name = "UEBUILDER_EDITOR_INDEX";

export abstract class UebuilderEditorIndex {
    constructor(
        public dom: HTMLElement,
        public option: UE_BUILDER_EDITOR_INDEX.Config
    ) {
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
