import {getPlayerIdLocalstorage} from "../utils/localstorage-player-id.ts";
import NavButtonLeft from "../components/shared/NavButtonLeft";
import getGameSessionsByPlayerId from "../database/queries/game-session/get-game-sessions-by-player-id.ts";
import {Link, redirect, useLoaderData} from "react-router-dom";
import ProfileLarge from "../components/game/finished/ProfileLarge.tsx";
import {calcIsPlayersTurn} from "../logic/player-turns.ts";
import {dateTimeFormatter} from "../utils/time-formatter.ts";

export async function loader() {
    const playerId = getPlayerIdLocalstorage()

    return playerId === null
        ? redirect('/settings')
        : { playerId, gameSessions: await getGameSessionsByPlayerId(playerId) }
}

export function Component() {
    const { playerId, gameSessions } = useLoaderData() as Exclude<Awaited<ReturnType<typeof loader>>, Response>

    return (
        <div className='flex justify-center h-full p-1.5'>
            <NavButtonLeft text='MAIN MENU' to='/menu' className='font-extrabold text-drop-shadow-black-sm text-yellow-400'/>

            <div className="bg-neutral-800 mt-16 p-4 sm:p-9 rounded-xl shadow-lg mx-auto space-y-8 overflow-y-auto scrollbar">
                <h1 className="text-4xl md:text-6xl tracking-wide font-extrabold text-yellow-500 py-2 text-center">Previous Matches</h1>

                <div className='grid grid-cols-2 md:grid-cols-3 gap-2'>
                    { gameSessions.map(gameSession => {
                        const isPlayer1 = gameSession.player_1_id.player_id === playerId
                        const isGameOngoing = gameSession.completed_at === null
                        const hasPlayerWon = !isGameOngoing && calcIsPlayersTurn(isPlayer1, gameSession.current_turn)

                        return (
                            <Link id={gameSession.session_id} to={`/game/${ gameSession.session_id }`} className='bg-white/5 hover:bg-white/15 active:bg-white/20 border-2 border-white/15 hover:border-teal-500 active:border-teal-300 smooth-transition rounded-xl p-5'>
                                <h3 className={`text-center font-bold text-2xl ${ isGameOngoing ? 'text-white' : ( hasPlayerWon ? 'text-emerald-500' : 'text-red-500' ) }`}>{ isGameOngoing ? 'Ongoing' : ( hasPlayerWon ? 'You Won' : 'You Lost' ) }</h3>
                                { !isGameOngoing && <h4 className='italic text-gray-400 pb-2'>{`Completed: ${dateTimeFormatter(gameSession.completed_at!)}`}</h4> }
                                <ProfileLarge profile={gameSession.player_2_id} hasWon={true}/>
                            </Link>
                        )
                    })}
                </div>

            </div>

        </div>
    )
}