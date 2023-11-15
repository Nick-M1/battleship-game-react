import {supabase} from "../../supabase_setup.ts";
import {PostgrestError} from "@supabase/supabase-js";
import toast from "react-hot-toast";

export default async function createMoveSingle(gameSessionId: string, playerId: string, xCoordinate: number, yCoordinate: number) {
    const { data, error } = await supabase.from('moves')
        .insert({ session_id: gameSessionId, player_id: playerId, x_coordinate: xCoordinate, y_coordinate: yCoordinate, move_type: 'single' })
        .select()
        .single()

    if (error != null)
        throw Error(JSON.stringify(error))

    return data
}

export function createMoveCatchErrors(error: Error) {
    const postgrestError = JSON.parse(error.message) as PostgrestError
    console.log(postgrestError)

    switch (postgrestError.code) {
        case "23505":
            toast.error('This cell has already been hit!', { id: 'player-move' })
            break
        case "P0001":
            toast.error('Game has already finished', { id: 'player-move' })
            break

        default:
            toast.error('Move failed', { id: 'player-move' })
    }
}