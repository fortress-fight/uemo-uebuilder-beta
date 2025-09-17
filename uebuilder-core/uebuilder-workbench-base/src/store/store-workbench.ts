import { defineStore } from "@stone/uemo-editor-utils/lib/pinia";

interface WorkbenchState {
    stage: UE_BUILDER.State;
    mode: unknown;
    device: UE_BUILDER.DeviceType;
}

interface WorkbenchStateEntry extends WorkbenchState {
    stage: "entry";
    mode: "default";
}

interface WorkbenchStateBrowsing extends WorkbenchState {
    stage: "browsing";
    mode: "default";
}

interface WorkbenchStateEditing extends WorkbenchState {
    stage: "editing";
    mode: "default" | "preview" | "replace";
}

interface WorkbenchStatePreview extends WorkbenchState {
    stage: "preview";
    mode: "default";
}

interface WorkbenchStateComposer extends WorkbenchState {
    stage: "composer";
    mode: "default";
}

export type UeBuilderWorkbenchStoreState = {
    workbenchConfig: UE_BUILDER_WORKBENCH.Config;
    /**
     * 工作台状态
     */
    workbenchState:
        | WorkbenchStateEntry
        | WorkbenchStateBrowsing
        | WorkbenchStateEditing
        | WorkbenchStatePreview
        | WorkbenchStateComposer;

    /**
     * 初始页面数据
     */
    entryPageData: {
        title?: string;
        data: string;
    };

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

    /**
     * 加载状态
     */
    pageLoading: false | { type: string };
};

/**
 * 根据 stage 提取对应的 mode 类型
 */
type ExtractModeByStage<S extends WorkbenchState["stage"]> = Extract<
    UeBuilderWorkbenchStoreState["workbenchState"],
    { stage: S }
>["mode"];

export const useUeBuilderWorkbenchStore = defineStore("uebuilderWorkbench", {
    state: (): UeBuilderWorkbenchStoreState => ({
        workbenchConfig: {} as UE_BUILDER_WORKBENCH.Config,
        workbenchState: { stage: "entry", mode: "default", device: "desktop" },

        entryPageData: { data: "" },
        currentEditorPageData: { data: "" },
        currentPreviewPageData: { data: "" },

        pageLoading: false,
    }),
    actions: {
        /**
         * 设置工作台配置
         *
         * @param {UE_BUILDER_WORKBENCH.Config} workbenchConfig
         */
        setWorkbenchConfig(workbenchConfig: UE_BUILDER_WORKBENCH.Config) {
            this.workbenchConfig = workbenchConfig;
        },

        /**
         * 设置工作台状态
         *
         * @param stage - 工作台阶段
         * @param mode - 工作台模式，如果不提供则默认为 "default"
         */
        setWorkbenchState<S extends WorkbenchState["stage"]>(
            stage: S,
            mode?: ExtractModeByStage<S>,
            device?: UE_BUILDER.DeviceType
        ) {
            type StateType = Extract<UeBuilderWorkbenchStoreState["workbenchState"], { stage: S }>;
            this.workbenchState = {
                stage,
                mode: mode ?? "default",
                device: device ?? "desktop",
            } as StateType;
        },

        /**
         * 设置工作台设备
         *
         * @param device - 工作台设备
         */
        setWorkbenchDevice(device: UE_BUILDER.DeviceType) {
            this.workbenchState.device = device;
        },

        /**
         * 设置初始页面数据
         *
         * @param {UeBuilderWorkbenchStoreState["initialPageData"]} initialPageData
         */
        setEntryPageData(entryPageData: UeBuilderWorkbenchStoreState["entryPageData"]) {
            this.entryPageData = entryPageData;
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

        /**
         * 开始页面加载
         *
         * @param {string} type
         * @param {string} parent
         */
        startPageLoading(type: string) {
            this.pageLoading = { type };
        },

        /**
         * 停止页面加载
         */
        stopPageLoading() {
            this.pageLoading = false;
        },
    },
});
