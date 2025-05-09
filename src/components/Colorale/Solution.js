import React, { useState, useEffect } from "react";

import colorsJSON from "../../data/colors.json";
import Hidden from "./UI/Icons/Hidden";

import './Solution.css';

const COLORS = colorsJSON.colors;

function Solution({ colorsOfTheDay, gameStatus }) {
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        if (gameStatus) {
            setAnimate(true);

            const timeout = setTimeout(() => {
                setAnimate(false);
            }, 600);

            return () => clearTimeout(timeout);
        }
    }, [gameStatus]);


    return (
        <div className="solution">
            <div className="solution-row">
                {
                    colorsOfTheDay.map((color, index) => (
                        <div
                            key={index}
                            className={`solution-color ${gameStatus === 'playing' ? 'hide' : 'show'
                                } ${animate ? 'animate' : ''
                                }`}
                            style={{
                                backgroundColor: COLORS[color].background
                            }}>
                            {
                                gameStatus === "playing" ? <Hidden fill="white" /> : ''
                            }
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default Solution;