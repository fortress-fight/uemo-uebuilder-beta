import type { Config } from "svgo";

// @ts-ignore
import { optimize } from "svgo/dist/svgo.browser";

export const svgoOptimizeParam: Config = {
    plugins: [
        {
            name: "preset-default",
            params: {
                overrides: {
                    removeViewBox: false,
                    convertPathData: {
                        applyTransforms: true,
                        applyTransformsStroked: true,
                        straightCurves: true,
                        convertToQ: true,
                        lineShorthands: true,
                        convertToZ: true,
                        curveSmoothShorthands: false,
                        floatPrecision: 3,
                        transformPrecision: 5,
                        smartArcRounding: true,
                        removeUseless: true,
                        collapseRepeated: true,
                        utilizeAbsolute: true,
                        negativeExtraSpace: true,
                        forceAbsolutePath: false,
                    },
                },
            },
        },
    ],
};

export { optimize };
