import React from 'react';

import GameImage from './images/title.png';
import Game from './components/Game';

function App() {
  return (
    <div className="App">
      <img src={GameImage} alt="Wordle" className="game-image" width={400} height={150} />
      <Game />
    </div>
  );
}

export default App;
