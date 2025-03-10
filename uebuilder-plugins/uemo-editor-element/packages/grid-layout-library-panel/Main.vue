<!--
 * @Description: 网格结构库面板
 * @Author: F-Stone
 * @LastEditTime: 2025-03-10 12:26:05
-->
<template>
    <UeElLibraryPanel :cards="libraryPanelParam.cards" :default-card="defaultCardName">
        <template v-for="(data, index) in gridLayoutData" :key="index" #[index]>
            <div class="grid grid-cols-2 gap-3" :class="$style['grid-list']">
                <UeElGirdLayoutUtil
                    v-for="(item, index) in data.options"
                    :key="index"
                    :data="item"
                    :active="item === select"
                    type="option"
                    :class="$style['grid-item']"
                    @trigger="select = item"
                />
            </div>
        </template>
    </UeElLibraryPanel>
</template>
<script lang="ts" setup>
import type { UeElGridLayoutLibraryPanelBaseProps } from "./index";
import { gridOptions, mdGridOptions } from "@stone/uemo-editor-assets/resource/grid-layout";

defineOptions({ name: "UeElGridLayoutLibraryPanel" });

const prop = withDefaults(defineProps<UeElGridLayoutLibraryPanelBaseProps>(), {
    type: "desktop",
});
const select = defineModel<string>("select", { required: false, default: "" });

const gridLayoutData = computed(() => {
    if (prop.type === "mobile") {
        const currentGridLen = select.value.split(":")[1].split(",").length;
        return Object.entries(mdGridOptions)
            .map(([type, data]) => {
                const options = Object.values(data.options).filter((item) => {
                    const colLength = item.value.split(":")[1].split(",").length;
                    return colLength === currentGridLen;
                });
                return {
                    type,
                    title: data.title,
                    options: options.map((item) => item.value),
                };
            })
            .filter((item) => item.options.length);
    } else {
        return Object.entries(gridOptions).map(([type, item]) => ({
            type,
            title: item.title,
            options: Object.values(item.options).map((item) => item.value),
        }));
    }
});

const defaultCardName = ref<string>("");
const libraryPanelParam = computed(() => {
    const param: UE_EL_COMPONENT.UeElLibraryPanelProps = {
        cards: Object.entries(gridLayoutData.value).map(([type, item]) => ({ title: item.title, name: type })),
    };

    return param;
});

function updateDefaultCardName() {
    defaultCardName.value = Object.keys(gridLayoutData.value)[0];
    if (!select.value) return;

    Object.entries(gridLayoutData.value).some(([type, item]) => {
        if (item.options.find((item) => item === select.value)) {
            defaultCardName.value = type;
            return true;
        }
        return false;
    });
}

watch(select, () => {
    updateDefaultCardName();
});

onBeforeMount(() => {
    updateDefaultCardName();
});
</script>
<style lang="scss" module>
.grid-layout-library-panel {
    //
}
</style>
