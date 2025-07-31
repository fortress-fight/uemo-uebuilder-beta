<!--
 * @Description: 用户私有库
 * @Author: F-Stone
 * @LastEditTime: 2025-07-31 13:58:41
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

defineOptions({ name: "UnitUserStorehouse" });
const props = withDefaults(defineProps<UnitUserStorehouseBaseProps>(), {});

const dataList = ref<{ title: string; thumb: string; lastEditTime: string }[] | undefined>(undefined);
const dataPages = ref<{ current: number; total: number; itemTotal?: number }>({ current: 1, total: 1 });

const loading = ref(true);
const addMoreLoading = ref(false);

const getUserPageListParams = ref<{ page: number; limit?: number; order?: string }>({ page: 1, limit: 20 });

watch(
    getUserPageListParams,
    (oldVal, newVal) => {
        const isAddMoreOper = !!(dataList.value && newVal && oldVal.order === newVal.order);
        updateUserPageListData(isAddMoreOper);
    },
    { deep: true, immediate: true }
);

function updateUserPageListData(isAddMoreOper: boolean) {
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

const handleSortTrigger = (order: string) => {
    getUserPageListParams.value = { page: 1, order, limit: 20 };
};

const handleLoadMore = () => {
    if (addMoreLoading.value || dataPages.value.current >= dataPages.value.total) return;
    getUserPageListParams.value.page++;
};

const handleRefresh = () => {
    updateUserPageListData(false);
};
</script>
<style lang="scss" module>
.user-storehouse {
    //
}
</style>
