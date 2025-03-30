<!--
 * @Description: 文字装饰资源面板
 * @Author: F-Stone
 * @LastEditTime: 2025-03-18 02:40:09
-->
<template>
    <UeElLibraryPanel :cards="libraryPanelParam.cards">
        <template #textDecorationLib>
            <UeElLoading v-if="loading" />
            <div :class="$style['library-list']" class="grid grid-cols-3 gap-2" v-if="!!list">
                <UeElSelectBox
                    v-for="(item, index) in list"
                    :key="index"
                    :select="select === item.name"
                    :width="320"
                    :height="161"
                    @trigger="select = item.name"
                >
                    <TextDecorationPreview :value="item.value" />
                </UeElSelectBox>
            </div>
            <div v-else>
                <UeElEmptyPanel :description="t('UNIT_SEARCH_EMPTY')" />
            </div>
        </template>
    </UeElLibraryPanel>
</template>
<script lang="ts" setup>
import type { UeElTextDecorationLibraryPanelBaseProps } from "./index";
import type { ResourceTextDecoration } from "./utils/options";

import UeElSelectBox from "../library-panel/sub-components/SelectBox.vue";
import { textDecorationOptions } from "./utils/options";
import TextDecorationPreview from "./sub-component/TextDecorationPreview.vue";

defineOptions({ name: "UeElTextDecorationLibraryPanel" });

const { t } = useI18n();

const _prop = withDefaults(defineProps<UeElTextDecorationLibraryPanelBaseProps>(), {});

const loading = ref(false);
const list = ref<ResourceTextDecoration | null>(textDecorationOptions);
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
</script>
<style lang="scss" module>
.text-decoration-library-panel {
    //
}
</style>
