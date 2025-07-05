import React, { useState, useEffect } from 'react';
import PlayerHand from './PlayerHand';
import PlayerList from './PlayerList';
import ActionPanel from './ActionPanel';
import HistoryPanel from './HistoryPanel';
import ScoreBoard from './ScoreBoard';
import TurnIndicator from './TurnIndicator';
import AskModal from './AskModal';
import ClaimModal from './ClaimModal';
import CounterClaimModal from './CounterClaimModal';
import '../styles/game.css';

const GameBoard = ({ 
  gameState, 
  playerId, 
  onAsk, 
  onClaim, 
  onCounterClaim, 
  onChoosePlayer,
  wsConnected 
}) => {
  const [showAskModal, setShowAskModal] = useState(false);
  const [showClaimModal, setShowClaimModal] = useState(false);
  const [showCounterClaimModal, setShowCounterClaimModal] = useState(false);
  const [pendingCounterClaim, setPendingCounterClaim] = useState(null);

  // Get current player data
  const currentPlayer = gameState?.players?.find(p => p.id === playerId);
  const currentTeam = gameState?.teams?.find(t => t.id === currentPlayer?.team_id);
  const isMyTurn = gameState?.current_team === currentPlayer?.team_id;
  const isActivePlayer = gameState?.current_player === playerId;

  // Check if we need to show counter-claim modal
  useEffect(() => {
    if (gameState?.claim_history?.length > 0) {
      const lastClaim = gameState.claim_history[gameState.claim_history.length - 1];
      if (lastClaim.outcome === 'pending_counter' && 
          currentPlayer?.team_id !== gameState.teams.find(t => t.players.includes(lastClaim.claimant))?.id) {
        setPendingCounterClaim(lastClaim);
        setShowCounterClaimModal(true);
      }
    }
  }, [gameState?.claim_history, currentPlayer?.team_id]);

  const handleAsk = (targetPlayerId, card) => {
    onAsk(playerId, targetPlayerId, card);
    setShowAskModal(false);
  };

  const handleClaim = (halfSuitId, assignments, isForOtherTeam = false) => {
    onClaim(playerId, halfSuitId, assignments, isForOtherTeam);
    setShowClaimModal(false);
  };

  const handleCounterClaim = (halfSuitId, assignments) => {
    onCounterClaim(playerId, halfSuitId, assignments);
    setShowCounterClaimModal(false);
    setPendingCounterClaim(null);
  };

  if (!gameState || !currentPlayer) {
    return (
      <div className="game-board loading">
        <div className="loading-spinner">Loading game...</div>
      </div>
    );
  }

  if (gameState.status === 'finished') {
    const winningTeam = gameState.teams.reduce((a, b) => a.score > b.score ? a : b);
    const isWinner = winningTeam.id === currentPlayer.team_id;
    
    return (
      <div className="game-board game-finished">
        <div className="game-result">
          <h2>{isWinner ? '🎉 Your Team Wins!' : '😔 Your Team Lost'}</h2>
          <ScoreBoard teams={gameState.teams} />
          <button onClick={() => window.location.reload()} className="btn btn-primary">
            Play Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="game-board">
      <div className="game-header">
        <div className="connection-status">
          <span className={`status-indicator ${wsConnected ? 'connected' : 'disconnected'}`}>
            {wsConnected ? '🟢 Connected' : '🔴 Disconnected'}
          </span>
        </div>
        <TurnIndicator 
          gameState={gameState} 
          currentPlayer={currentPlayer}
          isMyTurn={isMyTurn}
          isActivePlayer={isActivePlayer}
        />
        <ScoreBoard teams={gameState.teams} />
      </div>

      <div className="game-content">
        <div className="left-panel">
          <PlayerList 
            players={gameState.players} 
            teams={gameState.teams}
            currentPlayer={currentPlayer}
            onChoosePlayer={onChoosePlayer}
            isMyTurn={isMyTurn}
            canChoosePlayer={isMyTurn && !isActivePlayer}
          />
          <HistoryPanel 
            askHistory={gameState.ask_history || []} 
            claimHistory={gameState.claim_history || []}
            players={gameState.players}
            teams={gameState.teams}
          />
        </div>

        <div className="center-panel">
          <PlayerHand 
            cards={currentPlayer.hand || []} 
            playerId={playerId}
          />
          
          <ActionPanel 
            canAsk={isActivePlayer && currentPlayer.num_cards > 0}
            canClaim={isMyTurn}
            onAskClick={() => setShowAskModal(true)}
            onClaimClick={() => setShowClaimModal(true)}
            gameState={gameState}
            currentPlayer={currentPlayer}
          />
        </div>
      </div>

      {/* Modals */}
      {showAskModal && (
        <AskModal
          gameState={gameState}
          currentPlayer={currentPlayer}
          onAsk={handleAsk}
          onClose={() => setShowAskModal(false)}
        />
      )}

      {showClaimModal && (
        <ClaimModal
          gameState={gameState}
          currentPlayer={currentPlayer}
          onClaim={handleClaim}
          onClose={() => setShowClaimModal(false)}
        />
      )}

      {showCounterClaimModal && pendingCounterClaim && (
        <CounterClaimModal
          gameState={gameState}
          currentPlayer={currentPlayer}
          pendingClaim={pendingCounterClaim}
          onCounterClaim={handleCounterClaim}
          onClose={() => {
            setShowCounterClaimModal(false);
            setPendingCounterClaim(null);
          }}
        />
      )}
    </div>
  );
};

export default GameBoard;