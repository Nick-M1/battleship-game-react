type Props = {
    timeSinceStart: number
}

export default function GameStartCountdownTimer({ timeSinceStart }: Props) {
    return (
        <div className='min-h-screen scrollbar bg-neutral-800 bg-game-background font-riffic text-white flex flex-col items-center justify-center space-y-6'>
            <h2 className='text-4xl md:text-5xl lg:text-6xl text-teal-400'>Game Starting</h2>
            <h3 className='text-6xl md:text-8xl lg:text-9xl animate-bounce'>{ timeSinceStart }</h3>
        </div>
    )
}