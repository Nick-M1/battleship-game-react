import {
    MOVE_TYPE_NUKE_ICON,
    MOVE_TYPE_QUAD_ICON,
    MOVE_TYPE_SCATTER_ICON,
    MOVE_TYPE_SINGLE_ICON
} from "./asset-grid-cell-constants.ts";

export const ALL_MOVES_AVAILABLE = [
    { id: 0, field: 'single_move_amount', icon: MOVE_TYPE_SINGLE_ICON },
    { id: 1, field: 'quad_move_amount', icon: MOVE_TYPE_QUAD_ICON },
    { id: 2, field: 'scatter_move_amount', icon: MOVE_TYPE_SCATTER_ICON },
    { id: 3, field: 'nuke_move_amount', icon: MOVE_TYPE_NUKE_ICON }
]