<!--
 * @Description: 图形资源面板
 * @Author: F-Stone
 * @LastEditTime: 2025-03-09 00:15:34
-->
<template>
    <UeElLibraryPanel :cards="libraryPanelParam.cards">
        <template #shapeLibList>
            <UeElLoading v-if="loading" />
            <div :class="$style['library-list']" class="grid grid-cols-2 gap-2" v-if="!!list">
                <div
                    v-for="(item, index) in list"
                    :key="index"
                    :class="$style['library-item']"
                    class="cursor-pointer"
                    :data-select="select === item.name"
                    @click="select = item.name"
                >
                    <div :class="$style['thumb-box']">
                        <img :src="item.thumb" />
                    </div>
                </div>
            </div>
            <div v-else>
                <UeElEmptyPanel :description="t('SHAPE_LIBRARY_TIP_EMPTY')" />
            </div>
        </template>
    </UeElLibraryPanel>
</template>
<script lang="ts" setup>
import type { UeElShapeLibraryPanelBaseProps } from "./index";

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
        const res = await instance?.proxy?.$ueElResource.getShapeLibrary();

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
.library-item {
    width: 100%;

    border-radius: var(--ue-border-radius--lv1);
    &[data-select="true"] {
        .thumb-box {
            &::before {
                box-shadow: inset 0 0 0 4px color(var(--ue-border-color--deeper)), inset 0 0 0 7px #fff;
            }
        }
    }
    .thumb-box {
        @include image-placeholder-v4(150, 100);
        position: relative;

        overflow: hidden;

        max-width: 100%;

        border-radius: var(--ue-border-radius--lv1);
        &::before {
            @include ab-cover;
            z-index: 10;

            content: "";
            pointer-events: none;

            border-radius: var(--ue-border-radius--lv1);
            box-shadow: inset 0 0 0 1px color(var(--ue-border-color));
        }
    }
}
</style>
