type Props = {
    width: number
    className?: string
}

export default function ArrowRight({ width, className }: Props) {
    return (
        <svg fill="none" width={width} className={className} stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"></path>
        </svg>
    )
}