import {ALL_MOVES_AVAILABLE} from "../../../constants/moves-available-constants.ts";
import {Database} from "../../../database/supabase.ts";
import {getMoveSelectorId} from "../../../logic/id-generators/move-selector-id.ts";

type Props = {
    isPlayersTurn: boolean
    movesAvailable: Database['battleships']['Tables']['moves_available']['Row']
    moveTypeSelected: number
    setMoveTypeSelected: (arg0: number) => void
}

export default function MoveSelector({ isPlayersTurn, movesAvailable, moveTypeSelected, setMoveTypeSelected }: Props) {
    return (
        <div className='bg-black/5 sticky bottom-0 md:flex md:justify-end'>
            <div className='md:w-1/2 grid grid-cols-4 px-14'>
                { ALL_MOVES_AVAILABLE.map((moveAvailable) => {
                    const amount = (movesAvailable[moveAvailable.field as keyof typeof movesAvailable] || 0) as number
                    const notAvailable = amount === 0

                    return (
                        <div key={moveAvailable.id.toString()} className={`relative ${ notAvailable ? 'opacity-20 cursor-not-allowed' : 'cursor-pointer' }`}>
                            <img id={getMoveSelectorId(moveAvailable.id)} src={moveAvailable.icon} alt='move'
                                 onClick={() => ( notAvailable ? {} : setMoveTypeSelected(moveAvailable.id))}
                                 className={`bg-black w-[14dvw] md:w-[7dvw] max-w-[5rem] p-1 rounded-xl smooth-transition border-4 ${moveTypeSelected === moveAvailable.id && isPlayersTurn ? 'border-dashed border-red-400' : 'border-solid border-gray-400/50'}`}/>
                            <div className='absolute left-1 top-1 bg-teal-400 p-1 rounded-full w-5 h-5 text-sm flex justify-center items-center'>
                                { amount > 100 ? 'ꝏ' : amount }
                            </div>
                        </div>
                    )
                })}
            </div>

        </div>
    )
}