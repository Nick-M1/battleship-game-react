import {Database} from "../../../database/supabase.ts";
import useIsPlayersTurn from "../../../hooks/useIsPlayersTurn.ts";
import {Link} from "react-router-dom";
import ProfileLarge from "./ProfileLarge.tsx";
import FireworksComponent from "./FireworksComponent.tsx";
import {Dispatch, SetStateAction, useState} from "react";
import FireworkRocketIcon from "../../icons/FireworkRocketIcon.tsx";
import NavButtonLeft from "../../shared/NavButtonLeft.tsx";
import ArrowLeft from "../../icons/ArrowLeft.tsx";

type Props = {
    playerId: string
    thisPlayer: Database['battleships']['Tables']['players']['Row']
    otherPlayer: Database['battleships']['Tables']['players']['Row']
    gameSession: Database['battleships']['Tables']['game_sessions']['Row']
    isPlayer1: boolean
    setViewFinishedGameBoardTrue: () => void
}

export default function GameFinished({ playerId, thisPlayer, otherPlayer, gameSession, isPlayer1, setViewFinishedGameBoardTrue }: Props) {
    const hasPlayerWon = useIsPlayersTurn(isPlayer1, gameSession.current_turn)
    const [isFireworksOn, setIsFireworksOn] = useState(true)

    return (
        <div className="relative min-h-screen bg-neutral-800 bg-game-background font-riffic text-white flex flex-col items-center justify-center">
            { isFireworksOn && <FireworksComponent style={{top: 0, left: 0, right: 0, bottom: 0, position: 'absolute'}}/> }

            <button onClick={setViewFinishedGameBoardTrue} className='text-2xl absolute top-0 left-0 group flex items-center p-3 font-extrabold text-drop-shadow-black-sm text-yellow-400'>
                <ArrowLeft width={30} className='mr-2 group-hover:animate-bounceRight'/> Go Back
            </button>


            <button onClick={() => setIsFireworksOn(prev => !prev)} className='absolute top-5 right-5 smooth-transition bg-white/5 hover:bg-white/10 active:bg-white/20 rounded-full p-2.5'>
                <FireworkRocketIcon className={`w-8 h-8 smooth-transition ${ isFireworksOn ? 'fill-teal-500' : 'fill-white' }`}/>
            </button>

            <h1 className="text-7xl font-bold mb-4 text-center">Game Over</h1>
            <p className="text-2xl mb-8 text-center">{ hasPlayerWon ? 'You WON!!' : 'You LOST' }</p>
            <Link to='/menu' className="button-blue">Play Again</Link>

            <div className='w-full md:flex md:justify-evenly pt-6 [&>*]:py-4'>
                <ProfileLarge profile={thisPlayer} hasWon={hasPlayerWon}/>
                <ProfileLarge profile={otherPlayer} hasWon={!hasPlayerWon}/>
            </div>
        </div>
    )
}