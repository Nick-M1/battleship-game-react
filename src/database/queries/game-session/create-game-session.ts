import {supabase} from "../../supabase_setup.ts";
import populateGridWithBoats from "../boat-locations/populate-grid-with-boats.ts";
import createMovesAvailable from "../moves-available/create-moves-available.ts";

export default async function createGameSession(playerId: string) {
    const { data, error } = await supabase.from('game_sessions')
        .insert({ player_1_id: playerId, time_per_move: 40 })
        .select()
        .single()

    if (error !== null || data === null)
        throw Error(JSON.stringify(error))

    await populateGridWithBoats(data.session_id, playerId)      //todo put into postgres functions altogether
    await createMovesAvailable(data.session_id, playerId)

    return data
}