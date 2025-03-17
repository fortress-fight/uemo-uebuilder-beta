/* eslint-disable @typescript-eslint/no-require-imports */
export type ResourceTextDecoration = ResourceTextDecorationItem[];
export type ResourceTextDecorationItem = { name: string; thumb: string; value: string };

export const textDecorationOptions: ResourceTextDecoration = [
    {
        name: "line-1",
        thumb: require("../assets/images/line-1.png"),
        value: "line-1",
    },
    {
        name: "line-2",
        thumb: require("../assets/images/line-2.png"),
        value: "line-2",
    },
    {
        name: "line-3",
        thumb: require("../assets/images/line-3.png"),
        value: "line-3",
    },
    {
        name: "line-4",
        thumb: require("../assets/images/line-4.png"),
        value: "line-4",
    },
    {
        name: "line-5",
        thumb: require("../assets/images/line-5.png"),
        value: "line-5",
    },
    {
        name: "line-6",
        thumb: require("../assets/images/line-6.png"),
        value: "line-6",
    },
];
