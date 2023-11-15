import usePlayerMessages from "../../../../hooks/usePlayerMessages.ts";

type Props = {
    gameSessionId: string
    playerId: string
}

export default function ReceivedEmojis({ gameSessionId, playerId }: Props) {
    const [sentMessage, receivedMessage] = usePlayerMessages(gameSessionId, playerId, 2300)

    return (
        <div className='absolute flex justify-center space-x-1'>
            { sentMessage !== null ? <div className='z-10 animate-moveDown text-5xl pointer-events-none opacity-0'>{ sentMessage }</div> : <div className='w-16 opacity-0 pointer-events-none'/> }
            { receivedMessage !== null ? <div className='z-10 animate-moveDown text-5xl pointer-events-none opacity-0'>{ receivedMessage }</div> : <div className='w-12 opacity-0 pointer-events-none'/> }

        </div>
    )
}