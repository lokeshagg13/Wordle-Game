import React, { useState, useEffect } from "react";

import Hidden from "../../Common/Icons/Hidden";

function Solution({ wordOfTheDay, gameStatus }) {
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
                    wordOfTheDay.split('').map((char, index) => (
                        <div
                            key={index}
                            className={`solution-letter ${gameStatus === 'playing' ? 'hide' : 'show'
                                } ${animate ? 'animate' : ''
                                }`}
                        >
                            {
                                gameStatus === "playing" ? <Hidden fill="white" /> : char.toUpperCase()
                            }
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default Solution;