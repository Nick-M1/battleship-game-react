import {supabase} from "../../supabase_setup.ts";


export default async function getMoves(gameSessionId: string, playerId: string) {
    const { data, error } = await supabase.from('moves')
        .select()
        .eq('session_id', gameSessionId)
        .eq('player_id', playerId)

    if (error != null)
        throw Error('Moves could not be found')

    return data
}