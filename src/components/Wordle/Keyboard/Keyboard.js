import React, { useEffect } from 'react';

import './Keyboard.css';

import KeyboardButton from './KeyboardButton';
import BackspaceIcon from '../UI/Icons/Backspace';

function Keyboard({ onLetter, onBackspace, onEnter, characterStatus }) {
    const getKeyStatus = (key) => {
        if (key === '*' || key === '<') {
            return 'uncovered';
        }
        return characterStatus.hasOwnProperty(key) ? characterStatus[key] : 'uncovered';
    };

    useEffect(() => {
        const handleKeyPress = (event) => {
            const key = event.key.toLowerCase();

            if (key === 'enter') {
                onEnter();
            } else if (key === 'backspace') {
                onBackspace();
            } else if (/^[a-z]$/.test(key)) {
                onLetter(key);
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [onLetter, onBackspace, onEnter]);

    return (
        <div className="keyboard-container">
            <div className="keyboard-row">
                {'qwertyuiop'.split('').map((key) => (
                    <KeyboardButton
                        key={key}
                        letter={key}
                        onKeyPress={() => onLetter(key)}
                        keyStatus={getKeyStatus(key)}
                    />
                ))}
            </div>
            <div className="keyboard-row">
                <div className="spacer"></div>
                {'asdfghjkl'.split('').map((key) => (
                    <KeyboardButton
                        key={key}
                        letter={key}
                        onKeyPress={() => onLetter(key)}
                        keyStatus={getKeyStatus(key)}
                    />
                ))}
                <div className="spacer"></div>
            </div>
            <div className="keyboard-row">
                <button
                    key="enter"
                    className="enter"
                    onClick={onEnter}
                >
                    ENTER
                </button>
                {'zxcvbnm'.split('').map((key) => (
                    <KeyboardButton
                        key={key}
                        letter={key}
                        onKeyPress={() => onLetter(key)}
                        keyStatus={getKeyStatus(key)}
                    />
                ))}
                <button
                    key="backspace"
                    className="backspace"
                    onClick={onBackspace}
                >
                    <BackspaceIcon />
                </button>
            </div>
        </div>
    );
}

export default Keyboard;