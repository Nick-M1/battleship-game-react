import NavButtonLeft from "../components/shared/NavButtonLeft.tsx";
import {HIT_SHIP_MOVE_GIF, MISSED_SHIP_MOVE_GIF, SUNK_SHIP_MOVE_GIF} from "../constants/asset-grid-cell-constants.ts";

export function Component() {
    return (
        <div className="flex items-center justify-center h-full p-1">
            <NavButtonLeft text='MAIN MENU' to='/menu' className='font-extrabold text-drop-shadow-black-sm text-yellow-400'/>

            <div className="bg-neutral-800 p-6 sm:p-9 rounded-xl shadow-lg mx-auto space-y-6 ">
                <h1 className="text-4xl md:text-6xl tracking-wide font-extrabold text-yellow-500 py-2">
                    How to play
                </h1>
                <ul className='list-image-checkmark list-inside marker:text-emerald-400 text-gray-300 space-y-3'>
                    <li>Each player receives a game board and five ships of varying lengths.</li>
                    <li>Players take turns firing shots to attempt to hit the opponent's enemy ships.</li>
                    <li>A shot will result in either: </li>
                    <ul className='list-inside ml-10 -translate-y-2 [&>*]:flex'>
                        <li><img src={MISSED_SHIP_MOVE_GIF} alt='icon' className='w-8 h-8'/> <p className='ml-1'>- A miss <span className='text-gray-400 italic'>(grey-smoke)</span></p></li>
                        <li><img src={HIT_SHIP_MOVE_GIF} alt='icon' className='w-8 h-8'/> <p className='ml-1'>- A hit <span className='text-gray-400 italic'>(red-fire)</span></p></li>
                        <li><img src={SUNK_SHIP_MOVE_GIF} alt='icon' className='w-8 h-8'/> <p className='ml-1'>- Completely sink the ship <span className='text-gray-400 italic'>(red-skull)</span>, if every point of the ship is hit</p></li>
                    </ul>
                    <li>The game ends when a player has sunk every ship of their opponent.</li>
                </ul>
            </div>
        </div>
    )
}