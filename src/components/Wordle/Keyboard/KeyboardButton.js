import React from 'react';

import './KeyboardButton.css';

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
