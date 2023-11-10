import {Database} from "../../../database/supabase.ts";
import {getProfileImageByIndex} from "../../../constants/profile-imgs-constants.ts";

type Props = {
    profile: Database['battleships']['Tables']['players']['Row']
    hasWon: boolean
}

export default function ProfileLarge({ profile, hasWon }: Props) {
    return (
        <div className='flex flex-col items-center'>
            <h2 className={`font-bold text-2xl ${ hasWon ? 'text-teal-600' : 'text-gray-400' }`}>{ profile.username }</h2>
            <img src={getProfileImageByIndex(profile.image_index)} alt='profile-pic' title={profile.username} className={`mx-2 h-20 w-20 aspect-square rounded-full border-2 smooth-transition ${ hasWon ? 'border-teal-500' : 'border-gray-600' } `}/>
        </div>
    )
}