import {useEffect, useState} from "react";
import {calcTimeSinceStart} from "../logic/time-utils.ts";

export default function useTimeSinceStart(startTime: string, currentTurn: number) {
    const [timeSinceStart, setTimeSinceStart] = useState(calcTimeSinceStart(startTime, 5))

    useEffect(() => {
        if (currentTurn === 1) {
            const invervalId = setInterval(() => setTimeSinceStart(calcTimeSinceStart(startTime, 5)), 500)
            return () => {
                clearInterval(invervalId)
            }
        }
    }, [currentTurn, startTime])

    return timeSinceStart
}