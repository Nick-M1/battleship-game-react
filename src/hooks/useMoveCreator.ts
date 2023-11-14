import {useMemo, useState} from "react";
import createMoveSingle, {createMoveCatchErrors} from "../database/queries/moves/create-move-single.ts";
import createMoveQuad from "../database/queries/moves/create-move-quad.ts";
import {Database} from "../database/supabase.ts";
import calcSurroundingCellsCss from "../logic/surrounding-cells-css.ts";
import createMoveScatter from "../database/queries/moves/create-move-scatter.ts";
import createMoveNuke from "../database/queries/moves/create-move-nuke.ts";

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

            case 2:
                await createMoveScatter(gameSessionId, playerId, xCoordinate, yCoordinate, thisPlayerMoves)
                    .catch(createMoveCatchErrors);
                break;

            case 3:
                await createMoveNuke(gameSessionId, playerId, xCoordinate, yCoordinate, thisPlayerMoves)
                    .catch(createMoveCatchErrors);
                break;
        }

        setMoveTypeSelected(0)
    }

    const surroundingCellsCss = useMemo(() => calcSurroundingCellsCss(moveTypeSelected), [moveTypeSelected])

    return [moveTypeSelected, setMoveTypeSelected, moveHandler, surroundingCellsCss] as const
}