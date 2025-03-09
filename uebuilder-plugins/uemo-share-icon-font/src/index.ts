const svgContext = require.context("./../svgo-clean/", true, /\.svg$/);
svgContext.keys().forEach(svgContext);

const rawSvgContext = require.context("./../svg-raw/", true, /\.svg$/);
rawSvgContext.keys().forEach(rawSvgContext);

// const requireAll = (requireContext) => {
//     requireContext.keys().map(requireContext);
// };
// requireAll(req);
// require.context("./", true, /\.svg$/).keys().map(requireContext);

// const componentsContext = require.context('./components', true, /index.vue$/)
// componentsContext.keys().forEach(component => {
//     // 获取文件中的 default 模块
//     const componentConfig = componentsContext(component).default
//     Vue.component(componentConfig.name, componentConfig)
// })
