<!--
 * @Description: 测试菜单组件
 * @Author: F-Stone
 * @LastEditTime: 2025-02-27 18:56:40
-->
<template>
    <TestArea
        :class="$style['test-area']"
        :testValue="testValue"
        :testValueList="testValueList"
        v-model:testValueSelect="testValueSelect"
        title="测试菜单组件"
    >
        <UeElContextmenu v-bind="testValue">
            <!--  -->
        </UeElContextmenu>
    </TestArea>
</template>
<script lang="ts" setup>
import TestArea from "~/demo/components/TestArea.vue";

// 测试数据
const testValueSelect = ref<number>(0);
const testValueList: (UE_EL_COMPONENT.UeElContextmenuProps & { testOptionTitle?: string })[] = [
    {
        list: [
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
        ],
    },
];
const testValue = ref(testValueList[testValueSelect.value]);

watch(testValueSelect, (newValue) => {
    testValue.value = testValueList[newValue];
});
</script>
<style lang="scss" module>
.test-area {
    // init
}
</style>
