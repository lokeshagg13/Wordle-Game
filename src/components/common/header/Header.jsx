import { useContext } from "react";
import gameConfig from "../../../logic/gameConfig";
import GameContext from "../../../store/gameContext";
import WordleGameImage from "../../../images/title-wordle.png";
import ColoraleGameImage from "../../../images/title-colorale.png";

const { WORDLE, COLORALE } = gameConfig.GAME_TYPES;

function Header() {
  const gameContext = useContext(GameContext);
  return (
    <>
      <div className="switch-div">
        <button
          className="primary"
          onClick={() =>
            gameContext.gameType === WORDLE
              ? gameContext.changeGameType(COLORALE)
              : gameContext.changeGameType(WORDLE)
          }
        >
          Play {gameContext.gameType === WORDLE ? "Colorale" : "Wordle"}
        </button>
      </div>
      <div className="image-div">
        <img
          src={
            gameContext.gameType === WORDLE
              ? WordleGameImage
              : ColoraleGameImage
          }
          alt={gameContext.gameType === WORDLE ? "Wordle" : "Colorale"}
          className="game-image"
          width={400}
          height={150}
        />
      </div>
    </>
  );
}

export default Header;
