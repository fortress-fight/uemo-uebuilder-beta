<!--
 * @Description: 文字装饰资源面板
 * @Author: F-Stone
 * @LastEditTime: 2025-03-16 01:34:17
-->
<template>
    <UeElLibraryPanel :cards="libraryPanelParam.cards">
        <template #textDecorationLib>
            <UeElLoading v-if="loading" />
            <div :class="$style['library-list']" class="grid grid-cols-3 gap-2" v-if="!!list">
                <UeElSelectBox
                    v-for="(item, index) in list"
                    :key="index"
                    :select="select === item.name"
                    :width="320"
                    :height="161"
                    @trigger="select = item.name"
                >
                    <div :class="$style['thumb-box']">
                        <img :src="item.thumb" />
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
import type { UeElTextDecorationLibraryPanelBaseProps } from "./index";

import UeElSelectBox from "../library-panel/sub-components/SelectBox.vue";

defineOptions({ name: "UeElTextDecorationLibraryPanel" });

const { t } = useI18n();

const instance = getCurrentInstance();
const _prop = withDefaults(defineProps<UeElTextDecorationLibraryPanelBaseProps>(), {});

const loading = ref(false);
const list = ref<UE_EL_UTIL.ResourceTextDecoration | null>(null);
const libraryPanelParam = computed<UE_EL_COMPONENT.UeElLibraryPanelProps>(() => ({
    cards: [
        {
            title: t("TEXT_DECORATION_LIBRARY_TITLE"),
            name: "textDecorationLib",
            icon: "icon-app-svg-line",
            iconSize: 15,
        },
    ],
}));

const select = defineModel<string>("select", { required: false });

const getTextDecorationLibrary = async () => {
    // 启动1秒定时器：若超过1秒未返回，则显示 loading
    const timer = setTimeout(() => (loading.value = true), 20);

    try {
        const res = await instance?.proxy?.$ueElResource.textDecorationLibrary.getData();

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
    getTextDecorationLibrary().catch((error) => {
        instance?.proxy?.$ueElError(error);
    });
});
</script>
<style lang="scss" module>
.text-decoration-library-panel {
    //
}
</style>
