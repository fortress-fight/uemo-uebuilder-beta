import NProgress from "nprogress";
import "./style.scss";

NProgress.configure({
    template: `
        <div id="loading-box">
            <span class="loading-message"> 加载中... </span>
            <div id="loading-inner">
                <div class="bar" role="bar"></div>
            </div>
        </div>
    `,
    trickleSpeed: 100,
    showSpinner: false,
});

export default NProgress;
