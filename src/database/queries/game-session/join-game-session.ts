import {supabase} from "../../supabase_setup.ts";
import populateGridWithBoats from "../boat-locations/populate-grid-with-boats.ts";

export default async function joinGameSession(gameSessionId: string, playerId: string) {
    const { data, error } = await supabase.from('game_sessions')
        .update({ player_2_id: playerId, game_status: 'ongoing' })
        .eq('session_id', gameSessionId)
        .select()
        .single()

    if (error !== null || data === null)
        throw Error(JSON.stringify(error))

    await populateGridWithBoats(gameSessionId, playerId)

    return data
}