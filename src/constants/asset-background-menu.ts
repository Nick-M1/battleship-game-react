import {randomFromOne} from "../utils/number-utils.ts";


const MENU_BACKGROUNDS_CSS = [
    'bg-menu-background-1',
    'bg-menu-background-2',
    'bg-menu-background-3',
    'bg-menu-background-4',
    'bg-menu-background-5',
    'bg-menu-background-6'
]

const NUMBER_OF_MENU_BACKGROUNDS = MENU_BACKGROUNDS_CSS.length

export function getRandomMenuBackgroundCss() {
    const index = randomFromOne(NUMBER_OF_MENU_BACKGROUNDS) - 1
    return MENU_BACKGROUNDS_CSS[index]
}
