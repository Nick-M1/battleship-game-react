export function randomFromOne(max: number) {
    return Math.floor(Math.random() * max) + 1
}

export function formatDate(timestamp: number) {
    return new Date(timestamp).toISOString().substring(0,10)
}