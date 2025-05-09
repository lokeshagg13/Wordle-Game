import React, { useEffect, useState } from 'react';
import Confetti from 'react-confetti';

import GameImage from '../../images/title-wordle.png';

import './Game.css';

import Modal from './UI/Modal/Modal';
import Gameboard from './Gameboard/Gameboard';
import Keyboard from './Keyboard/Keyboard';

import wordList from '../../data/words.json';

const MAX_GUESSES = 6;
const WORD_LENGTH = 5;

function Game({ gameTypeChanger }) {
    const [wordOfTheDay, setWordOfTheDay] = useState('');
    const [guesses, setGuesses] = useState(Array(MAX_GUESSES).fill(Array(WORD_LENGTH).fill('')));
    const [currentGuess, setCurrentGuess] = useState(Array(WORD_LENGTH).fill(''));
    const [gameStatus, setGameStatus] = useState('playing');
    const [characterStatus, setCharacterStatus] = useState({});

    // Fetch character status
    const fetchCharacterStatus = (char, charIndex) => {
        if (charIndex >= 0 && charIndex < WORD_LENGTH) {
            if (wordOfTheDay[charIndex] === char) {
                return 'correct';
            } else if (wordOfTheDay.includes(char)) {
                return 'present';
            }
            return 'absent'
        }
    }

    // Fetching the word of the day
    useEffect(() => {
        const words = wordList.words;
        const randomWord = words[Math.floor(Math.random() * words.length)];
        // console.log('Word of the day:', randomWord);
        setWordOfTheDay(randomWord);
    }, []);

    // Add a letter
    const handleLetterInput = (letter) => {
        if (gameStatus !== 'playing') return;

        setCurrentGuess((prevGuess) => {
            const lastCharIndex = prevGuess.findIndex((char) => char === '');
            if (lastCharIndex !== -1) {
                const newGuess = [...prevGuess];
                newGuess[lastCharIndex] = letter;
                return newGuess;
            }
            return prevGuess;
        });
    };

    // Delete a letter
    const handleBackspace = () => {
        if (gameStatus !== 'playing') return;

        setCurrentGuess((prevGuess) => {
            const lastCharIndex = prevGuess.findLastIndex((char) => char !== '');
            if (lastCharIndex !== -1) {
                const newGuess = [...prevGuess];
                newGuess[lastCharIndex] = '';
                return newGuess;
            }
            return prevGuess;
        });
    };

    // Submit the guess
    const handleSubmit = () => {
        const validGuess = currentGuess.every((char) => char !== '');
        if (validGuess && gameStatus === 'playing') {
            if (currentGuess.join('') === wordOfTheDay) {
                setGameStatus('won');
            } else if (guesses.filter(g => g.some(c => c !== '')).length + 1 >= MAX_GUESSES) {
                setGameStatus('lost');
            }

            let currentStatus = {};
            currentGuess.forEach((char, charIndex) => {
                let status = fetchCharacterStatus(char, charIndex);
                if (status === 'present') {
                    if (char in currentStatus && currentStatus[char] === 'correct') {
                        status = 'correct';
                    }
                }
                currentStatus[char] = status;
            });
            setCharacterStatus({ ...characterStatus, ...currentStatus });

            setGuesses((prevGuesses) => {
                const newGuesses = [...prevGuesses];
                const currentTrialIndex = guesses.findIndex((guess) => guess.every((letter) => letter === ''));
                if (currentTrialIndex !== -1) {
                    newGuesses[currentTrialIndex] = currentGuess;
                }
                return newGuesses;
            });
            setCurrentGuess(Array(WORD_LENGTH).fill(''));
        }
    };

    return (
        <>
            <div className="image-div">
                <img src={GameImage} alt="Wordle" className="game-image" width={400} height={150} />
            </div>

            {gameStatus === 'won' && <Confetti />}
            {(gameStatus === 'won' || gameStatus === 'lost') && (
                <Modal 
                    gameStatus={gameStatus} 
                    solution={wordOfTheDay} 
                    gameTypeChanger={gameTypeChanger} 
                />
            )}
            {wordOfTheDay &&
                <Gameboard guesses={guesses} currentGuess={currentGuess} solution={wordOfTheDay} />
            }
            <Keyboard
                onLetter={handleLetterInput}
                onBackspace={handleBackspace}
                onEnter={handleSubmit}
                characterStatus={characterStatus}
            />
        </>
    )
}

export default Game;