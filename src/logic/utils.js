import gameConfig from "./gameConfig";

const { WORD_LENGTH, SEQ_LENGTH } = gameConfig;
const { ABSENT, PRESENT, CORRECT } = gameConfig.CHARACTER_STATUSES;

export function fetchCharacterStatus(char, charIndex, wordOfTheDay) {
    if (charIndex >= 0 && charIndex < WORD_LENGTH) {
        if (wordOfTheDay[charIndex] === char) {
            return CORRECT;
        } else if (wordOfTheDay.includes(char)) {
            return PRESENT;
        }
        return ABSENT;
    }
};

export function fetchColorStatus(color, colorIndex, colorsOfTheDay) {
    if (colorIndex >= 0 && colorIndex < SEQ_LENGTH) {
        if (colorsOfTheDay[colorIndex] === color) {
            return CORRECT;
        } else if (colorsOfTheDay.includes(color)) {
            return PRESENT;
        }
        return ABSENT;
    }
};
