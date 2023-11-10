import {Database} from "../../../database/supabase.ts";

type Props = {
    playerId: string
    thisPlayer: Database['battleships']['Tables']['players']['Row']
    gameSession: Database['battleships']['Tables']['game_sessions']['Row']
}

export default function GameJoining({ playerId, thisPlayer, gameSession }: Props) {
    return (
        <div className='min-h-screen scrollbar bg-neutral-800 bg-game-background'>
            WAITING
        </div>
    )
}