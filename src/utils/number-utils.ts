export function randomFromOne(max: number) {
    return Math.floor(Math.random() * max) + 1
}

export function mapToOrdinalSuffix(num: number) {
    const j = num % 10
    const k = num % 100;

    if (j == 1 && k != 11)
        return num + "st";
    if (j == 2 && k != 12)
        return num + "nd";
    if (j == 3 && k != 13)
        return num + "rd";

    return num + "th";
}

export function formatDate(timestamp: number) {
    return new Date(timestamp).toISOString().substring(0,10)
}