import {getPlayerIdLocalstorage, setPlayerIdLocalstorage} from "../utils/localstorage-player-id.ts";
import {useLoaderData} from "react-router-dom";
import NavButtonRight from "../components/shared/NavButtonRight.tsx";
import {FormEvent, useState} from "react";
import createPlayer from "../database/queries/player/create-player.ts";
import getPlayerById from "../database/queries/player/get-player-by-id.ts";
import {
    GAME_BACKGROUNDS,
    getSelectedGameBackgroundIndex,
    setSelectedGameBackgroundIndex
} from "../constants/asset-background-game.ts";
import ImagesSelect from "../components/menu/ImagesSelect.tsx";
import {
    getProfileImageByIndex,
    getProfileImageTextByIndex,
    PROFILE_IMAGES_LENGTH
} from "../constants/profile-imgs-constants.ts";
import {createIncrementingArray} from "../utils/array-utils.ts";
import updatePlayer from "../database/queries/player/update-player.ts";


export async function loader() {
    const playerId = getPlayerIdLocalstorage()

    return playerId == null
        ? { playerId, player: null }
        : { playerId, player: await getPlayerById(playerId) }
}

export function Component() {
    const { playerId, player } = useLoaderData() as Awaited<ReturnType<typeof loader>>
    const [selectedProfileImageIndex, setSelectedProfileImageIndex] = useState(player?.image_index || 0)

    const [storedGameBackgroundIndex, setStoredGameBackgroundIndex] = useState(getSelectedGameBackgroundIndex())

    const createPlayerHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const username = formData.get("username") as string

        if (playerId === null) {
            const updatedPlayer = await createPlayer(username, selectedProfileImageIndex)       //todo warning banner toast if username not unique
            setPlayerIdLocalstorage(updatedPlayer.player_id)

        } else {
            const updatedPlayer = await updatePlayer(playerId, username === player.username ? undefined : username, selectedProfileImageIndex === player.image_index ? undefined : selectedProfileImageIndex)
        }

        window.location.reload()
    }

    const setGameBackgroundHandler = (index: number) => {
        setStoredGameBackgroundIndex(index)
        setSelectedGameBackgroundIndex(index)
    }


    return (
        <div className="flex flex-col md:flex-row space-y-3 items-center justify-center h-full">
            { playerId != null && <NavButtonRight text='MAIN MENU' to='/menu' className='font-extrabold text-drop-shadow-black-sm text-yellow-400'/> }

            <form onSubmit={createPlayerHandler} className="bg-neutral-800 p-6 sm:p-9 rounded-lg shadow-lg mx-auto space-y-8 ">
                <h1 className="text-4xl md:text-6xl tracking-wide font-extrabold text-yellow-500 py-2">
                    Player Settings
                </h1>


                <div className=''>
                    <label htmlFor='username' className='text-lg text-gray-300 tracking-wider'>Username:</label>
                    <input type='text' id='username' name='username' defaultValue={player?.username} className='input-primary-valid' placeholder='Username...'/>
                </div>

                <div>
                    <label htmlFor='profile-image' className='text-lg text-gray-300 tracking-wider'>Profile Image:</label>
                    <div className='flex space-x-2 my-1.5 items-center'>
                        <img src={getProfileImageByIndex(selectedProfileImageIndex)} alt='Profile Image' title='Profile Image' className='w-16 mr-2'/>

                        <ImagesSelect
                            id='profile-image'
                            allOptions={createIncrementingArray(0, PROFILE_IMAGES_LENGTH)}
                            anOptionToStringFunc={(option) => getProfileImageTextByIndex(option)}
                            anOptionToJSXFunc={(option) =>
                                <div className='flex items-center space-x-2'>
                                    <img src={getProfileImageByIndex(option)} alt='image' className='w-9'/>
                                    <span>{ getProfileImageTextByIndex(option) }</span>
                                </div>
                            }
                            selected={selectedProfileImageIndex}
                            setSelected={setSelectedProfileImageIndex}
                        />
                    </div>
                </div>


                <button type='submit' className='button-orange w-full rounded-full text-white sm:text-xl'>
                    { playerId == null ? 'Create Player' : 'Update Player' }
                </button>

            </form>


            <form onSubmit={createPlayerHandler} className="bg-neutral-800 p-6 sm:p-9 rounded-lg shadow-lg mx-auto space-y-3 ">
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