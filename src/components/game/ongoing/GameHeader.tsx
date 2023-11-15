import GameProfile from "./GameProfile.tsx";
import {Database} from "../../../database/supabase.ts";
import {calcTimeLeftSecs, hmsToSeconds} from "../../../logic/time-utils.ts";
import {useEffect, useState} from "react";
import EmojiKeyboard from "./emoji/EmojiKeyboard.tsx";
import ReceivedEmojis from "./emoji/ReceivedEmojis.tsx";

type Props = {
    gameSessionId: string
    thisPlayer: Database['battleships']['Tables']['players']['Row']
    otherPlayer: Database['battleships']['Tables']['players']['Row']
    isPlayersTurn: boolean
    lastMoveDatetime: string
    timePerMove: string
}

export default function GameHeader({ gameSessionId, thisPlayer, otherPlayer, isPlayersTurn, lastMoveDatetime, timePerMove }: Props) {
    const [emojiKeyboardOpen, setEmojiKeyboardOpen] = useState(false)

    //todo custom hook
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
            <GameProfile profile={thisPlayer} isThisPlayersTurn={isPlayersTurn} timeSecsLeft={isPlayersTurn ? timeLeftSecs : timePerMoveSecs} toLeft={true} onClick={() => setEmojiKeyboardOpen(prev => !prev)}/>
            <GameProfile profile={otherPlayer} isThisPlayersTurn={!isPlayersTurn} timeSecsLeft={isPlayersTurn ? timePerMoveSecs : timeLeftSecs} toLeft={false} onClick={() => {}}/>

            <EmojiKeyboard gameSessionId={gameSessionId} playerId={thisPlayer.player_id} emojiKeyboardOpen={emojiKeyboardOpen} setEmojiKeyboardClosed={() => setEmojiKeyboardOpen(false)}/>
            <ReceivedEmojis gameSessionId={gameSessionId} playerId={thisPlayer.player_id}/>
        </div>
    )
}