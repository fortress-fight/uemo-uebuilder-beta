/*
 * @Description: gsap 插件
 * @Author: F-Stone
 * @LastEditTime: 2025-05-11 16:13:42
 */
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import SplitText from "gsap/SplitText";
import { gsap } from "gsap";

gsap.registerPlugin(ScrollToPlugin, DrawSVGPlugin, ScrollTrigger, SplitText, CustomEase);

export { gsap, ScrollToPlugin, ScrollTrigger, DrawSVGPlugin, SplitText, CustomEase };
