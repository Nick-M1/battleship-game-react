export function createIncrementingArray(min: number, max: number) {
    return Array.from({ length: max }, (_, i) => i + min)
}