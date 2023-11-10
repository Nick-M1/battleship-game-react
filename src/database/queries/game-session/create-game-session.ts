import {supabase} from "../../supabase_setup.ts";

export default async function createGameSession(playerId: string) {
    const { data, error } = await supabase.from('game_sessions')
        .insert({player_1_id: playerId, time_per_move: 40})
        .select()
        .single()

    if (error !== null || data === null)
        throw Error(JSON.stringify(error))

    return data
}