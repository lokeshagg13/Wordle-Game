import { useContext, useEffect } from "react";

import gameConfig from "../../../logic/gameConfig";
import KeyboardButton from "./KeyboardButton";
import BackspaceIcon from "../../common/icons/Backspace";
import GameContext from "../../../store/gameContext";

const { UNCOVERED } = gameConfig.CHARACTER_STATUSES;

function Keyboard() {
  const gameContext = useContext(GameContext);

  const { characterStatus } = gameContext;

  const getKeyStatus = (key) => {
    if (key === "*" || key === "<") {
      return UNCOVERED;
    }
    return characterStatus.hasOwnProperty(key)
      ? characterStatus[key]
      : UNCOVERED;
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      const key = event.key.toLowerCase();

      if (key === "enter") {
        if (document.activeElement.tagName === "BUTTON") {
          event.preventDefault();
        }
        gameContext.handleWordleGuessSubmit();
      } else if (key === "backspace") {
        gameContext.handleLetterDelete();
      } else if (/^[a-z]$/.test(key)) {
        gameContext.handleLetterInput(key);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  // eslint-disable-next-line
  }, [
    gameContext.handleLetterInput,
    gameContext.handleLetterDelete,
    gameContext.handleWordleGuessSubmit,
  ]);

  return (
    <div className="keyboard-container">
      <div className="keyboard-row">
        {"qwertyuiop".split("").map((key) => (
          <KeyboardButton
            key={key}
            letter={key}
            onKeyPress={() => gameContext.handleLetterInput(key)}
            keyStatus={getKeyStatus(key)}
          />
        ))}
      </div>
      <div className="keyboard-row">
        <div className="spacer"></div>
        {"asdfghjkl".split("").map((key) => (
          <KeyboardButton
            key={key}
            letter={key}
            onKeyPress={() => gameContext.handleLetterInput(key)}
            keyStatus={getKeyStatus(key)}
          />
        ))}
        <div className="spacer"></div>
      </div>
      <div className="keyboard-row">
        <button
          key="enter"
          className="enter"
          onClick={() => gameContext.handleWordleGuessSubmit()}
        >
          ENTER
        </button>
        {"zxcvbnm".split("").map((key) => (
          <KeyboardButton
            key={key}
            letter={key}
            onKeyPress={() => gameContext.handleLetterInput(key)}
            keyStatus={getKeyStatus(key)}
          />
        ))}
        <button
          key="backspace"
          className="backspace"
          onClick={() => gameContext.handleLetterDelete()}
        >
          <BackspaceIcon />
        </button>
      </div>
    </div>
  );
}

export default Keyboard;
