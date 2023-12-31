import {supabase} from "../../supabase_setup.ts";
import {Database} from "../../supabase.ts";
import {createIncrementingArray} from "../../../utils/array-utils.ts";
import {randomFromOne} from "../../../utils/number-utils.ts";

export default async function createMoveScatter(gameSessionId: string, playerId: string, xCoordinate: number, yCoordinate: number, thisPlayerMoves: Database['battleships']['Tables']['moves']['Row'][]) {
    const movesTmp = createIncrementingArray(1, 5).map(() => ({ x: randomFromOne(10), y: randomFromOne(10) }))
    movesTmp.push({ x: xCoordinate, y: yCoordinate })

    const moves = movesTmp
        .filter(({ x, y }) => !thisPlayerMoves.some(move => move.x_coordinate === x && move.y_coordinate === y))
        .filter((item, index, self) => self.indexOf(item) == index)

    const { data, error } = await supabase.from('moves')
        .insert(moves.map(move => ({ session_id: gameSessionId, player_id: playerId, x_coordinate: move.x, y_coordinate: move.y, move_type: 'scatter' } as const)))
        .select()

    if (error != null)
        throw Error(JSON.stringify(error))

    return data
}