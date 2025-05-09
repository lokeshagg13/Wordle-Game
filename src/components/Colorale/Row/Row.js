import React, { useState, useEffect } from 'react';

import Correct from "../UI/Icons/Correct";
import Present from "../UI/Icons/Present";
import Absent from "../UI/Icons/Absent";

import './Row.css';

import colorsJSON from "../../../data/colors.json";
const COLORS = colorsJSON.colors;

function Row({ index, guess, isFinal, solution }) {
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        if (isFinal) {
            setAnimate(true);

            // Remove the animation class after it finishes
            const timeout = setTimeout(() => {
                setAnimate(false);
            }, 600); // Match animation duration

            return () => clearTimeout(timeout);
        }
    }, [isFinal]);

    return (
        <div key={index} className="row">
            {guess.map((color, index) => (
                <div
                    key={index}
                    className={`color ${animate ? 'animate' : ''}`}
                    style={{
                        backgroundColor: COLORS[color]
                            ? COLORS[color].background
                            : 'white',
                    }}
                >
                    {!isFinal || color === '' ? (
                        ''
                    ) : color === solution[index] ? (
                        <Correct fill={COLORS[color] ? COLORS[color].text : 'black'} />
                    ) : solution.includes(color) ? (
                        <Present fill={COLORS[color] ? COLORS[color].text : 'black'} />
                    ) : (
                        <Absent fill={COLORS[color] ? COLORS[color].text : 'black'} />
                    )}
                </div>
            ))}
        </div>
    );
}

export default Row;
