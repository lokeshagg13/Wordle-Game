import React from 'react';

import './Modal.css';

function Modal({ gameStatus, solution, gameTypeChanger }) {
    return (
        <div className="modal">
            <div className="modal-content">
                {gameStatus === 'won' ? '🎉 You won' : '😢 Game over'}
                {gameStatus === 'lost' && (
                    <div className="solution">
                        The word was
                        <div className="solution-word">
                            {solution}
                        </div>
                    </div>
                )}
                <button onClick={() => window.location.reload()}>Play Again</button>
                <button className="primary" onClick={() => gameTypeChanger('wordle')}>
                    Play Wordle
                </button>
            </div>
        </div>
    )
}

export default Modal;