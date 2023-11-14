import {supabase} from "../../supabase_setup.ts";
import {PostgrestError} from "@supabase/supabase-js";
import toast from "react-hot-toast";
import {Database} from "../../supabase.ts";

export default async function createMoveQuad(gameSessionId: string, playerId: string, xCoordinate: number, yCoordinate: number, thisPlayerMoves: Database['battleships']['Tables']['moves']['Row'][]) {
    const moves = [
        { x: xCoordinate, y: yCoordinate}, { x: xCoordinate - 1, y: yCoordinate }, { x: xCoordinate + 1, y: yCoordinate }, { x: xCoordinate, y: yCoordinate - 1 }, { x: xCoordinate, y: yCoordinate + 1 }
    ]
        .filter(({ x, y }) => 0 < x && x <= 10 && 0 < y && y <= 10)
        .filter(({ x, y }) => (x === xCoordinate && y === yCoordinate) || !thisPlayerMoves.some(move => move.x_coordinate === x && move.y_coordinate === y))


    const { data, error } = await supabase.from('moves')
        .insert(moves.map(move => ({ session_id: gameSessionId, player_id: playerId, x_coordinate: move.x, y_coordinate: move.y, move_type: 'quad' } as const)))
        .select()

    if (error != null)
        throw Error(JSON.stringify(error))

    return data
}