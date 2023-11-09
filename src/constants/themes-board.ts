export const THEME_GREEN: BoardTheme = {
    light: '236 238 212',
    dark: '116 150 84'
}

export const THEME_BROWN: BoardTheme = {
    light: '255 206 158',
    dark: '209 139 71'
}

const themeMap: {[p: string]: BoardTheme} = {
    'green': THEME_GREEN,
    'brown': THEME_BROWN
}

export const defaultTheme = 'green'

export function allThemes() {
    return Object.entries(themeMap)
}

export function themeMapper(theme: string | null) {
    if (theme == null)
        return THEME_GREEN

    return themeMap.hasOwnProperty(theme) ? themeMap[theme] : THEME_GREEN
}