import { useContext } from "react";

import Line from "./row/Row";
import GameContext from "../../../store/gameContext";

function Gameboard() {
  const gameContext = useContext(GameContext);
  const { wordleGuesses, currentWordleGuess, wordOfTheDay } = gameContext;

  const currentTrialIndex = wordleGuesses.findIndex((guess) =>
    guess.every((letter) => letter === "")
  );
  const allFilled = wordleGuesses.every(
    (guess) => guess.every((char) => char !== "") === true
  );

  return (
    <div className="game-board">
      {wordleGuesses.map((guess, index) => {
        if (index === currentTrialIndex) {
          guess = currentWordleGuess;
        }
        return (
          <Line
            key={index}
            guess={guess}
            isFinal={index < currentTrialIndex || allFilled}
            solution={wordOfTheDay}
          />
        );
      })}
    </div>
  );
}

export default Gameboard;
