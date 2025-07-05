import React from 'react';
import Card from '../common/Card';
import '../styles/game.css';

const PlayerHand = ({ cards, playerId }) => {
  // Group cards by half suit for better organization
  const groupCardsByHalfSuit = (cards) => {
    const groups = {};
    cards.forEach(card => {
      const halfSuitId = card.half_suit_id;
      if (!groups[halfSuitId]) {
        groups[halfSuitId] = [];
      }
      groups[halfSuitId].push(card);
    });
    return groups;
  };

  const cardGroups = groupCardsByHalfSuit(cards || []);

  // Sort cards within each group
  const sortCards = (cards) => {
    return [...cards].sort((a, b) => {
      if (a.rank === 'Joker') return 1;
      if (b.rank === 'Joker') return -1;
      
      const rankOrder = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
      return rankOrder.indexOf(a.rank) - rankOrder.indexOf(b.rank);
    });
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

  if (!cards || cards.length === 0) {
    return (
      <div className="player-hand empty">
        <div className="hand-header">
          <h3>Your Hand</h3>
          <span className="card-count">0 cards</span>
        </div>
        <div className="empty-hand">
          <p>No cards remaining</p>
        </div>
      </div>
    );
  }

  return (
    <div className="player-hand">
      <div className="hand-header">
        <h3>Your Hand</h3>
        <span className="card-count">{cards.length} cards</span>
      </div>
      
      <div className="hand-content">
        {Object.entries(cardGroups).map(([halfSuitId, groupCards]) => (
          <div key={halfSuitId} className="card-group">
            <div className="group-header">
              <span className="half-suit-name">{getHalfSuitName(parseInt(halfSuitId))}</span>
              <span className="group-count">({groupCards.length})</span>
            </div>
            <div className="cards-row">
              {sortCards(groupCards).map((card, index) => (
                <Card
                  key={`${card.unique_id}-${index}`}
                  card={card}
                  size="medium"
                  selectable={false}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlayerHand;