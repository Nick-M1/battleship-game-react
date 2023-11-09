import {getPlayerIdLocalstorage} from "../utils/localstorage-leaderboard.ts";
import {redirect, useLoaderData} from "react-router-dom";
import getPlayerById from "../database/queries/player/get-player-by-id.ts";
import getGameSessionById from "../database/queries/game-session/get-game-session-by-id.ts";
import getBoatLocations from "../database/queries/boat-locations/get-boat-locations.ts";
import getMoves from "../database/queries/moves/get-moves.ts";
import createMove from "../database/queries/moves/create-move.ts";
import GameGrid from "../components/game/GameGrid.tsx";
import GameProfile from "../components/game/GameProfile.tsx";
import {useEffect, useMemo, useState} from "react";
import {supabase} from "../database/supabase_setup.ts";
import {Database} from "../database/supabase.ts";
import getGridCellId from "../logic/grid-cell-css.ts";
import {coordToIndex} from "../utils/coordinate-utils.ts";
import {DROP_PIECE_CSS} from "../constants/css-constants.ts";

export async function loader({ params }: { params: { gameid: string } }) {
    const gameSessionId = params.gameid
    const gameSessionInitial = await getGameSessionById(gameSessionId)

    const playerId = getPlayerIdLocalstorage()
    const isPlayer1 = gameSessionInitial.player_1_id === playerId

    if (playerId == null)
        return redirect('/settings')

    const thisPlayer = await getPlayerById(playerId)
    const otherPlayer = await getPlayerById(isPlayer1 ? gameSessionInitial.player_2_id : gameSessionInitial.player_1_id)
    const boatLocations = await getBoatLocations(gameSessionId, playerId)

    const thisPlayerMovesInitial = await getMoves(gameSessionId, playerId)
    const otherPlayerMovesInitial = await getMoves(gameSessionId, isPlayer1 ? gameSessionInitial.player_2_id : gameSessionInitial.player_1_id)

    return { playerId, thisPlayer, otherPlayer, gameSessionInitial, boatLocations, thisPlayerMovesInitial, otherPlayerMovesInitial, isPlayer1 }
}

export function Component() {
    const { playerId, thisPlayer, otherPlayer, gameSessionInitial, boatLocations, thisPlayerMovesInitial, otherPlayerMovesInitial, isPlayer1 } = useLoaderData() as Exclude<Awaited<ReturnType<typeof loader>>, Response>

    const [thisPlayerMoves, setThisPlayerMoves] = useState(thisPlayerMovesInitial)
    const [otherPlayerMoves, setOtherPlayerMoves] = useState(otherPlayerMovesInitial)
    const [gameSession, setGameSession] = useState(gameSessionInitial)

//todo useHooks
    useEffect(() => {
        const movesTblSubscribe = supabase.channel('moves')
            .on('postgres_changes',
                { event: 'INSERT', schema: 'battleships', table: 'moves', filter: `session_id=eq.${gameSessionInitial.session_id}` },
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
    }, [gameSessionInitial.session_id, playerId])

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

    const isPlayersTurn = useMemo(() =>
            (isPlayer1 && gameSession.current_turn % 2 === 0) || (!isPlayer1 && gameSession.current_turn % 2 === 1),
        [gameSession.current_turn, isPlayer1]
    )

    const moveHandler = async (xCoordinate: number, yCoordinate: number) => {
        if (!isPlayersTurn)
            return

        const move = await createMove(gameSessionInitial.session_id, playerId, xCoordinate, yCoordinate)       //todo graphics
        // console.log(move)
    }


    return (
        <div className='min-h-screen bg-neutral-800 game-background-3 font-riffic text-white'>
            <div className='flex justify-center space-x-1 pb-3'>
                <GameProfile profile={thisPlayer} isThisPlayersTurn={isPlayersTurn} timeSecsLeft={170} toLeft={true}/>
                <GameProfile profile={otherPlayer} isThisPlayersTurn={!isPlayersTurn} timeSecsLeft={30} toLeft={false}/>
            </div>

            <div className='md:grid grid-cols-2'>
                <GameGrid index={0} boatLocations={boatLocations} moves={otherPlayerMoves} onClickHander={() => {}} playableGridCss={isPlayersTurn ? 'border-black' : 'border-teal-600'} playableCellCss=''/>
                <GameGrid index={1} boatLocations={[]} moves={thisPlayerMoves} onClickHander={moveHandler} playableGridCss={isPlayersTurn ? 'border-teal-600' : 'border-black'} playableCellCss={isPlayersTurn ? 'hover:!bg-cyan-400 [&>*]:fill-cyan-500/75 [&>*]:hover:fill-black/50' : ''}/>
            </div>
        </div>
    )
}