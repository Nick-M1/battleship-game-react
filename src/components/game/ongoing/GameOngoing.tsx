import {Database} from "../../../database/supabase.ts";
import {GetBoatLocationsFunctionReturns} from "../../../database/queries/boat-locations/get-boat-locations.ts";
import createMove from "../../../database/queries/moves/create-move.ts";
import GameHeader from "./GameHeader.tsx";
import GameGrid from "./GameGrid.tsx";
import useIsPlayersTurn from "../../../hooks/useIsPlayersTurn.ts";
import useGameMoves from "../../../hooks/useGameMoves.ts";

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
    const [thisPlayerMoves, otherPlayerMoves] = useGameMoves(playerId, otherPlayer.player_id, gameSession.session_id, thisPlayerMovesInitial, otherPlayerMovesInitial)
    const isPlayersTurn = useIsPlayersTurn(isPlayer1, gameSession.current_turn)

    //todo move handler elsewhere
    const moveHandler = async (xCoordinate: number, yCoordinate: number) => {
        if (!isPlayersTurn)
            return

        const move = await createMove(gameSession.session_id, playerId, xCoordinate, yCoordinate)       //todo graphics or top-banner
        // console.log(move)
    }


    return (
        <div className='min-h-screen scrollbar bg-neutral-800 bg-game-background font-riffic text-white'>
            <GameHeader thisPlayer={thisPlayer} otherPlayer={otherPlayer} isPlayersTurn={isPlayersTurn} lastMoveDatetime={gameSession.modified_at} timePerMove={gameSession.time_per_move as string}/>

            <div className='md:grid grid-cols-2 space-y-8 md:space-y-0 pr-2 pb-3'>
                <GameGrid index={0} title='Your Boats' boatLocations={boatLocations} moves={otherPlayerMoves} onClickHander={() => {}} playableTitleCss={isPlayersTurn ? 'text-gray-500' : 'text-teal-500'} playableGridCss={isPlayersTurn ? 'border-black opacity-75' : 'border-teal-600'} playableCellCss=''/>
                <GameGrid index={1} title='Attack Your Opponent!' boatLocations={[]} moves={thisPlayerMoves} onClickHander={moveHandler} playableTitleCss={isPlayersTurn ? 'text-red-500' : 'text-gray-500'} playableGridCss={isPlayersTurn ? 'border-teal-600' : 'border-black opacity-75'} playableCellCss={isPlayersTurn ? 'cursor-pointer hover:!bg-cyan-400 [&>*]:fill-cyan-500/75 [&>*]:hover:fill-black/50 [&>*]:hover:scale-150' : ''}/>
            </div>
        </div>
    )
}