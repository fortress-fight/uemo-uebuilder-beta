<template>
    <UeElContextmenu :class="$style['more-oper-panel']" :list="contextmenuProps" :trigger="triggerCommand" />
</template>
<script lang="ts" setup>
const _props = defineProps<{ test: string }>();

const contextmenuProps = computed<UE_EL_COMPONENT.UeElContextmenuProps["list"]>(() => {
    return [
        [
            {
                text: "粘贴属性",
                type: "pastAttrs",
                enable: true,
                subList: [
                    [
                        { type: "pastAttrs", text: "粘贴属性", hotkey: "⌘+V", enable: true },
                        {
                            type: "pastAttrs",
                            text: "粘贴属性",
                            hotkey: "⌘+V",
                            enable: true,
                            subList: [
                                [
                                    { type: "pastAttrs", text: "粘贴属性", hotkey: "⌘+V", enable: true },
                                    {
                                        type: "pastAttrs",
                                        text: "粘贴属性",
                                        hotkey: "⌘+V",
                                        enable: true,
                                    },
                                ],
                                [
                                    { type: "pastAttrs", text: "粘贴属性", hotkey: "⌘+V", enable: true },
                                    { type: "pastAttrs", text: "粘贴属性", hotkey: "⌘+V", enable: true },
                                ],
                            ],
                        },
                    ],
                    [
                        { type: "pastAttrs", text: "粘贴属性", hotkey: "⌘+V", enable: true },
                        { type: "pastAttrs", text: "粘贴属性", hotkey: "⌘+V", enable: true },
                    ],
                ],
            },
        ],
        [{ type: "copyAttrs", text: "复制属性", hotkey: "⌘+C", enable: true }],
        [{ type: "themeChange", text: "主题样式调节", hotkey: "", enable: false }],
    ];
});

const triggerCommand: UE_EL_COMPONENT.UeElContextmenuProps["trigger"] = function (type, data) {
    // eslint-disable-next-line no-console
    console.log("data", type, data);
};
</script>
<style lang="scss" module>
.more-oper-panel {
    // init
}
</style>
