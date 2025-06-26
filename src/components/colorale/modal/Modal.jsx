import { useContext } from "react";

import gameConfig from "../../../logic/gameConfig";
import GameContext from "../../../store/gameContext";
import colorsJSON from "../../../data/colors.json";

const COLORS = colorsJSON.colors;
const { WORDLE } = gameConfig.GAME_TYPES;
const { WON, LOST } = gameConfig.GAME_STATUSES;

function Modal() {
  const gameContext = useContext(GameContext);

  return (
    <div className="modal">
      <div className="modal-content">
        {gameContext.gameStatus === WON ? "🎉 You won" : "😢 Game over"}
        {gameContext.gameStatus === LOST && (
          <div className="solution">
            The sequence was
            <div className="solution-row">
              {gameContext.colorsOfTheDay.map((color, index) => (
                <div
                  key={index}
                  className="solution-color"
                  style={{
                    backgroundColor: COLORS[color].background,
                  }}
                ></div>
              ))}
            </div>
          </div>
        )}
        <div className="modal-actions">
          <button onClick={() => gameContext.startColoraleGame()}>
            Play Again
          </button>
          <button
            className="primary"
            onClick={() => gameContext.changeGameType(WORDLE)}
          >
            Play Wordle
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
