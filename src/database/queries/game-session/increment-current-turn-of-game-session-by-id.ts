import {supabase} from "../../supabase_setup.ts";

export default async function skipMoveIfOverrunsTime(gameSessionId: string) {
    const { error } = await supabase.rpc('skip_move_if_overruns_time', { p_session_id: gameSessionId })

    // if (error !== null)
    //     throw Error('Skipping-move failed')
}