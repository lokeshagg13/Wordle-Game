import { useContext } from "react";
import Confetti from "react-confetti";

import gameConfig from "../../logic/gameConfig";
import Solution from "./solution/Solution";
import Modal from "./modal/Modal";
import Gameboard from "./gameboard/Gameboard";
import Keyboard from "./keyboard/Keyboard";

import GameContext from "../../store/gameContext";

const { WON, LOST } = gameConfig.GAME_STATUSES;

function ColoraleGame() {
  const gameContext = useContext(GameContext);

  return (
    <>
      {gameContext.gameStatus === WON && <Confetti />}
      {(gameContext.gameStatus === WON || gameContext.gameStatus === LOST) && (
        <Modal />
      )}
      {gameContext.colorsOfTheDay && (
        <>
          <Solution />
          <Gameboard />
        </>
      )}
      <Keyboard />
    </>
  );
}

export default ColoraleGame;
