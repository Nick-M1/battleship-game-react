export function dateTimeFormatter(dateStr: string) {
    const date = new Date(dateStr)
    return date.toISOString().slice(0, 10)
}
