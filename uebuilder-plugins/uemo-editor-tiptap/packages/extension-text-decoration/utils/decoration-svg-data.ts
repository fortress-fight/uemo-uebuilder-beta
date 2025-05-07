import $pageStyle from "../../../src/app.module.scss";

type DecorationSvgData = {
    dom: [
        string,
        { viewBox: string; class: string; preserveAspectRatio: string; "data-svg-name": string },
        (string | { d: string; fill: string })[],
    ];
};

const decorationSvgData: Record<string, DecorationSvgData> = {
    "line-1": {
        dom: [
            "http://www.w3.org/2000/svg svg",
            {
                viewBox: "0 0 278 8",
                class: $pageStyle["text-decoration-svg-box"],
                preserveAspectRatio: "none",
                "data-svg-name": "line-1",
            },
            ["http://www.w3.org/2000/svg path", { d: "M0 4H139H278", fill: "none" }],
        ],
    },
    "line-2": {
        dom: [
            "http://www.w3.org/2000/svg svg",
            {
                viewBox: "0 0 279 49",
                class: $pageStyle["text-decoration-svg-box"],
                preserveAspectRatio: "none",
                "data-svg-name": "line-2",
            },
            ["http://www.w3.org/2000/svg path", { d: "M0.5 24.5H139.5H278.5", fill: "none" }],
        ],
    },
    "line-3": {
        dom: [
            "http://www.w3.org/2000/svg svg",
            {
                viewBox: "0 0 279 19",
                class: $pageStyle["text-decoration-svg-box"],
                preserveAspectRatio: "none",
                "data-svg-name": "line-3",
            },
            [
                "http://www.w3.org/2000/svg path",
                {
                    d: "M3 16C25.3158 10.0734 54.2182 5.62852 118.315 3.48837C149.773 2.43799 194.995 2.66524 276 8.42717",
                    fill: "none",
                },
            ],
        ],
    },
    "line-4": {
        dom: [
            "http://www.w3.org/2000/svg svg",
            {
                viewBox: "0 0 268 29",
                class: $pageStyle["text-decoration-svg-box"],
                preserveAspectRatio: "none",
                "data-svg-name": "line-4",
            },
            [
                "http://www.w3.org/2000/svg path",
                {
                    d: "M3 7.92774C111.931 -0.104371 263.564 3.40968 264.435 6.42172C278.378 9.43376 29.5792 17.9679 22.6076 22.4859C15.636 27.004 95.3738 23.992 173.369 26",
                    fill: "none",
                },
            ],
        ],
    },
    "line-5": {
        dom: [
            "http://www.w3.org/2000/svg svg",
            {
                viewBox: "0 0 305 93",
                class: $pageStyle["text-decoration-svg-box"],
                preserveAspectRatio: "none",
                "data-svg-name": "line-5",
            },
            [
                "http://www.w3.org/2000/svg path",
                {
                    d: "M250.485 4.26033C250.485 4.26033 43.0408 -6.90191 7.85761 42.884C-28.0157 93.6466 178.978 96.7392 251.642 82.0595C370.448 58.0576 249.647 9.58681 160.264 16.4169",
                    fill: "none",
                },
            ],
        ],
    },
    "line-6": {
        dom: [
            "http://www.w3.org/2000/svg svg",
            {
                viewBox: "0 0 274 36",
                class: $pageStyle["text-decoration-svg-box"],
                preserveAspectRatio: "none",
                "data-svg-name": "line-6",
            },
            [
                "http://www.w3.org/2000/svg path",
                {
                    d: "M3.77148 32.2612C3.77148 32.2612 68.9934 -11.9845 59.8464 9.74331C50.6994 31.4711 47.8679 39.9853 86.4919 15.274C109.956 0.262076 82.515 30.681 123.875 27.5206C149.502 25.5624 195.519 -0.649703 270.227 11.7186",
                    fill: "none",
                },
            ],
        ],
    },
};

export default decorationSvgData;
