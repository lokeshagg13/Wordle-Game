import React, { useState } from 'react';

import WordleGame from './components/Wordle/Game';

import './App.css';

function App() {
  const [gameType, setGameType] = useState('wordle');

  return (
    <div className={`app ${gameType}`}>
      <div className="switch-div">
        <button className="primary" onClick={() => gameType === 'wordle' ? setGameType('colorale') : setGameType('wordle')}>
          Play {gameType === 'wordle' ? 'Colorale' : 'Wordle'}
        </button>
      </div>
      <WordleGame />
    </div>
  );
}

export default App;
