import gameConfig from "../../../logic/gameConfig";

import Correct from "../../common/icons/Correct";
import Present from "../../common/icons/Present";
import Absent from "../../common/icons/Absent";

const { CORRECT, PRESENT, ABSENT } = gameConfig.CHARACTER_STATUSES;

function KeyboardButton({
  colorName,
  colorBgHex,
  colorTextHex,
  onKeyPress,
  colorStatus,
}) {
  return (
    <button
      key={colorName}
      className={colorName}
      style={{
        backgroundColor: colorBgHex,
      }}
      onClick={onKeyPress}
    >
      {colorStatus === CORRECT ? (
        <Correct fill={colorTextHex} />
      ) : colorStatus === PRESENT ? (
        <Present fill={colorTextHex} />
      ) : colorStatus === ABSENT ? (
        <Absent fill={colorTextHex} />
      ) : (
        ""
      )}
    </button>
  );
}

export default KeyboardButton;
