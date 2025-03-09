export type ResourceButtonHoverEffect = ResourceButtonHoverEffectItem[];
export type ResourceButtonHoverEffectItem = {
    value: string;
    name: string;
    beforeIcon?: string;
    afterIcon?: string;
};

const lib: ResourceButtonHoverEffect = [
    { value: "moveUp", name: "上移" },
    { value: "shakeX", name: "横向抖动" },
    { value: "rubberBand", name: "橡皮筋" },
    { value: "scale", name: "放大" },
    { value: "moveLeft", name: "位移 (左)", beforeIcon: "icon-app-play" },
    { value: "moveRight", name: "位移 (右)", afterIcon: "icon-app-play" },
];

export default lib;
