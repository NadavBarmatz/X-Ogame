export class GameState{
    public cellsStateArray: string[] = new Array(9).fill("null");
    public playerTurn: boolean = true;
};

export enum GameActionType{
    SetCellStateArray = "SetCellStateArray",
    SetPlayerTurn = "SetPlayerTurn"
};

export interface GameAction{
    type: GameActionType;
    payload: any;
};

export function setCellStateArrayAction(newCellState: string[]): GameAction{
    return {type: GameActionType.SetCellStateArray, payload: newCellState}
};

export function setPlayerTurnAction(isPlayerTurn: boolean): GameAction{
    return {type: GameActionType.SetPlayerTurn, payload: isPlayerTurn}
};

export function gameReducer(currentGameState: GameState = new GameState(), action: GameAction): GameState{
    const newGameState = {...currentGameState};

    switch (action.type) {
        case GameActionType.SetCellStateArray:
            newGameState.cellsStateArray = action.payload;
            break;
    
        case GameActionType.SetPlayerTurn:
            newGameState.playerTurn = action.payload;
            break;
    }

    return newGameState;
};