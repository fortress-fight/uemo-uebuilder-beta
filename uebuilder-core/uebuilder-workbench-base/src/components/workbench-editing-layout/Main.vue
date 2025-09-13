<!--
 * FILE Workbench 编辑布局容器
 * @Description: Workbench 编辑布局容器
 * @Author: F-Stone
 * @LastEditTime: 2025-09-14 01:30:50
-->
<template>
    <div :class="$style['workbench-editing-layout']" class="grid h-full">
        <WorkbenchEditingLayoutHeadBar>
            <template #siteLogo>
                <slot name="siteLogo"></slot>
            </template>
            <template #siteSaveOper>
                <slot name="siteSaveOper"></slot>
            </template>
        </WorkbenchEditingLayoutHeadBar>
        <div :class="$style['layout-body']" class="grid relative">
            <WorkbenchEditingLayoutSideBar :class="$style['sidebar']">
                <template #helpCenter>
                    <slot name="helpCenter"></slot>
                </template>
            </WorkbenchEditingLayoutSideBar>
            <!-- uebuilder-editor-factory -->
            <iframe ref="editingIframe" :class="$style['frame--uebuilder-editing']" :src="appEditorSrc"></iframe>
            <div v-if="frameMask === 'open'" :class="$style['frame-mask']" @click="frameMaskClickHandler"></div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { useUeBuilderWorkbenchStore } from "../../store/store-workbench";
import { WorkbenchEditorFactoryChannel } from "../../utils/frame-channel";
import { UeBuilderWorkbenchKey } from "../../plugin/injection-key";
import WorkbenchEditingLayoutHeadBar from "./components/HeadBar.vue";
import WorkbenchEditingLayoutSideBar from "./components/SideBar.vue";

defineOptions({ name: "WorkbenchEditingLayout" });

const appEditorSrc = computed(() => `${workbenchStore.workbenchConfig.workbenchPath}uebuilder-editor/factory.html`);

const frameMask = ref<"open" | "close">("close");

const workbench = inject(UeBuilderWorkbenchKey);
const workbenchStore = useUeBuilderWorkbenchStore();
const editingIframe = useTemplateRef("editingIframe");

const workbenchEditorChannel = ref<WorkbenchEditorFactoryChannel | null>(null);
function initialWorkbenchEditingChannel() {
    const remoteWindow = editingIframe.value?.contentWindow;
    if (!remoteWindow) return;

    workbenchEditorChannel.value = WorkbenchEditorFactoryChannel.getInstance(remoteWindow, {
        on: {
            editorFactoryReady: (channel) => {
                channel.remote
                    .then((remote) => {
                        const {
                            version,
                            workbenchUpload: uploadConfig,
                            workbenchResource: resourceConfig,
                        } = toRaw(workbenchStore.workbenchConfig);
                        return remote.launchEditorFactory({ version, uploadConfig, resourceConfig });
                    })
                    .then(() => {
                        workbenchStore.stopPageLoading();
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            },

            changeWorkbenchState: (_channel, state, param?) => {
                // @ts-expect-error
                return workbench!.changeWorkbenchState(state, param);
            },
        },
    });
}

function frameMaskClickHandler() {
    // frameMask.value = "close";
}

onBeforeMount(() => {
    workbenchStore.startPageLoading("editing");
});

onMounted(() => {
    initialWorkbenchEditingChannel();
});

onBeforeUnmount(() => {
    workbenchStore.stopPageLoading();
});
</script>
<style lang="scss" module>
.workbench-editing-layout {
    height: 100%;

    grid-template-rows: 50px 1fr;
    .layout-body {
        height: 100%;

        grid-template-columns: auto 1fr;
    }
    .frame-mask {
        @include ab-cover;
        z-index: var(--z-index--mini);

        background-color: transparent;
    }
    .sidebar {
        position: relative;
        z-index: calc(var(--z-index--mini) + 10);

        height: 100%;
    }
}
</style>
