import {useEffect, useMemo, useState} from "react";
import {Database} from "../../../database/supabase.ts";
import {GetBoatLocationsFunctionReturns} from "../../../database/queries/boat-locations/get-boat-locations.ts";
import {supabase} from "../../../database/supabase_setup.ts";
import {DROP_PIECE_CSS} from "../../../constants/css-constants.ts";
import getGridCellId from "../../../logic/grid-cell-css.ts";
import {coordToIndex} from "../../../utils/coordinate-utils.ts";
import createMove from "../../../database/queries/moves/create-move.ts";
import GameHeader from "./GameHeader.tsx";
import GameGrid from "./GameGrid.tsx";
import useIsPlayersTurn from "../../../hooks/useIsPlayersTurn.ts";

type Props = {
    playerId: string
    thisPlayer: Database['battleships']['Tables']['players']['Row']
    otherPlayer: Database['battleships']['Tables']['players']['Row']
    gameSession: Database['battleships']['Tables']['game_sessions']['Row']
    boatLocations: GetBoatLocationsFunctionReturns
    thisPlayerMovesInitial: Database['battleships']['Tables']['moves']['Row'][]
    otherPlayerMovesInitial: Database['battleships']['Tables']['moves']['Row'][]
    isPlayer1: boolean
}

export default function GameOngoing({ playerId, thisPlayer, otherPlayer, gameSession, boatLocations, thisPlayerMovesInitial, otherPlayerMovesInitial, isPlayer1 }: Props) {

    const [thisPlayerMoves, setThisPlayerMoves] = useState(thisPlayerMovesInitial)
    const [otherPlayerMoves, setOtherPlayerMoves] = useState(otherPlayerMovesInitial)
    const isPlayersTurn = useIsPlayersTurn(isPlayer1, gameSession.current_turn)


//todo useHooks
    useEffect(() => {
        const movesTblSubscribe = supabase.channel('moves')
            .on('postgres_changes',
                { event: 'INSERT', schema: 'battleships', table: 'moves', filter: `session_id=eq.${gameSession.session_id}` },
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
    }, [gameSession.session_id, playerId])



    const moveHandler = async (xCoordinate: number, yCoordinate: number) => {
        if (!isPlayersTurn)
            return

        const move = await createMove(gameSession.session_id, playerId, xCoordinate, yCoordinate)       //todo graphics or top-banner
        // console.log(move)
    }


    return (
        <div className='min-h-screen bg-neutral-800 game-background-3 font-riffic text-white'>
            <GameHeader thisPlayer={thisPlayer} otherPlayer={otherPlayer} isPlayersTurn={isPlayersTurn} lastMoveDatetime={gameSession.modified_at} timePerMove={gameSession.time_per_move as string}/>

            <div className='md:grid grid-cols-2'>
                <GameGrid index={0} title='Your Boats' boatLocations={boatLocations} moves={otherPlayerMoves} onClickHander={() => {}} playableTitleCss={isPlayersTurn ? 'text-gray-500' : 'text-teal-500'} playableGridCss={isPlayersTurn ? 'border-black opacity-75' : 'border-teal-600'} playableCellCss=''/>
                <GameGrid index={1} title='Attack Your Opponent!' boatLocations={[]} moves={thisPlayerMoves} onClickHander={moveHandler} playableTitleCss={isPlayersTurn ? 'text-red-500' : 'text-gray-500'} playableGridCss={isPlayersTurn ? 'border-teal-600' : 'border-black opacity-75'} playableCellCss={isPlayersTurn ? 'cursor-pointer hover:!bg-cyan-400 [&>*]:fill-cyan-500/75 [&>*]:hover:fill-black/50 [&>*]:hover:scale-150' : ''}/>
            </div>
        </div>
    )
}