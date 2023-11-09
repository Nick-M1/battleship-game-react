// import {useLoaderData} from "react-router-dom";

// export async function loader() {
//     // const player = await getPlayerById('j')
//     return { }
// }

import NavButtonRight from "../components/shared/NavButtonRight.tsx";
import NavButtonLeft from "../components/shared/NavButtonLeft.tsx";

export function Component() {
    return (
        <div className="flex items-center justify-center h-full">
            <NavButtonLeft text='SETTINGS' to='/settings' className='font-extrabold text-drop-shadow-black-sm text-yellow-400'/>
            <NavButtonRight text='LEADERBOARD' to='/leaderboard' className='font-extrabold text-drop-shadow-black-sm text-yellow-400'/>

            <div className="bg-neutral-800 p-6 sm:p-9 rounded-lg shadow-lg mx-auto space-y-6 ">
                <h1 className="text-4xl md:text-6xl tracking-wide font-extrabold text-yellow-500 py-2">
                    Battleship Mania
                </h1>

                <button className='button-orange w-full rounded-full text-white sm:text-xl'>
                    Create New Game
                </button>

                <p className='text-center'>OR</p>

                <input type='text' className='input-primary-valid' placeholder='Game ID...'/>
                <button className='button-yellow w-full rounded-full text-white sm:text-xl'>
                    Join Game
                </button>

            </div>
        </div>
    )
}