import React from 'react';
import '../styles/components.css'; // Assuming styles are in components.css as before

/**
 * The main application header.
 * Displays the game title.
 */
const Header = () => {
  return (
    <header className="app-header">
      <h1 className="app-title">Half Suit Online Card Game</h1>
    </header>
  );
};

export default Header;