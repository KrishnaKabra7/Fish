import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useWebSocket } from '../../hooks/useWebSocket';
import { useGameState } from '../../hooks/useGameState';
import { getGameState, startGame } from '../../services/api';
import PlayerSlot from './PlayerSlot';
import Button from '../common/Button';
import LoadingSpinner from '../common/LoadingSpinner';

const GameLobby = () => {
  const { gameId } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [isStarting, setIsStarting] = useState(false);
  const [copied, setCopied] = useState(false);
  
  const { gameState, setGameState } = useGameState();
  const { isConnected, error: wsError } = useWebSocket(gameId, setGameState);

  const playerId = sessionStorage.getItem('playerId');
  const playerName = sessionStorage.getItem('playerName');

  useEffect(() => {
    if (!playerId || !playerName) {
      navigate('/join');
      return;
    }

    const fetchGameState = async () => {
      try {
        const state = await getGameState(gameId, playerId);
        setGameState(state);
        
        // If game is already active, navigate to game board
        if (state.status === 'active') {
          navigate(`/game/${gameId}`);
        }
      } catch (err) {
        setError('Failed to load game state');
      } finally {
        setIsLoading(false);
      }
    };

    fetchGameState();
  }, [gameId, playerId, playerName, navigate, setGameState]);

  const handleStartGame = async () => {
    if (!canStartGame()) return;
    
    setIsStarting(true);
    try {
      await startGame(gameId, playerId);
      // WebSocket will handle the state update and navigation
    } catch (err) {
      setError('Failed to start game');
      setIsStarting(false);
    }
  };

  const handleCopyGameId = async () => {
    try {
      await navigator.clipboard.writeText(gameId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Fallback for browsers without clipboard API
      const textArea = document.createElement('textarea');
      textArea.value = gameId;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const canStartGame = () => {
    return gameState?.players?.length === 6 && gameState?.status === 'lobby';
  };

  const isGameCreator = () => {
    return gameState?.players?.[0]?.id === playerId;
  };

  const getTeamPlayers = (teamId) => {
    return gameState?.players?.filter(player => 
      gameState.teams.find(team => team.id === teamId)?.players.includes(player.id)
    ) || [];
  };

  if (isLoading) {
    return (
      <div className="lobby-container">
        <div className="loading-state">
          <LoadingSpinner />
          <p>Loading game lobby...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="lobby-container">
        <div className="error-state">
          <h2>Error</h2>
          <p>{error}</p>
          <Button onClick={() => navigate('/join')}>
            Back to Join Game
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="lobby-container">
      <div className="lobby-header">
        <h1>Game Lobby</h1>
        <div className="game-info">
          <div className="game-id-section">
            <label>Game ID:</label>
            <div className="game-id-display">
              <span className="game-id">{gameId}</span>
              <Button
                variant="outline"
                size="small"
                onClick={handleCopyGameId}
                className="copy-button"
              >
                {copied ? 'Copied!' : 'Copy'}
              </Button>
            </div>
          </div>
          <div className="connection-status">
            <div className={`status-indicator ${isConnected ? 'connected' : 'disconnected'}`}></div>
            <span>{isConnected ? 'Connected' : 'Disconnected'}</span>
          </div>
        </div>
      </div>

      <div className="lobby-content">
        <div className="teams-section">
          <div className="team-column team-red">
            <h2>Red Team</h2>
            <div className="team-players">
              {Array.from({ length: 3 }, (_, index) => {
                const teamPlayers = getTeamPlayers(1);
                const player = teamPlayers[index];
                return (
                  <PlayerSlot
                    key={`red-${index}`}
                    player={player}
                    teamId={1}
                    isCurrentPlayer={player?.id === playerId}
                    slotNumber={index + 1}
                  />
                );
              })}
            </div>
          </div>

          <div className="team-column team-blue">
            <h2>Blue Team</h2>
            <div className="team-players">
              {Array.from({ length: 3 }, (_, index) => {
                const teamPlayers = getTeamPlayers(2);
                const player = teamPlayers[index];
                return (
                  <PlayerSlot
                    key={`blue-${index}`}
                    player={player}
                    teamId={2}
                    isCurrentPlayer={player?.id === playerId}
                    slotNumber={index + 4}
                  />
                );
              })}
            </div>
          </div>
        </div>

        <div className="lobby-status">
          <div className="player-count">
            <span className="count">{gameState?.players?.length || 0}</span>
            <span className="total">/6</span>
            <span className="label">Players</span>
          </div>
          
          {gameState?.players?.length < 6 && (
            <p className="waiting-message">
              Waiting for {6 - (gameState?.players?.length || 0)} more players to join...
            </p>
          )}

          {canStartGame() && (
            <p className="ready-message">
              All players have joined! Ready to start the game.
            </p>
          )}
        </div>

        <div className="lobby-actions">
          {isGameCreator() && (
            <Button
              variant="primary"
              size="large"
              onClick={handleStartGame}
              disabled={!canStartGame() || isStarting}
              className="start-game-button"
            >
              {isStarting ? <LoadingSpinner /> : 'Start Game'}
            </Button>
          )}
          
          {!isGameCreator() && canStartGame() && (
            <p className="waiting-start">
              Waiting for game creator to start the game...
            </p>
          )}
        </div>
      </div>

      {wsError && (
        <div className="connection-error">
          <p>Connection issue: {wsError}</p>
        </div>
      )}
    </div>
  );
};

export default GameLobby;