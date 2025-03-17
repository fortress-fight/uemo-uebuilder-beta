export function initSvgIconComponent() {
    if (customElements.get("ue-svg-viewer")) return Promise.resolve();

    // @ts-expect-error
    return import(/* webpackChunkName: "svg-components" */ "./utils/component").catch((err) => console.error(err));
}
