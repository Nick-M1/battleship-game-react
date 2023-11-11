import {Database} from "../../../database/supabase.ts";
import toast from "react-hot-toast";

type Props = {
    playerId: string
    thisPlayer: Database['battleships']['Tables']['players']['Row']
    gameSession: Database['battleships']['Tables']['game_sessions']['Row']
}

export default function GameJoining({ playerId, thisPlayer, gameSession }: Props) {
    async function copyToClipboard(text: string) {
        await navigator.clipboard.writeText(text)
        toast('Session ID copied to clipboard', { id: 'clipboard', icon: '📋' })
    }

    return (
        <div className='min-h-screen scrollbar bg-neutral-800 bg-game-background text-white font-riffic flex flex-col items-center justify-center'>
            <h2 className='text-center text-5xl animate-pulse'>Game Lobby</h2>
            <h3 className='text-center text-2xl text-gray-400 animate-pulse py-2'>Waiting for 2nd player to join</h3>

            <div className='flex items-center space-x-4 pt-8'>
                <h4 className='text-gray-500 w-32'>SESSION-ID:</h4>
                <div title='Copy to clipboard' onClick={() => copyToClipboard(gameSession.session_id)} className='input-primary-valid bg-white/5 hover:bg-white/10 active:bg-white/15 text-gray-400 cursor-pointer'>{ gameSession.session_id }</div>
            </div>
        </div>
    )
}