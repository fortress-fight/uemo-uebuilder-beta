export type ResourceIconItem = {
    id: string;
    name: string;
    nameCN: string;
    source: string;
    data: { title: string; name: string }[];
};

export type ResourceIconGroup = {
    id: string;
    name: string;
    getData: () => Promise<ResourceIconItem[]>;
};

export type ResourceIcon = ResourceIconGroup[];

const iconLibList: ResourceIcon = [
    { id: "0", name: "IconPark", getData: () => import("./utils/iconpark").then((res) => res.default) },
    { id: "1", name: "Other", getData: () => import("./utils/other").then((res) => res.default) },
];

export default iconLibList;
