export function smoothScroll(elementId: string, scrollPosition: ScrollLogicalPosition ) {
    document.getElementById( elementId )
        ?.scrollIntoView({
            behavior: 'smooth',
            block: scrollPosition,
            inline: scrollPosition
        })
}