import React, { useState, useEffect } from 'react';

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
            {guess.map((letter, index) => (

                <div key={index} className={`letter ${animate ? 'animate' : ''
                    } ${!isFinal || letter === '' ?
                        'empty' :
                        letter === solution[index] ?
                            'correct' :
                            solution.includes(letter) ?
                                'present' :
                                'absent'
                    }`}>
                    {letter}
                </div>
            ))}
        </div>
    );
}

export default Row;