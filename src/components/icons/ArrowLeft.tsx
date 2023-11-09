type Props = {
    width: number
    className?: string
}

export default function ArrowLeft({ width, className }: Props) {
    return (
        <svg fill="none" width={width} className={className} stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"></path>
        </svg>
    )
}