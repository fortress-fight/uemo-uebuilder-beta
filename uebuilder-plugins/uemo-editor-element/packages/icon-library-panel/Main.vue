<!--
 * @Description: 图库库面板
 * @Author: F-Stone
 * @LastEditTime: 2025-03-18 02:55:38
-->
<template>
    <UeElLibraryPanel minHeight="200px" :cards="libraryPanelParam.cards">
        <template #IconLibList="{ activeCategory: activeSource, searchText }">
            <UeElLoading v-if="loading" />
            <LibraryList
                v-if="iconLib"
                v-model:select="select"
                :lib="iconLib"
                :search="searchText"
                :source="activeSource"
            />
        </template>
    </UeElLibraryPanel>
</template>
<script lang="ts" setup>
import type { UeElIconLibraryPanelBaseProps } from "./index";

import LibraryList from "./sub-component/LibraryList.vue";

defineOptions({ name: "UeElIconLibraryPanel" });

const { t, locale } = useI18n();
const instance = getCurrentInstance();
const _prop = withDefaults(defineProps<UeElIconLibraryPanelBaseProps>(), {});
const select = defineModel<UE_EL_UTIL.ResourceIconAttrs>("select", { required: false });

const loading = ref(false);
const iconLib = ref<UE_EL_UTIL.ResourceIconItem[] | null>(null);

const libraryPanelParam = computed(() => {
    const iconLibListCategory =
        iconLib?.value?.map((item, index) => {
            const name = locale.value === "zh-cn" ? item.nameCN : item.name;
            const selectSource = select.value?.source;
            return {
                name,
                value: item.source,
                active: selectSource ? selectSource === item.source : index === 0,
            };
        }) || [];

    return {
        cards: [
            {
                title: t("ICON_LIBRARY_TITLE"),
                name: "IconLibList",
                icon: "icon-app-icon",
                iconSize: 15,
                search: { placeholder: t("ICON_LIBRARY_SEARCH_PLACEHOLDER") },
                category: iconLibListCategory,
            },
        ],
    } as UE_EL_COMPONENT.UeElLibraryPanelProps;
});

async function getIconLibrary() {
    // 启动1秒定时器：若超过1秒未返回，则显示 loading
    const timer = setTimeout(() => (loading.value = true), 20);

    try {
        const res = await instance?.proxy?.$ueElResource.iconLibrary.getData();

        if (res?.[0]) {
            const resData = await res[0].getData();
            iconLib.value = resData || null;
        }

        clearTimeout(timer);

        loading.value = false;
    } catch (error) {
        clearTimeout(timer);
        loading.value = false;
        throw error;
    }
}

onBeforeMount(() => {
    if (!instance?.proxy?.$ueElResource.iconLibrary?.enable) return;

    getIconLibrary()
        .then(() => {
            // updateSelectCategory();
        })
        .catch((error) => {
            instance?.proxy?.$ueElError(error);
        });
});
</script>
<style lang="scss" module>
.icon-library-panel {
    //
}
</style>
