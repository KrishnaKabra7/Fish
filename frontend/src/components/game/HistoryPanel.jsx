import React, { useState } from 'react';
import '../styles/game.css';

const HistoryPanel = ({ askHistory, claimHistory, players, teams }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [selectedHistoryType, setSelectedHistoryType] = useState('all');

  const getPlayerName = (playerId) => {
    const player = players.find(p => p.id === playerId);
    return player ? player.name : 'Unknown';
  };

  const getTeamName = (teamId) => {
    const team = teams.find(t => t.id === teamId);
    return team ? team.name : `Team ${teamId}`;
  };

  const getCardDisplay = (card) => {
    if (card.rank === 'Joker') return 'Joker';
    return `${card.rank}${card.suit.charAt(0)}`;
  };

  const getOutcomeDisplay = (outcome) => {
    const outcomes = {
      'own_team_correct': '✅ Correct claim',
      'own_team_incorrect': '❌ Incorrect claim',
      'counter_correct': '✅ Counter-claim correct',
      'counter_incorrect': '❌ Counter-claim incorrect',
      'other_team_correct': '✅ Other team claim correct',
      'other_team_incorrect': '❌ Other team claim incorrect',
      'split_auto_incorrect': '❌ Split between teams',
      'pending_counter': '⏳ Awaiting counter-claim'
    };
    return outcomes[outcome] || outcome;
  };

  const getHalfSuitName = (halfSuitId) => {
    const halfSuitNames = {
      0: '2-7 ♠',
      1: '9-A ♠',
      2: '2-7 ♥',
      3: '9-A ♥',
      4: '2-7 ♦',
      5: '9-A ♦',
      6: '2-7 ♣',
      7: '9-A ♣',
      8: '8s & Jokers'
    };
    return halfSuitNames[halfSuitId] || `Half Suit ${halfSuitId}`;
  };

  // Combine and sort history by turn
  const combinedHistory = [
    ...askHistory.map(h => ({ ...h, type: 'ask' })),
    ...claimHistory.map(h => ({ ...h, type: 'claim' }))
  ].sort((a, b) => a.turn - b.turn);

  const filteredHistory = selectedHistoryType === 'all' 
    ? combinedHistory 
    : combinedHistory.filter(h => h.type === selectedHistoryType);

  const renderAskHistoryItem = (item) => (
    <div className={`history-item ask-item ${item.success ? 'success' : 'failure'}`}>
      <div className="history-header">
        <span className="turn-number">Turn {item.turn}</span>
        <span className="action-type">ASK</span>
        <span className={`result ${item.success ? 'success' : 'failure'}`}>
          {item.success ? '✅' : '❌'}
        </span>
      </div>
      <div className="history-content">
        <p>
          <strong>{getPlayerName(item.asker)}</strong> asked{' '}
          <strong>{getPlayerName(item.respondent)}</strong> for{' '}
          <span className="card-display">{getCardDisplay(item.card)}</span>
        </p>
        <p className="result-text">
          {item.success ? 'Card transferred!' : 'Card not found, turn passed'}
        </p>
      </div>
    </div>
  );

  const renderClaimHistoryItem = (item) => (
    <div className={`history-item claim-item ${item.outcome.includes('correct') ? 'success' : 'failure'}`}>
      <div className="history-header">
        <span className="turn-number">Turn {item.turn}</span>
        <span className="action-type">CLAIM</span>
        <span className="result">
          {getOutcomeDisplay(item.outcome)}
        </span>
      </div>
      <div className="history-content">
        <p>
          <strong>{getPlayerName(item.claimant)}</strong> claimed{' '}
          <strong>{getHalfSuitName(item.half_suit_id)}</strong>
        </p>
        <p className="result-text">
          Point awarded to: <strong>{getTeamName(item.point_to)}</strong>
        </p>
        {showDetails && (
          <div className="claim-details">
            <h5>Card Assignments:</h5>
            <div className="assignments">
              {Object.entries(item.assignments).map(([cardId, playerId]) => (
                <div key={cardId} className="assignment">
                  <span className="card-id">{cardId}</span> →{' '}
                  <span className="player-name">{getPlayerName(playerId)}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="history-panel">
      <div className="history-header">
        <h3>Game History</h3>
        <div className="history-controls">
          <select 
            value={selectedHistoryType} 
            onChange={(e) => setSelectedHistoryType(e.target.value)}
            className="history-filter"
          >
            <option value="all">All Actions</option>
            <option value="ask">Asks Only</option>
            <option value="claim">Claims Only</option>
          </select>
          <button
            className="btn btn-small"
            onClick={() => setShowDetails(!showDetails)}
          >
            {showDetails ? 'Hide Details' : 'Show Details'}
          </button>
        </div>
      </div>

      <div className="history-content">
        {filteredHistory.length === 0 ? (
          <div className="no-history">
            <p>No game history yet. Make the first move!</p>
          </div>
        ) : (
          <div className="history-list">
            {filteredHistory.map((item, index) => (
              <div key={`${item.type}-${item.turn}-${index}`}>
                {item.type === 'ask' 
                  ? renderAskHistoryItem(item) 
                  : renderClaimHistoryItem(item)
                }
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="history-stats">
        <div className="stat-item">
          <span className="stat-label">Total Actions:</span>
          <span className="stat-value">{combinedHistory.length}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Asks:</span>
          <span className="stat-value">{askHistory.length}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Claims:</span>
          <span className="stat-value">{claimHistory.length}</span>
        </div>
      </div>
    </div>
  );
};

export default HistoryPanel;