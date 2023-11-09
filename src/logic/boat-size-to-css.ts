const BOAT_SIZES_CSS: {[p: number]: string} = {
    2: 'h-190%',
    3: 'h-290%',
    4: 'h-390%',
    5: 'h-490%'
}

export default function boatSizeToCss(size: number) {
    return BOAT_SIZES_CSS[size] || 'h-90%'
}