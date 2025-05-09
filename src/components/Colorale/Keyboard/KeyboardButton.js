import React from 'react';

import Correct from "../../Common/Icons/Correct";
import Present from "../../Common/Icons/Present";
import Absent from "../../Common/Icons/Absent";

function KeyboardButton({ colorName, colorBgHex, colorTextHex, onKeyPress, colorStatus }) {
    return (
        <button
            key={colorName}
            className={colorName}
            style={{ 
                backgroundColor: colorBgHex
            }}
            onClick={onKeyPress}
        >
            {
                colorStatus === "correct" ?
                    <Correct fill={colorTextHex}/> :
                    colorStatus === "present" ?
                        <Present fill={colorTextHex} /> :
                        colorStatus === "absent" ?
                            <Absent fill={colorTextHex} /> :
                            ""
            }
        </button>
    );
}

export default KeyboardButton;
