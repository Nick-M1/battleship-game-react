export { default as SUNK_SHIP_MOVE_GIF } from '../assets/moves-icons/sunk-ship-hit.gif'
export { default as HIT_SHIP_MOVE_GIF } from '../assets/moves-icons/ship-hit.gif'
export { default as MISSED_SHIP_MOVE_GIF } from '../assets/moves-icons/missed-hit.gif'

export { default as MOVE_TYPE_SINGLE_ICON } from '../assets/move-types/move-type-single.svg'
export { default as MOVE_TYPE_QUAD_ICON } from '../assets/move-types/move-type-quad.svg'
export { default as MOVE_TYPE_SCATTER_ICON } from '../assets/move-types/move-type-scatter.svg'
export { default as MOVE_TYPE_NUKE_ICON } from '../assets/move-types/move-type-nuke.svg'

import BOAT_ID_1_IMAGE from '../assets/boat-icons/boat-type-1.png'
import BOAT_ID_2_IMAGE from '../assets/boat-icons/boat-type-2.png'
import BOAT_ID_3_IMAGE from '../assets/boat-icons/boat-type-3.png'
import BOAT_ID_4_IMAGE from '../assets/boat-icons/boat-type-4.png'
import BOAT_ID_5_IMAGE from '../assets/boat-icons/boat-type-5.png'



export const boatIdToImage: {[p: string]: string} = {
    '1': BOAT_ID_1_IMAGE,
    '2': BOAT_ID_2_IMAGE,
    '3': BOAT_ID_3_IMAGE,
    '4': BOAT_ID_4_IMAGE,
    '5': BOAT_ID_5_IMAGE
}