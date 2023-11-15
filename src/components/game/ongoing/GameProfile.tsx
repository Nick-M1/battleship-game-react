import {Database} from "../../../database/supabase.ts";
import {getProfileImageByIndex} from "../../../constants/profile-imgs-constants.ts";

type Props = {
    profile: Database['battleships']['Tables']['players']['Row']
    isThisPlayersTurn: boolean
    timeSecsLeft: number
    toLeft: boolean
    onClick: () => void
}

export default function GameProfile({ profile, isThisPlayersTurn, timeSecsLeft, toLeft, onClick }: Props) {
    return (
        <div className='flex items-center'>
            <div className={`flex flex-col ${ toLeft ? 'text-right' : 'order-last'}`}>
                <h4 className={`font-bold smooth-transition ${ isThisPlayersTurn ? 'text-teal-400' : 'text-gray-400' }`}>{ profile.username }</h4>
                <h5 className={`font-bold smooth-transition tabular-nums ${ isThisPlayersTurn ? 'text-teal-500' : 'text-gray-500' }`}>{ timeSecsLeft.toString() } secs</h5>
            </div>

            <img onClick={onClick} src={getProfileImageByIndex(profile.image_index)} alt='profile-pic' className={`mx-2 h-11 w-11 aspect-square rounded-full border-2 smooth-transition ${ isThisPlayersTurn ? 'border-teal-500' : 'border-gray-500' } ${ toLeft && 'cursor-pointer' }`}/>
        </div>
    )
}