import { useContext, useEffect } from "react";

import gameConfig from "../../../logic/gameConfig";
import KeyboardButton from "./KeyboardButton";
import BackspaceIcon from "../../common/icons/Backspace";
import GameContext from "../../../store/gameContext";
import colorsJSON from "../../../data/colors.json";

const { colors } = colorsJSON;
const { UNCOVERED } = gameConfig.CHARACTER_STATUSES;

function Keyboard() {
  const gameContext = useContext(GameContext);

  const { colorStatus } = gameContext;

  const getColorStatus = (color) => {
    if (color in colors) {
      return colorStatus.hasOwnProperty(color) ? colorStatus[color] : UNCOVERED;
    }
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      const key = event.key.toLowerCase();

      if (key === "enter") {
        if (document.activeElement.tagName === "BUTTON") {
          event.preventDefault();
        }
        gameContext.handleColoraleGuessSubmit();
      } else if (key === "backspace") {
        gameContext.handleColorDelete();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  // eslint-disable-next-line
  }, [gameContext.handleColorDelete, gameContext.handleColoraleGuessSubmit]);

  return (
    <div className="keyboard-container">
      <div className="keyboard-row">
        {Object.keys(colors)
          .slice(0, 5)
          .map((color) => (
            <KeyboardButton
              key={color}
              colorName={color}
              colorBgHex={colors[color].background}
              colorTextHex={colors[color].text}
              onKeyPress={() => gameContext.handleColorInput(color)}
              colorStatus={getColorStatus(color)}
            />
          ))}
      </div>
      <div className="keyboard-row">
        {Object.keys(colors)
          .slice(5)
          .map((color) => (
            <KeyboardButton
              key={color}
              colorName={color}
              colorBgHex={colors[color].background}
              colorTextHex={colors[color].text}
              onKeyPress={() => gameContext.handleColorInput(color)}
              colorStatus={getColorStatus(color)}
            />
          ))}
      </div>
      <div className="keyboard-row">
        <button
          key="enter"
          className="enter"
          onClick={() => gameContext.handleColoraleGuessSubmit()}
        >
          ENTER
        </button>
        <button
          key="clear"
          className="clear"
          onClick={() => gameContext.handleColoraleInputClear()}
        >
          CLEAR
        </button>
        <button
          key="backspace"
          className="backspace"
          onClick={() => gameContext.handleColorDelete()}
        >
          <BackspaceIcon />
        </button>
      </div>
    </div>
  );
}

export default Keyboard;
