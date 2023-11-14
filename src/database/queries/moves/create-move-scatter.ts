import {supabase} from "../../supabase_setup.ts";
import {Database} from "../../supabase.ts";
import {createIncrementingArray} from "../../../utils/array-utils.ts";
import {randomFromOne} from "../../../utils/number-utils.ts";

export default async function createMoveScatter(gameSessionId: string, playerId: string, xCoordinate: number, yCoordinate: number, thisPlayerMoves: Database['battleships']['Tables']['moves']['Row'][]) {
    const moves = createIncrementingArray(1, 5)
        .map(() => ({ x: randomFromOne(10), y: randomFromOne(10) }))
        .filter(({ x, y }) => !thisPlayerMoves.some(move => move.x_coordinate === x && move.y_coordinate === y))

    moves.push({ x: xCoordinate, y: yCoordinate })

    const { data, error } = await supabase.from('moves')
        .insert(moves.map(move => ({ session_id: gameSessionId, player_id: playerId, x_coordinate: move.x, y_coordinate: move.y, move_type: 'scatter' } as const)))
        .select()

    if (error != null)
        throw Error(JSON.stringify(error))

    return data
}