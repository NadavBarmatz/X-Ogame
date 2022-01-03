import Cell from "../Cell/Cell";
import "./Board.css";
import Ximage from "../../../Assets/Images/X.png"
import Oimage from "../../../Assets/Images/O.png"
import { useEffect, useState } from "react";
import gameStore from "../../../Redux/Store";
import gameService from "../../../Services/GameService";
import notificationService from "../../../Services/NotificationService";
import { setCellStateArrayAction, setPlayerTurnAction } from "../../../Redux/GameState";

function Board(): JSX.Element {

    const [cells, setCells] = useState<string[]>(gameStore.getState().cellsStateArray);
    const [turn, setTurn] = useState<boolean>(gameStore.getState().playerTurn);
    const [winner, setWinner] = useState<string>(null);
    const [playerCount, setPlayerCount] = useState<number>(0);
    const [computerCount, setComputerCount] = useState<number>(0);

    useEffect(()=>{
        const unSubMe = gameStore.subscribe(()=>{
            setCells(gameStore.getState().cellsStateArray);
            setTurn(gameStore.getState().playerTurn);
        });

        const playerWon = gameService.winningLanes(cells, "x", "x", "x").length > 0;
        if(playerWon){
            notificationService.success("You Won");
            setWinner("Player")
            setPlayerCount(playerCount+1);
            return; 
        }
        const computerWon = gameService.winningLanes(cells, "o", "o", "o").length > 0;
        if(computerWon){
            notificationService.success("You Loose");
            setWinner("Computer");
            setComputerCount(computerCount+1);
            return;
        }

        if(turn === false){
           gameService.makeComputerMove(cells)
        }

        return ()=>{unSubMe();}
        
    }, [turn])

    const restart = () => {
        setWinner(null)
        gameStore.dispatch(setPlayerTurnAction(true))
        gameStore.dispatch(setCellStateArrayAction(new Array(9).fill("null")))
    }

    return (
        <>
        {winner && <h2>{winner} Won</h2>}
        <div className="Board">
			{cells.map((e, index) => <Cell index={index} imageSrc={e === "x"? Ximage : (e==="o"? Oimage : "")} key={index} />)}
        </div>
        <div className="Btn-group">
            <button onClick={restart}>Restart</button>
            <h3>Player: {playerCount}</h3>
            <h3>Computer: {computerCount}</h3>
        </div>
        </>
    );
}

export default Board;
