<template>
    <UeBuilderStorehouseRouterUserPageView>
        <div :class="$style['storehouse-group']" class="grid">
            <UnitUserStorehouse />
        </div>
        <template #footer>
            <UeBuilderStorehouseUemoContactUs />
        </template>
    </UeBuilderStorehouseRouterUserPageView>
</template>
<script lang="ts" setup>
import UeBuilderStorehouseRouterUserPageView from "@stone/uebuilder-storehouse-base/src/components/router-home-user-page-view";
import UeBuilderStorehouseUemoContactUs from "@stone/uebuilder-storehouse-base/src/components/unit-uemo-contact-us";

import UnitUserStorehouse from "@/components/user-storehouse";
</script>
<style lang="scss" module>
.storehouse-group {
    padding-top: 30px;
}
</style>
