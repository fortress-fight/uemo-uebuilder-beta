<!--
 * @Description: 用户私有库
 * @Author: F-Stone
 * @LastEditTime: 2025-09-20 17:12:46
-->
<template>
    <UebuilderUserStorehouse
        :class="$style['user-storehouse']"
        :list="dataList"
        :type="type"
        :loading="loading"
        :sortType="getUserPageListParams.order || 'newest'"
        :pages="dataPages"
        :getUserTemplate="getUserTemplateHandle"
        @useTemplate="handleUseTemplate"
        @toggleCollect="handleToggleCollect"
        @updateTemplate="handleUpdateTemplate"
        @deleteTemplate="handleDeleteTemplate"
        @refresh="handleRefresh"
        @sortTrigger="handleSortTrigger"
        @loadMore="handleLoadMore"
    />
</template>
<script lang="ts" setup>
import type { UnitUserStorehouseBaseProps, BookmarkItem, UserLibraryItem } from "./index";

import {
    getUserPageList,
    getBookmarkList,
    getUserTemplate,
    updateUserTemplate,
    updateBookmarkList,
} from "@stone/uebuilder-api--tools/api";
import UebuilderUserStorehouse from "@stone/uebuilder-storehouse-base/src/components/unit-user-storehouse";
import { useUeBuilderStorehouseToolsStore } from "@/store";
import { UeBuilderStorehouseKey } from "@/plugin/injection-key";

defineOptions({ name: "UnitUserStorehouse" });
const UeBuilderStorehouse = inject(UeBuilderStorehouseKey);
const instance = getCurrentInstance();
const props = withDefaults(defineProps<UnitUserStorehouseBaseProps>(), {});

const { t } = useI18n();

const dataList = ref<(BookmarkItem | UserLibraryItem)[] | undefined>(undefined);
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

function openLoginPanel() {
    void UeBuilderStorehouse?.storehouseWorkbenchChannel?.remote.then((remote) => {
        return remote.openLoginPanel();
    });
}

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
                id: item.id,
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
            instance?.proxy?.$ueElToast.error(t("UNIT_UNKNOWN_ERROR"));
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
                type: item.res_type,
                collectedId: item.collected_id,
                id: item.id,
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
            instance?.proxy?.$ueElToast.error(t("UNIT_UNKNOWN_ERROR"));
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

/**
 * 保存模板
 */
function handleUpdateTemplate(param: {
    type: "add" | "edit";
    data: { json: string; thumb: string; title: string; id?: string };
}) {
    updateUserTemplate(param.type, { ...param.data, img: param.data.thumb })
        .then((res) => {
            if (res.code === 998) {
                openLoginPanel();
                return;
            }
            if (res.code === 0) {
                handleRefresh();
                instance?.proxy?.$ueElToast.warning(t("UNIT_SAVE_SUCCESS"));
                return;
            }
            if (res.errMsg === "limit") {
                instance?.proxy?.$ueElToast.warning(t("UEBUILDER_USER_STOREHOUSE_LIMIT_ERROR"));
                return;
            }
            instance?.proxy?.$ueElToast.error(t("UNIT_UNKNOWN_ERROR"));
        })
        .catch((err) => {
            console.error(err);
            instance?.proxy?.$ueElToast.error(t("UNIT_UNKNOWN_ERROR"));
        });
}

function handleDeleteTemplate(id: string) {
    updateUserTemplate("delete", { id })
        .then((res) => {
            if (res.code === 998) {
                openLoginPanel();
                return;
            }
            if (res.code === 0) {
                handleRefresh();
                return;
            }

            instance?.proxy?.$ueElToast.error(t("UNIT_UNKNOWN_ERROR"));
        })
        .catch((err) => {
            console.error(err);
            instance?.proxy?.$ueElToast.error(t("UNIT_UNKNOWN_ERROR"));
        });
}

function handleToggleCollect(id: string) {
    const targetItem = dataList.value?.find((item) => item.id === id);
    if (!targetItem || !("collectedId" in targetItem)) return;

    const collectId = targetItem.collectedId;
    if (typeof collectId === "undefined") return;

    if (collectId !== "-1") {
        // 删除收藏
        updateBookmarkList({ action: "delete", id: collectId })
            .then((res) => {
                if (res.code === 998) {
                    openLoginPanel();
                    return;
                }
                if (res.code === 0) {
                    dataList.value = dataList.value?.map((item) => {
                        if (item.id === id && "collectedId" in item) {
                            item.collectedId = "-1";
                        }
                        return item;
                    });
                    return;
                }
                instance?.proxy?.$ueElToast.error(t("UNIT_UNKNOWN_ERROR"));
            })
            .catch((err) => {
                console.error(err);
                instance?.proxy?.$ueElToast.error(t("UNIT_UNKNOWN_ERROR"));
            });
    } else {
        // 添加收藏
        updateBookmarkList({ action: "add", type: targetItem.type, type_id: targetItem.id })
            .then((res) => {
                if (res.code === 998) {
                    openLoginPanel();
                    return;
                }
                if (res.code === 0) {
                    dataList.value = dataList.value?.map((item) => {
                        if (item.id === id && "collectedId" in item) {
                            item.collectedId = res.data.id;
                        }
                        return item;
                    });
                    return;
                }
                instance?.proxy?.$ueElToast.error(t("UNIT_UNKNOWN_ERROR"));
            })
            .catch((err) => {
                console.error(err);
                instance?.proxy?.$ueElToast.error(t("UNIT_UNKNOWN_ERROR"));
            });
    }
}

function getUserTemplateHandle(id: string) {
    return getUserTemplate({ id })
        .then((res) => {
            if (res.code === 998) {
                openLoginPanel();
                return;
            }

            if (res.code === 0) {
                return res.data;
            }

            instance?.proxy?.$ueElToast.error(t("UNIT_UNKNOWN_ERROR"));
        })
        .catch((err) => {
            console.error(err);
            instance?.proxy?.$ueElToast.error(t("UNIT_UNKNOWN_ERROR"));
        });
}

function handleUseTemplate(pageId: string) {
    getUserTemplate({ id: pageId })
        .then((res) => {
            if (res.code === 998) {
                openLoginPanel();
                return;
            }
            if (res.code === 0) {
                void UeBuilderStorehouse?.changeWorkbenchState("editing", { id: pageId, data: res.data.json });
                return;
            }
            instance?.proxy?.$ueElToast.error(t("UNIT_UNKNOWN_ERROR"));
        })
        .catch((err) => {
            console.error(err);
            instance?.proxy?.$ueElToast.error(t("UNIT_UNKNOWN_ERROR"));
        });
}
</script>
<style lang="scss" module>
.user-storehouse {
    //
}
</style>
