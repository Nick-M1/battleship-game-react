import NavButtonRight from "../components/shared/NavButtonRight.tsx";
import NavButtonLeft from "../components/shared/NavButtonLeft.tsx";
import {getPlayerIdLocalstorage} from "../utils/localstorage-leaderboard.ts";
import createGameSession from "../database/queries/game-session/create-game-session.ts";
import joinGameSession from "../database/queries/game-session/join-game-session.ts";
import {FormEvent} from "react";
import {redirect, useLoaderData, useNavigate} from "react-router-dom";

export async function loader() {
    const playerId = getPlayerIdLocalstorage()

    return playerId === null
        ? redirect('/settings')
        : { playerId }
}

export function Component() {
    const { playerId } = useLoaderData() as Exclude<Awaited<ReturnType<typeof loader>>, Response>
    const navigate = useNavigate()

    const createGameHandler = async () => {
        const gameSession = await createGameSession(playerId)
        navigate(`/game/${gameSession.session_id}`)
    }

    const joinGameHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)

        const gameSessionId = formData.get('input-game-session-id') as string

        const gameSession = await joinGameSession(gameSessionId, playerId)
        navigate(`/game/${gameSession.session_id}`)
    }

    return (
        <div className="flex items-center justify-center h-full">
            <NavButtonLeft text='SETTINGS' to='/settings' className='font-extrabold text-drop-shadow-black-sm text-yellow-400'/>
            <NavButtonRight text='LEADERBOARD' to='/leaderboard' className='font-extrabold text-drop-shadow-black-sm text-yellow-400'/>

            <div className="bg-neutral-800 p-6 sm:p-9 rounded-lg shadow-lg mx-auto space-y-6 ">
                <h1 className="text-4xl md:text-6xl tracking-wide font-extrabold text-yellow-500 py-2">
                    Battleship Mania
                </h1>

                <button onClick={createGameHandler} className='button-orange w-full rounded-full text-white sm:text-xl'>
                    Create New Game
                </button>

                <p className='text-center'>OR</p>

                <form onSubmit={joinGameHandler} className='space-y-6'>
                    <input id='input-game-session-id' name='input-game-session-id' type='text' className='input-primary-valid' placeholder='Game ID...'/>
                    <button type='submit' className='button-yellow w-full rounded-full text-white sm:text-xl'>
                        Join Game
                    </button>
                </form>

            </div>
        </div>
    )
}