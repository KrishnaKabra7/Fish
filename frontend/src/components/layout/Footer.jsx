import React from 'react';
import '../styles/components.css';

/**
 * The main application footer.
 * [cite_start]Provides support contacts and links to game rules. [cite: 1]
 */
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="app-footer">
      <div className="footer-content">
        <div className="footer-links">
          <a href="/docs/GAME_RULES.md" target="_blank" rel="noopener noreferrer">Game Rules</a>
          <a href="/docs/API.md" target="_blank" rel="noopener noreferrer">API Docs</a>
        </div>
        <div className="footer-support">
          [cite_start]<span>General Support: <a href="mailto:support@yourdomain.com">support@yourdomain.com</a> [cite: 1]</span>
          [cite_start]<span>Security Issues: <a href="mailto:security@yourdomain.com">security@yourdomain.com</a> [cite: 1]</span>
        </div>
        <div className="footer-copyright">
          <p>&copy; {currentYear} Half Suit Game. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;