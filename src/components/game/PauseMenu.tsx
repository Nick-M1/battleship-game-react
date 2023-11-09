import {useLoaderData} from "react-router-dom";

export async function loader() {
    // const player = await getPlayerById('j')
    return { }
}

export function Component() {
    return (
        <div className="flex items-center justify-center h-full">
            <div className="bg-neutral-800 p-8 rounded-lg shadow-lg mx-auto space-y-6 ">
                <h1 className="text-4xl font-extrabold text-yellow-500 ">
                    Battleship Mania
                </h1>

                <button className='button-yellow w-full rounded-full text-white'>
                    Deploy Your Fleet
                </button>
                <button className='button-orange w-full rounded-full text-white'>
                    Abandon Ship
                </button>
            </div>
        </div>
    )
}