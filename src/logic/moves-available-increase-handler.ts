import {getMoveSelectorId} from "./id-generators/move-selector-id.ts";

const css = 'bg-white'

export default function movesAvailableIncreaseHandler(moveType: number) {
    const element = document.getElementById(getMoveSelectorId(moveType))

    if (element !== null) {
        element.classList.add(css)
        setTimeout(() => element.classList.remove(css), 1500)
    }
}