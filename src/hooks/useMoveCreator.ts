import {useState} from "react";
import createMoveSingle, {createMoveCatchErrors} from "../database/queries/moves/create-move-single.ts";
import createMoveQuad from "../database/queries/moves/create-move-quad.ts";
import {Database} from "../database/supabase.ts";

export default function useMoveCreator(isPlayersTurn: boolean, gameSessionId: string, playerId: string, thisPlayerMoves: Database['battleships']['Tables']['moves']['Row'][]) {
    const [moveTypeSelected, setMoveTypeSelected] = useState(0)

    const moveHandler = async (xCoordinate: number, yCoordinate: number) => {
        if (!isPlayersTurn)
            return

        switch (moveTypeSelected) {
            case 0:
                await createMoveSingle(gameSessionId, playerId, xCoordinate, yCoordinate)
                    .catch(createMoveCatchErrors);
                break;

            case 1:
                await createMoveQuad(gameSessionId, playerId, xCoordinate, yCoordinate, thisPlayerMoves)
                    .catch(createMoveCatchErrors);
                break;
        }

        setMoveTypeSelected(0)
    }

    return [moveTypeSelected, setMoveTypeSelected, moveHandler] as const
}