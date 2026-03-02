/**
 * 清除菜单项中处于两端的 "|" 符号
 */
export function clearMenuItems<T extends (UE_TIPTAP_UNIT.OperItem | "|")[]>(menu: T): T {
    while (menu.length && (menu[menu.length - 1] === "|" || menu[0] === "|")) {
        if (menu[menu.length - 1] === "|") {
            menu.pop();
        } else if (menu[0] === "|") {
            menu.shift();
        }
    }
    return menu.filter((value, index) => value !== menu[index + 1]) as T;
}
