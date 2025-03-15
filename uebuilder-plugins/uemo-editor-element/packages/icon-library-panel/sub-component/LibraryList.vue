<template>
    <div class="relative h-full grid grid-cols-5 gap-1 items-start" :class="$style['library-list']">
        <UeElLoading v-if="loading || fuseReady" type="circle" />
        <template v-if="search && searchLibraryList?.length === 0">
            <UeElEmptyPanel class="col-span-full" :description="t('UNIT_SEARCH_EMPTY')" />
        </template>
        <template v-else>
            <div
                v-for="(item, index) in searchLibraryList || iconLibraryList"
                :class="$style['library-list-item']"
                :data-active="select?.name === item.name"
                :key="index"
                @click="useIcon(item.name)"
            >
                <div class="flex items-center justify-center" :class="$style['icon-box']" :label="item.name">
                    <iconpark-icon :key="item.name" :name="item.name" />
                </div>
            </div>
        </template>
    </div>
</template>
<script lang="ts" setup>
import { loadSvgIcon } from "@stone/uemo-editor-utils/lib/icon";
import { _flatten } from "@stone/uemo-editor-utils/lib/lodash";

const { t } = useI18n();
const instance = getCurrentInstance();
const props = defineProps<{ search?: string; lib: UE_EL_UTIL.ResourceIconItem[]; source: string }>();
const select = defineModel<{ name: string; source: string }>("select", { required: false });

const loading = ref(false);
const fuseReady = ref(false);
const iconLibraryList = shallowRef<UE_EL_UTIL.ResourceIconItem["data"]>([]);
const searchLibraryList = shallowRef<UE_EL_UTIL.ResourceIconItem["data"] | null>(null);

const getIconList = (source: string[]) => {
    loading.value = true;
    return loadSvgIcon(source).then(() => {
        loading.value = false;
    });
};

const useIcon = (name: string) => {
    select.value = { name, source: props.source };
};

watch(
    () => props.source,
    (iconSource) => {
        getIconList([iconSource])
            .then(() => {
                iconLibraryList.value = props.lib.find((item) => item.source === iconSource)?.data || [];
            })
            .catch((error) => {
                instance?.proxy?.$ueElError(error as Error);
            });
    },
    { immediate: true }
);

async function initFuse() {
    const { Fuse } = await import("@stone/uemo-editor-utils/lib/fuse");
    const categoryFuse = new Fuse(toRaw(props.lib), {
        includeScore: true,
        includeMatches: true,
        minMatchCharLength: 1,
        threshold: 0,
        keys: ["data.name", "data.title"],
    });
    const iconFuse = new Fuse<{ title: string; name: string }>([], {
        includeScore: true,
        includeMatches: true,
        minMatchCharLength: 1,
        threshold: 0,
        keys: ["name", "title"],
    });

    watch(
        () => props.search,
        (search) => {
            if (!search || search === "") {
                searchLibraryList.value = null;
                return;
            }

            const fuseResult = categoryFuse.search(search);
            const categoryResult = fuseResult.map((item) => item.item);

            if (categoryResult.length === 0) {
                searchLibraryList.value = [];
                return;
            }

            getIconList(categoryResult.map((item) => item.source))
                .then(() => {
                    const detailIconList = _flatten(categoryResult.map((result) => result.data));
                    iconFuse.setCollection(detailIconList);
                    searchLibraryList.value = iconFuse.search(search).map((item) => item.item);
                })
                .catch((error) => {
                    instance?.proxy?.$ueElError(error as Error);
                });
        },
        { immediate: true }
    );
}

onBeforeMount(() => {
    initFuse().catch((error) => {
        instance?.proxy?.$ueElError(error as Error);
    });
});
</script>
<style lang="scss" module>
.library-list {
    grid-auto-rows: min-content;
}
.library-list-item {
    @include space-placeholder(100px, 100px);

    font-size: 18px;

    position: relative;

    width: 100%;

    cursor: pointer;

    border: 1px solid color(var(--ue-border-color));
    border-radius: var(--ue-border-radius--lv1);
    &[data-active="true"] {
        border-color: color(var(--ue-color--active));
    }
    .icon-box {
        @include ab-cover;
    }
}
</style>
