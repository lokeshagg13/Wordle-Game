import React, { useState, useEffect } from 'react';

import WordleGame from './components/Wordle/Game';
import ColoraleGame from './components/Colorale/Game';
import Footer from './components/Common/Footer/Footer';

import './App.css';

function App() {
  const [gameType, setGameType] = useState('wordle');

  useEffect(() => {
    // Dynamically update the document title
    document.title = gameType === 'wordle' ? 'WORDLE' : 'COLORALE';

    // Dynamically update the favicon
    const favicon = document.querySelector("link[rel='icon']");
    if (favicon) {
      favicon.href = gameType === 'wordle' ? `${process.env.PUBLIC_URL}/favicon-wordle.ico` : `${process.env.PUBLIC_URL}/favicon-colorale.ico`;
    }

    const appleTouchIcon = document.querySelector("link[rel='apple-touch-icon']");
    if (appleTouchIcon) {
      appleTouchIcon.href = gameType === 'wordle' ? `${process.env.PUBLIC_URL}/apple-touch-icon-wordle.png` : `${process.env.PUBLIC_URL}/apple-touch-icon-colorale.png`;
    }
  }, [gameType]);

  return (
    <div className={`app ${gameType}`}>
      <div className="switch-div">
        <button className="primary" onClick={() => gameType === 'wordle' ? setGameType('colorale') : setGameType('wordle')}>
          Play {gameType === 'wordle' ? 'Colorale' : 'Wordle'}
        </button>
      </div>
      {gameType === 'wordle' ?
        <WordleGame gameTypeChanger={setGameType} /> :
        <ColoraleGame gameTypeChanger={setGameType} />
      }
      <Footer />
    </div>
  );
}

export default App;
