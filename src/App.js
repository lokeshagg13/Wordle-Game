import React, { useState } from 'react';

import WordleGame from './components/Wordle/Game';
import ColoraleGame from './components/Colorale/Game';

import './App.css';

function App() {
  const [gameType, setGameType] = useState('colorale');

  return (
    <div className={`app ${gameType}`}>
      <div className="switch-div">
        <button className="primary" onClick={() => gameType === 'wordle' ? setGameType('colorale') : setGameType('wordle')}>
          Play {gameType === 'wordle' ? 'Colorale' : 'Wordle'}
        </button>
      </div>
      {gameType === 'wordle' ?
        <WordleGame gameTypeChanger={setGameType} /> :
        <ColoraleGame gameTypeChanger={setGameType} />}
    </div>
  );
}

export default App;
