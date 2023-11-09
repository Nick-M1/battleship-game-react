export function createIncrementingArray(length: number) {
    return Array.from({ length }, (_, i) => i + 1)
}