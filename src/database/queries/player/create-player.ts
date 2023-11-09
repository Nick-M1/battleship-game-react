import {supabase} from "../../supabase_setup.ts";

export default async function createPlayer(username: string) {
    const password = 'unknown'

    return supabase.from('players')
        .insert({ username, password })
        .select()
        .single()
}