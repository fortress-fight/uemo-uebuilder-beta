/*
 * @Description: 字号映射表
 * @Author: F-Stone
 * @LastEditTime: 2025-07-10 19:41:22
 */

export const DEFAULT_FONT_SIZE = "14px";

export const fontSizePreset = {
    "12px": { desktop: "12px", mobile: "12px" },
    "14px": { desktop: "14px", mobile: "14px" },
    "16px": { desktop: "16px", mobile: "14px" },
    "18px": { desktop: "18px", mobile: "14px" },
    "20px": { desktop: "20px", mobile: "14px" },
    "22px": { desktop: "22px", mobile: "18px" },
    "24px": { desktop: "24px", mobile: "18px" },
    "26px": { desktop: "26px", mobile: "18px" },
    "28px": { desktop: "28px", mobile: "18px" },
    "30px": { desktop: "30px", mobile: "24px" },
    "32px": { desktop: "32px", mobile: "24px" },
    "34px": { desktop: "34px", mobile: "24px" },
    "36px": { desktop: "36px", mobile: "24px" },
    "38px": { desktop: "38px", mobile: "24px" },
    "40px": { desktop: "40px", mobile: "28px" },
    "48px": { desktop: "48px", mobile: "30px" },
    "60px": { desktop: "60px", mobile: "32px" },
    "72px": { desktop: "72px", mobile: "36px" },
    "84px": { desktop: "84px", mobile: "42px" },
    "94px": { desktop: "94px", mobile: "45px" },
    "128px": { desktop: "128px", mobile: "60px" },
} as Record<string, { desktop: string; mobile: string }>;
