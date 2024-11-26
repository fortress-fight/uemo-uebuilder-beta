/*
 * @Description: tailwind.config 配置文件
 * @Author: F-Stone
 * @LastEditTime: 2023-12-16 02:01:12
 */
const colors = require("tailwindcss/colors");

delete colors["lightBlue"];
delete colors["warmGray"];
delete colors["trueGray"];
delete colors["coolGray"];
delete colors["blueGray"];

module.exports = {
    theme: {
        colors: {
            ...colors,
            blue: {
                DEFAULT: "#4470f3",
            },
        },
        screens: {
            xxl: { max: 1440 - 0.02 + "px" },
            xl: { max: 1200 - 0.02 + "px" },
            lg: { max: 992 - 0.02 + "px" },
            md: { max: 768 - 0.02 + "px" },
            sm: { max: 576 - 0.02 + "px" },
            xs: { max: "0" },
        },
        fontSize: {
            xs: "12px",
            sm: "14px",
            base: "16px",
            lg: "18px",
            xl: "20px",
            "2xl": "24px",
            "3xl": "30px",
            "4xl": "36px",
            "5xl": "48px",
            "6xl": "60px",
            "7xl": "72px",
        },
        spacing: {
            px: "1px",
            0: "0",
            0.5: "2px",
            1: "4px",
            1.5: "6px",
            2: "8px",
            2.5: "10px",
            3: "12px",
            3.5: "14px",
            4: "16px",
            5: "20px",
            6: "24px",
            7: "28px",
            8: "32px",
            9: "36px",
            10: "40px",
            11: "44px",
            12: "48px",
            14: "56px",
            16: "64px",
            20: "80px",
            24: "96px",
            28: "112px",
            32: "128px",
            36: "144px",
            40: "160px",
            44: "176px",
            48: "192px",
            52: "208px",
            56: "224px",
            60: "240px",
            64: "256px",
            72: "288px",
            80: "320px",
            96: "384px",
        },
        extend: {
            lineHeight: {
                3: "12px",
                4: "16px",
                5: "20px",
                6: "24px",
                7: "28px",
                8: "32px",
                9: "36px",
                10: "40px",
            },
        },
    },
    plugins: [],
    content: [`src/**/*.vue`, `packages/**/*.vue`, `demo/**/*.vue`],
};
