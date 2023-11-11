import {supabase} from "../../supabase_setup.ts";
import {Database} from "../../supabase.ts";

export type GetGameSessionsByPlayerIdFunctionReturns = {
    completed_at: string | null,
    created_at: string,
    current_turn: number,
    current_turn_started_at: string,
    game_status: "joining" | "ongoing" | "finished",
    modified_at: string,
    player_1_id: Database['battleships']['Tables']['players']['Row'],
    player_2_id: Database['battleships']['Tables']['players']['Row'],
    session_id: string,
    time_per_move: string
}[]

export default async function getGameSessionsByPlayerId(playerId: string): Promise<GetGameSessionsByPlayerIdFunctionReturns> {
    const { data, error } = await supabase.from('game_sessions')
        .select("*, player_1_id ( player_id, username, image_index ), player_2_id ( player_id, username, image_index )")
        .or(`player_1_id.eq.${ playerId }, player_2_id.eq.${ playerId }`)
        .neq('game_status', 'joining')

    if (error !== null || data === null)
        throw Error(JSON.stringify(error))

    return data as unknown as GetGameSessionsByPlayerIdFunctionReturns
}