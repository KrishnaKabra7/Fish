import React from 'react';
import '../styles/game.css';

const PlayerList = ({ 
  players, 
  teams, 
  currentPlayer, 
  onChoosePlayer, 
  isMyTurn, 
  canChoosePlayer 
}) => {
  const getTeamName = (teamId) => {
    const team = teams.find(t => t.id === teamId);
    return team ? team.name : `Team ${teamId}`;
  };

  const getTeamColor = (teamId) => {
    return teamId === 0 ? 'team-blue' : 'team-red';
  };

  const isEligibleForTurn = (player) => {
    return player.num_cards > 0;
  };

  const isMyTeammate = (player) => {
    return player.team_id === currentPlayer.team_id;
  };

  const handlePlayerClick = (player) => {
    if (canChoosePlayer && isMyTeammate(player) && isEligibleForTurn(player)) {
      onChoosePlayer(player.id);
    }
  };

  // Group players by team
  const playersByTeam = players.reduce((acc, player) => {
    const teamId = player.team_id;
    if (!acc[teamId]) {
      acc[teamId] = [];
    }
    acc[teamId].push(player);
    return acc;
  }, {});

  return (
    <div className="player-list">
      <h3>Players</h3>
      
      {Object.entries(playersByTeam).map(([teamId, teamPlayers]) => (
        <div key={teamId} className={`team-section ${getTeamColor(parseInt(teamId))}`}>
          <div className="team-header">
            <span className="team-name">{getTeamName(parseInt(teamId))}</span>
            <span className="team-score">
              {teams.find(t => t.id === parseInt(teamId))?.score || 0} points
            </span>
          </div>
          
          <div className="team-players">
            {teamPlayers.map(player => (
              <div
                key={player.id}
                className={`player-card ${
                  player.id === currentPlayer.id ? 'current-player' : ''
                } ${
                  isMyTeammate(player) ? 'teammate' : 'opponent'
                } ${
                  canChoosePlayer && isMyTeammate(player) && isEligibleForTurn(player) 
                    ? 'selectable' 
                    : ''
                } ${
                  !isEligibleForTurn(player) ? 'no-cards' : ''
                }`}
                onClick={() => handlePlayerClick(player)}
              >
                <div className="player-info">
                  <div className="player-name">
                    {player.name}
                    {player.id === currentPlayer.id && (
                      <span className="you-indicator">(You)</span>
                    )}
                  </div>
                  <div className="player-stats">
                    <span className="card-count">
                      {player.num_cards} cards
                    </span>
                    {!isEligibleForTurn(player) && (
                      <span className="no-cards-indicator">No cards</span>
                    )}
                  </div>
                </div>
                
                {canChoosePlayer && isMyTeammate(player) && isEligibleForTurn(player) && (
                  <div className="choose-indicator">
                    Click to choose for turn
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
      
      {canChoosePlayer && (
        <div className="choose-player-help">
          <p>Your team's turn! Click on a teammate with cards to choose who plays.</p>
        </div>
      )}
    </div>
  );
};

export default PlayerList;