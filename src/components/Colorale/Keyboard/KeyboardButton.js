import React from 'react';

import Correct from "../UI/Icons/Correct";
import Present from "../UI/Icons/Present";
import Absent from "../UI/Icons/Absent";

import './KeyboardButton.css';

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
