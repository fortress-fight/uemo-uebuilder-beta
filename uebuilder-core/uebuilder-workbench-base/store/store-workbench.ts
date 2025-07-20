import { defineStore } from "@stone/uemo-editor-utils/lib/pinia";

export type UeBuilderWorkbenchStoreState = {
    /**
     * 工作台状态
     */
    workbenchState: UE_BUILDER.State;

    /**
     * 当前编辑页面数据
     */
    currentEditorPageData: {
        title?: string;
        data: string;
    };

    /**
     * 当前预览页面数据
     */
    currentPreviewPageData: {
        title?: string;
        data: string;
    };
};

export const useUeBuilderWorkbenchStore = defineStore("uebuilderWorkbench", {
    state: (): UeBuilderWorkbenchStoreState => ({
        workbenchState: "initial",
        currentEditorPageData: { data: "" },
        currentPreviewPageData: { data: "" },
    }),
    actions: {
        /**
         * 设置工作台状态
         *
         * @param {UeBuilderWorkbenchStoreState["workbenchState"]} workbenchState
         */
        setWorkbenchState(workbenchState: UeBuilderWorkbenchStoreState["workbenchState"]) {
            this.workbenchState = workbenchState;
        },

        /**
         * 设置当前编辑页面数据
         *
         * @param {UeBuilderWorkbenchStoreState["currentEditorPageData"]} currentEditorPageData
         */
        setCurrentEditorPageData(currentEditorPageData: UeBuilderWorkbenchStoreState["currentEditorPageData"]) {
            this.currentEditorPageData = currentEditorPageData;
        },

        /**
         * 设置当前预览页面数据
         *
         * @param {UeBuilderWorkbenchStoreState["currentPreviewPageData"]} currentPreviewPageData
         */
        setCurrentPreviewPageData(currentPreviewPageData: UeBuilderWorkbenchStoreState["currentPreviewPageData"]) {
            this.currentPreviewPageData = currentPreviewPageData;
        },
    },
});
