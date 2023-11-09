import {supabase} from "../../supabase_setup.ts";

export default async function getPlayerById(playerId: string) {
    const { data, error } = await supabase
        .from('players')
        .select()
        .eq('player_id', playerId)
        .single()

    if (error == null)
        return data

    throw Error('player doesnt exist')
}