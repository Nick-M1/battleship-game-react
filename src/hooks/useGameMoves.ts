import {useEffect, useState} from "react";
import {Database} from "../database/supabase.ts";
import {supabase} from "../database/supabase_setup.ts";
import getGridCellId from "../logic/grid-cell-css.ts";
import {coordToIndex} from "../utils/coordinate-utils.ts";
import {DROP_PIECE_CSS} from "../constants/css-constants.ts";

export default function useGameMoves(
    playerId: string,
    gameSessionId: string,
    thisPlayerMovesInitial: Database['battleships']['Tables']['moves']['Row'][],
    otherPlayerMovesInitial: Database['battleships']['Tables']['moves']['Row'][]
) {

    const [thisPlayerMoves, setThisPlayerMoves] = useState(thisPlayerMovesInitial)
    const [otherPlayerMoves, setOtherPlayerMoves] = useState(otherPlayerMovesInitial)

    //todo cleanup
    useEffect(() => {
        const movesTblSubscribe = supabase.channel('moves')
            .on('postgres_changes',
                { event: 'INSERT', schema: 'battleships', table: 'moves', filter: `session_id=eq.${gameSessionId}` },
                (payload) => {
                    const newMove = {
                        created_at: payload.new.created_at,
                        session_id: payload.new.session_id,
                        player_id: payload.new.player_id,
                        result: payload.new.result,
                        x_coordinate: payload.new.x_coordinate,
                        y_coordinate: payload.new.y_coordinate
                    } as Database['battleships']['Tables']['moves']['Row']

                    if (payload.new.player_id === playerId) {
                        setThisPlayerMoves(prev => [...prev, newMove])

                        const elem = document.getElementById(getGridCellId(1, coordToIndex(payload.new.x_coordinate, payload.new.y_coordinate)))
                        elem?.classList.add(DROP_PIECE_CSS)

                        setTimeout(() => elem?.classList.remove(DROP_PIECE_CSS), 200)

                    } else {
                        setOtherPlayerMoves(prev => [...prev, newMove])
                    }
                }
            )
            .subscribe()

        return () => {
            movesTblSubscribe.unsubscribe()
        }
    }, [gameSessionId, playerId])

    return [thisPlayerMoves, otherPlayerMoves] as const
}