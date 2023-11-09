import {supabase} from "../../supabase_setup.ts";

export default async function getGameSessionById(gameSessionId: string) {
    const { data, error } = await supabase.from('game_sessions')
        .select()
        .eq('session_id', gameSessionId)
        .single()

    if (error != null)
        throw Error('Game-session with this id could not be found')

    return data
}