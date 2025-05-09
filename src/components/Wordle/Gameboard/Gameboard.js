import React from 'react';

import Line from '../Row/Row';

function Gameboard({ guesses, currentGuess, solution }) {
    const currentTrialIndex = guesses.findIndex((guess) => guess.every((letter) => letter === ''));
    const allFilled = guesses.every((guess) => 
        guess.every((char) => char !== '') === true);
    return (
        <div className="game-board">
            {guesses.map((guess, index) => {
                if (index === currentTrialIndex) {
                    guess = currentGuess;
                }
                return <Line key={index} guess={guess} isFinal={index < currentTrialIndex || allFilled} solution={solution} />
            })}
        </div>
    );
}

export default Gameboard;
