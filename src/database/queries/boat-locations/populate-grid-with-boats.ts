import {supabase} from "../../supabase_setup.ts";

export default async function populateGridWithBoats(gameSessionId: string, playerId: string) {
    const { error } = await supabase.rpc('populate_player_grid', { p_session_id: gameSessionId, p_player_id: playerId })

    if (error !== null)
        throw Error(JSON.stringify(error))
}