import {Database} from "../database/supabase.ts";
import {useEffect, useState} from "react";
import {supabase} from "../database/supabase_setup.ts";

export default function useGameSession(gameSessionInitial: Database['battleships']['Tables']['game_sessions']['Row']) {
    const [gameSession, setGameSession] = useState(gameSessionInitial)

    useEffect(() => {
        const gameSessionTblSubscribe = supabase.channel('game_sessions')
            .on('postgres_changes',
                { event: 'UPDATE', schema: 'battleships', table: 'game_sessions', filter: `session_id=eq.${gameSessionInitial.session_id}` },
                (payload) => setGameSession(payload.new as Database['battleships']['Tables']['game_sessions']['Row'])
            )
            .subscribe()

        return () => {
            gameSessionTblSubscribe.unsubscribe()
        }
    }, [gameSessionInitial.session_id])

    return gameSession
}