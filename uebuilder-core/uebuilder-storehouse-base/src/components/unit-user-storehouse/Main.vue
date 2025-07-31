<!--
 * @Description: 用户私有库
 * @Author: F-Stone
 * @LastEditTime: 2025-07-31 12:27:19
-->
<template>
    <UnitListModule
        :class="$style['user-storehouse']"
        v-bind="listModuleProps"
        :list="list"
        :type="type"
        :loading="loading"
        :sortType="sortType"
        @loadMore="handleLoadMore"
        @sortTrigger="handleSortTrigger"
        @operTrigger="handleOperTrigger"
    />
    <UeElPopPanel v-model:open="popPanelOpen" v-bind="popPanelParams">
        <UserTemplatePanel :title="t('UEBUILDER_TEMPLATE_FORM_TITLE')" type="add" @close="popPanelOpen = false" />
    </UeElPopPanel>
</template>
<script lang="ts" setup>
import type { UeElPopPanelBaseProps } from "@stone/uemo-editor-element/packages/pop-panel";
import type { UnitUserStorehouseBaseProps } from "./index";
import type { UnitListModuleBaseProps } from "../unit-list-module";

import { UeBuilderStorehouseKey } from "../../plugin/injection-key";
import UserTemplatePanel from "./components/UserTemplatePanel.vue";
import UnitListModule from "../unit-list-module";

defineOptions({ name: "UnitUserStorehouse", inheritAttrs: false });

const props = withDefaults(defineProps<UnitUserStorehouseBaseProps>(), {
    sortType: "newest",
    type: "user-default",
});
const emit = defineEmits<{ (e: "sortTrigger", type: string): void; (e: "loadMore"): void }>();
const { t } = useI18n();

const UeBuilderStorehouse = inject(UeBuilderStorehouseKey);

const router = useRouter();

const listModuleProps = computed<UnitListModuleBaseProps>(() => {
    if (props.type === "user-recent") {
        return {
            title: t("UEBUILDER_USER_STOREHOUSE_RECENT"),
            placeholder: {
                title: t("UEBUILDER_USER_STOREHOUSE_RECENT_PLACEHOLDER"),
                desc: t("UEBUILDER_USER_STOREHOUSE_RECENT_DESC"),
            },
            operList: [
                { type: "add-page", label: t("UEBUILDER_USER_STOREHOUSE_OPER_ADD_PAGE") },
                { type: "more", label: t("UEBUILDER_USER_STOREHOUSE_OPER_MORE"), arrow: true },
            ],
        };
    }
    return {
        title: t("UEBUILDER_USER_STOREHOUSE_TITLE"),
        placeholder: { title: t("UEBUILDER_USER_STOREHOUSE_PLACEHOLDER"), desc: t("UEBUILDER_USER_STOREHOUSE_DESC") },
        operList: [{ type: "add-page", label: t("UEBUILDER_USER_STOREHOUSE_OPER_ADD_PAGE") }],
        sortCondition: {
            value: "newest",
            list: [
                { type: "newest", label: t("UEBUILDER_USER_STOREHOUSE_RECENT") },
                { type: "created", label: t("UEBUILDER_USER_STOREHOUSE_SORT_CREATED") },
            ],
        },
        pages: props.pages,
    };
});

const popPanelOpen = ref(false);
const popPanelParams = ref<UeElPopPanelBaseProps>({
    autoClose: true,
    mask: { color: "rgba(0, 0, 0, 0.5)" },
});
const handleOperTrigger = (type: string) => {
    switch (type) {
        case "add-page":
            UeBuilderStorehouse?.storehouseWorkbenchChannel?.remote
                .then((remote) => {
                    return remote.checkLoginStatus().then((isLogin) => {
                        if (!isLogin) {
                            return remote.openLoginPanel();
                        }
                        popPanelOpen.value = true;
                    });
                })
                .catch(() => {
                    console.error("checkLoginStatus error");
                });
            break;
        case "more":
            router.push("/my-pages").catch((err) => {
                console.error(err);
            });
            break;

        default:
            break;
    }
};

const handleSortTrigger = (type: string) => {
    emit("sortTrigger", type);
};

const handleLoadMore = () => {
    emit("loadMore");
};
</script>
<style lang="scss" module>
.user-storehouse {
    padding: 20px 50px;
}
</style>
