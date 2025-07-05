import React from 'react';
import '../styles/game.css';

const ActionPanel = ({ 
  canAsk, 
  canClaim, 
  onAskClick, 
  onClaimClick, 
  gameState, 
  currentPlayer 
}) => {
  const getAvailableHalfSuits = () => {
    return gameState.half_suits.filter(hs => !hs.out_of_play);
  };

  const getOpponentTeamPlayers = () => {
    return gameState.players.filter(p => p.team_id !== currentPlayer.team_id);
  };

  const hasCardsToAsk = () => {
    return currentPlayer.num_cards > 0;
  };

  const availableHalfSuits = getAvailableHalfSuits();
  const opponents = getOpponentTeamPlayers();

  return (
    <div className="action-panel">
      <div className="action-header">
        <h3>Actions</h3>
        <div className="turn-status">
          {canAsk && (
            <span className="your-turn">Your turn!</span>
          )}
          {canClaim && !canAsk && (
            <span className="team-turn">Your team's turn</span>
          )}
          {!canClaim && !canAsk && (
            <span className="waiting">Waiting for other team...</span>
          )}
        </div>
      </div>

      <div className="action-buttons">
        <button
          className={`btn btn-ask ${canAsk ? 'active' : 'disabled'}`}
          onClick={onAskClick}
          disabled={!canAsk}
          title={
            !canAsk 
              ? !hasCardsToAsk() 
                ? "You have no cards to ask with"
                : "Not your turn to ask"
              : "Ask an opponent for a specific card"
          }
        >
          <span className="btn-icon">❓</span>
          Ask for Card
        </button>

        <button
          className={`btn btn-claim ${canClaim ? 'active' : 'disabled'}`}
          onClick={onClaimClick}
          disabled={!canClaim}
          title={
            !canClaim 
              ? "Not your team's turn"
              : "Claim a half suit by specifying where all 6 cards are"
          }
        >
          <span className="btn-icon">🎯</span>
          Make Claim
        </button>
      </div>

      <div className="action-info">
        <div className="info-section">
          <h4>Available Half Suits</h4>
          <div className="half-suits-list">
            {availableHalfSuits.map(hs => (
              <div key={hs.id} className="half-suit-item">
                <span className="half-suit-name">{hs.name}</span>
                <span className="half-suit-cards">6 cards</span>
              </div>
            ))}
            {availableHalfSuits.length === 0 && (
              <p className="no-suits">No half suits remaining</p>
            )}
          </div>
        </div>

        <div className="info-section">
          <h4>Opponents</h4>
          <div className="opponents-list">
            {opponents.map(opponent => (
              <div key={opponent.id} className="opponent-item">
                <span className="opponent-name">{opponent.name}</span>
                <span className="opponent-cards">{opponent.num_cards} cards</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="action-help">
        <div className="help-section">
          <h4>Quick Guide</h4>
          <ul>
            <li><strong>Ask:</strong> Request a specific card from an opponent. You must have at least one card from the same half suit.</li>
            <li><strong>Claim:</strong> Declare where all 6 cards of a half suit are located. Risk/reward strategy!</li>
            <li><strong>Counter-claim:</strong> If opponent claims your team has all 6 cards, you can counter-claim.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ActionPanel;