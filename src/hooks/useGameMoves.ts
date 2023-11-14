import {useEffect, useState} from "react";
import {Database} from "../database/supabase.ts";
import {supabase} from "../database/supabase_setup.ts";
import getGridCellId from "../logic/grid-cell-css.ts";
import {coordToIndex} from "../utils/coordinate-utils.ts";
import {DROP_PIECE_CSS} from "../constants/css-constants.ts";
import getMoves from "../database/queries/moves/get-moves.ts";
import {smoothScroll} from "../utils/smooth-scroll.ts";
import {getGameGridId} from "../logic/id-generators/game-grid-id.ts";

export default function useGameMoves(
    playerId: string,
    otherPlayerId: string,
    gameSessionId: string,
    thisPlayerMovesInitial: Database['battleships']['Tables']['moves']['Row'][],
    otherPlayerMovesInitial: Database['battleships']['Tables']['moves']['Row'][]
) {

    const [thisPlayerMoves, setThisPlayerMoves] = useState(thisPlayerMovesInitial)
    const [otherPlayerMoves, setOtherPlayerMoves] = useState(otherPlayerMovesInitial)

    //todo sound effects based on move type
    useEffect(() => {
        const movesTblSubscribe = supabase.channel('moves')
            .on('postgres_changes',
                { event: 'INSERT', schema: 'battleships', table: 'moves', filter: `session_id=eq.${gameSessionId}` },
                async (payload) => {
                    const newMove = {
                        created_at: payload.new.created_at,
                        session_id: payload.new.session_id,
                        player_id: payload.new.player_id,
                        result: payload.new.result,
                        x_coordinate: payload.new.x_coordinate,
                        y_coordinate: payload.new.y_coordinate
                    } as Database['battleships']['Tables']['moves']['Row']


                    if (payload.new.result === 'sunk' && payload.new.player_id === playerId) {
                        setThisPlayerMoves(await getMoves(gameSessionId, playerId))
                        displayGridCellCssIfThisPlayerMove(payload.new.x_coordinate, payload.new.y_coordinate)
                        smoothScroll(getGameGridId(0), "start")

                    } else if (payload.new.result === 'sunk' && payload.new.player_id === otherPlayerId) {
                        setOtherPlayerMoves(await getMoves(gameSessionId, otherPlayerId))
                        smoothScroll(getGameGridId(1), "end")

                    } else if (payload.new.player_id === playerId) {
                        setThisPlayerMoves(prev => [...prev, newMove])
                        displayGridCellCssIfThisPlayerMove(payload.new.x_coordinate, payload.new.y_coordinate)
                        smoothScroll(getGameGridId(0), "start")

                    } else {
                        setOtherPlayerMoves(prev => [...prev, newMove])
                        smoothScroll(getGameGridId(1), "end")
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



function displayGridCellCssIfThisPlayerMove(xCoordinate: number, yCoordinate: number) {
    const elem = document.getElementById(getGridCellId(1, coordToIndex(xCoordinate, yCoordinate)))
    elem?.classList.add(DROP_PIECE_CSS)

    setTimeout(() => elem?.classList.remove(DROP_PIECE_CSS), 200)
}