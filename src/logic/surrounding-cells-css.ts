import getGridCellId from "./grid-cell-css.ts";

//todo refactor to coords only
//todo stop going onto new lines -> filter if value+num goes over a 10

function quadMoveSurroundingCssOnMouseEnter(value: number) {
    [-10, -1, 1, 10].forEach(num => document.getElementById(getGridCellId(1, value + num))?.classList.add('[&>*]:!fill-black/25', '[&>*]:scale-110'))
}
function quadMoveSurroundingCssOnMouseLeave(value: number) {
    [-10, -1, 1, 10].forEach(num => document.getElementById(getGridCellId(1, value + num))?.classList.remove('[&>*]:!fill-black/25', '[&>*]:scale-110'))
}

function nukeMoveSurroundingCssOnMouseEnter(value: number) {
    [-20, -11, -10, -9, -2, -1, 1, 2, 9, 10, 11, 20].forEach(num => document.getElementById(getGridCellId(1, value + num))?.classList.add('[&>*]:!fill-black/25', '[&>*]:scale-110'))
}
function nukeMoveSurroundingCssOnMouseLeave(value: number) {
    [-20, -11, -10, -9, -2, -1, 1, 2, 9, 10, 11, 20].forEach(num => document.getElementById(getGridCellId(1, value + num))?.classList.remove('[&>*]:!fill-black/25', '[&>*]:scale-110'))
}



export default function surroundingCellsCss(moveType: number) {
    switch (moveType) {
        case 1: return { onMouseEnter: quadMoveSurroundingCssOnMouseEnter, onMouseLeave: quadMoveSurroundingCssOnMouseLeave }
        case 3: return { onMouseEnter: nukeMoveSurroundingCssOnMouseEnter, onMouseLeave: nukeMoveSurroundingCssOnMouseLeave }
        default: return { onMouseEnter: () => {}, onMouseLeave: () => {} }
    }
}