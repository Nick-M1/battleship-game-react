export function calcIsPlayersTurn(isPlayer1: boolean, currentTurn: number) {
    return (isPlayer1 && currentTurn % 2 === 0) || (!isPlayer1 && currentTurn % 2 === 1)
}