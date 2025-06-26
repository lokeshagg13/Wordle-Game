import { useContext } from "react";

import gameConfig from "../../../logic/gameConfig";
import GameContext from "../../../store/gameContext";

const { COLORALE } = gameConfig.GAME_TYPES;
const { WON, LOST } = gameConfig.GAME_STATUSES;

function Modal() {
  const gameContext = useContext(GameContext);

  return (
    <div className="modal">
      <div className="modal-content">
        {gameContext.gameStatus === WON ? "🎉 You won" : "😢 Game over"}
        {gameContext.gameStatus === LOST && (
          <div className="solution">
            The word was
            <div className="solution-word">{gameContext.wordOfTheDay}</div>
          </div>
        )}
        <div className="modal-actions">
          <button onClick={() => gameContext.startWordleGame()}>
            Play Again
          </button>
          <button
            className="primary"
            onClick={() => gameContext.changeGameType(COLORALE)}
          >
            Play Colorale
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
