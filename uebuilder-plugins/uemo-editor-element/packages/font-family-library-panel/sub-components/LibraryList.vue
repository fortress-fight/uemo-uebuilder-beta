<template>
    <div v-if="list.length > 0" ref="rootDom" class="grid grid-cols-2 gap-2" :class="$style['library-list']">
        <UeElSelectBox
            v-for="(item, index) in list"
            :key="index"
            :select="checkIsSelect(item)"
            :style="{ fontFamily: item.name }"
            :auto-height="true"
            @trigger="useFontFamily($event, item)"
        >
            <div class="h-full flex items-center justify-center" :class="$style['library-item']">
                {{ item.label }}
            </div>
        </UeElSelectBox>
    </div>
    <UeElEmptyPanel v-else :description="t('UNIT_SEARCH_EMPTY')" />
    <UeElPopPanel v-model:open="optionIsOpen" :panel="popPanelParams">
        <UeElSelectOption :list="selectOptions" :value="select" @change="selectFontFamily" />
    </UeElPopPanel>
</template>
<script lang="ts" setup>
import UeElSelectBox from "../../library-panel/sub-components/SelectBox.vue";

defineOptions({ name: "UeElFontFamilyLibraryList" });

const { t } = useI18n();
const _prop = defineProps<{ list: UE_EL_UTIL.ResourceFontFamilyItem[] }>();
const select = defineModel<string>("select", { required: false });

function checkIsSelect(item: UE_EL_UTIL.ResourceFontFamilyItem) {
    return select.value === item.name || item.subList.some((v) => v.name === select.value);
}

const optionIsOpen = ref<boolean>(false);
const activeBtn = ref<HTMLElement>();

/**
 * 计算弹出面板的参数
 * @returns {UE_EL_COMPONENT.UeElPopPanelProps["panel"]} 弹出面板参数
 */
const popPanelParams = computed<UE_EL_COMPONENT.UeElPopPanelProps["panel"]>(() => ({
    position: {
        refEl: activeBtn.value!,
        options: {
            placement: "right-start",
            middleware: [
                ["shift", { crossAxis: true, padding: 17, rootBoundary: "viewport" }],
                ["offset", () => ({ mainAxis: 4 })],
            ],
        },
    },
}));

const selectOptions = ref<UE_EL_COMPONENT.UeElSelectOptionProps["list"]>([]);

function selectFontFamily(value?: string | number) {
    select.value = value as string;
    optionIsOpen.value = false;
}

function useFontFamily(event: MouseEvent, item: UE_EL_UTIL.ResourceFontFamilyItem) {
    activeBtn.value = event.currentTarget as HTMLElement;

    if (item.subList.length <= 1) {
        select.value = item.name;
        return;
    }

    selectOptions.value = item.subList.map((v) => ({
        value: v.name,
        text: v.shortName,
    }));

    optionIsOpen.value = true;
}
</script>
<style lang="scss" module>
.library-list {
    // init
}
.library-item {
    line-height: 1.6em;

    position: relative;

    overflow: hidden;

    padding: calc(var(--ue-editor-row-space--lv1) + 0.7em) var(--ue-editor-row-space--lv1);
}
</style>
