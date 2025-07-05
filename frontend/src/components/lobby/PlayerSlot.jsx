import React from 'react';

const PlayerSlot = ({ player, teamId, isCurrentPlayer, slotNumber }) => {
  const getTeamColor = (teamId) => {
    return teamId === 1 ? 'team-red' : 'team-blue';
  };

  const getTeamName = (teamId) => {
    return teamId === 1 ? 'Red Team' : 'Blue Team';
  };

  return (
    <div className={`player-slot ${player ? 'filled' : 'empty'} ${isCurrentPlayer ? 'current-player' : ''}`}>
      <div className={`player-slot-content ${player ? getTeamColor(teamId) : ''}`}>
        {player ? (
          <>
            <div className="player-info">
              <div className="player-name">
                {player.name}
                {isCurrentPlayer && <span className="you-badge">You</span>}
              </div>
              <div className="player-team">
                {getTeamName(teamId)}
              </div>
            </div>
            <div className="player-status">
              <div className="status-indicator connected"></div>
              <span className="status-text">Connected</span>
            </div>
          </>
        ) : (
          <div className="empty-slot">
            <div className="slot-number">Player {slotNumber}</div>
            <div className="waiting-text">Waiting for player...</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlayerSlot;