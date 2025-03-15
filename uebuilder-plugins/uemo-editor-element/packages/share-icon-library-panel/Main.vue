<!--
 * @Description: 社交分享资源面板
 * @Author: F-Stone
 * @LastEditTime: 2025-03-16 01:33:48
-->
<template>
    <UeElLibraryPanel :cards="libraryPanelParam.cards">
        <template #ShareLibList>
            <UeElLoading v-if="loading" />
            <div :class="$style['library-list']" class="grid grid-cols-4 gap-2" v-if="!!list">
                <UeElSelectBox
                    v-for="iconClass in list"
                    :key="iconClass.name"
                    :select="select === iconClass.name"
                    :width="80"
                    :height="90"
                    @trigger="select = iconClass.name"
                >
                    <div :class="$style['library-item']" class="h-full flex flex-col">
                        <div :class="$style['thumb-box']" class="flex justify-center items-center h-full">
                            <i class="ue-share" :class="iconClass.icon"></i>
                        </div>
                        <div :class="$style['icon-name']" class="text-center">{{ iconClass.name }}</div>
                    </div>
                </UeElSelectBox>
            </div>
            <div v-else>
                <UeElEmptyPanel :description="t('UNIT_SEARCH_EMPTY')" />
            </div>
        </template>
    </UeElLibraryPanel>
</template>
<script lang="ts" setup>
import type { UeElShareIconLibraryPanelBaseProps } from "./index";

import UeElSelectBox from "../library-panel/sub-components/SelectBox.vue";

defineOptions({ name: "UeElShareIconLibraryPanel" });

const { t } = useI18n();

const instance = getCurrentInstance();
const _prop = withDefaults(defineProps<UeElShareIconLibraryPanelBaseProps>(), {});
const select = defineModel<string>("select", { required: true });

const loading = ref(false);
const list = ref<UE_EL_UTIL.ResourceShareIcon | null>(null);
const libraryPanelParam = computed<UE_EL_COMPONENT.UeElLibraryPanelProps>(() => ({
    cards: [{ title: t("SHARE_ICON_LIBRARY_TITLE"), icon: "icon-app-share", name: "ShareLibList", iconSize: 15 }],
}));

const getShareIconLibrary = async () => {
    // 启动1秒定时器：若超过1秒未返回，则显示 loading
    const timer = setTimeout(() => (loading.value = true), 20);

    try {
        const res = await instance?.proxy?.$ueElResource.shareIconLibrary.getData();

        clearTimeout(timer);

        list.value = res || null;
        loading.value = false;
    } catch (error) {
        clearTimeout(timer);
        loading.value = false;
        throw error;
    }
};

onBeforeMount(() => {
    getShareIconLibrary().catch((error) => {
        instance?.proxy?.$ueElError(error);
    });
});
</script>
<style lang="scss" module>
.share-library-panel {
    //
}
.library-list {
    //
}
.library-item {
    position: relative;

    overflow: hidden;

    padding: 8px 0;
    .thumb-box {
        font-size: 26px;
    }
}
</style>
