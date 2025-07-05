import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createGame } from '../../services/api';
import Button from '../common/Button';
import LoadingSpinner from '../common/LoadingSpinner';

const CreateGame = () => {
  const [playerName, setPlayerName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!playerName.trim()) {
      setError('Please enter your name');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await createGame({ creator_name: playerName.trim() });
      // Store player info in session storage for reconnection
      sessionStorage.setItem('playerName', playerName.trim());
      sessionStorage.setItem('gameId', response.game_id);
      
      // Navigate to lobby
      navigate(`/lobby/${response.game_id}`);
    } catch (err) {
      setError(err.message || 'Failed to create game');
    } finally {
      setIsLoading(false);
    }
  };

  const handleJoinInstead = () => {
    navigate('/join');
  };

  return (
    <div className="create-game-container">
      <div className="create-game-card">
        <h1>Create New Game</h1>
        <p className="game-description">
          Half Suit is a strategic team-based card game for 6 players (2 teams of 3).
          Create a game and share the game ID with 5 other players to start.
        </p>
        
        <form onSubmit={handleSubmit} className="create-game-form">
          <div className="form-group">
            <label htmlFor="playerName">Your Name</label>
            <input
              type="text"
              id="playerName"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              placeholder="Enter your name"
              maxLength={20}
              disabled={isLoading}
              autoFocus
            />
          </div>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <div className="form-actions">
            <Button
              type="submit"
              variant="primary"
              disabled={isLoading}
              className="create-button"
            >
              {isLoading ? <LoadingSpinner /> : 'Create Game'}
            </Button>
            
            <Button
              type="button"
              variant="secondary"
              onClick={handleJoinInstead}
              disabled={isLoading}
            >
              Join Game Instead
            </Button>
          </div>
        </form>

        <div className="game-rules-preview">
          <h3>Quick Rules</h3>
          <ul>
            <li>6 players, 2 teams of 3</li>
            <li>9 cards per player from a special deck</li>
            <li>Ask opponents for cards or claim half-suits</li>
            <li>First team to 5 points wins</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CreateGame;