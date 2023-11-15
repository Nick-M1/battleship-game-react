import {calcTimeLeftSecs, hmsToSeconds} from "../logic/time-utils.ts";
import {useEffect, useState} from "react";
import skipMoveIfOverrunsTime from "../database/queries/game-session/increment-current-turn-of-game-session-by-id.ts";

export default function useGameTimer(gameSessionId: string, lastMoveDatetime: string, timePerMove: string) {
    const timePerMoveSecs = hmsToSeconds(timePerMove)
    const [timeLeftSecs, setTimeLeftSecs] = useState(calcTimeLeftSecs(lastMoveDatetime, timePerMove))
    const [displayMissedTurn, setDisplayMissedTurn] = useState(false)

    useEffect(() => {
        const invervalId = setInterval(() => setTimeLeftSecs(calcTimeLeftSecs(lastMoveDatetime, timePerMove)), 1000)
        return () => {
            clearInterval(invervalId)
        }
    }, [lastMoveDatetime, timePerMove])

    useEffect(() => {
        if (timeLeftSecs < 0)
            skipMoveIfOverrunsTime(gameSessionId)
                .then(() => setDisplayMissedTurn(true))
                .then(() => setTimeout(() => setDisplayMissedTurn(false), 2000))
    }, [gameSessionId, timeLeftSecs]);

    return [timePerMoveSecs, timeLeftSecs, displayMissedTurn] as const
}