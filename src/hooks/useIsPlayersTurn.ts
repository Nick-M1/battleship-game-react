import {useMemo} from "react";

export default function useIsPlayersTurn(isPlayer1: boolean, currentTurn: number) {
    return useMemo(() =>
            (isPlayer1 && currentTurn % 2 === 0) || (!isPlayer1 && currentTurn % 2 === 1),
        [currentTurn, isPlayer1]
    )
}