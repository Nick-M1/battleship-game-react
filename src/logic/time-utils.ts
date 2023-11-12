export function hmsToSeconds(hms: string) {
    const splitArr = hms.split(':')
    return (+ splitArr[0]) * 60 * 60 + (+ splitArr[1]) * 60 + (+ splitArr[2])
}

export function calcTimeLeftSecs(modifiedAt: string, timePerMove: string) {
    const modifiedAtUnix = new Date(modifiedAt).getTime()
    const nowUnix = Date.now()
    const timePerMoveMilisecs = hmsToSeconds(timePerMove) * 1000

    return Math.floor((modifiedAtUnix + timePerMoveMilisecs - nowUnix) / 1000)
}

export function calcTimeSinceStart(startTime: string, startTimeCount: number) {
    return Math.floor((new Date(startTime).getTime() - Date.now()) / 1000 + startTimeCount)
}