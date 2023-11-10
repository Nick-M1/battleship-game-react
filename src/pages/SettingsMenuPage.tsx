import {getPlayerIdLocalstorage, setPlayerIdLocalstorage} from "../utils/localstorage-leaderboard.ts";
import {useLoaderData, useNavigate} from "react-router-dom";
import NavButtonRight from "../components/shared/NavButtonRight.tsx";
import {FormEvent, useState} from "react";
import createPlayer from "../database/queries/player/create-player.ts";
import getPlayerById from "../database/queries/player/get-player-by-id.ts";
import {
    GAME_BACKGROUNDS,
    getSelectedGameBackgroundIndex,
    setSelectedGameBackgroundIndex
} from "../constants/asset-background-game.ts";

export async function loader() {
    const playerId = getPlayerIdLocalstorage()

    return playerId == null
        ? { playerId, player: null }
        : { playerId, player: await getPlayerById(playerId) }
}

export function Component() {
    const { playerId, player } = useLoaderData() as Awaited<ReturnType<typeof loader>>
    const [storedGameBackgroundIndex, setStoredGameBackgroundIndex] = useState(getSelectedGameBackgroundIndex())

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

    const setGameBackgroundHandler = (index: number) => {
        setStoredGameBackgroundIndex(index)
        setSelectedGameBackgroundIndex(index)
    }


    return (
        <div className="flex flex-col md:flex-row space-y-3 items-center justify-center h-full">
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


            <form onSubmit={onCreatePlayer} className="bg-neutral-800 p-6 sm:p-9 rounded-lg shadow-lg mx-auto space-y-3 ">
                <h1 className="text-4xl md:text-6xl tracking-wide font-extrabold text-yellow-500 py-2">
                    Theme Settings
                </h1>

                <h3 className='text-lg text-gray-300 tracking-wider'>Select theme:</h3>
                <div className='grid grid-cols-3 md:grid-cols-4 w-full gap-2'>
                    { GAME_BACKGROUNDS.map((gameBackground, index) =>
                        // @ts-ignore
                        <button key={index} onClick={() => setGameBackgroundHandler(index)} style={{ '--image-url': gameBackground }}
                                className={`w-32 h-32 bg-[image:var(--image-url)] smooth-transition rounded-xl border-4 ${ storedGameBackgroundIndex === index ? 'border-teal-500 hover:border-teal-400' : 'border-white/10 hover:border-white/20 active:border-white/30' }`}/>
                    )}
                </div>
            </form>
        </div>
    )
}