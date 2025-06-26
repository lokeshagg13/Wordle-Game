import { createContext, useState } from "react";
import wordList from "../data/words.json";
import colorsJSON from "../data/colors.json";
import gameConfig from "../logic/gameConfig";
import { fetchCharacterStatus, fetchColorStatus } from "../logic/utils";

const GameContext = createContext({
    gameType: null,
    gameStatus: null,
    wordOfTheDay: "",
    wordleGuesses: [],
    currentWordleGuess: [],
    characterStatus: {},
    colorsOfTheDay: [],
    coloraleGuesses: [],
    currentColoraleGuess: [],
    colorStatus: {},
    changeGameType: (type) => { },
    startWordleGame: () => { },
    handleLetterInput: (letter) => { },
    handleLetterDelete: () => { },
    handleWordleGuessSubmit: () => { },
    startColoraleGame: () => { },
    handleColorInput: (color) => { },
    handleColorDelete: () => { },
    handleColoraleInputClear: () => { },
    handleColoraleGuessSubmit: () => { }
});

const { WORD_LENGTH, SEQ_LENGTH, MAX_GUESSES } = gameConfig;
const { WORDLE, COLORALE } = gameConfig.GAME_TYPES;
const { PLAYING, WON, LOST } = gameConfig.GAME_STATUSES;
const { PRESENT, CORRECT } = gameConfig.CHARACTER_STATUSES;

export function GameContextProvider(props) {
    const [gameType, setGameType] = useState(() => {
        const storedGameType = localStorage.getItem("wordle");
        if (!storedGameType || storedGameType === "true") return WORDLE;
        return COLORALE;
    });
    const [gameStatus, setGameStatus] = useState(PLAYING);

    // Wordle related states
    const [wordOfTheDay, setWordOfTheDay] = useState("");
    const [wordleGuesses, setWordleGuesses] = useState(Array(MAX_GUESSES).fill(Array(WORD_LENGTH).fill("")));
    const [currentWordleGuess, setCurrentWordleGuess] = useState(Array(WORD_LENGTH).fill(""));
    const [characterStatus, setCharacterStatus] = useState({});

    // Colorale related states
    const [colorsOfTheDay, setColorsOfTheDay] = useState("");
    const [coloraleGuesses, setColoraleGuesses] = useState(Array(MAX_GUESSES).fill(Array(SEQ_LENGTH).fill("")));
    const [currentColoraleGuess, setCurrentColoraleGuess] = useState(Array(SEQ_LENGTH).fill(""));
    const [colorStatus, setColorStatus] = useState({});

    function changeGameType(type) {
        localStorage.setItem("wordle", type === WORDLE);
        setGameType(type);
    }

    // #region - Wordle related functions
    function getRandomWord() {
        const words = wordList.words;
        return words[Math.floor(Math.random() * words.length)];
    }

    function resetAllWordleGuesses() {
        setWordleGuesses(Array(MAX_GUESSES).fill(Array(WORD_LENGTH).fill("")));
    }

    function resetCurrentWordleGuess() {
        setCurrentWordleGuess(Array(WORD_LENGTH).fill(""));
    }

    function startWordleGame() {
        setGameStatus(PLAYING);
        setWordOfTheDay(getRandomWord());
        resetAllWordleGuesses();
        resetCurrentWordleGuess();
        setCharacterStatus({});
    }

    function handleLetterInput(letter) {
        if (gameStatus !== PLAYING) return;

        setCurrentWordleGuess((prevGuess) => {
            const lastCharIndex = prevGuess.findIndex((char) => char === "");
            if (lastCharIndex !== -1) {
                const newGuess = [...prevGuess];
                newGuess[lastCharIndex] = letter;
                return newGuess;
            }
            return prevGuess;
        });

        document.activeElement.blur();
    }

    function handleLetterDelete() {
        if (gameStatus !== PLAYING) return;

        setCurrentWordleGuess((prevGuess) => {
            const lastCharIndex = prevGuess.findLastIndex((char) => char !== "");
            if (lastCharIndex !== -1) {
                const newGuess = [...prevGuess];
                newGuess[lastCharIndex] = "";
                return newGuess;
            }
            return prevGuess;
        });
    }

    function handleWordleGuessSubmit() {
        const validGuess = currentWordleGuess.every((char) => char !== "");
        if (validGuess && gameStatus === PLAYING) {
            if (currentWordleGuess.join("") === wordOfTheDay) setGameStatus(WON);
            else if (
                wordleGuesses.filter((g) => g.some((c) => c !== "")).length + 1 >= MAX_GUESSES
            ) {
                setGameStatus(LOST);
            }

            let currentStatus = {};
            currentWordleGuess.forEach((char, charIndex) => {
                let status = fetchCharacterStatus(char, charIndex, wordOfTheDay);
                if (status === PRESENT) {
                    if (char in currentStatus && currentStatus[char] === CORRECT) {
                        status = CORRECT;
                    }
                }
                currentStatus[char] = status;
            });
            setCharacterStatus({ ...characterStatus, ...currentStatus });
            setWordleGuesses((prevGuesses) => {
                const newGuesses = [...prevGuesses];
                const currentTrialIndex = wordleGuesses.findIndex((guess) =>
                    guess.every((letter) => letter === "")
                );
                if (currentTrialIndex !== -1) {
                    newGuesses[currentTrialIndex] = currentWordleGuess;
                }
                return newGuesses;
            });
            resetCurrentWordleGuess();
        }
    };
    // #endregion

    // #region - Colorale related functions
    function getRandomColorSequence() {
        const COLORS = colorsJSON.colors;
        const colorNames = Object.keys(COLORS);
        let randomSequence = Array(SEQ_LENGTH).fill("");
        let max_repeats = Math.floor(SEQ_LENGTH / 2);
        let freq = {};
        for (let i = 0; i < SEQ_LENGTH;) {
            let choice = colorNames[Math.floor(Math.random() * colorNames.length)];
            freq[choice] = freq[choice] || 0;
            if (freq[choice] < max_repeats) {
                randomSequence[i] = choice;
                freq[choice] += 1;
                i += 1;
            }
        }
        return randomSequence;
    }

    function resetAllColoraleGuesses() {
        setColoraleGuesses(Array(MAX_GUESSES).fill(Array(SEQ_LENGTH).fill("")));
    }

    function resetCurrentColoraleGuess() {
        setCurrentColoraleGuess(Array(SEQ_LENGTH).fill(""));
    }

    function startColoraleGame() {
        setGameStatus(PLAYING);
        setColorsOfTheDay(getRandomColorSequence());
        resetAllColoraleGuesses();
        resetCurrentColoraleGuess();
        setColorStatus({});
    }

    function handleColorInput(color) {
        if (gameStatus !== PLAYING) return;

        setCurrentColoraleGuess((prevGuess) => {
            const lastColoredIndex = prevGuess.findIndex((ch) => ch === "");
            if (lastColoredIndex !== -1) {
                const newGuess = [...prevGuess];
                newGuess[lastColoredIndex] = color;
                return newGuess;
            }
            return prevGuess;
        });

        document.activeElement.blur();
    }

    function handleColorDelete() {
        if (gameStatus !== PLAYING) return;

        setCurrentColoraleGuess((prevGuess) => {
            const lastColoredIndex = prevGuess.findLastIndex((ch) => ch !== "");
            if (lastColoredIndex !== -1) {
                const newGuess = [...prevGuess];
                newGuess[lastColoredIndex] = "";
                return newGuess;
            }
            return prevGuess;
        });
    }

    function handleColoraleInputClear() {
        if (gameStatus !== "playing") return;
        resetCurrentColoraleGuess();
    }

    function handleColoraleGuessSubmit() {
        const validGuess = currentColoraleGuess.every((ch) => ch !== "");
        if (validGuess && gameStatus === PLAYING) {
            if (currentColoraleGuess.join(" ") === colorsOfTheDay.join(" ")) setGameStatus(WON);
            else if (
                coloraleGuesses.filter((g) => g.some((c) => c !== "")).length + 1 >= MAX_GUESSES
            ) {
                setGameStatus(LOST);
            }

            let currentStatus = {};
            currentColoraleGuess.forEach((color, colorIndex) => {
                let status = fetchColorStatus(color, colorIndex, colorsOfTheDay);
                if (status === PRESENT) {
                    if (color in currentStatus && currentStatus[color] === CORRECT) {
                        status = CORRECT;
                    }
                }
                currentStatus[color] = status;
            });
            setColorStatus({ ...colorStatus, ...currentStatus });

            setColoraleGuesses((prevGuesses) => {
                const newGuesses = [...prevGuesses];
                const currentTrialIndex = coloraleGuesses.findIndex((guess) =>
                    guess.every((color) => color === "")
                );
                if (currentTrialIndex !== -1) {
                    newGuesses[currentTrialIndex] = currentColoraleGuess;
                }
                return newGuesses;
            });
            resetCurrentColoraleGuess();
        }
    };
    // #endregion

    const currentGameContext = {
        gameType,
        gameStatus,
        wordOfTheDay,
        wordleGuesses,
        currentWordleGuess,
        characterStatus,
        colorsOfTheDay,
        coloraleGuesses,
        currentColoraleGuess,
        colorStatus,
        changeGameType,
        startWordleGame,
        handleLetterInput,
        handleLetterDelete,
        handleWordleGuessSubmit,
        startColoraleGame,
        handleColorInput,
        handleColorDelete,
        handleColoraleInputClear,
        handleColoraleGuessSubmit
    };

    return (
        <GameContext.Provider value={currentGameContext}>
            {props.children}
        </GameContext.Provider>
    );
}

export default GameContext;