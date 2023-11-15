import {getPlayerIdLocalstorage} from "../utils/localstorage-player-id.ts";
import {redirect, useLoaderData} from "react-router-dom";
import getPlayerById from "../database/queries/player/get-player-by-id.ts";
import getGameSessionById from "../database/queries/game-session/get-game-session-by-id.ts";
import getBoatLocations from "../database/queries/boat-locations/get-boat-locations.ts";
import getMoves from "../database/queries/moves/get-moves.ts";
import GameOngoing from "../components/game/ongoing/GameOngoing.tsx";
import useGameSession from "../hooks/useGameSession.ts";
import GameFinished from "../components/game/finished/GameFinished.tsx";
import GameJoining from "../components/game/joining/GameJoining.tsx";
import {loadGameBackground} from "../constants/asset-background-game.ts";
import getMovesAvailable from "../database/queries/moves-available/get-moves-available.ts";
import {useState} from "react";


export async function loader({ params }: { params: { gameid: string } }) {
    loadGameBackground()

    const gameSessionId = params.gameid
    const gameSessionInitial = await getGameSessionById(gameSessionId)

    const playerId = getPlayerIdLocalstorage()
    const isPlayer1 = gameSessionInitial.player_1_id === playerId

    if (playerId == null)
        return redirect('/settings')

    const thisPlayer = await getPlayerById(playerId)

    if (gameSessionInitial.game_status === 'joining' || gameSessionInitial.player_2_id === null)
        return { playerId, thisPlayer, gameSessionInitial, isPlayer1 }

    const otherPlayer = await getPlayerById(isPlayer1 ? gameSessionInitial.player_2_id : gameSessionInitial.player_1_id)

    const boatLocations = await getBoatLocations(gameSessionId, playerId)
    const movesAvailableInitial = await getMovesAvailable(gameSessionId, playerId)
    const thisPlayerMovesInitial = await getMoves(gameSessionId, playerId)
    const otherPlayerMovesInitial = await getMoves(gameSessionId, isPlayer1 ? gameSessionInitial.player_2_id : gameSessionInitial.player_1_id)

    return { playerId, thisPlayer, otherPlayer, gameSessionInitial, boatLocations, movesAvailableInitial, thisPlayerMovesInitial, otherPlayerMovesInitial, isPlayer1 }
}

export function Component() {
    const { playerId, thisPlayer, otherPlayer, gameSessionInitial, boatLocations, movesAvailableInitial, thisPlayerMovesInitial, otherPlayerMovesInitial, isPlayer1 } = useLoaderData() as Exclude<Awaited<ReturnType<typeof loader>>, Response>
    const gameSession = useGameSession(gameSessionInitial)

    const [viewFinishedGameBoard, setViewFinishedGameBoard] = useState(false)       //todo custom hook
    const setViewFinishedGameBoardTrue = () => setViewFinishedGameBoard(true)
    const setViewFinishedGameBoardFalse = () => setViewFinishedGameBoard(false)


    if (gameSession.game_status === 'joining')
        return <GameJoining playerId={playerId} thisPlayer={thisPlayer} gameSession={gameSession}/>
    else if (gameSession.game_status === 'ongoing' || viewFinishedGameBoard)
        return <GameOngoing playerId={playerId} thisPlayer={thisPlayer} otherPlayer={otherPlayer!} gameSession={gameSession} boatLocations={boatLocations!} movesAvailableInitial={movesAvailableInitial!} thisPlayerMovesInitial={thisPlayerMovesInitial!} otherPlayerMovesInitial={otherPlayerMovesInitial!} isPlayer1={isPlayer1} setViewFinishedGameBoardFalse={setViewFinishedGameBoardFalse}/>
    else if (gameSession.game_status === 'finished')
        return <GameFinished playerId={playerId} thisPlayer={thisPlayer} otherPlayer={otherPlayer!} gameSession={gameSession} isPlayer1={isPlayer1} setViewFinishedGameBoardTrue={setViewFinishedGameBoardTrue}/>

    return (
        <div>ERROR</div>
    )
}