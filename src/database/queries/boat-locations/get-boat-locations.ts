import {supabase} from "../../supabase_setup.ts";

export type GetBoatLocationsFunctionReturns = {
    boat_type_id: {
        boat_type_id: string,
        size: number,
        color: string
    },
    is_vertical_orientation: boolean,
    player_id: string,
    session_id: string,
    x_coordinate: number,
    y_coordinate: number
}[]

export default async function getBoatLocations(gameSessionId: string, playerId: string): Promise<GetBoatLocationsFunctionReturns> {
    // return supabase
    //     .rpc('get_occupied_coords', { p_session_id: gameSessionId, p_player_id: playerId })

    const { data, error } = await supabase.from('boat_locations')
        .select('*, boat_type_id (boat_type_id, size, color)')
        .eq('session_id', gameSessionId)
        .eq('player_id', playerId)

    if (error != null)
        throw Error('Boat locations could not be found')

    return data as unknown as GetBoatLocationsFunctionReturns
}