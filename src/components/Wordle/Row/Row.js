import React from 'react';
import './Row.css';

function Row({ index, guess, isFinal, solution }) {
    return (
        <div key={index} className="row">
            {guess.map((letter, index) => (

                <div key={index} className={`letter ${!isFinal || letter === '' ? 'empty' : letter === solution[index] ? 'correct' : solution.includes(letter) ? 'present' : 'absent'}`}>
                    {letter}
                </div>
            ))}
        </div>
    );
}

export default Row;