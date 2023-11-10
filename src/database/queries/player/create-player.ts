import {supabase} from "../../supabase_setup.ts";

export default async function createPlayer(username: string, imageIndex: number) {
    const password = 'unknown'

    const { data, error } = await supabase.from('players')
        .insert({ username, password, image_index: imageIndex })
        .select()
        .single()

    if (error !== null)
        throw Error(JSON.stringify(error))

    return data
}