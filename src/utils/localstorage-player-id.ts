const LOCALSTORAGE_PLAYER_ID_KEY = 'battleship-mania-player-id'

export function setPlayerIdLocalstorage(playerId: string) {
    window.localStorage.setItem(LOCALSTORAGE_PLAYER_ID_KEY, playerId)
}

export function getPlayerIdLocalstorage() {
    return window.localStorage.getItem(LOCALSTORAGE_PLAYER_ID_KEY)
}