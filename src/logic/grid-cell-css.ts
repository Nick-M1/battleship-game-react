export default function getGridCellId(cellIndex: number, cellValue: number) {
    return `grid-cell-${cellIndex}-${cellValue}`
}

// export function getIndexFromGridCellId(id: string) {
//     return Number.parseInt(id.slice(12))
// }