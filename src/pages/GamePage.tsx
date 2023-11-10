import {getPlayerIdLocalstorage} from "../utils/localstorage-leaderboard.ts";
import {redirect, useLoaderData} from "react-router-dom";
import getPlayerById from "../database/queries/player/get-player-by-id.ts";
import getGameSessionById from "../database/queries/game-session/get-game-session-by-id.ts";
import getBoatLocations from "../database/queries/boat-locations/get-boat-locations.ts";
import getMoves from "../database/queries/moves/get-moves.ts";
import GameOngoing from "../components/game/ongoing/GameOngoing.tsx";
import useGameSession from "../hooks/useGameSession.ts";
import GameFinished from "../components/game/finished/GameFinished.tsx";
import GameJoining from "../components/game/joining/GameJoining.tsx";


export async function loader({ params }: { params: { gameid: string } }) {
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

    if (gameSessionInitial.game_status === 'finished')
        return { playerId, thisPlayer, otherPlayer, gameSessionInitial, boatLocations: null, thisPlayerMovesInitial: null, otherPlayerMovesInitial: null, isPlayer1 }

    const boatLocations = await getBoatLocations(gameSessionId, playerId)
    const thisPlayerMovesInitial = await getMoves(gameSessionId, playerId)
    const otherPlayerMovesInitial = await getMoves(gameSessionId, isPlayer1 ? gameSessionInitial.player_2_id : gameSessionInitial.player_1_id)

    return { playerId, thisPlayer, otherPlayer, gameSessionInitial, boatLocations, thisPlayerMovesInitial, otherPlayerMovesInitial, isPlayer1 }
}

export function Component() {
    const { playerId, thisPlayer, otherPlayer, gameSessionInitial, boatLocations, thisPlayerMovesInitial, otherPlayerMovesInitial, isPlayer1 } = useLoaderData() as Exclude<Awaited<ReturnType<typeof loader>>, Response>
    const gameSession = useGameSession(gameSessionInitial)

    switch (gameSession.game_status) {
        case "joining":  return <GameJoining playerId={playerId} thisPlayer={thisPlayer} gameSession={gameSession}/>
        case "ongoing":  return <GameOngoing playerId={playerId} thisPlayer={thisPlayer} otherPlayer={otherPlayer!} gameSession={gameSession} boatLocations={boatLocations!} thisPlayerMovesInitial={thisPlayerMovesInitial!} otherPlayerMovesInitial={otherPlayerMovesInitial!} isPlayer1={isPlayer1}/>
        case "finished": return <GameFinished playerId={playerId} thisPlayer={thisPlayer} otherPlayer={otherPlayer!} gameSession={gameSession} isPlayer1={isPlayer1}/>
    }
}