const config = {
    MAX_GUESSES: 6,
    WORD_LENGTH: 5,
    SEQ_LENGTH: 5,
    GAME_TYPES: {
        WORDLE: 0,
        COLORALE: 1
    },
    GAME_STATUSES: {
        PLAYING: 0,
        WON: 1,
        LOST: 2
    },
    CHARACTER_STATUSES: {
        UNCOVERED: -1,
        ABSENT: 0,
        PRESENT: 1,
        CORRECT: 2,
    }
};

export default config;