import {useEffect, useState} from "react";
import {Database} from "../database/supabase.ts";
import {supabase} from "../database/supabase_setup.ts";

export default function useMovesAvailable(
    playerId: string,
    gameSessionId: string,
    movesAvailableInitial: Database['battleships']['Tables']['moves_available']['Row']
) {

    const [movesAvailable, setMovesAvailable] = useState(movesAvailableInitial)

    useEffect(() => {
        const movesAvailableTblSubscribe = supabase.channel('moves_available')
            .on('postgres_changes',
                { event: 'UPDATE', schema: 'battleships', table: 'moves_available', filter: `session_id=eq.${gameSessionId}` },
                (payload) => {
                    if (payload.new.player_id === playerId)
                        setMovesAvailable(payload.new as Database['battleships']['Tables']['moves_available']['Row'])
                }
            )
            .subscribe()

        return () => {
            movesAvailableTblSubscribe.unsubscribe()
        }
    }, [gameSessionId, playerId])

    return movesAvailable
}