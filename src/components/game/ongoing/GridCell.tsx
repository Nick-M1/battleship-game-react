import getBoatLocations from "../../../database/queries/boat-locations/get-boat-locations.ts";
import boatSizeToCss from "../../../logic/boat-size-to-css.ts";
import getMoves from "../../../database/queries/moves/get-moves.ts";
import {indexToCoord} from "../../../utils/coordinate-utils.ts";
import {Database} from "../../../database/supabase.ts";
import {
    boatIdToImage,
    HIT_SHIP_MOVE_GIF,
    MISSED_SHIP_MOVE_GIF,
    SUNK_SHIP_MOVE_GIF
} from "../../../constants/asset-grid-cell-constants.ts";

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

    const rotateCell = hasBoatLocationAtThisCell && !boatLocationAtThisCell?.is_vertical_orientation

    return (
        <div
            className={`w-full h-full flex justify-center items-start @container ${ rotateCell && ' rotate-270' }`}>
            { hasBoatLocationAtThisCell
                && <img src={boatIdToImage[boatLocationAtThisCell.boat_type_id.boat_type_id]} alt='boat' title={`Boat ${boatLocationAtThisCell.boat_type_id.boat_type_id}`} draggable={false} className={`absolute ${ boatSizeToCss(boatLocationAtThisCell.boat_type_id.size) }`}/>
            }

            { hasMoveAtThisCell && displayMoveResultImage(moveAtThisCell.result, rotateCell) }
        </div>
    )
}

function displayMoveResultImage(result: Database['battleships']['Tables']['moves']['Row']['result'], rotate: boolean) {
    switch (result) {
        case "sunk": return <img src={SUNK_SHIP_MOVE_GIF} alt='ship-hit' draggable={false} className={`absolute opacity-90 scale-[65%] ${ rotate && '-translate-y-1 -translate-x-1 rotate-90' }`}/>
        case "hit": return <img src={HIT_SHIP_MOVE_GIF} alt='ship-hit' draggable={false} className={`absolute opacity-90 ${ rotate && 'translate-y-1.5 translate-x-1.5  rotate-90' }`}/>
        case "miss": return <img src={MISSED_SHIP_MOVE_GIF} alt='missed-hit' draggable={false} className={`absolute opacity-75 pb-10 pr-1 scale-[120%]`}/>
    }
}