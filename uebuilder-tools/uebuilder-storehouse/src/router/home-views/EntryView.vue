<template>
    <UeBuilderStorehouseRouterHomeEntryView :banner="banner" :class="$style['index-view']">
        <div :class="$style['storehouse-group']" class="grid">
            <UnitUserStorehouse type="user-recent" />
            <UemoStorehouse />
        </div>
        <template #footer>
            <UeBuilderStorehouseUemoContactUs />
        </template>
    </UeBuilderStorehouseRouterHomeEntryView>
</template>
<script lang="ts" setup>
import UeBuilderStorehouseRouterHomeEntryView from "@stone/uebuilder-storehouse-base/src/components/router-home-enter-view";
import UeBuilderStorehouseUemoContactUs from "@stone/uebuilder-storehouse-base/src/components/unit-uemo-contact-us";

import UnitUserStorehouse from "@/components/user-storehouse";
import UemoStorehouse from "@/components/uemo-storehouse";

const banner = {
    link: "https://q1j1jhhmkl.feishu.cn/wiki/OLdew31n0icXJYknJ1hcQXvVnZg",
    image: process.env.PUBLIC_PATH + "image/ad-01.png",
};
</script>
<style lang="scss" module>
.index-view {
    // init
}
.storehouse-group {
    gap: 32px;
}
</style>
