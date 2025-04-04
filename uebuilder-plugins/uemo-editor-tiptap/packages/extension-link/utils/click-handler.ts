// import { getAttributes } from "@tiptap/core";
import { MarkType } from "@tiptap/pm/model";
import { Plugin, PluginKey } from "@tiptap/pm/state";

type ClickHandlerOptions = {
    type: MarkType;
};

export function clickHandler(_options: ClickHandlerOptions): Plugin {
    return new Plugin({
        key: new PluginKey("handleClickLink"),
        props: {
            handleClick: (view, _pos, event) => {
                if (event.button !== 0) {
                    return false;
                }

                if (!view.editable) {
                    return false;
                }

                const el = event.target as HTMLElement;
                if (el.closest("a") || el.tagName.toUpperCase() === "A") {
                    return false;
                }

                // let a = event.target as HTMLElement;
                // const els = [];

                // while (a.nodeName !== "DIV") {
                //     els.push(a);
                //     a = a.parentNode as HTMLElement;
                // }

                // if (!els.find((value) => value.nodeName === "A")) {
                //     return false;
                // }

                // const attrs = getAttributes(view.state, options.type.name);
                // const link = event.target as HTMLAnchorElement;

                // const href = link?.href ?? attrs.href;
                // const target = link?.target ?? attrs.target;

                // if (link && href) {
                //     window.open(href, target);

                //     return true;
                // }

                // return false;
            },
        },
    });
}
