import { useState, useEffect, useContext } from "react";

import gameConfig from "../../../logic/gameConfig";
import GameContext from "../../../store/gameContext";
import Hidden from "../../common/icons/Hidden";

const { PLAYING } = gameConfig.GAME_STATUSES;

function Solution() {
  const gameContext = useContext(GameContext);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (gameContext.gameStatus === PLAYING) {
      setAnimate(true);

      const timeout = setTimeout(() => {
        setAnimate(false);
      }, 600);

      return () => clearTimeout(timeout);
    }
  }, [gameContext.gameStatus]);

  return (
    <div className="solution">
      <div className="solution-row">
        {gameContext.wordOfTheDay.split("").map((char, index) => (
          <div
            key={index}
            className={`solution-letter ${
              gameContext.gameStatus === PLAYING ? "hide" : "show"
            } ${animate ? "animate" : ""}`}
          >
            {gameContext.gameStatus === PLAYING ? (
              <Hidden fill="white" />
            ) : (
              char.toUpperCase()
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Solution;
