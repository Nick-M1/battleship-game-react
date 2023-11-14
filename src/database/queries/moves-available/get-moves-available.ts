import {supabase} from "../../supabase_setup.ts";

export default async function getMovesAvailable(gameSessionId: string, playerId: string) {
    const { data, error } = await supabase.from('moves_available')
        .select()
        .eq('session_id', gameSessionId)
        .eq('player_id', playerId)
        .single()

    if (error != null || data === null)
        throw Error('Moves available could not be found')

    return data
}