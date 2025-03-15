<!--
 * @Description: 图形资源面板
 * @Author: F-Stone
 * @LastEditTime: 2025-03-15 22:09:16
-->
<template>
    <UeElLibraryPanel :cards="libraryPanelParam.cards">
        <template #shapeLibList>
            <UeElLoading v-if="loading" />
            <div :class="$style['library-list']" class="grid grid-cols-2 gap-2" v-if="!!list">
                <UeElSelectBox
                    v-for="(item, index) in list"
                    :key="index"
                    :select="select === item.name"
                    :width="150"
                    :height="100"
                    @trigger="select = item.name"
                >
                    <img class="w-full" :src="item.thumb" />
                </UeElSelectBox>
            </div>
            <div v-else>
                <UeElEmptyPanel :description="t('SHAPE_LIBRARY_TIP_EMPTY')" />
            </div>
        </template>
    </UeElLibraryPanel>
</template>
<script lang="ts" setup>
import type { UeElShapeLibraryPanelBaseProps } from "./index";

import UeElSelectBox from "../library-panel/sub-components/SelectBox.vue";

defineOptions({ name: "UeElShapeLibraryPanel" });

const { t } = useI18n();

const instance = getCurrentInstance();
const _prop = withDefaults(defineProps<UeElShapeLibraryPanelBaseProps>(), {});

const loading = ref(false);
const list = ref<UE_EL_UTIL.ResourceShape | null>(null);
const libraryPanelParam = computed<UE_EL_COMPONENT.UeElLibraryPanelProps>(() => ({
    cards: [{ title: t("SHAPE_LIBRARY_TITLE"), name: "shapeLibList", icon: "icon-xingzhuang", iconSize: 16 }],
}));
const select = defineModel<string>("select", { required: true });

const getShapeLibrary = async () => {
    // 启动1秒定时器：若超过1秒未返回，则显示 loading
    const timer = setTimeout(() => (loading.value = true), 20);

    try {
        const res = await instance?.proxy?.$ueElResource.shapeLibrary.getData();

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
    getShapeLibrary().catch((error) => {
        instance?.proxy?.$ueElError(error);
    });
});
</script>
<style lang="scss" module>
.library-list {
    //
}
</style>
