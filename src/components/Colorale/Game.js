import React, { useEffect, useState } from 'react';
import Confetti from 'react-confetti';

import GameImage from '../../images/title-colorale.png';

import './Game.css';

import Solution from './Solution';
import Modal from './UI/Modal/Modal';
import Gameboard from './Gameboard/Gameboard';
import Keyboard from './Keyboard/Keyboard';
import colorsJSON from "../../data/colors.json";

const MAX_GUESSES = 6;
const SEQ_LENGTH = 5;
const COLORS = colorsJSON.colors;

function Game({ gameTypeChanger }) {
    const [colorsOfTheDay, setColorsOfTheDay] = useState('');
    const [guesses, setGuesses] = useState(Array(MAX_GUESSES).fill(Array(SEQ_LENGTH).fill('')));
    const [currentGuess, setCurrentGuess] = useState(Array(SEQ_LENGTH).fill(''));
    const [gameStatus, setGameStatus] = useState('playing');
    const [colorStatus, setColorStatus] = useState({});

    // Fetch color status
    const fetchColorStatus = (color, colorIndex) => {
        if (colorIndex >= 0 && colorIndex < SEQ_LENGTH) {
            if (colorsOfTheDay[colorIndex] === color) {
                return 'correct';
            } else if (colorsOfTheDay.includes(color)) {
                return 'present';
            }
            return 'absent'
        }
    }

    // Fetching the colors of the day
    useEffect(() => {
        const colorNames = Object.keys(COLORS);
        let sequence = Array(SEQ_LENGTH).fill('');
        let max_repeats = Math.floor(SEQ_LENGTH / 2);
        let freq = {};
        for (let i = 0; i < SEQ_LENGTH;) {
            let choice = colorNames[Math.floor(Math.random() * colorNames.length)];
            freq[choice] = freq[choice] || 0;
            if (freq[choice] < max_repeats) {
                sequence[i] = choice;
                freq[choice] += 1
                i += 1
            }
        }
        setColorsOfTheDay(sequence);
    }, []);

    // Add a color
    const handleColorInput = (color) => {
        if (gameStatus !== 'playing') return;

        setCurrentGuess((prevGuess) => {
            const lastColoredIndex = prevGuess.findIndex((ch) => ch === '');
            if (lastColoredIndex !== -1) {
                const newGuess = [...prevGuess];
                newGuess[lastColoredIndex] = color;
                return newGuess;
            }
            return prevGuess;
        });

        document.activeElement.blur();
    };

    // Delete a color
    const handleBackspace = () => {
        if (gameStatus !== 'playing') return;

        setCurrentGuess((prevGuess) => {
            const lastColoredIndex = prevGuess.findLastIndex((ch) => ch !== '');
            if (lastColoredIndex !== -1) {
                const newGuess = [...prevGuess];
                newGuess[lastColoredIndex] = '';
                return newGuess;
            }
            return prevGuess;
        });
    };

    // Clear the complete current guess
    const handleClear = () => {
        if (gameStatus !== 'playing') return;
        setCurrentGuess(Array(SEQ_LENGTH).fill(''));
    };

    // Submit the guess
    const handleSubmit = () => {
        const validGuess = currentGuess.every((ch) => ch !== '');
        if (validGuess && gameStatus === 'playing') {
            if (currentGuess.join(' ') === colorsOfTheDay.join(' ')) {
                setGameStatus('won');
            } else if (guesses.filter(g => g.some(c => c !== '')).length + 1 >= MAX_GUESSES) {
                setGameStatus('lost');
            }

            let currentStatus = {};
            currentGuess.forEach((color, colorIndex) => {
                let status = fetchColorStatus(color, colorIndex);
                if (status === 'present') {
                    if (color in currentStatus && currentStatus[color] === 'correct') {
                        status = 'correct';
                    }
                }
                currentStatus[color] = status;
            });
            setColorStatus({ ...colorStatus, ...currentStatus });

            setGuesses((prevGuesses) => {
                const newGuesses = [...prevGuesses];
                const currentTrialIndex = guesses.findIndex((guess) => guess.every((color) => color === ''));
                if (currentTrialIndex !== -1) {
                    newGuesses[currentTrialIndex] = currentGuess;
                }
                return newGuesses;
            });
            setCurrentGuess(Array(SEQ_LENGTH).fill(''));
        }
    };

    return (
        <>
            <div className="image-div">
                <img src={GameImage} alt="Colorale" className="game-image" width={400} height={150} />
            </div>

            {gameStatus === 'won' && <Confetti />}
            {(gameStatus === 'won' || gameStatus === 'lost') && (
                <Modal 
                    gameStatus={gameStatus} 
                    solution={colorsOfTheDay}
                    gameTypeChanger={gameTypeChanger} 
                />
            )}

            {colorsOfTheDay &&
                <>
                    <Solution 
                        colorsOfTheDay={colorsOfTheDay}
                        gameStatus={gameStatus} 
                    />
                    <Gameboard 
                        guesses={guesses} 
                        currentGuess={currentGuess} 
                        solution={colorsOfTheDay}
                    />
                </>
            }
            <Keyboard
                onColor={handleColorInput}
                onBackspace={handleBackspace}
                onEnter={handleSubmit}
                onClear={handleClear}
                colorStatus={colorStatus}
            />
        </>
    )
}

export default Game;