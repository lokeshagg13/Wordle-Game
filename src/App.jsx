import { useContext, useEffect } from "react";

import gameConfig from "./logic/gameConfig";
import GameContext from "./store/gameContext";
import Header from "./components/common/header/Header";
import WordleGame from "./components/wordle/WordleGame";
import ColoraleGame from "./components/colorale/ColoraleGame";
import Footer from "./components/common/footer/Footer";

const { WORDLE } = gameConfig.GAME_TYPES;

function App() {
  const gameContext = useContext(GameContext);

  useEffect(() => {
    // Dynamically update the document title
    document.title = gameContext.gameType === WORDLE ? "WORDLE" : "COLORALE";

    // Dynamically update the favicon
    const favicon = document.querySelector("link[rel='icon']");
    if (favicon) {
      favicon.href =
        gameContext.gameType === WORDLE
          ? `${process.env.PUBLIC_URL}/favicon-wordle.ico`
          : `${process.env.PUBLIC_URL}/favicon-colorale.ico`;
    }

    const appleTouchIcon = document.querySelector(
      "link[rel='apple-touch-icon']"
    );
    if (appleTouchIcon) {
      appleTouchIcon.href =
        gameContext.gameType === WORDLE
          ? `${process.env.PUBLIC_URL}/apple-touch-icon-wordle.png`
          : `${process.env.PUBLIC_URL}/apple-touch-icon-colorale.png`;
    }

    if (gameContext.gameType === WORDLE) gameContext.startWordleGame();
    else gameContext.startColoraleGame();
    // eslint-disable-next-line
  }, [gameContext.gameType]);

  return (
    <div
      className={`app ${
        gameContext.gameType === WORDLE ? "wordle" : "colorale"
      }`}
    >
      <Header />

      {gameContext.gameType === WORDLE ? <WordleGame /> : <ColoraleGame />}

      <Footer />
    </div>
  );
}

export default App;
