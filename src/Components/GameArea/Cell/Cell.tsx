import { useEffect, useState } from "react";
import gameStore from "../../../Redux/Store";
import gameService from "../../../Services/GameService";
import "./Cell.css";

interface CellProps{
   imageSrc: string;
   index: number;
}

function Cell(props: CellProps): JSX.Element {

    const [isPlayerTurn, setIsPlayerTurn] = useState<boolean>(gameStore.getState().playerTurn);
    const [cellStateArray, setCellStateArray] = useState<string[]>(gameStore.getState().cellsStateArray);

    useEffect(()=>{
        const unSubMe = gameStore.subscribe(()=>{
            setIsPlayerTurn(gameStore.getState().playerTurn);
            setCellStateArray(gameStore.getState().cellsStateArray);
        })

        return ()=>{unSubMe()}
    }, [isPlayerTurn]);
    
    const handleClick = () => {
        console.log(props.index);
        gameService.makePlayerMove(isPlayerTurn, cellStateArray, props.index);
    }

    return (
        <div className="Cell" onClick={handleClick}>
            {props?.imageSrc && <img src={props.imageSrc} alt="" />}
        </div>
    );
}

export default Cell;
