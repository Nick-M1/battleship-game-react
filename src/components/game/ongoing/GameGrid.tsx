import GridCell from "./GridCell.tsx";
import getBoatLocations from "../../../database/queries/boat-locations/get-boat-locations.ts";
import getMoves from "../../../database/queries/moves/get-moves.ts";
import {createIncrementingArray} from "../../../utils/array-utils.ts";
import {indexToCoord} from "../../../utils/coordinate-utils.ts";
import CrossIcon from "../../icons/CrossIcon.tsx";
import {getGameGridId} from "../../../logic/id-generators/game-grid-id.ts";
import getGridCellId from "../../../logic/grid-cell-css.ts";

type Props = {
    index: number
    title: string
    boatLocations: Awaited<ReturnType<typeof getBoatLocations>>
    moves: Awaited<ReturnType<typeof getMoves>>
    onClickHandler: (xCoordinate: number, yCoordinate: number) => Promise<void> | void
    playableTitleCss: string
    playableGridCss: string
    playableCellCss: string
    onMouseEnter: (value: number) => void
    onMouseLeave: (value: number) => void
}

export default function GameGrid({ index, title, boatLocations, moves, onClickHandler, playableTitleCss, playableGridCss, playableCellCss, onMouseEnter, onMouseLeave }: Props) {
    return (
        <div id={getGameGridId(index)}>
            <h2 className={`ml-8 md:ml-10 font-bold text-xl smooth-transition ${ playableTitleCss }`}>{ title }</h2>
            <div className='relative mt-10 ml-8 md:ml-10'>
                <div className='absolute -translate-y-6 sm:-translate-y-8 grid grid-cols-10 left-0 right-0 max-w-[80dvh] px-1'>
                    { ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'].map(r => <div key={r} className='text-center sm:text-xl font-bold text-neutral-300'>{ r }</div>) }
                </div>

                <div className='absolute h-full -translate-x-6 sm:-translate-x-8 grid grid-rows-10 left-0 max-h-[80dvh] py-1'>
                    { ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'].map(r => <div key={r} className='flex justify-center items-center sm:text-xl font-bold text-neutral-300'>{ r }</div>) }
                </div>

                <div className={`left-0 right-0 bottom-0 top-0 grid grid-cols-10 grid-rows-10 md:max-w-[80dvw] max-h-[80dvh] aspect-square border-4 smooth-transition ${playableGridCss}`}>
                    { createIncrementingArray(1, 100).map((value) => {
                        const { xCoordinate, yCoordinate } = indexToCoord(value)
                        return (
                            <div key={value} id={getGridCellId(index, value)}
                                 onClick={() => onClickHandler(xCoordinate, yCoordinate)}
                                 className={`chess-grid w-full h-full smooth-transition flex justify-center items-center ${playableCellCss}`}
                                 onMouseEnter={() => onMouseEnter(value)}
                                 onMouseLeave={() => onMouseLeave(value)}
                            >
                                <CrossIcon className={`w-3 h-3 fill-gray-500/20 smooth-transition`}/>
                            </div>
                        )
                    })}
                </div>

                <div className='absolute left-0 right-0 bottom-0 top-0 pointer-events-none grid grid-cols-10 grid-rows-10 md:max-w-[80dvw] max-h-[80dvh] aspect-square border-4 border-black/0'>
                    { createIncrementingArray(1, 100).map((value) =>
                        <GridCell key={value} index={value} boatLocations={boatLocations} moves={moves} />
                    )}
                </div>
            </div>
        </div>
    )
}