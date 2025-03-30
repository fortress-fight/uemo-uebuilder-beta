import { _flatMap } from "@stone/uemo-editor-utils/lib/lodash";

import SmileyEmotion from "../svg/smiley-emotion.svg";
import PeopleBody from "../svg/people-body.svg";
import AnimalsNature from "../svg/animals-nature.svg";
import FoodDrink from "../svg/food-drink.svg";
import TravelPlaces from "../svg/travel-places.svg";
import Activities from "../svg/activities.svg";
import Objects from "../svg/objects.svg";
import Symbols from "../svg/symbols.svg";
import Flags from "../svg/flags.svg";

export const categoryMap: Record<string, string> = {
    "Smileys & Emotion": SmileyEmotion,
    "People & Body": PeopleBody,
    "Animals & Nature": AnimalsNature,
    "Food & Drink": FoodDrink,
    "Travel & Places": TravelPlaces,
    Activities: Activities,
    Objects: Objects,
    Symbols: Symbols,
    Flags: Flags,
};

export function getEmojiList() {
    return Promise.all([
        import("@stone/uemo-editor-utils/lib/emoji"),
        import("@stone/uemo-editor-utils/lib/fuse"),
    ]).then(([e, f]) => {
        const list = e.emojiJson;
        const fuse = new f.Fuse(
            _flatMap(list, (item) => item.emojis),
            { keys: ["slug"] }
        );
        return { list, fuse };
    });
}
