import gameConfig from "../../../logic/gameConfig";

const { CORRECT, PRESENT, ABSENT } = gameConfig.CHARACTER_STATUSES;

function KeyboardButton({ letter, onKeyPress, keyStatus }) {
  return (
    <button
      key={letter}
      className={`${letter} ${
        keyStatus === CORRECT
          ? "correct"
          : keyStatus === PRESENT
          ? "present"
          : keyStatus === ABSENT
          ? "absent"
          : "uncovered"
      }`}
      onClick={onKeyPress}
    >
      {letter.toUpperCase()}
    </button>
  );
}

export default KeyboardButton;
