import React from 'react';

import colorsJSON from "../../../data/colors.json";
const COLORS = colorsJSON.colors;

function Modal({ gameStatus, solution, gameTypeChanger }) {
    return (
        <div className="modal">
            <div className="modal-content">
                {gameStatus === 'won' ? '🎉 You won' : '😢 Game over'}
                {gameStatus === 'lost' && (
                    <div className="solution">
                        The sequence was
                        <div className="solution-row">
                            {
                                solution.map((color, index) => (
                                    <div
                                        key={index}
                                        className="solution-color"
                                        style={{
                                            backgroundColor: COLORS[color].background
                                        }}>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                )}
                <div className="modal-actions">
                    <button onClick={() => window.location.reload()}>Play Again</button>
                    <button className="primary" onClick={() => gameTypeChanger('wordle')}>
                        Play Wordle
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Modal;