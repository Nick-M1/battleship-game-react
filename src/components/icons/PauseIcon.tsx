type Props = {
    width: number
    className?: string
}

export default function PauseIcon({ width, className }: Props) {
    return (
        <svg width={width} className={className} fill="none" stroke="currentColor" strokeWidth="4" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5"></path>
        </svg>
    )
}