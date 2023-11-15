import GameProfile from "./GameProfile.tsx";
import {Database} from "../../../database/supabase.ts";
import {calcTimeLeftSecs, hmsToSeconds} from "../../../logic/time-utils.ts";
import {useEffect, useState} from "react";
import EmojiKeyboard from "./emoji/EmojiKeyboard.tsx";
import ReceivedEmojis from "./emoji/ReceivedEmojis.tsx";
import skipMoveIfOverrunsTime
    from "../../../database/queries/game-session/increment-current-turn-of-game-session-by-id.ts";
import useGameTimer from "../../../hooks/useGameTimer.ts";

type Props = {
    gameSessionId: string
    thisPlayer: Database['battleships']['Tables']['players']['Row']
    otherPlayer: Database['battleships']['Tables']['players']['Row']
    isPlayersTurn: boolean
    lastMoveDatetime: string
    timePerMove: string
}

export default function GameHeader({ gameSessionId, thisPlayer, otherPlayer, isPlayersTurn, lastMoveDatetime, timePerMove }: Props) {
    const [timePerMoveSecs, timeLeftSecs, displayMissedTurn] = useGameTimer(gameSessionId, lastMoveDatetime, timePerMove)
    const [emojiKeyboardOpen, setEmojiKeyboardOpen] = useState(false)

    return (
        <div className='flex justify-center space-x-1 pb-3'>
            <GameProfile profile={thisPlayer} isThisPlayersTurn={isPlayersTurn} timeSecsLeft={isPlayersTurn ? timeLeftSecs : timePerMoveSecs} toLeft={true} onClick={() => setEmojiKeyboardOpen(prev => !prev)}/>
            <GameProfile profile={otherPlayer} isThisPlayersTurn={!isPlayersTurn} timeSecsLeft={isPlayersTurn ? timePerMoveSecs : timeLeftSecs} toLeft={false} onClick={() => {}}/>

            <EmojiKeyboard gameSessionId={gameSessionId} playerId={thisPlayer.player_id} emojiKeyboardOpen={emojiKeyboardOpen} setEmojiKeyboardClosed={() => setEmojiKeyboardOpen(false)}/>
            <ReceivedEmojis gameSessionId={gameSessionId} playerId={thisPlayer.player_id}/>

            { displayMissedTurn && <div className={`z-20 absolute animate-moveDown text-5xl pointer-events-none opacity-0 text-teal-500`}>Missed Turn</div> }
        </div>
    )
}