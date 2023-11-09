export function coordToIndex(xCoordinate: number, yCoordinate: number) {
    return xCoordinate + ((yCoordinate - 1) * 10)
}

export function indexToCoord(index: number) {
    const indexFromZero = index - 1
    return { xCoordinate: (indexFromZero % 10) + 1, yCoordinate: Math.floor(indexFromZero / 10) + 1 }
}