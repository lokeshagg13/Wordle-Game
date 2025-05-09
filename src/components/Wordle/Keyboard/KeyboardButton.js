import React from 'react';

function KeyboardButton({ letter, onKeyPress, keyStatus }) {
    return (
        <button
            key={letter}
            className={
                `${letter} ${keyStatus}`
            }
            onClick={onKeyPress}
        >
            {letter.toUpperCase()}
        </button>
    );
}

export default KeyboardButton;
