import { setCellStateArrayAction, setPlayerTurnAction } from "../Redux/GameState";
import gameStore from "../Redux/Store";

class GameService{

    private lanes= [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ]

    private compRandomMove(emptyCells: number[]){
        const rndCell = Math.floor(Math.random() * emptyCells.length);
        console.log("rnd: ", rndCell);
        console.log("empty cells: ", emptyCells);
        console.log("comp: ", emptyCells[rndCell]);
        return emptyCells[rndCell];
    }

    public winningLanes(cells:string[], a: string, b: string, c: string){
        return this.lanes.filter(cellIndex => {
            const values = cellIndex.map(index => cells[index]);
            return JSON.stringify([a,b,c].sort()) === JSON.stringify(values.sort());
        })
    }

    private chooseNextMove(cells: string[]){
        const emptyCells = cells.map((cell, index) => cell === "null" ? index : null)
                                .filter(c => c !== null);
    
        const possibleWin = this.winningLanes(cells, "o", "o", "null");
        const possibleLoose = this.winningLanes(cells, "x", "x", "null");
        const lastOption = this.winningLanes(cells, "o", "null", "null");

        if(possibleWin.length > 0){
            return possibleWin[0].filter(index => cells[index] === "null")[0];
        }
        if(possibleLoose.length > 0){            
            return possibleLoose[0].filter(index => cells[index] === "null")[0];
        }
        if(lastOption.length > 0){
            return lastOption[0].filter(index => cells[index] === "null")[Math.round(Math.random())];
        }
        if(cells[4] === "null") return 4;     
        return this.compRandomMove(emptyCells);
        
    }

    public makeComputerMove(cells: string[]){
            const nextMove = this.chooseNextMove(cells);
            cells[nextMove] = "o";
            gameStore.dispatch(setCellStateArrayAction(cells))
            gameStore.dispatch(setPlayerTurnAction(true));
    }

    public makePlayerMove(isPlayerTurn: boolean, cells: string[], index: number ){
        if(isPlayerTurn === true){
            if(cells[index] !== "null"){
                return;
            }
            cells[index] = "x";
            gameStore.dispatch(setCellStateArrayAction(cells))
            gameStore.dispatch(setPlayerTurnAction(false));
        }
    }

}

const gameService = new GameService()

export default gameService;