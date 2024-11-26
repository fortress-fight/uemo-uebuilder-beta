<template>
    <div :class="$style['nav-bar']" class="flex justify-center">
        <RouterLink v-for="(item, index) in linkList" :key="index" exact :class="$style['link']" :to="item.path">
            {{ item.text }}
        </RouterLink>
    </div>
    <RouterView />
</template>
<script lang="ts" setup>
const linkList = ref([
    { path: "/", text: "当前编辑" },
    { path: "/editor-panel", text: "模块面板" },
    { path: "/editor-unit", text: "TipTap 面板" },
]);
const className = useCssModule();

console.log("className", className);
</script>
<style lang="scss" module>
.nav-bar {
    margin-bottom: 20px;
    padding: 20px;

    gap: 20px;
    .link {
        padding: 10px 20px;

        border-radius: 6px;
        background-color: #eee;
        &:global(.router-link-active) {
            color: #fff;
            background-color: #000;
        }
    }
}
</style>
