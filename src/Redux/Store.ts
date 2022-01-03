import { createStore } from "redux";
import { gameReducer } from "./GameState";

const gameStore = createStore(gameReducer);

export default gameStore;