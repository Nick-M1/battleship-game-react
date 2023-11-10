import {supabase} from "../../supabase_setup.ts";

export default async function updatePlayer(playerId: string, username?: string, imageIndex?: number) {
    const { data, error } = await supabase.from('players')
        .update({ username, image_index: imageIndex })
        .eq('player_id', playerId)
        .select()
        .single()

    if (error !== null)
        throw Error(JSON.stringify(error))

    return data
}