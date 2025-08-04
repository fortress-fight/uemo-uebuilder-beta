<!--
 * @Description: 用户私有库
 * @Author: F-Stone
 * @LastEditTime: 2025-08-05 00:25:03
-->
<template>
    <UebuilderUserStorehouse
        :class="$style['user-storehouse']"
        :list="dataList"
        :type="type"
        :loading="loading"
        :sortType="getUserPageListParams.order || 'newest'"
        :pages="dataPages"
        @refresh="handleRefresh"
        @sortTrigger="handleSortTrigger"
        @loadMore="handleLoadMore"
    />
</template>
<script lang="ts" setup>
import type { UnitUserStorehouseBaseProps } from "./index";

import { getUserPageList, getBookmarkList } from "@stone/uebuilder-api--tools/api";
import UebuilderUserStorehouse from "@stone/uebuilder-storehouse-base/src/components/unit-user-storehouse";
import { useUeBuilderStorehouseToolsStore } from "@/store";

defineOptions({ name: "UnitUserStorehouse" });
const props = withDefaults(defineProps<UnitUserStorehouseBaseProps>(), {});

const dataList = ref<{ title: string; thumb: string; lastEditTime: string }[] | undefined>(undefined);
const dataPages = ref<{ current: number; total: number; itemTotal?: number }>({ current: 1, total: 1 });

const loading = ref(true);
const addMoreLoading = ref(false);

const getUserPageListParams = ref<{ page: number; limit?: number; order?: string }>({ page: 1, limit: 20 });

const ueBuilderStorehouseToolsStore = useUeBuilderStorehouseToolsStore();
watch(
    () => ueBuilderStorehouseToolsStore.loginStatus,
    (loginStatus) => {
        if (!loginStatus) {
            dataList.value = undefined;
            dataPages.value = { current: 1, total: 1 };
            loading.value = false;
        } else {
            updateUserPageListData(false);
        }
    },
    { immediate: true }
);

watch(
    getUserPageListParams,
    (oldVal, newVal) => {
        const isAddMoreOper = !!(dataList.value && newVal && oldVal.order === newVal.order);
        updateUserPageListData(isAddMoreOper);
    },
    { deep: true, immediate: true }
);

/**
 * 更新用户页面列表数据
 * @param isAddMoreOper 是否是加载更多操作
 */
function updateUserPageListData(isAddMoreOper: boolean) {
    if (!ueBuilderStorehouseToolsStore.loginStatus) return;

    if (isAddMoreOper) {
        addMoreLoading.value = true;
    } else {
        addMoreLoading.value = false;
        loading.value = true;
    }
    if (props.type === "user-collect") {
        getUserCollectListData(isAddMoreOper);
    } else {
        getUserPageListData(isAddMoreOper);
    }
}

/**
 * 获取用户页面列表数据
 * @param isAddMoreOper 是否是加载更多操作
 */
function getUserPageListData(isAddMoreOper: boolean) {
    getUserPageList(getUserPageListParams.value)
        .then((res) => {
            dataPages.value = {
                current: res.data.list.page,
                total: res.data.list.page_total,
                itemTotal: res.data.list.total,
            };
            const newDataList = res.data.list.data.map((item) => ({
                title: item.title,
                thumb: item.img,
                lastEditTime: item.diff_time,
            }));
            if (isAddMoreOper) {
                dataList.value = [...(dataList.value || []), ...newDataList];
            } else {
                dataList.value = newDataList;
            }
        })
        .finally(() => {
            loading.value = false;
            addMoreLoading.value = false;
        })
        .catch((err) => {
            console.error(err);
        });
}

/**
 * 获取用户收藏列表数据
 * @param isAddMoreOper 是否是加载更多操作
 */
function getUserCollectListData(isAddMoreOper: boolean) {
    const { page, limit } = getUserPageListParams.value;
    getBookmarkList({ page, limit })
        .then((res) => {
            dataPages.value = {
                current: res.data.list.page,
                total: res.data.list.page_total,
                itemTotal: res.data.list.total,
            };
            const newDataList = res.data.list.data.map((item) => ({
                title: item.title,
                thumb: item.img,
                lastEditTime: item.diff_time,
            }));
            if (isAddMoreOper) {
                dataList.value = [...(dataList.value || []), ...newDataList];
            } else {
                dataList.value = newDataList;
            }
        })
        .finally(() => {
            loading.value = false;
            addMoreLoading.value = false;
        })
        .catch((err) => {
            console.error(err);
        });
}

/**
 * 排序触发
 */
const handleSortTrigger = (order: string) => {
    getUserPageListParams.value = { page: 1, order, limit: 20 };
};

/**
 * 加载更多
 */
const handleLoadMore = () => {
    if (addMoreLoading.value || dataPages.value.current >= dataPages.value.total) return;
    getUserPageListParams.value.page++;
};

/**
 * 刷新
 */
const handleRefresh = () => {
    updateUserPageListData(false);
};
</script>
<style lang="scss" module>
.user-storehouse {
    //
}
</style>
