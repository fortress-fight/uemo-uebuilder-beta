<!--
 * @Description: Uemo 库
 * @Author: F-Stone
 * @LastEditTime: 2025-07-27 15:57:50
-->
<template>
    <UnitListModule
        :class="$style['unit-uemo-storehouse']"
        v-bind="listModuleProps"
        :loading="loading"
        :list="dataList"
        @operTrigger="handleOperTrigger"
    />
</template>
<script lang="ts" setup>
import type { UnitUemoStorehouseBaseProps } from "./index";
import type { UnitListModuleBaseProps } from "../unit-list-module";

import { pageApi } from "../../api";
import UnitListModule from "../unit-list-module";

defineOptions({ name: "UnitUemoStorehouse" });
const _props = withDefaults(defineProps<UnitUemoStorehouseBaseProps>(), {});

const { t } = useI18n();

const listModuleProps = computed<UnitListModuleBaseProps>(() => ({
    type: "newest",
    title: t("UEBUILDER_STOREHOUSE_TITLE"),
    placeholder: { title: t("UNIT_LOAD_ERROR"), desc: t("UNIT_LOAD_ERROR_TIP") },
    operList: [{ type: "more", label: t("UNIT_SHOW_ALL"), arrow: true }],
}));

const handleOperTrigger = (type: string) => {
    switch (type) {
        case "more":
            //

            break;

        default:
            break;
    }
};

const loading = ref<boolean>(true);
const dataList = ref<{ title: string; thumb: string }[]>([]);
function loadPageList() {
    pageApi
        .getList({ page: 1 })
        .then((res) => {
            dataList.value = res.data.list.data.map((item) => ({
                title: item.title,
                thumb: item.img,
            }));
        })
        .finally(() => {
            loading.value = false;
        })
        .catch((err) => {
            console.error(err);
        });
}

onMounted(() => {
    loadPageList();
});
</script>
<style lang="scss" module>
.unit-uemo-storehouse {
    padding: 20px 50px;
}
</style>
