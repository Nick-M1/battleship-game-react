import {useEffect, useState} from "react";
import {supabase} from "../database/supabase_setup.ts";
import {getPlayerMessageChannelName} from "../logic/player-messages.ts";

export default function usePlayerMessages(gameSessionId: string, playerId: string, timeout: number) {
    const [sentMessage, setSentMessage] = useState<string | null>(null)
    const [receivedMessage, setReceivedMessage] = useState<string | null>(null)


    useEffect(() => {
        const channelId = supabase.channel(getPlayerMessageChannelName(gameSessionId))
            .on('broadcast', { event: 'emoji' }, payload => {
                payload.payload.playerId === playerId
                    ? setSentMessage(payload.payload.emoji)
                    : setReceivedMessage(payload.payload.emoji)
            }).subscribe()

        return () => {
            channelId.unsubscribe()
        }
    }, [gameSessionId, playerId]);

    useEffect(() => {
        if (receivedMessage !== null)
            setTimeout(() => setReceivedMessage(null), timeout)
    }, [receivedMessage, timeout]);
    useEffect(() => {
        if (sentMessage !== null)
            setTimeout(() => setSentMessage(null), timeout)
    }, [sentMessage, timeout]);
    
    return [sentMessage, receivedMessage] as const
}