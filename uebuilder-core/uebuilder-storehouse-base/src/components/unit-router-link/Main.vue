<!--
 * @Description: Link 组件
 * @Author: F-Stone
 * @LastEditTime: 2025-07-27 00:50:51
-->
<template>
    <RouterLink
        v-if="useLink.type === 'router'"
        :class="$style['unit-router-link']"
        v-bind="props"
        :target="target"
        :exact="exact"
        :to="useLink.path"
        :active-class="activeClass"
        :exact-active-class="easeActiveClass"
    >
        <slot />
    </RouterLink>
    <a v-else :class="$style['unit-router-link']" :href="useLink.path" :target="target" :to="false">
        <slot />
    </a>
</template>
<script lang="ts" setup>
import type { RouteLocationRaw } from "vue-router";
import type { UnitRouterLinkBaseProps } from "./index";

defineOptions({ name: "UnitRouterLink" });
const props = withDefaults(defineProps<UnitRouterLinkBaseProps>(), {
    to: "",
    exact: true,
    target: "_self",
    activeClass: "",
    easeActiveClass: "",
});

const useLink = computed<{ type: "router"; path: RouteLocationRaw } | { type: "link"; path: string }>(() => {
    if (typeof props.to === "object") {
        return { type: "router", path: props.to };
    } else {
        return /^https?:\/\//i.test(props.to) ? { type: "link", path: props.to } : { type: "router", path: props.to };
    }
});

/**
 * @see Regex101 expression: {@link https://regex101.com/r/1y7iod/1}
 */
// const isSiteLink = computed(() => {
//     return typeof prop.to === "object" ? true : /^\/(?!\/)/.test(prop.to);
// });
// /**
//  * @see Regex101 expression: {@link https://regex101.com/r/RnUseS/1}
//  */
// const externalLink = /^https?:\/\//i.test(props.to);
</script>
<style lang="scss" module>
.unit-router-link {
    //
}
</style>
