import { useContext } from "react";

import Line from "./row/Row";
import GameContext from "../../../store/gameContext";

function Gameboard() {
  const gameContext = useContext(GameContext);
  const { coloraleGuesses, currentColoraleGuess, colorsOfTheDay } = gameContext;

  const currentTrialIndex = coloraleGuesses.findIndex((guess) =>
    guess.every((color) => color === "")
  );
  const allFilled = coloraleGuesses.every(
    (guess) => guess.every((color) => color !== "") === true
  );

  return (
    <div className="game-board">
      {coloraleGuesses.map((guess, index) => {
        if (index === currentTrialIndex) {
          guess = currentColoraleGuess;
        }
        return (
          <Line
            key={index}
            guess={guess}
            isFinal={index < currentTrialIndex || allFilled}
            solution={colorsOfTheDay}
          />
        );
      })}
    </div>
  );
}

export default Gameboard;
