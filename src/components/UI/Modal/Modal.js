import React from 'react';

import './Modal.css';

function Modal({ gameStatus, solution }) {
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
            </div>
        </div>
    )
}

export default Modal;