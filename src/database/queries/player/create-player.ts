import {supabase} from "../../supabase_setup.ts";
import toast from "react-hot-toast";

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

export function createPlayerCatchErrors(error: Error) {
    console.log(error)

    switch (JSON.parse(error.message).code) {
        case '23505':
            toast.error('Updating player settings failed - Username already in use', { id: 'player-settings' })
            break

        case '23514':
            toast.error('Updating player settings failed - Username should have more than 5 characters', { id: 'player-settings' })
            break

        case 'PGRST116':
            toast.error('Updating player settings failed - No changes were made', { id: 'player-settings' })
            break

        default:
            toast.error('Updating player settings failed', { id: 'player-settings' })
    }
}