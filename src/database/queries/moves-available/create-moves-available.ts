import {supabase} from "../../supabase_setup.ts";

export default async function createMovesAvailable(gameSessionId: string, playerId: string) {
    const {error} = await supabase.from('moves_available')
        .insert({session_id: gameSessionId, player_id: playerId})

    if (error !== null)
        throw Error(JSON.stringify(error))
}