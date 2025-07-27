<template>
    <UebuilderRouterHomeView :class="$style['uebuilder-storehouse']" :nav-list="navList">
        <!--  -->
    </UebuilderRouterHomeView>
</template>
<script lang="ts" setup>
import UebuilderRouterHomeView from "@stone/uebuilder-storehouse-base/src/components/router-home-view";

const { t } = useI18n();
const navList: {
    title: string;
    link: string;
    target: "_self" | "_blank";
    linkIcon: { size: number; name: string; arrow?: boolean };
}[] = [
    {
        title: t("UEBUILDER_NAV_HOME"),
        link: "/",
        target: "_self",
        linkIcon: { size: 15, name: "icon-app-home" },
    },
    {
        title: t("UEBUILDER_NAV_MY_PAGES"),
        link: "/my-pages",
        target: "_self",
        linkIcon: { size: 15, name: "icon-app-page" },
    },
    {
        title: t("UEBUILDER_NAV_USER_COLLECTION"),
        link: "/resource-hub",
        target: "_self",
        linkIcon: { size: 15, name: "icon-app-start" },
    },
    {
        title: t("UEBUILDER_NAV_HELP"),
        link: "https://dwz.cn/c47EV07O",
        target: "_blank",
        linkIcon: { size: 15, name: "icon-app-book" },
    },
    {
        title: t("UEBUILDER_NAV_RESOURCE_HUB"),
        link: "https://www.uemo.net/tools/resources",
        target: "_blank",
        linkIcon: { arrow: true, size: 15, name: "icon-app-resource-hub" },
    },
    {
        title: t("UEBUILDER_NAV_TEMPLATE"),
        link: "https://www.uemo.net/template/",
        target: "_blank",
        linkIcon: { size: 15, name: "icon-app-mo005" },
    },
];
</script>
<style lang="scss" module>
.uebuilder-storehouse {
    // init
}
</style>
