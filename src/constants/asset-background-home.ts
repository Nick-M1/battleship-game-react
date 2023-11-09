import {randomFromOne} from "../utils/number-utils.ts";

const HOME_BACKGROUNDS_CSS = [
    'bg-home-background-1',
    'bg-home-background-2',
    'bg-home-background-3',
    'bg-home-background-4',
    'bg-home-background-5',
    'bg-home-background-6',
    'bg-home-background-7',
    'bg-home-background-8',
    'bg-home-background-9',
    'bg-home-background-10',
    'bg-home-background-11',
]

const NUMBER_OF_HOME_BACKGROUNDS = HOME_BACKGROUNDS_CSS.length

export function getRandomHomeBackgroundCss() {
    const index = randomFromOne(NUMBER_OF_HOME_BACKGROUNDS) - 1
    return HOME_BACKGROUNDS_CSS[index]
}
