type TYPE_OPTIONS = {
    title: string;
    default: string;
    options: { text: string; value: string }[];
};

const libList: Record<
    string,
    {
        name: string;
        theme: {
            title: string;
            options: { text: string; value: string; sub: TYPE_OPTIONS[] }[];
        };
        defaultAttrs: UE_TIPTAP_EXTENSION.LoopText["attrs"];
    }
> = {
    normal: {
        name: "常规",
        theme: {
            title: "展示",
            options: [{ text: "只显示文字", value: "NO02", sub: [] }],
        },
        defaultAttrs: {
            effect: "normal",
            theme: "NO01",
            body: [
                { id: "i-1", title: "网页设计" },
                { id: "i-2", title: "网页制作" },
                { id: "i-3", title: "网页发布" },
            ],
        },
    },
};

export default libList;
