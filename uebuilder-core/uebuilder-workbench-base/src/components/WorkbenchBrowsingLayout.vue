<template>
    <div :class="$style['workbench-browsing-layout']" class="grid h-full">
        <div :class="$style['layout-head']" class="grid items-center">
            <div class="state--pos-left justify-self-start h-full flex items-center">
                <slot name="headLeft"></slot>
            </div>
            <div class="state--pos-center justify-self-center h-full flex items-center">
                <slot name="headCenter"></slot>
            </div>
            <div class="state--pos-right justify-self-end h-full flex items-center">
                <slot name="headRight"></slot>
            </div>
        </div>
        <div class="layout-body">
            <iframe
                ref="storehouseIframe"
                :class="$style['frame--uebuilder-storehouse']"
                :src="appStorehouseSrc"
            ></iframe>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { useUeBuilderWorkbenchStore } from "../store/store-workbench";
import { WorkbenchStorehouseChannel } from "../utils/frame-channel";

const workbenchStore = useUeBuilderWorkbenchStore();
const storehouseIframe = useTemplateRef("storehouseIframe");

const appStorehouseSrc = computed(() => `${workbenchStore.workbenchConfig.workbenchPath}uebuilder-storehouse/`);

let workbenchStorehouseChannel: WorkbenchStorehouseChannel | null = null;
function initialWorkbenchStorehouseChannel() {
    const remoteWindow = storehouseIframe.value?.contentWindow;
    if (!remoteWindow) return;

    workbenchStorehouseChannel = WorkbenchStorehouseChannel.getInstance(remoteWindow, {
        on: {
            storehouseReady: (channel) => {
                channel.remote
                    .then((remote) => {
                        const {
                            version,
                            workbenchUpload: uploadConfig,
                            workbenchResource: resourceConfig,
                        } = toRaw(workbenchStore.workbenchConfig);
                        return remote.launchStorehouse({ version, uploadConfig, resourceConfig });
                    })
                    .then(() => {
                        workbenchStore.stopPageLoading();
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            },
        },
    });
}

onBeforeMount(() => {
    workbenchStore.startPageLoading("storehouse");
});

onMounted(() => {
    initialWorkbenchStorehouseChannel();
});

onBeforeUnmount(() => {
    workbenchStore.stopPageLoading();
    workbenchStorehouseChannel?.destroy();
    workbenchStorehouseChannel = null;
});
</script>
<style lang="scss" module>
.workbench-browsing-layout {
    position: relative;
    z-index: 1;

    min-width: 1100px;

    grid-template-rows: 50px 1fr;
    .layout-head {
        position: relative;
        z-index: 10;

        padding: 0 20px;

        border-bottom: 1px solid var(--editor-c-border--lighter);

        grid-template-columns: 300px 1fr 300px;
    }
}
</style>
