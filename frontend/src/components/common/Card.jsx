import React from 'react';
import PropTypes from 'prop-types';
import '../styles/components.css';

/**
 * Renders a single playing card.
 * @param {object} card - The card object to display. Should contain `rank` and `suit`.
 * @param {function} onClick - Optional click handler for the card.
 * @param {boolean} isSelectable - If true, adds hover effects.
 */
const Card = ({ card, onClick, isSelectable = false }) => {
  if (!card) {
    return <div className="card card-placeholder"></div>;
  }

  const { rank, suit } = card;
  const isRed = suit === 'Hearts' || suit === 'Diamonds';
  const colorClass = isRed ? 'card-red' : 'card-black';
  const selectableClass = isSelectable ? 'card-selectable' : '';
  
  // Handle Jokers and regular cards
  const cardSymbol = {
    'Spades': '♠',
    'Hearts': '♥',
    'Diamonds': '♦',
    'Clubs': '♣',
  }[suit] || '';

  const cardContent = suit === 'Joker' ? (
    <>
      <span className="card-rank">JOKER</span>
      <span className="card-suit-large">🃏</span>
    </>
  ) : (
    <>
      <span className="card-rank">{rank}</span>
      <span className="card-suit">{cardSymbol}</span>
    </>
  );

  return (
    <div className={`card ${colorClass} ${selectableClass}`} onClick={onClick}>
      {cardContent}
    </div>
  );
};

Card.propTypes = {
  card: PropTypes.shape({
    rank: PropTypes.string.isRequired,
    suit: PropTypes.string.isRequired,
  }),
  onClick: PropTypes.func,
  isSelectable: PropTypes.bool,
};

export default Card;