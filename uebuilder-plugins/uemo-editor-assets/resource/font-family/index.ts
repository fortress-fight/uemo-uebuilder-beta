import type { UeElFontTypes } from "./utils/get-fonts";

import { getFontLib } from "./utils/get-fonts";

export type ResourceFontFamilyItem = UeElFontTypes.FONT_ITEM;

export type ResourceFontFamily = UeElFontTypes.FONT_DATA;

const getFontFamily: () => Promise<ResourceFontFamily> = async () => {
    return await getFontLib();
};

export default getFontFamily;
