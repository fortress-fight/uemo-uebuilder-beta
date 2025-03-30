/*
 * @Description: gsap 插件
 * @Author: F-Stone
 * @LastEditTime: 2025-02-23 02:12:33
 */
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";
import { DrawSVGPlugin } from "./utils/gsap-draw-svg-plugin";
import SplitText from "./utils/gsap-split-text-plugin";
import { gsap } from "gsap";

gsap.registerPlugin(ScrollToPlugin, DrawSVGPlugin, ScrollTrigger, SplitText, CustomEase);

export { gsap, ScrollToPlugin, ScrollTrigger, DrawSVGPlugin, SplitText, CustomEase };
