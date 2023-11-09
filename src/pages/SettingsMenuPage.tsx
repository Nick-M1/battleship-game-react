// import {useLoaderData} from "react-router-dom";

import {getPlayerIdLocalstorage, setPlayerIdLocalstorage} from "../utils/localstorage-leaderboard.ts";
import {useLoaderData, useNavigate} from "react-router-dom";
import NavButtonRight from "../components/shared/NavButtonRight.tsx";
import {FormEvent} from "react";
import createPlayer from "../database/queries/player/create-player.ts";
import getPlayerById from "../database/queries/player/get-player-by-id.ts";

export async function loader() {
    const playerId = getPlayerIdLocalstorage()

    return playerId == null
        ? { playerId, player: null }
        : { playerId, player: await getPlayerById(playerId) }
}

export function Component() {
    const { playerId, player } = useLoaderData() as Awaited<ReturnType<typeof loader>>
    const navigate = useNavigate()

    const onCreatePlayer = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const username = formData.get("username") as string

        const { data, error } = await createPlayer(username)

        if (error != null) {
            console.log(error)
            throw Error('Error creating player')
        }

        setPlayerIdLocalstorage(data.player_id)
        navigate(0)
    }

    return (
        <div className="flex items-center justify-center h-full">
            { playerId != null && <NavButtonRight text='MAIN MENU' to='/menu' className='font-extrabold text-drop-shadow-black-sm text-yellow-400'/> }
            <form onSubmit={onCreatePlayer} className="bg-neutral-800 p-6 sm:p-9 rounded-lg shadow-lg mx-auto space-y-8 ">
                <h1 className="text-4xl md:text-6xl tracking-wide font-extrabold text-yellow-500 py-2">
                    Player Settings
                </h1>


                <div className=''>
                    <label htmlFor='username' className='text-lg text-gray-300 tracking-wider'>Username:</label>
                    <input type='text' id='username' name='username' defaultValue={player?.username} className='input-primary-valid' placeholder='Username...'/>
                </div>

                <button type='submit' className='button-orange w-full rounded-full text-white sm:text-xl'>
                    { playerId == null ? 'Create Player' : 'Update Player' }
                </button>

            </form>
        </div>
    )
}