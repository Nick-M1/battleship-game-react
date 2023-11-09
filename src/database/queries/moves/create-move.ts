import {supabase} from "../../supabase_setup.ts";

export default async function createMove(gameSessionId: string, playerId: string, xCoordinate: number, yCoordinate: number) {
    const { data, error } = await supabase.from('moves')
        .insert({ session_id: gameSessionId, player_id: playerId, x_coordinate: xCoordinate, y_coordinate: yCoordinate })
        .select()
        .single()

    if (error != null)
        throw Error(error.message)

    return data
}