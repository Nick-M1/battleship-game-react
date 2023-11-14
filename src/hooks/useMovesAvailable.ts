import {useEffect, useState} from "react";
import {Database} from "../database/supabase.ts";
import {supabase} from "../database/supabase_setup.ts";
import {getMoveSelectorId} from "../logic/id-generators/move-selector-id.ts";
import movesAvailableIncreaseHandler from "../logic/moves-available-increase-handler.ts";

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
                    if (payload.new.player_id !== playerId)
                        return

                    setMovesAvailable(prev => {
                        const newMovesAvailable = payload.new as Database['battleships']['Tables']['moves_available']['Row']

                        if (prev.quad_move_amount < newMovesAvailable.quad_move_amount)
                            movesAvailableIncreaseHandler(1)
                        else if (prev.scatter_move_amount < newMovesAvailable.scatter_move_amount)
                            movesAvailableIncreaseHandler(2)
                        else if (prev.nuke_move_amount < newMovesAvailable.nuke_move_amount)
                            movesAvailableIncreaseHandler(3)

                        return newMovesAvailable
                    })
                }
            )
            .subscribe()

        return () => {
            movesAvailableTblSubscribe.unsubscribe()
        }
    }, [gameSessionId, playerId])

    return movesAvailable
}