import {supabase} from "../../../../database/supabase_setup.ts";
import {getPlayerMessageChannelName} from "../../../../logic/player-messages.ts";

const EMOJIS_AVAILABLE = ['😊', '😂', '😍', '🥰', '😎', '🤩', '😘', '🤗', '😁', '🤔'];

type Props = {
    gameSessionId: string
    playerId: string
    emojiKeyboardOpen: boolean
    setEmojiKeyboardClosed: () => void
}


export default function EmojiKeyboard({ gameSessionId, playerId, emojiKeyboardOpen, setEmojiKeyboardClosed }: Props) {

    //todo refactor out
    const handleEmojiClick = async (emoji: string) => {
        await supabase.channel(getPlayerMessageChannelName(gameSessionId)).send({
            type: 'broadcast',
            event: 'emoji',
            payload: { playerId, emoji }
        })

        setEmojiKeyboardClosed()
    };

    return (
        <div className="absolute top-3 -translate-x-16 z-20">

            { emojiKeyboardOpen && (
                <div className="flex flex-col gap-2">
                    { EMOJIS_AVAILABLE.map((emoji, index) => (
                        <button
                            key={index}
                            className="rounded-full w-8 h-8 flex items-center justify-center text-2xl bg-white/20 hover:bg-gray-300 focus:outline-none focus:bg-gray-300"
                            onClick={() => handleEmojiClick(emoji)}
                        >
                            {emoji}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}