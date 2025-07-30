<!--
 * @Description: 用户私有库
 * @Author: F-Stone
 * @LastEditTime: 2025-07-30 11:31:53
-->
<template>
    <UebuilderUserStorehouse :class="$style['user-storehouse']" :list="dataList" :type="type" :loading="loading" />
</template>
<script lang="ts" setup>
import type { UnitUserStorehouseBaseProps } from "./index";

import { getUserList } from "@stone/uebuilder-api--tools/api";
import UebuilderUserStorehouse from "@stone/uebuilder-storehouse-base/src/components/unit-user-storehouse";

defineOptions({ name: "UnitUserStorehouse" });
const _props = withDefaults(defineProps<UnitUserStorehouseBaseProps>(), {});

const dataList = ref<{ title: string; thumb: string; lastEditTime: string }[] | undefined>(undefined);

const loading = ref(true);
onBeforeMount(() => {
    getUserList({ page: 1 })
        .then((res) => {
            dataList.value = res.data.list.data.map((item) => ({
                title: item.title,
                thumb: item.img,
                lastEditTime: item.diff_time,
            }));
        })
        .finally(() => {
            loading.value = false;
        })
        .catch((err) => {
            console.error(err);
        });
});
</script>
<style lang="scss" module>
.user-storehouse {
    //
}
</style>
