import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { joinGame } from '../../services/api';
import Button from '../common/Button';
import LoadingSpinner from '../common/LoadingSpinner';

const JoinGame = () => {
  const [playerName, setPlayerName] = useState('');
  const [gameId, setGameId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!playerName.trim()) {
      setError('Please enter your name');
      return;
    }
    if (!gameId.trim()) {
      setError('Please enter a game ID');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await joinGame({
        game_id: gameId.trim(),
        player_name: playerName.trim()
      });
      
      // Store player info in session storage for reconnection
      sessionStorage.setItem('playerName', playerName.trim());
      sessionStorage.setItem('gameId', gameId.trim());
      sessionStorage.setItem('playerId', response.player_id);
      sessionStorage.setItem('teamId', response.team_id);
      
      // Navigate to lobby
      navigate(`/lobby/${gameId.trim()}`);
    } catch (err) {
      setError(err.message || 'Failed to join game');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateInstead = () => {
    navigate('/create');
  };

  return (
    <div className="join-game-container">
      <div className="join-game-card">
        <h1>Join Game</h1>
        <p className="game-description">
          Enter the game ID shared by the game creator and your name to join the game.
        </p>
        
        <form onSubmit={handleSubmit} className="join-game-form">
          <div className="form-group">
            <label htmlFor="gameId">Game ID</label>
            <input
              type="text"
              id="gameId"
              value={gameId}
              onChange={(e) => setGameId(e.target.value.toUpperCase())}
              placeholder="Enter game ID"
              maxLength={10}
              disabled={isLoading}
              autoFocus
            />
          </div>

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
              className="join-button"
            >
              {isLoading ? <LoadingSpinner /> : 'Join Game'}
            </Button>
            
            <Button
              type="button"
              variant="secondary"
              onClick={handleCreateInstead}
              disabled={isLoading}
            >
              Create Game Instead
            </Button>
          </div>
        </form>

        <div className="join-tips">
          <h3>Tips</h3>
          <ul>
            <li>Game IDs are case-insensitive</li>
            <li>Make sure you have a stable internet connection</li>
            <li>Games need exactly 6 players to start</li>
            <li>You can reconnect if you get disconnected</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default JoinGame;