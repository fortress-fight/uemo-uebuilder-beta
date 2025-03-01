<template>
    <div :class="$style['nav-bar']" class="flex justify-center items-center">
        <UeElSelect v-model:value="currentLang" title="测试选择器" :options="langOptions" />
        <RouterLink v-for="(item, index) in linkList" :key="index" exact :class="$style['link']" :to="item.path">
            {{ item.text }}
        </RouterLink>
    </div>
    <RouterView />
</template>
<script lang="ts" setup>
const linkList = ref([
    { path: "/", text: "当前编辑" },
    { path: "/editor-unit", text: "基础组件" },
    { path: "/editor-attr", text: "属性组件" },
    { path: "/editor-panel", text: "复杂组件" },
    { path: "/editor-resource/panel", text: "资源组件" },
    { path: "/editor-lib-panel", text: "库组件" },
]);

const { locale } = useI18n();
const langOptions = ref([
    { value: "en", text: "English" },
    { value: "zh-cn", text: "中文" },
]);
const currentLang = computed({
    get() {
        return locale.value;
    },
    set(v) {
        locale.value = v;
        localStorage.setItem("lang", currentLang.value);
    },
});
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
