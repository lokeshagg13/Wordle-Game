import React from 'react';

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
                <div className="modal-actions">
                    <button onClick={() => window.location.reload()}>Play Again</button>
                    <button className="primary" onClick={() => gameTypeChanger('colorale')}>
                        Play Colorale
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Modal;