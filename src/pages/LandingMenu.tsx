import {Link, useLoaderData} from "react-router-dom";
import {getRandomHomeBackgroundCss} from "../constants/asset-background-home.ts";

export function loader() {
    const selectedHomeBackground = getRandomHomeBackgroundCss()

    return { selectedHomeBackground }
}

export function Component() {
    const { selectedHomeBackground } = useLoaderData() as ReturnType<typeof loader>

    return (
        <div className={`w-screen h-screen flex flex-col justify-center items-center space-y-12 font-stencil-army bg-black ${selectedHomeBackground} bg-bottom bg-cover`}>
            <h1 className='text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-widest text-drop-shadow-black-md text-center text-orange-500'> BATTLESHIP <br/> MANIA </h1>

            <Link to='/menu' className="button-yellow text-xl sm:text-2xl text-drop-shadow-black-md tracking-widest font-bold">
                START GAME
            </Link>
        </div>
    )
}