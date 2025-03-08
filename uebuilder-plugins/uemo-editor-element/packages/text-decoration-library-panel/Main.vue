<!--
 * @Description: 文字装饰资源面板
 * @Author: F-Stone
 * @LastEditTime: 2025-03-09 00:53:26
-->
<template>
    <UeElLibraryPanel :cards="libraryPanelParam.cards">
        <template #textDecorationLib>
            <UeElLoading v-if="loading" />
            <div :class="$style['library-list']" class="grid grid-cols-3 gap-2" v-if="!!list">
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
                <UeElEmptyPanel :description="t('TEXT_DECORATION_LIBRARY_TIP_EMPTY')" />
            </div>
        </template>
    </UeElLibraryPanel>
</template>
<script lang="ts" setup>
import type { UeElTextDecorationLibraryPanelBaseProps } from "./index";

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
        const res = await instance?.proxy?.$ueElResource.getTextDecorationLibrary();

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
