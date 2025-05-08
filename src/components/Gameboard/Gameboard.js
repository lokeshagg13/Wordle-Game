import React from 'react';

import './Gameboard.css';

import Line from '../Row/Row';

function Gameboard({ guesses, currentGuess, solution }) {
    const currentTrialIndex = guesses.findIndex((guess) => guess.every((letter) => letter === ''));
    return (
        <div className="game-board">
            {guesses.map((guess, index) => {
                if (index === currentTrialIndex) {
                    guess = currentGuess;
                }
                return <Line key={index} guess={guess} isFinal={index < currentTrialIndex} solution={solution} />
            })}
        </div>
    );
}

export default Gameboard;
