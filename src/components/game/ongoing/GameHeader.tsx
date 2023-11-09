import GameProfile from "./GameProfile.tsx";
import {Database} from "../../../database/supabase.ts";
import {calcTimeLeftSecs, hmsToSeconds} from "../../../logic/time-utils.ts";
import {useEffect, useState} from "react";

type Props = {
    thisPlayer: Database['battleships']['Tables']['players']['Row']
    otherPlayer: Database['battleships']['Tables']['players']['Row']
    isPlayersTurn: boolean
    lastMoveDatetime: string
    timePerMove: string
}

export default function GameHeader({ thisPlayer, otherPlayer, isPlayersTurn, lastMoveDatetime, timePerMove }: Props) {
    const timePerMoveSecs = hmsToSeconds(timePerMove)
    const [timeLeftSecs, setTimeLeftSecs] = useState(calcTimeLeftSecs(lastMoveDatetime, timePerMove))

    useEffect(() => {
        const invervalId = setInterval(() => setTimeLeftSecs(calcTimeLeftSecs(lastMoveDatetime, timePerMove)), 1000)
        return () => {
            clearInterval(invervalId)
        }
    }, [lastMoveDatetime, timePerMove]);


    return (
        <div className='flex justify-center space-x-1 pb-3'>
            <GameProfile profile={thisPlayer} isThisPlayersTurn={isPlayersTurn} timeSecsLeft={isPlayersTurn ? timeLeftSecs : timePerMoveSecs} toLeft={true}/>
            <GameProfile profile={otherPlayer} isThisPlayersTurn={!isPlayersTurn} timeSecsLeft={isPlayersTurn ? timePerMoveSecs : timeLeftSecs} toLeft={false}/>
        </div>
    )
}