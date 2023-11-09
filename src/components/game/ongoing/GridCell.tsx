import getBoatLocations from "../../../database/queries/boat-locations/get-boat-locations.ts";
import boatSizeToCss from "../../../logic/boat-size-to-css.ts";
import getMoves from "../../../database/queries/moves/get-moves.ts";
import {indexToCoord} from "../../../utils/coordinate-utils.ts";
import {Database} from "../../../database/supabase.ts";

type Props = {
    index: number
    boatLocations: Awaited<ReturnType<typeof getBoatLocations>>
    moves: Awaited<ReturnType<typeof getMoves>>
    // onClickHander: (xCoordinate: number, yCoordinate: number) => Promise<void> | void
}

export default function GridCell({ index, boatLocations, moves }: Props) {
    const { xCoordinate, yCoordinate } = indexToCoord(index)

    const boatLocationAtThisCell = boatLocations?.find(b => b.x_coordinate === xCoordinate && b.y_coordinate === yCoordinate)
    const hasBoatLocationAtThisCell = typeof boatLocationAtThisCell !== 'undefined'

    const moveAtThisCell = moves?.find(m => m.x_coordinate === xCoordinate && m.y_coordinate === yCoordinate)
    const hasMoveAtThisCell = typeof moveAtThisCell !== 'undefined'

    return (
        <div
            // onClick={() => onClickHander(coordinate.xCoordinate, coordinate.yCoordinate)}
            className={`w-full h-full flex justify-center items-start @container ${ hasBoatLocationAtThisCell && !boatLocationAtThisCell?.is_vertical_orientation && ' rotate-270' }`}>
            { hasBoatLocationAtThisCell
                && <img src={`/src/assets/boat-icons/boat-type-${ boatLocationAtThisCell.boat_type_id.boat_type_id }.png`} alt='boat' title={`Boat ${boatLocationAtThisCell.boat_type_id.boat_type_id}`} draggable={false} className={`absolute ${ boatSizeToCss(boatLocationAtThisCell.boat_type_id.size) }`}/>
            }

            { hasMoveAtThisCell && displayMoveResultImage(moveAtThisCell.result) }
        </div>
    )
}

function displayMoveResultImage(result: Database['battleships']['Tables']['moves']['Row']['result']) {
    switch (result) {
        case "sunk": return <img src={`/src/assets/moves-icons/sunk-ship-hit.gif`} alt='ship-hit' draggable={false} className={`absolute opacity-90 scale-[65%]`}/>
        case "hit": return <img src={`/src/assets/moves-icons/ship-hit-1.gif`} alt='ship-hit' draggable={false} className={`absolute opacity-90`}/>
        case "miss": return <img src={`/src/assets/moves-icons/missed-hit.gif`} alt='missed-hit' draggable={false} className={`absolute opacity-75 pb-10 pr-1 scale-[120%]`}/>
    }
}