import React, { useEffect } from 'react';

import KeyboardButton from './KeyboardButton';
import BackspaceIcon from '../../Common/Icons/Backspace';
import colorsJSON from "../../../data/colors.json";

const { colors } = colorsJSON;

function Keyboard({ onColor, onBackspace, onEnter, onClear, colorStatus }) {
    const getColorStatus = (color) => {
        if (color in colors) {
            return colorStatus.hasOwnProperty(color) ? colorStatus[color] : 'uncovered';
        }
    };

    useEffect(() => {
        const handleKeyPress = (event) => {
            const key = event.key.toLowerCase();

            if (key === 'enter') {
                if (document.activeElement.tagName === "BUTTON") {
                    event.preventDefault();
                }
                onEnter();
            } else if (key === 'backspace') {
                onBackspace();
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [onBackspace, onEnter]);

    return (
        <div className="keyboard-container">
            <div className="keyboard-row">
                {Object.keys(colors).slice(0, 5).map((color) => (
                    <KeyboardButton
                        key={color}
                        colorName={color}
                        colorBgHex={colors[color].background}
                        colorTextHex={colors[color].text}
                        onKeyPress={() => onColor(color)}
                        colorStatus={getColorStatus(color)}
                    />
                ))}
            </div>
            <div className="keyboard-row">
                {Object.keys(colors).slice(5).map((color) => (
                    <KeyboardButton
                        key={color}
                        colorName={color}
                        colorBgHex={colors[color].background}
                        colorTextHex={colors[color].text}
                        onKeyPress={() => onColor(color)}
                        colorStatus={getColorStatus(color)}
                    />
                ))}
            </div>
            <div className="keyboard-row">
                <button
                    key="enter"
                    className="enter"
                    onClick={onEnter}
                >
                    ENTER
                </button>
                <button
                    key="clear"
                    className="clear"
                    onClick={onClear}
                >
                    CLEAR
                </button>
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