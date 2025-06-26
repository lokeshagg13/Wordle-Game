import { useState, useEffect, useContext } from "react";

import colorsJSON from "../../../data/colors.json";
import gameConfig from "../../../logic/gameConfig";
import GameContext from "../../../store/gameContext";
import Hidden from "../../common/icons/Hidden";

const COLORS = colorsJSON.colors;
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
        {gameContext.colorsOfTheDay.map((color, index) => (
          <div
            key={index}
            className={`solution-color ${
              gameContext.gameStatus === PLAYING ? "hide" : "show"
            } ${animate ? "animate" : ""}`}
            style={{
              backgroundColor: COLORS[color].background,
            }}
          >
            {gameContext.gameStatus === PLAYING ? <Hidden fill="white" /> : ""}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Solution;
